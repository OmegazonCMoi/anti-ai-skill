#!/usr/bin/env node
// Runs every local check: repository files, audit rules, platform matrix, fixtures, skill, references.
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SKILL_DIR, CONFIG_DIR, readText, readJson, listFiles, localLinks, report, isMain } from './lib/common.mjs';
import { validateSkill } from './validate-skill.mjs';
import { validateReferences } from './validate-references.mjs';

export const REQUIRED_REPO_FILES = [
  'README.md', 'LICENSE', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md', '.gitignore', 'package.json', '.editorconfig',
  'adapters/README.md', 'adapters/claude/README.md', 'adapters/chatgpt/README.md', 'adapters/codex/README.md', 'adapters/generic-agents/README.md',
  'configs/source-registry.json', 'configs/audit-rules.json', 'configs/platform-matrix.json',
  'scripts/validate-repository.mjs', 'scripts/validate-skill.mjs', 'scripts/validate-references.mjs', 'scripts/package-skill.mjs',
  'tests/skill-structure.test.mjs', 'tests/anti-pattern-rules.test.mjs', 'tests/source-registry.test.mjs', 'tests/packaging.test.mjs',
  'examples/design-brief-example.md', 'examples/art-direction-example.md', 'examples/critique-example.md', 'examples/before-after-analysis.md',
];
export const FIXTURES = ['generic-landing-page', 'generic-feature-grid', 'over-containerized-dashboard', 'acceptable-functional-cards'];

const RULE_ID = /^(GEN|HIE|USA|A11Y|TEC)-\d{3}$/;
const RULE_ID_IN_TEXT = /\b(GEN|HIE|USA|A11Y|TEC)-\d{3}\b/g;
const SEVERITIES = ['critical', 'high', 'medium', 'low'];
const ENV_PATH = /\/Users\/|\/home\/|C:\\Users\\/; // scripts/ is not scanned, so this line can't match itself

/** Parse a fixture's ```json blocks: [signals, findings]. */
export function parseFixture(text) {
  const blocks = [...text.matchAll(/```json\n([\s\S]*?)```/g)].map((m) => JSON.parse(m[1]));
  const markup = /```html\n([\s\S]*?)```/.exec(text)?.[1];
  return { markup, signals: blocks[0], findings: blocks[1] };
}

export function validateAuditRules(rules, skillDir = SKILL_DIR) {
  const errors = [];
  const ids = new Set();
  for (const r of rules.rules) {
    if (!RULE_ID.test(r.id)) errors.push(`audit rule id "${r.id}" does not match ${RULE_ID}`);
    if (ids.has(r.id)) errors.push(`duplicate audit rule id ${r.id}`);
    ids.add(r.id);
    const cat = rules.categories[r.category];
    if (!cat) errors.push(`${r.id}: unknown category "${r.category}"`);
    else if (!r.id.startsWith(cat.prefix + '-')) errors.push(`${r.id}: prefix does not match category ${r.category} (${cat.prefix})`);
    if (!SEVERITIES.includes(r.defaultSeverity)) errors.push(`${r.id}: invalid defaultSeverity "${r.defaultSeverity}"`);
    for (const f of ['title']) if (!r[f]) errors.push(`${r.id}: missing ${f}`);
    for (const f of ['evidence', 'alternatives', 'references']) if (!Array.isArray(r[f]) || !r[f].length) errors.push(`${r.id}: "${f}" must be a non-empty array`);
    if (!Array.isArray(r.legitimateWhen)) errors.push(`${r.id}: "legitimateWhen" must be an array`);
    if (r.category === 'A' && !r.legitimateWhen?.length) errors.push(`${r.id}: generic-pattern rules must state when the pattern is legitimate`);
    for (const ref of r.references ?? []) if (!existsSync(join(skillDir, ref))) errors.push(`${r.id}: reference file not found: ${ref}`);
    for (const s of [...(r.codeSignals ?? []), ...(r.exceptionSignals ?? [])]) {
      try { new RegExp(s.pattern, s.flags); } catch (e) { errors.push(`${r.id}: invalid signal regex: ${e.message}`); }
      if (!s.flags?.includes('g')) errors.push(`${r.id}: signal flags must include "g" so matches can be counted`);
    }
  }
  for (const key of Object.keys(rules.categories)) {
    if (!rules.rules.some((r) => r.category === key)) errors.push(`category ${key} has no rules`);
  }
  for (const required of ['GEN-001', 'GEN-002', 'GEN-003', 'GEN-004']) {
    if (!ids.has(required)) errors.push(`mandatory constitution rule ${required} is missing from audit-rules.json`);
  }
  const severityIds = rules.severityLevels.map((s) => s.id);
  if (SEVERITIES.some((s) => !severityIds.includes(s))) errors.push('severityLevels must define critical, high, medium, low');

  // Scoring model
  const weights = rules.scoring.dimensions.reduce((s, d) => s + d.weight, 0);
  if (Math.abs(weights - 1) > 1e-9) errors.push(`scoring weights sum to ${weights}, expected 1`);
  const critique = readText(join(skillDir, 'references', 'design-critique.md'));
  for (const d of rules.scoring.dimensions) if (!critique.includes(d.name)) errors.push(`scoring dimension "${d.name}" is not documented in design-critique.md`);

  // IDs documented, and no dangling IDs in skill docs
  const antiPatterns = readText(join(skillDir, 'references', 'anti-patterns.md'));
  for (const id of ids) if (!antiPatterns.includes(id)) errors.push(`${id} is not documented in references/anti-patterns.md`);
  for (const rel of listFiles(skillDir).filter((f) => f.endsWith('.md'))) {
    for (const [id] of readText(join(skillDir, rel)).matchAll(RULE_ID_IN_TEXT)) {
      if (!ids.has(id)) errors.push(`${rel} references unknown audit rule ${id}`);
    }
  }
  return { errors, ids };
}

export function validatePlatformMatrix(matrix, skillDir = SKILL_DIR) {
  const errors = [];
  const skillLinks = new Set(localLinks(readText(join(skillDir, 'SKILL.md'))));
  for (const p of matrix.platforms) {
    for (const f of [p.file, ...p.load]) if (!existsSync(join(skillDir, f))) errors.push(`platform-matrix ${p.id}: file not found ${f}`);
  }
  for (const route of matrix.taskRoutes) {
    for (const f of route.files) {
      if (!existsSync(join(skillDir, f))) errors.push(`task route ${route.task}: file not found ${f}`);
      if (!skillLinks.has(f)) errors.push(`task route ${route.task}: ${f} is not linked from SKILL.md`);
    }
  }
  return errors;
}

export function validateRepository() {
  const errors = [];
  const warnings = [];

  for (const rel of REQUIRED_REPO_FILES) {
    const full = join(ROOT, rel);
    if (!existsSync(full)) { errors.push(`Missing ${rel}`); continue; }
    if (statSync(full).size === 0) errors.push(`${rel} is empty`);
    if (rel.endsWith('.md')) {
      const text = readText(full);
      if (text.split(/\s+/).length < 120) errors.push(`${rel} is too short to be useful`);
      if (/\b(TODO|TBD|FIXME)\b/.test(text)) errors.push(`${rel} contains a placeholder marker`);
    }
  }

  // Local links in repository-level markdown (outside the skill folder) must resolve.
  const repoDocs = ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CHANGELOG.md', ...listFiles(join(ROOT, 'adapters')).map((f) => `adapters/${f}`), ...listFiles(join(ROOT, 'examples')).map((f) => `examples/${f}`)];
  for (const rel of repoDocs.filter((f) => existsSync(join(ROOT, f)))) {
    for (const link of localLinks(readText(join(ROOT, rel)))) {
      if (!existsSync(join(ROOT, rel, '..', link))) errors.push(`${rel} has a broken link: ${link}`);
    }
  }

  // No environment-specific paths in distributed or documented text.
  for (const dir of ['skills', 'adapters', 'configs', 'examples', 'tests']) {
    for (const rel of listFiles(join(ROOT, dir))) {
      if (ENV_PATH.test(readText(join(ROOT, dir, rel)))) errors.push(`${dir}/${rel} contains an environment-specific path`);
    }
  }

  let ruleIds = new Set();
  try {
    const rules = readJson(join(CONFIG_DIR, 'audit-rules.json'));
    const r = validateAuditRules(rules);
    errors.push(...r.errors);
    ruleIds = r.ids;
  } catch (e) { errors.push(`audit-rules.json: ${e.message}`); }

  try { errors.push(...validatePlatformMatrix(readJson(join(CONFIG_DIR, 'platform-matrix.json')))); }
  catch (e) { errors.push(`platform-matrix.json: ${e.message}`); }

  for (const name of FIXTURES) {
    const path = join(ROOT, 'tests', 'fixtures', `${name}.md`);
    if (!existsSync(path)) { errors.push(`Missing fixture ${name}.md`); continue; }
    try {
      const { markup, signals, findings } = parseFixture(readText(path));
      if (!markup) errors.push(`fixture ${name}: missing html markup block`);
      if (!signals || !findings) { errors.push(`fixture ${name}: needs two json blocks (signals, findings)`); continue; }
      const all = [...signals.candidate, ...signals.absent, ...signals.needsJudgment, ...findings.expectedFindings, ...(findings.justifiedPatterns ?? [])];
      for (const id of all) if (!ruleIds.has(id)) errors.push(`fixture ${name}: unknown rule ${id}`);
    } catch (e) { errors.push(`fixture ${name}: ${e.message}`); }
  }

  const skill = validateSkill();
  const refs = validateReferences();
  return {
    errors: [...errors, ...skill.errors.map((e) => `skill: ${e}`), ...refs.errors.map((e) => `references: ${e}`)],
    warnings: [...warnings, ...skill.warnings, ...refs.warnings],
  };
}

if (isMain(import.meta.url)) report('validate-repository', validateRepository());
