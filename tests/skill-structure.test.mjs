import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SKILL_DIR, readText, readJson, ROOT } from '../scripts/lib/common.mjs';
import { validateSkill, parseFrontmatter, validateFrontmatter, REQUIRED_FILES, WORKFLOW_SECTIONS } from '../scripts/validate-skill.mjs';
import { validateRepository, REQUIRED_REPO_FILES } from '../scripts/validate-repository.mjs';

const skillText = readText(join(SKILL_DIR, 'SKILL.md'));

test('the canonical skill validates with no errors', () => {
  const { errors } = validateSkill();
  assert.deepEqual(errors, []);
});

test('the whole repository validates with no errors', () => {
  const { errors } = validateRepository();
  assert.deepEqual(errors, []);
});

test('frontmatter has a spec-compliant name and a trigger-rich description', () => {
  const { data } = parseFrontmatter(skillText);
  assert.equal(data.name, 'anti-ai-design');
  assert.ok(data.description.length > 200 && data.description.length <= 1024, `description length ${data.description.length}`);
  for (const word of ['UI', 'UX', 'website', 'redesign', 'frontend', 'audit', 'critiqu', 'macOS', 'iOS', 'Android']) {
    assert.ok(data.description.includes(word), `description should mention ${word}`);
  }
  assert.equal(data.metadata.version, readJson(join(ROOT, 'package.json')).version);
});

test('frontmatter validation rejects invalid metadata', () => {
  const cases = [
    [{ name: 'Anti-AI', description: 'x' }, /lowercase/],
    [{ name: 'anti--ai', description: 'x' }, /lowercase/],
    [{ name: 'other-name', description: 'x' }, /must match the skill directory/],
    [{ name: 'anti-ai-design', description: 'a'.repeat(1025) }, /exceeds 1024/],
    [{ name: 'anti-ai-design' }, /description.*required/],
    [{ name: 'anti-ai-design', description: 'UI UX website app redesign frontend critique audit', model: 'x' }, /not part of the Agent Skills specification/],
    [{ name: 'anti-ai-design', description: 'UI UX website app redesign frontend critique audit', metadata: { version: 1 } }, /must be a string/],
  ];
  for (const [data, pattern] of cases) {
    const errors = validateFrontmatter(data, 'anti-ai-design');
    assert.ok(errors.some((e) => pattern.test(e)), `expected ${pattern} for ${JSON.stringify(data).slice(0, 60)}; got ${errors.join(' | ')}`);
  }
});

test('invalid YAML is rejected rather than silently accepted', () => {
  assert.match(parseFrontmatter('---\nname: [unclosed\n---\nbody').error, /Invalid YAML/);
  assert.match(parseFrontmatter('---\nname: a\nname: b\n---\nbody').error, /Invalid YAML/);
  assert.match(parseFrontmatter('no frontmatter').error, /must start with YAML frontmatter/);
  assert.match(parseFrontmatter('---\n- a\n- b\n---\nbody').error, /mapping/);
});

test('validator detects broken links, missing files, and missing workflow sections in a copy', () => {
  const dir = mkdtempSync(join(tmpdir(), 'skill-'));
  const copy = join(dir, 'anti-ai-design');
  try {
    cpSync(SKILL_DIR, copy, { recursive: true });
    rmSync(join(copy, 'references', 'typography.md'));
    const wf = join(copy, 'workflows', 'discover.md');
    writeFileSync(wf, readFileSync(wf, 'utf8').replace('## Completion criteria', '## Done'));
    writeFileSync(join(copy, 'references', 'design-principles.md'), readFileSync(join(SKILL_DIR, 'references', 'design-principles.md'), 'utf8') + '\nSee [missing](nowhere.md).\n');
    const { errors } = validateSkill(copy);
    assert.ok(errors.some((e) => e.includes('Missing required file references/typography.md')));
    assert.ok(errors.some((e) => e.includes('workflows/discover.md is missing section "## Completion criteria"')));
    assert.ok(errors.some((e) => e.includes('broken link: nowhere.md')));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('every required skill file exists, is linked from SKILL.md, and workflows have all sections', () => {
  for (const rel of REQUIRED_FILES) {
    assert.ok(existsSync(join(SKILL_DIR, rel)), rel);
    assert.ok(skillText.includes(`](${rel})`), `SKILL.md should link ${rel}`);
    if (rel.startsWith('workflows/')) {
      const text = readText(join(SKILL_DIR, rel));
      for (const s of WORKFLOW_SECTIONS) assert.ok(text.includes(`## ${s}`), `${rel}: ${s}`);
    }
  }
});

test('SKILL.md routing table covers every task route in the platform matrix', () => {
  const routing = skillText.slice(skillText.indexOf('## 12.'), skillText.indexOf('## 13.'));
  const { taskRoutes, platforms } = readJson(join(ROOT, 'configs', 'platform-matrix.json'));
  for (const route of taskRoutes) for (const f of route.files) assert.ok(routing.includes(`](${f})`), `${route.task}: ${f}`);
  for (const p of platforms) assert.ok(routing.includes(`](${p.file})`), p.file);
  assert.match(routing, /Do \*\*not\*\* load everything/);
});

test('SKILL.md stays concise enough for agents', () => {
  assert.ok(skillText.split('\n').length < 500);
});

test('every required repository file exists', () => {
  for (const rel of REQUIRED_REPO_FILES) assert.ok(existsSync(join(ROOT, rel)), rel);
});
