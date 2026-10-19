# Design critique

Purpose: evidence-based evaluation that produces prioritized, actionable corrections, without treating taste or fashion as defects. Used by [../workflows/audit-interface.md](../workflows/audit-interface.md), [../workflows/audit-existing-code.md](../workflows/audit-existing-code.md), and self-critique (SKILL.md section 10).

## Principles of a useful critique

1. **State the evidence available** before judging: screenshot (static, one size), rendered page (interactive), code, design file, description. Each allows different conclusions.
2. **Evaluate against the goal**, not against a style. "Not how I'd do it" is not a finding.
3. **Separate observation from inference.** "The focus ring is not visible in the CSS (`outline: none` on `button`)" is observed. "Keyboard users likely can't see focus" is inferred from it.
4. **Prioritize.** Five well-argued findings beat forty nitpicks. Lead with what blocks tasks or excludes users.
5. **Make recommendations concrete.** Each recommendation should be implementable: what to change, to what, with an example.
6. **Credit what works**, so it is preserved during correction (Rule F).

## What each kind of evidence can and cannot show

| Evidence | Can assess | Cannot assess (say so) |
| --- | --- | --- |
| Single static screenshot | Composition, hierarchy, typography, color, approximate contrast, visible anti-patterns, copy | Interaction states, keyboard, screen reader semantics, responsiveness, motion, performance, real contrast values (compression, scaling) |
| Several screenshots / sizes | Plus responsive adaptation, consistency across screens | Same interaction limits |
| Rendered interface with browser tools | Plus states, keyboard, focus, layout at widths, console errors, computed contrast | Screen reader experience unless tested, real-device performance |
| Source code | Semantics, states defined, tokens, accessibility attributes, responsive rules, dependencies | Actual rendered appearance unless rendered; runtime behavior unless run |
| Written description only | IA, flows, content strategy | Nearly all visual and technical qualities |

## Finding format

Every meaningful finding records:

| Field | Content |
| --- | --- |
| `id` | Sequential within the review (F-01, F-02 …) |
| `ruleId` | Matching audit rule (e.g. GEN-002, A11Y-001), or "new" with a name |
| `category` | Generic AI patterns, Visual hierarchy, Usability, Accessibility, Technical quality |
| `severity` | Critical / High / Medium / Low (definitions below) |
| `location` | Screen, section, component, file and line |
| `evidence` | What was seen, quoted or measured |
| `evidenceType` | Observed / Inferred / Not assessable |
| `impact` | Why it matters for users or the product |
| `recommendation` | The correction |
| `exampleCorrection` | A concrete example: revised structure, code snippet, token value, copy |

Use [../templates/design-review.md](../templates/design-review.md) for the full report.

## Severity

| Level | Definition | Typical examples |
| --- | --- | --- |
| **Critical** | Blocks a core task or creates a serious accessibility or functional problem | Primary action unreachable by keyboard; text contrast failure on primary content; layout broken at a supported width; runtime error |
| **High** | Materially damages usability, hierarchy, or visual coherence | No focal point on the key screen; generic card grid replacing the product's real differentiator; enterprise table made unusably sparse |
| **Medium** | Weakens quality or consistency, doesn't block the main task | Eyebrow formula on every section; inconsistent spacing; missing empty state on a secondary list |
| **Low** | Minor refinement | Radius inconsistency; slightly loose letter spacing on a label |

Generic-pattern findings (GEN-*) are rarely Critical on their own; they become High when they displace the content that would make the product understandable. Do not inflate severity to make a stylistic point.

## Judging generic patterns fairly

For each GEN candidate:

1. Quote the evidence.
2. Check the rule's "legitimate when" conditions in [anti-patterns.md](anti-patterns.md).
3. If legitimate, record it as **justified** with the reason (optionally note refinements).
4. If not, record a finding and propose a content-driven replacement.

The substitution test ("could this be reused for an unrelated product with only text changes?") is a **diagnostic** prompting investigation, not a verdict.

## Scoring model

Scores summarize; findings are the substance. Never present a score without its findings.

**Scale per dimension (0-4)**: 0 absent/broken, 1 weak with multiple significant problems, 2 adequate with some significant problems, 3 good with minor problems only, 4 excellent with no meaningful problems found *given the evidence*. Use **n/a** when the evidence cannot support a score (e.g. Interaction completeness from a screenshot).

| Dimension | Weight | Informed by |
| --- | --- | --- |
| Visual distinctiveness | 0.15 | Generic AI patterns, art direction coherence |
| Composition and hierarchy | 0.15 | Generic patterns, visual hierarchy |
| Design consistency | 0.10 | Hierarchy, tokens, technical consistency |
| Usability | 0.15 | Usability findings |
| Platform fit | 0.10 | Platform conventions |
| Accessibility | 0.15 | Accessibility findings |
| Technical implementation | 0.10 | Technical findings |
| Interaction completeness | 0.10 | States, feedback, flows |

**Calculation**: weighted mean of the assessable dimensions, with weights renormalized over those dimensions. Report the *evidence coverage* (sum of assessable weights). If coverage is below 0.5, the verdict is **insufficient evidence**: report findings, not a score.

**Bands**: ≥ 3.2 strong · ≥ 2.4 adequate · below 2.4 needs work.

**Gates override the average**:
- Any open **Critical** finding → verdict **blocked**, whatever the score.
- Any open **High** accessibility finding → verdict at best **needs work**.

This prevents a high average from hiding a serious defect. The score measures agreement with this skill's criteria on the evidence available; it is not an objective measure of aesthetic quality.

## Prioritizing corrections

Order the fix list by: (1) Critical; (2) High issues on primary tasks; (3) structural issues (composition, IA), because they change everything downstream; (4) systemic issues fixable in one place (tokens, shared components); (5) local polish. Note dependencies ("fix F-03 before F-07; both touch the hero").

## Critique language

- Specific: "The six feature cards in section 2 have equal weight although the request says scheduling is the differentiator" rather than "the features section is boring".
- Neutral about taste; firm about evidence.
- No "just": "just add more whitespace" hides the real decision.
