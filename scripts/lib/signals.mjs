/**
 * Heuristic scan of markup/code for audit-rule signals defined in configs/audit-rules.json.
 * A result is a candidate for human/model review, never a verdict:
 *  - "candidate": a code signal reached its minCount and no exception signal was found
 *  - "needs-judgment": a code signal fired, but an exception signal (e.g. radio inputs on cards) is present
 */
export function scanSignals(text, rules) {
  const results = [];
  for (const rule of rules) {
    if (!rule.codeSignals?.length) continue;
    const counts = rule.codeSignals.map((s) => (text.match(new RegExp(s.pattern, s.flags)) ?? []).length);
    if (!rule.codeSignals.some((s, i) => counts[i] >= (s.minCount ?? 1))) continue;
    const exception = (rule.exceptionSignals ?? []).some((s) => new RegExp(s.pattern, s.flags).test(text));
    results.push({ ruleId: rule.id, matches: Math.max(...counts), status: exception ? 'needs-judgment' : 'candidate' });
  }
  return results;
}
