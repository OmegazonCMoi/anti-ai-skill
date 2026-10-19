import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { ROOT, SKILL_DIR, readText, readJson } from '../scripts/lib/common.mjs';
import { validateRegistry, validateReferences } from '../scripts/validate-references.mjs';

const registry = readJson(join(ROOT, 'configs', 'source-registry.json'));
const library = readText(join(SKILL_DIR, 'references', 'reference-library.md'));

test('registry and reference library are consistent', () => {
  assert.deepEqual(validateReferences().errors, []);
});

test('initial research targets are registered with their canonical URLs', () => {
  const expected = {
    'apple-website': 'https://www.apple.com/',
    'apple-hig': 'https://developer.apple.com/design/human-interface-guidelines/',
    linear: 'https://linear.app/',
    stripe: 'https://stripe.com/',
    raycast: 'https://www.raycast.com/',
    mobbin: 'https://mobbin.com/',
    'shadcn-ui': 'https://ui.shadcn.com/',
    'material-design-3': 'https://m3.material.io/',
    'fluent-2': 'https://fluent2.microsoft.design/',
    nngroup: 'https://www.nngroup.com/',
    'w3c-wai': 'https://www.w3.org/WAI/',
    'wcag-22': 'https://www.w3.org/TR/WCAG22/',
  };
  const byId = new Map(registry.sources.map((s) => [s.id, s]));
  for (const [id, url] of Object.entries(expected)) assert.equal(byId.get(id)?.url, url, id);
});

test('example products are never classified as official guidance', () => {
  for (const id of ['apple-website', 'linear', 'stripe', 'raycast']) {
    assert.equal(registry.sources.find((s) => s.id === id).type, 'example-product', id);
  }
  assert.equal(registry.sources.find((s) => s.id === 'wcag-22').type, 'normative-standard');
});

test('unverified sources are not described as verified anywhere in the library', () => {
  for (const s of registry.sources.filter((x) => x.verification.status === 'unverified')) {
    const row = library.split('\n').find((l) => l.includes(`\`${s.id}\``));
    assert.ok(row.includes('unverified'), s.id);
    assert.ok(!/content-inspected|reachable/.test(row), s.id);
  }
});

test('registry validation catches malformed entries', () => {
  const broken = structuredClone(registry);
  broken.sources.push({ ...broken.sources[0] });
  broken.sources.push({ ...broken.sources[1], id: 'Bad_ID', url: 'http://insecure.example' });
  broken.sources.push({ ...broken.sources[2], id: 'no-url', url: 'not a url' });
  broken.sources.push({ ...broken.sources[3], id: 'future', url: 'https://future.example/', verification: { status: 'reachable', date: '2999-01-01' } });
  broken.sources.push({ ...broken.sources[4], id: 'no-date', url: 'https://nodate.example/', verification: { status: 'content-inspected' } });
  broken.sources.push({ ...broken.sources[5], id: 'weird-status', url: 'https://weird.example/', verification: { status: 'probably-fine', date: '2026-01-01' } });
  broken.sources.push({ id: 'incomplete', url: 'https://incomplete.example/' });
  const { errors } = validateRegistry(broken, library, '2026-10-19');
  const expectations = [
    `Duplicate source id: ${registry.sources[0].id}`,
    'id must be kebab-case',
    'URL must use https',
    'invalid URL',
    'is in the future',
    'requires verification.date',
    'unknown verification status',
    'missing required field "learn"',
    'not documented in references/reference-library.md',
  ];
  for (const e of expectations) assert.ok(errors.some((x) => x.includes(e)), `expected error containing: ${e}`);
});

test('undocumented links in the library are detected', () => {
  const { errors } = validateRegistry(registry, library + '\n[Rogue](https://rogue.example/)\n', '2026-10-19');
  assert.ok(errors.some((e) => e.includes('unregistered source https://rogue.example/')));
});

test('status mismatch between registry and library is detected', () => {
  const tampered = library.replace('| `linear` | [Linear](https://linear.app/) | example-product | content-inspected |', '| `linear` | [Linear](https://linear.app/) | example-product | reachable |');
  assert.notEqual(tampered, library);
  const { errors } = validateRegistry(registry, tampered, '2026-10-19');
  assert.ok(errors.some((e) => e.startsWith('linear:') && e.includes('status does not match')));
});

test('normal validation does not touch the network', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('network used'); };
  try { assert.deepEqual(validateReferences().errors, []); }
  finally { globalThis.fetch = original; }
});
