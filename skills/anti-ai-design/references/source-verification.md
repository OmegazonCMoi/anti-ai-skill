# Source verification

Purpose: how to use external design sources honestly: verify what you cite, separate observation from interpretation, and manage uncertainty.

## Source types

| Type | Examples | Authority | Use for |
| --- | --- | --- | --- |
| **Normative standard** | WCAG 2.2 | Defines requirements; testable | Accessibility requirements and compliance language |
| **Official platform guidance** | Apple HIG, Material Design 3, Android Developers, Fluent 2, Microsoft Windows design docs | Defines platform conventions and the vendor's recommendations | Platform fit, native controls, sizes, navigation models |
| **Implementation guidance** | WAI-ARIA APG, MDN, web.dev | Practical patterns and browser behavior | How to build accessible, performant components |
| **Research / education** | Nielsen Norman Group | Evidence-informed principles, often from usability research | Explaining *why*, heuristics, critique vocabulary |
| **Example product** | Apple.com, Linear, Stripe, Raycast | One company's choices for its own context | Inspiration and observed principles, never rules |
| **Pattern library / gallery** | Mobbin | Collections of screenshots of real apps | Surveying how others solved a flow; check currency and licensing |
| **Component library** | shadcn/ui | Code you can adopt | Implementation starting points; still needs art direction |

An example product's design is **evidence of a choice**, not evidence that the choice is correct for your context.

## Verification protocol (when browsing is available)

1. **Open the actual source**, the specific page, not just the home page.
2. **Find the passage or element** that supports your claim.
3. **Confirm it says what you think**: version, date, platform scope, normative vs advisory language ("must" vs "consider").
4. **Record**: canonical URL, date inspected, what was observed (quote or precise description).
5. **Separate interpretation**: "Observed: the page leads with a full-width product screenshot. Interpretation: product-led composition supports a credibility goal."
6. **Extract a transferable principle** and adapt it to the project. Do not copy layouts, imagery, copy, or assets.
7. **Note limitations**: marketing pages change often; a principle valid for a consumer brand may not fit an enterprise tool.

## When browsing is unavailable

- Say so explicitly in the report ("References were not re-verified in this session").
- Use well-established knowledge cautiously; prefer principles over specific numbers.
- Mark specific values (sizes, ratios, breakpoints) as "per [source], not re-verified in this session".
- Do not describe the current state of a website you have not seen.

## Things you must not fabricate

- Exact CSS values, tokens, font names, spacing, or color codes for another company's product.
- Quotes from guidelines.
- Claims like "Apple requires…" for something that is a recommendation, or that you did not verify.
- Verification itself: never write "verified" without having inspected the source in this session or recorded it with a date.
- Platform API behavior or availability.

## Status vocabulary

Used in the source registry and in reports:

| Status | Meaning |
| --- | --- |
| `content-inspected` | The specific page content was read and the recorded observations were confirmed on the recorded date |
| `reachable` | The URL resolved with a successful HTTP response and the expected page title on the recorded date; content was not reviewed in detail |
| `unverified` | Not checked; use with caution |
| `broken` | Did not resolve or no longer contains the expected content |

An HTTP 200 response proves only that something is at the URL. It does not prove the content supports a claim, or that the source is authoritative.

## Uncertainty language

- Verified: "WCAG 2.2 SC 2.5.8 sets a 24×24 CSS px minimum target size (checked 2026-10-19)."
- Unverified but established: "Material guidance has long recommended 48 dp touch targets; confirm against current docs before citing as a requirement."
- Interpretation: "Linear's homepage, as inspected, leads with large product screenshots, which suggests…"
- Unknown: "I could not confirm whether this API is available on Android 12; check the documentation before relying on it."

## Licensing and attribution

- Link to sources; summarize in original wording.
- Do not copy proprietary documentation text, screenshots, icons, fonts, or illustrations into deliverables.
- Gallery screenshots (e.g. from pattern libraries) belong to the depicted products; use for internal study, not reproduction.
- When a source's license is unclear, do not incorporate its material; link instead.
