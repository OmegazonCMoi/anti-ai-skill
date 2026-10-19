# Example: critique

An audit following [audit-interface](../skills/anti-ai-design/workflows/audit-interface.md) and the [design review template](../skills/anti-ai-design/templates/design-review.md). The subject is the markup in [the generic landing page fixture](../tests/fixtures/generic-landing-page.md), treated as if it had been submitted for review together with a single desktop screenshot.

## Evidence

- **Reviewed**: HTML/Tailwind markup for the home page; one desktop screenshot (1440 px wide). No interactive access, no mobile screenshots.
- **Can assess**: composition, hierarchy, copy, visible anti-patterns, semantics present in markup, approximate contrast.
- **Cannot assess**: keyboard and focus behavior, screen reader output, responsive behavior, motion, real contrast values (screenshot compression).
- **Product context**: Flowly collects documents from accounting firms' clients (from the request). Primary user: an accountant evaluating tools.

## Summary

- **Verdict**: needs work (score ≈ 1.7 with 0.70 coverage; no Critical findings).
- **Top three issues**: the product's job is never shown (F-02); fabricated social proof (F-03); a generic identity that could belong to any SaaS (F-04).
- **What works**: a single, clear primary action; short page; a sign-up link that is a real `<a href>`.

## Findings

| ID | Rule | Category | Severity | Location | Type |
| --- | --- | --- | --- | --- | --- |
| F-01 | GEN-001 | Generic AI patterns | Medium | All three sections | observed |
| F-02 | GEN-002 | Generic AI patterns | High | Features section | observed |
| F-03 | GEN-013 | Generic AI patterns | High | Hero, "Trusted by 10,000+ teams" | observed |
| F-04 | GEN-008 | Generic AI patterns | High | Whole page | observed |
| F-05 | GEN-005 | Generic AI patterns | Medium | Hero headline and buttons | observed |
| F-06 | A11Y-001 | Accessibility | Medium (estimate) | `text-slate-500` on `bg-slate-950` | inferred |

### F-02: The features grid replaces the product

- **Evidence**: six identical cards ("Lightning fast", "Secure by default", "Collaborative", "Analytics", "Integrations", "24/7 support"), each icon + title + one sentence.
- **Why it matters**: none of the six says what Flowly does (collect documents from clients). An accountant learns nothing that distinguishes it from any other tool.
- **Recommendation**: replace with a demonstration of the core loop: what the client receives (a request listing the 7 documents needed for a tax return) and what the accountant sees (which clients are missing which documents).
- **Example correction**: a two-part composition: a large, real rendering of the client request on the left (7 columns of the grid), and on the right (5 columns) a compact checklist of the accountant's view with three clients and their missing items. Below it, a two-column list of facts: "Reminders send automatically on the 1st and 15th", "Clients upload from their phone without an account".

### F-03: Unsourced social proof

- **Evidence**: "Trusted by 10,000+ teams worldwide" with no source; the product is pre-launch according to the brief.
- **Why it matters**: false claims undermine trust with a professional audience and can create legal exposure.
- **Recommendation**: remove; replace with real evidence when it exists (named pilot firms with permission).
- **Example correction**: delete the line; if pilots exist: "Used in pilot by Hart & Lowe, Bristol" with permission.

### F-01, F-04, F-05 (summarized)

- **F-01**: the eyebrow → headline → paragraph → CTA stack opens every section; "Features" restates its heading. Remove eyebrows; let the demonstration carry the explanation.
- **F-04**: dark navy, purple-blue gradient, blurred orb, "platform for modern teams" copy. Define direction from the audience (accountants, trust, precision): see [art-direction](../skills/anti-ai-design/references/art-direction.md).
- **F-05**: gradient text reduces legibility and is the most recognizable template marker; use a solid brand color.

### F-06: Secondary text contrast (estimate)

- **Evidence**: `text-slate-500` on `bg-slate-950` in the markup. Using Tailwind v3's default hex values (`#64748b` on `#020617`) the ratio computes to 4.24:1. The project's Tailwind version and theme were not confirmed, and newer Tailwind palettes define colors differently, so this is inferred rather than measured on the rendered page.
- **Why it matters**: small text below 4.5:1 fails WCAG 1.4.3.
- **Recommendation**: measure the computed colors; raise the token to meet 4.5:1. Severity may rise to High after measurement.

## Patterns kept deliberately

| Pattern | Location | Why it is justified |
| --- | --- | --- |
| Single centered CTA in the hero | Hero | One primary action for a single-goal page |

## Score

| Dimension | Weight | Score | Basis |
| --- | --- | --- | --- |
| Visual distinctiveness | 0.15 | 1 | F-04, F-05 |
| Composition and hierarchy | 0.15 | 1 | F-01, F-02 |
| Design consistency | 0.10 | 3 | Consistent, if generic |
| Usability | 0.15 | 2 | Clear CTA; product not explained |
| Platform fit | 0.10 | n/a | No responsive evidence |
| Accessibility | 0.15 | 2 | Semantics fine in markup; contrast unmeasured |
| Technical implementation | 0.10 | n/a | Not run |
| Interaction completeness | 0.10 | n/a | Static evidence only |

- **Coverage**: 0.70. **Weighted score**: (0.15·1 + 0.15·1 + 0.10·3 + 0.15·2 + 0.15·2) / 0.70 = 1.2 / 0.70 ≈ 1.71 → **needs work**.
- **Gates**: no Critical findings; no High accessibility findings (F-06 pending measurement).

## Prioritized corrections

1. F-03 (remove fabricated claim): trivial and high-risk.
2. F-02 (replace grid with demonstration): structural; do before visual work.
3. F-04/F-05 (art direction): after structure, so the direction fits the new content.
4. F-01 (remove eyebrow formula): falls out of 2 and 3.
5. F-06: measure, then adjust tokens.

## Next verification

Keyboard pass and focus visibility on the rendered page; mobile widths (320, 390); measured contrast for all text tokens.
