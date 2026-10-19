# Anti-pattern audit checklist

For each item: **absent**, **justified** (write the reason), or **finding** (record evidence and severity). Details and exceptions: [../references/anti-patterns.md](../references/anti-patterns.md).

## Structure

- [ ] GEN-001: Do sections open with eyebrow/badge → headline → paragraph → CTA by default? Count occurrences.
- [ ] GEN-002: Are there grids of equal icon/title/description cards? Are the items independent entities that users browse or select, or features of one thing?
- [ ] GEN-007: Is every section symmetrical/centered, or mechanically alternating?
- [ ] GEN-010: Does every section answer a real user question with real material? Any filler sections (placeholder logos, generic testimonials, repeated CTA bands)?

## Surfaces

- [ ] GEN-003: How many container levels deep is the deepest content? Is each level justified (overlay, interactive object, independent region)?
- [ ] GEN-004: Do most elements have both border and shadow? Do shadows appear on static content?
- [ ] GEN-006: Are radii uniform and large on everything, including tables and images? Do nested radii match?
- [ ] GEN-012: Are translucent/blurred panels used for ordinary content?

## Identity

- [ ] GEN-005: Gradients: brand-derived or informational, or default purple/blue?
- [ ] GEN-008: Could this visual identity belong to any SaaS product (dark navy + neon, same sans everywhere, glowing borders)?
- [ ] GEN-009: Decorative blobs, orbs, sparkles, dot grids without meaning?
- [ ] GEN-011: Emoji used as production icons?
- [ ] GEN-014: Decorative micro-labels and pills on most elements?
- [ ] GEN-015: Motion with no job (scroll fade-ups everywhere, hover effects on static items)?

## Content honesty

- [ ] GEN-013: Any fabricated metrics, testimonials, logos, or lorem ipsum presented as real?

## Diagnostics (not verdicts)

- [ ] Substitution test: could this layout serve an unrelated product with only text changes? If yes, which sections, and is that acceptable here?
- [ ] Focal point: can you name the first thing to look at on each key screen?
- [ ] Do the most important items get the most space?

## Counter-check (avoid false positives)

- [ ] For every finding above, re-read the "legitimate when" conditions. Cards for catalogs, plans, templates, widgets with distinct live data, and selectable options are often correct.
- [ ] Minimalism is not the goal: have you avoided recommending emptiness where density or expression fits (Rule E)?
