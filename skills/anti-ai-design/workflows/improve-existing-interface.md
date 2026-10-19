# Workflow D: Improve an existing interface

Inspect the current interface, preserve what works, identify the highest-impact defects, and implement targeted improvements.

## Preconditions

- An existing interface (code, rendered UI, or screenshots) and a request to improve, refresh, or fix it.

## Required context

The codebase (preferred) or screenshots; the design system; the user's goals for the change; any constraints (deadline, no new dependencies, areas not to touch).

## Procedure

1. **Inspect before judging**: run or render the interface if tooling allows; read the relevant components, styles, and tokens; note the visual identity and conventions in use (Rule F).
2. **Record what works**: patterns, components, and qualities to preserve. These become constraints.
3. **Audit** with [audit-interface.md](audit-interface.md) or [audit-existing-code.md](audit-existing-code.md), producing prioritized findings.
4. **Select the change set**: Critical and High findings first, then structural improvements with the biggest effect per change, then systemic fixes (tokens, shared components) over local patches. Decide whether a targeted improvement suffices or a redesign is justified; prefer targeted unless the user asked for a redesign or the structure is fundamentally wrong.
5. **Plan** with [../templates/implementation-plan.md](../templates/implementation-plan.md): files to touch, behavior to preserve (handlers, routes, data, test IDs, analytics, i18n keys), risks, verification steps.
6. **Implement** via [implement-interface.md](implement-interface.md), in the existing stack and conventions.
7. **Compare before/after** against the findings; confirm each addressed finding and that nothing preserved was broken.
8. **Run the final quality gate** ([final-quality-gate.md](final-quality-gate.md)).

## Relevant references

[../references/anti-patterns.md](../references/anti-patterns.md), [../references/design-critique.md](../references/design-critique.md), [../references/design-systems.md](../references/design-systems.md), the platform file, and references matching the findings.

## Expected output

Prioritized findings; the change set with rationale; implemented changes; a before/after summary listing resolved findings, deliberately kept patterns (with reasons), and verification performed.

## Common failure modes

- Replacing a coherent existing aesthetic with an unrelated one.
- Restyling (colors, radii) when the problem is structural (hierarchy, IA).
- Breaking functionality, routes, or tests while "cleaning up".
- Introducing a new component library or styling approach alongside the existing one.
- Fixing low-impact polish while Critical issues remain.

## Completion criteria

- All addressed Critical/High findings are verified fixed (or explicitly deferred with reason).
- Existing functionality and tests still pass where tooling exists.
- Changes follow the project's conventions and design system.
- The report distinguishes verified results from assumptions.
