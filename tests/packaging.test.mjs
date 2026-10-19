import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, posix } from 'node:path';
import { ROOT, SKILL_DIR, listFiles, localLinks } from '../scripts/lib/common.mjs';
import { buildPackage } from '../scripts/package-skill.mjs';
import { readZip } from '../scripts/lib/zip.mjs';
import { REQUIRED_FILES, CONSTITUTION } from '../scripts/validate-skill.mjs';

const outA = mkdtempSync(join(tmpdir(), 'pkg-a-'));
const outB = mkdtempSync(join(tmpdir(), 'pkg-b-'));
const built = buildPackage({ outDir: outA });
const entries = new Map(readZip(readFileSync(built.path)).map((e) => [e.name, e.data]));

test.after(() => {
  rmSync(outA, { recursive: true, force: true });
  rmSync(outB, { recursive: true, force: true });
});

test('package contains SKILL.md, every required file, the README, and a LICENSE', () => {
  for (const rel of ['SKILL.md', 'README.md', 'LICENSE', ...REQUIRED_FILES]) {
    assert.ok(entries.has(`anti-ai-design/${rel}`), rel);
  }
});

test('package mirrors the skill folder exactly (byte-identical files)', () => {
  for (const rel of listFiles(SKILL_DIR)) {
    assert.deepEqual(entries.get(`anti-ai-design/${rel}`), readFileSync(join(SKILL_DIR, rel)), rel);
  }
  assert.deepEqual(entries.get('anti-ai-design/LICENSE'), readFileSync(join(ROOT, 'LICENSE')));
});

test('package excludes development files', () => {
  for (const name of entries.keys()) {
    assert.ok(name.startsWith('anti-ai-design/'), `single top-level folder: ${name}`);
    assert.doesNotMatch(name, /(^|\/)(tests|scripts|configs|node_modules|adapters|examples|dist)\//, name);
    assert.doesNotMatch(name, /package(-lock)?\.json$|\.test\.mjs$|(^|\/)\.[^/]+$/, name);
  }
});

test('packaged SKILL.md preserves the frontmatter and the full constitution', () => {
  const skill = entries.get('anti-ai-design/SKILL.md').toString('utf8');
  assert.match(skill, /^---\nname: anti-ai-design\ndescription: /);
  for (const rule of Object.keys(CONSTITUTION)) assert.match(skill, new RegExp(`### ${rule}:`));
  assert.match(skill, /## 11\. Quality gates/);
  assert.match(skill, /## 12\. Loading supporting files/);
});

test('every link inside the package resolves inside the package', () => {
  for (const [name, data] of entries) {
    if (!name.endsWith('.md')) continue;
    for (const link of localLinks(data.toString('utf8'))) {
      const target = posix.normalize(posix.join(posix.dirname(name), link));
      assert.ok(entries.has(target), `${name} -> ${link}`);
    }
  }
});

test('packaging is deterministic', () => {
  const again = buildPackage({ outDir: outB });
  assert.equal(again.sha256, built.sha256);
  assert.deepEqual(again.entries, built.entries);
});
