#!/usr/bin/env node
// Builds dist/anti-ai-design-<version>.zip: the canonical skill folder plus LICENSE, nothing else.
// Inclusion rule: every non-dotfile under skills/anti-ai-design/, sorted by path, plus the repository LICENSE.
// The archive is byte-for-byte reproducible (fixed timestamps, sorted entries).
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { ROOT, SKILL_DIR, SKILL_NAME, listFiles, localLinks, readJson, isMain } from './lib/common.mjs';
import { writeZip } from './lib/zip.mjs';
import { validateSkill } from './validate-skill.mjs';

const ALLOWED_EXTENSIONS = new Set(['.md', '.txt', '.json']);

export function collectEntries() {
  const files = listFiles(SKILL_DIR);
  const unexpected = files.filter((f) => !ALLOWED_EXTENSIONS.has(posix.extname(f)));
  if (unexpected.length) throw new Error(`Unexpected file types in skill folder (update ALLOWED_EXTENSIONS deliberately): ${unexpected.join(', ')}`);

  const entries = files.map((f) => ({ name: `${SKILL_NAME}/${f}`, data: readFileSync(join(SKILL_DIR, f)) }));
  if (!files.includes('LICENSE')) entries.push({ name: `${SKILL_NAME}/LICENSE`, data: readFileSync(join(ROOT, 'LICENSE')) });
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  // Every local link in the package must resolve inside the package.
  const names = new Set(entries.map((e) => e.name));
  for (const e of entries.filter((x) => x.name.endsWith('.md'))) {
    for (const link of localLinks(e.data.toString('utf8'))) {
      const target = posix.normalize(posix.join(posix.dirname(e.name), link));
      if (!names.has(target)) throw new Error(`${e.name} links to ${link}, which is not in the package`);
    }
  }
  return entries;
}

export function buildPackage({ outDir = join(ROOT, 'dist') } = {}) {
  const { errors } = validateSkill();
  if (errors.length) throw new Error(`Skill validation failed; run npm run validate:skill\n${errors.join('\n')}`);
  const { version } = readJson(join(ROOT, 'package.json'));
  const entries = collectEntries();
  const zip = writeZip(entries);
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, `${SKILL_NAME}-${version}.zip`);
  writeFileSync(path, zip);
  const sha256 = createHash('sha256').update(zip).digest('hex');
  return { path, sha256, bytes: zip.length, entries: entries.map((e) => e.name) };
}

if (isMain(import.meta.url)) {
  try {
    const { path, sha256, bytes, entries } = buildPackage();
    console.log(`Packaged ${entries.length} files (${bytes} bytes)`);
    console.log(`  ${path}`);
    console.log(`  sha256 ${sha256}`);
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}
