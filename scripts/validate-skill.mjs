#!/usr/bin/env node
// Validates the canonical skill folder: frontmatter, constitution, required files, workflow structure, links.
import { existsSync } from 'node:fs';
import { basename, dirname, join, normalize, relative, sep } from 'node:path';
import { parseDocument } from 'yaml';
import { SKILL_DIR, ROOT, readText, readJson, listFiles, localLinks, report, isMain } from './lib/common.mjs';

// Fields defined by the Agent Skills specification (agentskills.io/specification).
const ALLOWED_FIELDS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const MAX_SKILL_LINES = 500;

export const REQUIRED_FILES = [
  ...['anti-patterns', 'design-principles', 'art-direction', 'layout-composition', 'typography', 'color-and-surfaces',
    'spacing-and-density', 'component-design', 'interaction-design', 'motion-design', 'accessibility',
    'responsive-design', 'design-systems', 'design-critique', 'reference-library', 'source-verification',
    'decision-framework'].map((f) => `references/${f}.md`),
  ...['web', 'macos', 'ios-ipados', 'android', 'desktop-cross-platform', 'enterprise-interfaces'].map((f) => `platforms/${f}.md`),
  ...['discover', 'define-art-direction', 'design-from-scratch', 'improve-existing-interface', 'implement-interface',
    'audit-interface', 'audit-existing-code', 'final-quality-gate'].map((f) => `workflows/${f}.md`),
  ...['design-brief', 'art-direction-spec', 'design-review', 'implementation-plan', 'design-system-spec'].map((f) => `templates/${f}.md`),
  ...['pre-design', 'anti-pattern-audit', 'platform-audit', 'accessibility-audit', 'release-audit'].map((f) => `checklists/${f}.md`),
];

// Each constitution rule: heading text and phrases that must appear in its section.
export const CONSTITUTION = {
  'Rule A': ['badge', 'headline', 'description', 'formula'],
  'Rule B': ['feature cards', '4, 6, or 8', 'independent entities'],
  'Rule C': ['borders', 'shadows', 'island mode', 'form field'],
  'Rule D': ['purple-to-blue', 'emoji', 'glassmorphism', 'placeholder content'],
  'Rule E': ['minimalism', 'dense'],
  'Rule F': ['existing', 'functionality', 'dependencies'],
  'Rule G': ['focus', 'loading', 'empty', 'error', 'keyboard', 'reduced motion'],
};

// Section headings SKILL.md must contain (case-insensitive substrings of "## n. ..." headings).
export const REQUIRED_SECTIONS = ['mission', 'constitution', 'discovery', 'objectives versus aesthetic', 'platform',
  'art direction', 'references and verification', 'layout and information architecture', 'implementation',
  'self-critique', 'quality gates', 'loading supporting files', 'missing information', 'preserving existing functionality',
  'final report'];

export const WORKFLOW_SECTIONS = ['Preconditions', 'Required context', 'Procedure', 'Relevant references',
  'Expected output', 'Common failure modes', 'Completion criteria'];

const PLACEHOLDER_MARKERS = /\b(TODO|TBD|FIXME|XXX)\b/;

export function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) return { error: 'SKILL.md must start with YAML frontmatter delimited by --- lines' };
  const doc = parseDocument(match[1], { uniqueKeys: true });
  if (doc.errors.length) return { error: `Invalid YAML frontmatter: ${doc.errors.map((e) => e.message).join('; ')}` };
  const data = doc.toJS();
  if (data === null || typeof data !== 'object' || Array.isArray(data)) return { error: 'Frontmatter must be a YAML mapping' };
  return { data, body: text.slice(match[0].length) };
}

export function validateFrontmatter(data, dirName) {
  const errors = [];
  for (const key of Object.keys(data)) {
    if (!ALLOWED_FIELDS.has(key)) errors.push(`Frontmatter field "${key}" is not part of the Agent Skills specification`);
  }
  const { name, description, compatibility, metadata } = data;
  if (typeof name !== 'string' || !name) errors.push('Frontmatter "name" is required and must be a string');
  else {
    if (name.length > 64) errors.push(`"name" exceeds 64 characters (${name.length})`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) errors.push(`"name" must be lowercase letters, digits, and single hyphens, not starting or ending with a hyphen: "${name}"`);
    if (name !== dirName) errors.push(`"name" (${name}) must match the skill directory name (${dirName})`);
  }
  if (typeof description !== 'string' || !description.trim()) errors.push('Frontmatter "description" is required and must be a non-empty string');
  else {
    if (description.length > 1024) errors.push(`"description" exceeds 1024 characters (${description.length})`);
    if (/[<>]/.test(description)) errors.push('"description" must not contain angle brackets');
    for (const trigger of ['UI', 'UX', 'website', 'app', 'redesign', 'frontend', 'critiqu', 'audit']) {
      if (!description.toLowerCase().includes(trigger.toLowerCase())) errors.push(`"description" should mention when to activate: missing "${trigger}"`);
    }
  }
  if (compatibility !== undefined && (typeof compatibility !== 'string' || compatibility.length > 500)) {
    errors.push('"compatibility" must be a string of at most 500 characters');
  }
  if (metadata !== undefined) {
    if (typeof metadata !== 'object' || metadata === null || Array.isArray(metadata)) errors.push('"metadata" must be a mapping');
    else for (const [k, v] of Object.entries(metadata)) {
      if (typeof v !== 'string') errors.push(`"metadata.${k}" must be a string (quote numbers in YAML)`);
    }
  }
  return errors;
}

/** Split markdown into sections keyed by heading text (any level). */
function sections(markdown) {
  const out = new Map();
  let current = '';
  for (const line of markdown.split('\n')) {
    const h = /^#{1,6}\s+(.*)$/.exec(line);
    if (h) { current = h[1].trim(); out.set(current, ''); continue; }
    if (current) out.set(current, out.get(current) + line + '\n');
  }
  return out;
}

export function validateSkill(skillDir = SKILL_DIR) {
  const errors = [];
  const warnings = [];
  const skillPath = join(skillDir, 'SKILL.md');
  if (!existsSync(skillPath)) return { errors: [`Missing ${relative(ROOT, skillPath)}`], warnings };

  const text = readText(skillPath);
  const fm = parseFrontmatter(text);
  if (fm.error) return { errors: [fm.error], warnings };
  errors.push(...validateFrontmatter(fm.data, basename(skillDir)));

  const lines = text.split('\n').length;
  if (lines > MAX_SKILL_LINES) errors.push(`SKILL.md has ${lines} lines; keep it under ${MAX_SKILL_LINES} and move detail to references`);

  const pkgPath = join(ROOT, 'package.json');
  if (skillDir === SKILL_DIR && existsSync(pkgPath) && fm.data.metadata?.version !== readJson(pkgPath).version) {
    errors.push(`metadata.version (${fm.data.metadata?.version}) must equal package.json version (${readJson(pkgPath).version})`);
  }

  // Constitution
  const secs = sections(fm.body);
  for (const [rule, phrases] of Object.entries(CONSTITUTION)) {
    const heading = [...secs.keys()].find((h) => h.startsWith(rule));
    if (!heading) { errors.push(`SKILL.md is missing constitution heading "${rule}"`); continue; }
    const body = (heading + '\n' + secs.get(heading)).toLowerCase();
    for (const p of phrases) if (!body.includes(p.toLowerCase())) errors.push(`${rule} section must mention "${p}"`);
  }
  const headings = [...secs.keys()].map((h) => h.toLowerCase());
  for (const s of REQUIRED_SECTIONS) {
    if (!headings.some((h) => /^\d+\./.test(h) && h.includes(s))) errors.push(`SKILL.md is missing a numbered section about "${s}"`);
  }

  // Required files: exist, substantive, reachable from SKILL.md
  const skillLinks = new Set(localLinks(fm.body).map((l) => normalize(l).split(sep).join('/')));
  for (const rel of REQUIRED_FILES) {
    const full = join(skillDir, rel);
    if (!existsSync(full)) { errors.push(`Missing required file ${rel}`); continue; }
    const content = readText(full);
    const words = content.split(/\s+/).filter(Boolean).length;
    if (words < 150) errors.push(`${rel} has only ${words} words; required files must be substantive`);
    if (PLACEHOLDER_MARKERS.test(content)) errors.push(`${rel} contains a placeholder marker (TODO/TBD/FIXME/XXX)`);
    if (!skillLinks.has(rel)) errors.push(`SKILL.md does not link to ${rel}; agents could not discover it`);
    if (rel.startsWith('workflows/')) {
      const wf = sections(content);
      for (const s of WORKFLOW_SECTIONS) if (!wf.has(s)) errors.push(`${rel} is missing section "## ${s}"`);
    }
  }

  // Every local link in every markdown file resolves and stays inside the skill folder.
  for (const rel of listFiles(skillDir).filter((f) => f.endsWith('.md'))) {
    const from = dirname(join(skillDir, rel));
    for (const link of localLinks(readText(join(skillDir, rel)))) {
      const target = join(from, link);
      const inside = relative(skillDir, target);
      if (inside.startsWith('..')) errors.push(`${rel} links outside the skill folder (${link}); the package would break`);
      else if (!existsSync(target)) errors.push(`${rel} has a broken link: ${link}`);
    }
  }

  if (!existsSync(join(skillDir, 'README.md'))) warnings.push('Skill folder has no README.md');
  return { errors, warnings };
}

if (isMain(import.meta.url)) report('validate-skill', validateSkill());
