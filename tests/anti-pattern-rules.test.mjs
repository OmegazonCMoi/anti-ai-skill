import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { ROOT, SKILL_DIR, readText, readJson } from '../scripts/lib/common.mjs';
import { scanSignals } from '../scripts/lib/signals.mjs';
import { computeVerdict } from '../scripts/lib/scoring.mjs';
import { parseFixture, FIXTURES, validateAuditRules } from '../scripts/validate-repository.mjs';
import { CONSTITUTION } from '../scripts/validate-skill.mjs';

const rules = readJson(join(ROOT, 'configs', 'audit-rules.json'));
const byId = new Map(rules.rules.map((r) => [r.id, r]));
const skill = readText(join(SKILL_DIR, 'SKILL.md'));
const antiPatterns = readText(join(SKILL_DIR, 'references', 'anti-patterns.md'));

test('the seven constitution rules are present in SKILL.md', () => {
  for (const rule of Object.keys(CONSTITUTION)) assert.match(skill, new RegExp(`### ${rule}:`));
  // Rules are framed as defaults to question, not bans.
  assert.match(skill, /not universally forbidden|default to \*\*question\*\*, not a shape to ban/);
  assert.match(skill, /Cards remain right for independent entities/);
  assert.match(skill, /Borders, shadows, and surfaces are allowed when they do a job/);
});

test('mandatory generic-pattern rules exist, are contextual, and offer alternatives', () => {
  for (const id of ['GEN-001', 'GEN-002', 'GEN-003', 'GEN-004']) {
    const r = byId.get(id);
    assert.ok(r, id);
    assert.ok(r.legitimateWhen.length > 0, `${id} must list legitimate uses`);
    assert.ok(r.alternatives.length >= 2, `${id} must offer alternatives`);
    assert.match(antiPatterns, new RegExp(`## ${id}:[\\s\\S]*?\\*\\*Legitimate when\\.\\*\\*[\\s\\S]*?\\*\\*Replacement strategies\\.\\*\\*`));
  }
});

test('audit rules config is internally consistent', () => {
  assert.deepEqual(validateAuditRules(rules).errors, []);
  for (const c of Object.values(rules.categories)) assert.ok(rules.rules.some((r) => r.id.startsWith(c.prefix + '-')), c.name);
});

test('audit rule validation catches malformed rules', () => {
  const broken = structuredClone(rules);
  broken.rules.push({ ...broken.rules[0] }); // duplicate GEN-001
  broken.rules.push({ id: 'GEN-999', category: 'B', title: 'x', defaultSeverity: 'severe', evidence: [], alternatives: ['a'], references: ['references/missing.md'], legitimateWhen: [] });
  const { errors } = validateAuditRules(broken);
  assert.ok(errors.some((e) => e.includes('duplicate audit rule id GEN-001')));
  assert.ok(errors.some((e) => e.includes('prefix does not match')));
  assert.ok(errors.some((e) => e.includes('invalid defaultSeverity')));
  assert.ok(errors.some((e) => e.includes('"evidence" must be a non-empty array')));
  assert.ok(errors.some((e) => e.includes('reference file not found')));
  assert.ok(errors.some((e) => e.includes('GEN-999 is not documented')));
});

for (const name of FIXTURES) {
  test(`fixture ${name}: static signals match expectations`, () => {
    const { markup, signals } = parseFixture(readText(join(ROOT, 'tests', 'fixtures', `${name}.md`)));
    const results = new Map(scanSignals(markup, rules.rules).map((r) => [r.ruleId, r.status]));
    for (const id of signals.candidate) assert.equal(results.get(id), 'candidate', `${id} should be a candidate`);
    for (const id of signals.needsJudgment) assert.equal(results.get(id), 'needs-judgment', `${id} should need judgment`);
    for (const id of signals.absent) assert.equal(results.has(id), false, `${id} should not fire`);
  });
}

test('legitimate functional cards are never reported as a plain anti-pattern candidate', () => {
  const { markup, findings } = parseFixture(readText(join(ROOT, 'tests', 'fixtures', 'acceptable-functional-cards.md')));
  const candidates = scanSignals(markup, rules.rules).filter((r) => r.status === 'candidate').map((r) => r.ruleId);
  assert.deepEqual(candidates, []);
  assert.deepEqual(findings.expectedFindings, []);
  assert.ok(findings.justifiedPatterns.includes('GEN-002'));
});

test('removing the exception context turns the same cards into a candidate', () => {
  // Proves the exception signal, not the absence of cards, is what protects fixture 4.
  const { markup } = parseFixture(readText(join(ROOT, 'tests', 'fixtures', 'acceptable-functional-cards.md')));
  const stripped = markup.replace(/<input[^>]*>/g, '').replace(/ role="radiogroup"/, '');
  const gen002 = scanSignals(stripped, rules.rules).find((r) => r.ruleId === 'GEN-002');
  assert.equal(gen002?.status, 'candidate');
});

test('generic fixtures produce multiple distinct findings; the legitimate one produces none', () => {
  const count = (n) => parseFixture(readText(join(ROOT, 'tests', 'fixtures', `${n}.md`))).findings.expectedFindings.length;
  assert.ok(count('generic-landing-page') >= 5);
  assert.ok(count('generic-feature-grid') >= 1);
  assert.ok(count('over-containerized-dashboard') >= 2);
  assert.equal(count('acceptable-functional-cards'), 0);
});

test('scoring: a high average cannot hide a critical or high accessibility defect', () => {
  const all4 = Object.fromEntries(rules.scoring.dimensions.map((d) => [d.id, 4]));
  assert.equal(computeVerdict(all4, [], rules.scoring).verdict, 'strong');
  assert.equal(computeVerdict(all4, [{ severity: 'critical', category: 'D' }], rules.scoring).verdict, 'blocked');
  assert.equal(computeVerdict(all4, [{ severity: 'critical', category: 'E' }], rules.scoring).verdict, 'blocked');
  assert.equal(computeVerdict(all4, [{ severity: 'high', category: 'D' }], rules.scoring).verdict, 'needs-work');
  assert.equal(computeVerdict(all4, [{ severity: 'high', category: 'A' }], rules.scoring).verdict, 'strong');
});

test('scoring: n/a dimensions are excluded and low coverage yields insufficient evidence', () => {
  const screenshotOnly = { distinctiveness: 3, composition: 3, consistency: 'n/a', usability: 'n/a', 'platform-fit': 'n/a', accessibility: 'n/a', technical: 'n/a', interaction: 'n/a' };
  const r = computeVerdict(screenshotOnly, [], rules.scoring);
  assert.equal(r.verdict, 'insufficient-evidence');
  assert.ok(Math.abs(r.coverage - 0.3) < 1e-9);
  const mixed = { ...screenshotOnly, usability: 2, accessibility: 2, consistency: 2 };
  const m = computeVerdict(mixed, [], rules.scoring);
  assert.ok(Math.abs(m.score - (0.15 * 3 + 0.15 * 3 + 0.1 * 2 + 0.15 * 2 + 0.15 * 2) / 0.7) < 1e-9);
  assert.equal(m.verdict, 'adequate');
  assert.throws(() => computeVerdict({ ...all(5) }, [], rules.scoring), RangeError);
  function all(v) { return Object.fromEntries(rules.scoring.dimensions.map((d) => [d.id, v])); }
});
