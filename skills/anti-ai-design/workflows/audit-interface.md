# Workflow F: Audit interface

Review screenshots, rendered interfaces, or designs. State clearly what evidence is available and what cannot be assessed from it.

## Preconditions

- Something to review: screenshots, a URL or running app, a design file export, or a description.

## Required context

The evidence; the product's purpose and audience (infer if not given; ask only if decisive); target platform; any specific concerns from the user.

## Procedure

1. **Declare the evidence**: list what you have (e.g. "two desktop screenshots, no mobile, no interactive access") and, using the table in [../references/design-critique.md](../references/design-critique.md), what it can and cannot support.
2. **Understand the goal**: product, user, primary task for each screen. Without this, critique becomes taste.
3. **First impression pass** (30 seconds): name the focal point, the hierarchy order, and the overall character. Note where your eye goes versus where it should go.
4. **Anti-pattern pass**: walk [../checklists/anti-pattern-audit.md](../checklists/anti-pattern-audit.md). For each candidate, quote evidence and check the "legitimate when" conditions in [../references/anti-patterns.md](../references/anti-patterns.md). Classify as finding or justified.
5. **Hierarchy and composition pass**: focal point, type hierarchy, spacing rhythm, alignment, density, decoration, action hierarchy (HIE-*).
6. **Usability pass**: navigation clarity, labels, feedback visibility, error handling, empty states, IA (USA-*). Mark what can only be inferred from static evidence.
7. **Accessibility pass**: [../checklists/accessibility-audit.md](../checklists/accessibility-audit.md). From screenshots, contrast is an estimate (compression and scaling distort color); say so, and recommend measuring. Focus, keyboard, and semantics are not assessable from screenshots.
8. **Platform pass**: [../checklists/platform-audit.md](../checklists/platform-audit.md).
9. **Write findings** in the format of [../references/design-critique.md](../references/design-critique.md): id, rule, category, severity, location, evidence, evidence type, impact, recommendation, example correction.
10. **Score** (optional, when useful) per the scoring model, with n/a for dimensions the evidence can't support and the coverage stated. Apply gates.
11. **Prioritize** corrections and note what works and should be preserved.
12. Use [../templates/design-review.md](../templates/design-review.md) for the report.

## Relevant references

[../references/anti-patterns.md](../references/anti-patterns.md), [../references/design-critique.md](../references/design-critique.md), [../references/accessibility.md](../references/accessibility.md), the platform file, [final-quality-gate.md](final-quality-gate.md).

## Expected output

A review report: evidence statement and limits; summary verdict; prioritized findings with all fields; justified patterns (kept deliberately); optional score with coverage and gate results; what to verify next with better evidence.

## Common failure modes

- Flagging every card, border, or centered heading regardless of context.
- Presenting inferences ("no focus states") as observations from a screenshot.
- Stating exact contrast ratios from a compressed screenshot as fact.
- Taste presented as defect ("I'd use a serif here").
- Forty findings with no priority.
- Recommendations without concrete examples.

## Completion criteria

- Evidence and its limits are stated at the top.
- Every finding has evidence, evidence type, severity, and a concrete recommendation.
- Generic-pattern candidates were checked against their exceptions.
- Corrections are prioritized; strengths are recorded.
