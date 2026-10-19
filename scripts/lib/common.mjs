import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SKILL_NAME = 'anti-ai-design';
export const SKILL_DIR = join(ROOT, 'skills', SKILL_NAME);
export const CONFIG_DIR = join(ROOT, 'configs');

export const readText = (path) => readFileSync(path, 'utf8');
export const readJson = (path) => JSON.parse(readText(path));

/** Recursively list files under dir as sorted POSIX paths relative to dir. Skips dotfiles. */
export function listFiles(dir) {
  const out = [];
  const walk = (current) => {
    for (const name of readdirSync(current)) {
      if (name.startsWith('.')) continue;
      const full = join(current, name);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(relative(dir, full).split(sep).join('/'));
    }
  };
  walk(dir);
  return out.sort();
}

/**
 * Local link targets in a Markdown document (inline links only), ignoring fenced code,
 * inline code, external URLs, and pure anchors. Returns targets without #fragment.
 */
export function localLinks(markdown) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const links = [];
  for (const [, target] of withoutCode.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) continue;
    links.push(decodeURI(target.split('#')[0]));
  }
  return links;
}

/** Print a validation result and set the exit code. Returns true when there are no errors. */
export function report(title, { errors, warnings = [] }) {
  for (const w of warnings) console.warn(`  warn  ${w}`);
  for (const e of errors) console.error(`  error ${e}`);
  const ok = errors.length === 0;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${title} (${errors.length} error(s), ${warnings.length} warning(s))`);
  if (!ok) process.exitCode = 1;
  return ok;
}

export const isMain = (metaUrl) => process.argv[1] && resolve(process.argv[1]) === fileURLToPath(metaUrl);
