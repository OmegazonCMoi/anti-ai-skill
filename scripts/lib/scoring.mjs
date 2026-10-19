/**
 * Reference implementation of the scoring model in configs/audit-rules.json (scoring) and
 * references/design-critique.md. Gates override the weighted average.
 *
 * @param {Record<string, number|'n/a'>} scores - dimension id -> 0..4 or 'n/a'
 * @param {{severity: string, category: string}[]} openFindings
 * @param {object} scoring - the "scoring" object from audit-rules.json
 */
export function computeVerdict(scores, openFindings, scoring) {
  const assessed = scoring.dimensions.filter((d) => typeof scores[d.id] === 'number');
  for (const d of assessed) {
    const v = scores[d.id];
    if (v < scoring.scale.min || v > scoring.scale.max) throw new RangeError(`Score for ${d.id} out of range: ${v}`);
  }
  const coverage = assessed.reduce((sum, d) => sum + d.weight, 0);
  const score = coverage > 0 ? assessed.reduce((sum, d) => sum + d.weight * scores[d.id], 0) / coverage : null;

  if (openFindings.some((f) => f.severity === 'critical')) return { verdict: 'blocked', score, coverage };
  if (coverage < 0.5) return { verdict: 'insufficient-evidence', score, coverage };

  let verdict = scoring.bands.find((b) => score >= b.min).verdict;
  if (openFindings.some((f) => f.severity === 'high' && f.category === 'D') && verdict !== 'needs-work') {
    verdict = 'needs-work';
  }
  return { verdict, score, coverage };
}
