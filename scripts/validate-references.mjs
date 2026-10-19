#!/usr/bin/env node
// Validates configs/source-registry.json against its documentation in references/reference-library.md.
// Offline by default. `--online` additionally probes URLs (time-bounded; failures are warnings, never errors).
import { join } from 'node:path';
import { SKILL_DIR, CONFIG_DIR, readText, readJson, report, isMain } from './lib/common.mjs';

const REQUIRED_FIELDS = ['id', 'name', 'url', 'type', 'category', 'platforms', 'learn', 'informs', 'caveats', 'verification'];
const CHECKED_STATUSES = new Set(['content-inspected', 'reachable', 'broken']);

/** Pure validation of a registry object and the library markdown that documents it. */
export function validateRegistry(registry, libraryText, today = new Date().toISOString().slice(0, 10)) {
  const errors = [];
  const warnings = [];
  if (!Array.isArray(registry?.sources) || registry.sources.length === 0) return { errors: ['Registry must contain a non-empty "sources" array'], warnings };
  const statuses = new Set(registry.statuses ?? []);
  const types = new Set(registry.types ?? []);
  if (!statuses.size || !types.size) errors.push('Registry must declare "statuses" and "types" vocabularies');

  const ids = new Set();
  const urls = new Set();
  const libraryLines = libraryText.split('\n');

  for (const [i, s] of registry.sources.entries()) {
    const label = s?.id ?? `sources[${i}]`;
    for (const f of REQUIRED_FIELDS) {
      const v = s?.[f];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) errors.push(`${label}: missing required field "${f}"`);
    }
    if (!s?.id) continue;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.id)) errors.push(`${label}: id must be kebab-case`);
    if (ids.has(s.id)) errors.push(`Duplicate source id: ${s.id}`);
    ids.add(s.id);

    let url;
    try { url = new URL(s.url); } catch { errors.push(`${label}: invalid URL "${s.url}"`); }
    if (url) {
      if (url.protocol !== 'https:') errors.push(`${label}: URL must use https (${s.url})`);
      if (urls.has(url.href)) errors.push(`${label}: duplicate URL ${url.href}`);
      urls.add(url.href);
    }
    if (types.size && !types.has(s.type)) errors.push(`${label}: unknown type "${s.type}"`);
    if (s.platforms && !Array.isArray(s.platforms)) errors.push(`${label}: platforms must be an array`);
    if (s.informs && !Array.isArray(s.informs)) errors.push(`${label}: informs must be an array`);

    const v = s.verification ?? {};
    if (statuses.size && !statuses.has(v.status)) errors.push(`${label}: unknown verification status "${v.status}"`);
    if (v.date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(v.date)) errors.push(`${label}: verification.date must be YYYY-MM-DD`);
    if (CHECKED_STATUSES.has(v.status) && !v.date) errors.push(`${label}: status "${v.status}" requires verification.date`);
    if (v.date && v.date > today) errors.push(`${label}: verification.date ${v.date} is in the future`);

    // Documentation: the id must appear in a table row with the URL and the same status.
    const row = libraryLines.find((l) => l.trimStart().startsWith('|') && l.includes(`\`${s.id}\``));
    if (!row) errors.push(`${label}: not documented in references/reference-library.md (expected a table row with \`${s.id}\`)`);
    else {
      if (!row.includes(s.url)) errors.push(`${label}: reference-library row does not contain the registry URL ${s.url}`);
      if (v.status && !row.includes(v.status)) errors.push(`${label}: reference-library row status does not match registry status "${v.status}"`);
    }
  }

  // Every external URL in the library must be registered (no undocumented sources).
  for (const [, href] of libraryText.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    if (!urls.has(new URL(href).href)) errors.push(`reference-library.md links to unregistered source ${href}`);
  }
  return { errors, warnings, ids };
}

export function validateReferences() {
  const registry = readJson(join(CONFIG_DIR, 'source-registry.json'));
  const library = readText(join(SKILL_DIR, 'references', 'reference-library.md'));
  const result = validateRegistry(registry, library);

  const matrix = readJson(join(CONFIG_DIR, 'platform-matrix.json'));
  for (const p of matrix.platforms) {
    for (const id of p.sources) if (!result.ids?.has(id)) result.errors.push(`platform-matrix ${p.id}: unknown source id "${id}"`);
  }
  return result;
}

/** Optional network probe. Never fails the run: HTTP status does not prove a source supports a claim. */
export async function probeOnline(sources, { timeoutMs = 10000, concurrency = 4 } = {}) {
  const results = [];
  const queue = [...sources];
  const worker = async () => {
    for (let s = queue.shift(); s; s = queue.shift()) {
      let status = 'network-error';
      try {
        const res = await fetch(s.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(timeoutMs), headers: { 'user-agent': 'anti-ai-design-skill link check' } });
        status = res.status;
        res.body?.cancel();
      } catch (e) {
        status = e.name === 'TimeoutError' ? 'timeout' : 'network-error';
      }
      results.push({ id: s.id, url: s.url, status });
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
  return results.sort((a, b) => a.id.localeCompare(b.id));
}

if (isMain(import.meta.url)) {
  const result = validateReferences();
  if (process.argv.includes('--online')) {
    const { sources } = readJson(join(CONFIG_DIR, 'source-registry.json'));
    for (const r of await probeOnline(sources)) {
      const ok = typeof r.status === 'number' && r.status < 400;
      const note = r.status === 403 || r.status === 429 ? ' (blocked or rate-limited: inconclusive)' : '';
      if (!ok) result.warnings.push(`online: ${r.id} ${r.url} -> ${r.status}${note}`);
      else console.log(`  online ${r.status} ${r.id}`);
    }
    console.log('Note: a successful HTTP status only shows a page exists, not that it supports any claim.');
  }
  report('validate-references', result);
}
