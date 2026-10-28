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

- [ ] GEN-005: Gradients: brand-derived or informational, or default purple/blue? Gradient headline text? Grain laid over a gradient?
- [ ] GEN-008: Could this visual identity belong to any SaaS product (dark navy + neon, same sans everywhere, glowing borders)?
- [ ] GEN-009: Decorative blobs, orbs, sparkles, dot grids without meaning?
- [ ] GEN-011: Emoji used as production icons or prefixed to headings?
- [ ] GEN-014: Decorative micro-labels and pills on most elements?
- [ ] GEN-015: Motion with no job (scroll fade-ups everywhere, cursor-following beams, hover effects on static items)?
- [ ] GEN-016: Inter everywhere, or Space Grotesk + Instrument Serif, with no stated reason?
- [ ] GEN-017: Headline words picked out in italic, serif, gradient, or accent color? Oversized italic serif display headline?
- [ ] GEN-018: Cards identified only by a colored left/top border or tinted border?
- [ ] GEN-019: An icon (usually Lucide) on every heading, button, and list item?
- [ ] GEN-020: Component library (shadcn/ui) shipped with its default theme and no project tokens?
- [ ] GEN-021: Opacity fade as the only hover state, with no focus or pressed state?
- [ ] GEN-026: Cream/beige + terracotta palette chosen as the "tasteful" default?
- [ ] GEN-027: Decorative "01 / 02 / 03" section numbers with no real sequence?

## Copy

- [ ] GEN-022: Em dashes scattered through headings, buttons, and microcopy?
- [ ] GEN-023: Buzzwords (supercharge, seamless, unlock, elevate, all-in-one) instead of specific claims?
- [ ] GEN-024: A strip of round, unsourced stats under the hero?
- [ ] GEN-025: "Not X, but Y" slogans, fragment triads, "Let's go!" microcopy, rhetorical question headlines?

## Content honesty

- [ ] GEN-013: Any fabricated metrics, testimonials, logos, lorem ipsum, "John Doe", or leftover builder badges presented as real?
- [ ] GEN-028: Any button or link to `#`, empty handler, or form without success/error feedback?

## Diagnostics (not verdicts)

- [ ] Substitution test: could this layout serve an unrelated product with only text changes? If yes, which sections, and is that acceptable here?
- [ ] Signature idea: can you name the one thing a visitor would remember? If not, is the design still at the median (art-direction.md, Step 4b)?
- [ ] GEN-029: Any 3D scene unrelated to the product, without poster fallback or reduced-motion path? Conversely, is the subject physical or spatial and a 3D view would explain it better than a flat image?
- [ ] Focal point: can you name the first thing to look at on each key screen?
- [ ] Do the most important items get the most space?

## Counter-check (avoid false positives)

- [ ] For every finding above, re-read the "legitimate when" conditions. Cards for catalogs, plans, templates, widgets with distinct live data, and selectable options are often correct.
- [ ] Minimalism is not the goal: have you avoided recommending emptiness where density or expression fits (Rule E)?
