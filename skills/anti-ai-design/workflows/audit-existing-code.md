# Workflow G: Audit existing code

Inspect an implementation for visual, semantic, accessibility, responsive, and maintainability problems.

## Preconditions

- Access to the source code of the interface (and ideally the ability to run it).

## Required context

Stack, styling approach, design system, component library, entry points for the screens in scope, test/lint tooling.

## Procedure

1. **Map the scope**: which routes/screens/components; where styles and tokens live; which shared components they use.
2. **Run what exists** (if allowed): build, tests, lint, type-check, and the app. Record results. Note console errors (TEC-007).
3. **Search for candidate signals**. These are hints, not verdicts; read the surrounding code before concluding.

| Signal (grep for) | Possible rule |
| --- | --- |
| Eyebrow/badge/pill elements directly before `h1`-`h3` in many sections | GEN-001 |
| Arrays of `{ icon, title, description }` mapped to identical card components | GEN-002 |
| `rounded-2xl border shadow` (or equivalents) on most containers; nested card components | GEN-003, GEN-004 |
| `from-purple-* to-blue-*`, `linear-gradient(... violet ...)` | GEN-005 |
| `backdrop-blur`, `backdrop-filter` on content cards | GEN-012 |
| `absolute ... rounded-full blur-3xl` decorative blobs | GEN-009 |
| Emoji in JSX/templates as icons | GEN-011 |
| "Lorem ipsum", hard-coded "10,000+ teams", fake logos | GEN-013 |
| `outline: none` / `outline-none` without a `:focus-visible` replacement | A11Y-002 |
| `<div onClick>` / `<span onClick>` without role, tabindex, key handling | A11Y-003 |
| `<img>` without `alt`; icon buttons without `aria-label` or text | A11Y-006 |
| Inputs without associated `<label>` | A11Y-006 |
| Positive `tabindex` | A11Y-004 |
| Fixed `height` on text containers; `px` font sizes everywhere | A11Y-005 |
| Animations without `prefers-reduced-motion` handling | A11Y-007 |
| Repeated arbitrary values (`mt-[13px]`, hex colors inline) | TEC-004 |
| `<a>` without `href` used as button; `<button>` used for navigation | TEC-005 |
| Headings chosen by size (`h4` after `h1`) | TEC-005 |
| Animation or UI libraries used once for a decorative effect; two UI libraries | TEC-006 |
| Components with no loading/empty/error branches for async data | TEC-008, USA-005 |

4. **Read the key components** in full: semantics, states, props, responsive rules, token usage.
5. **Check responsive rules**: breakpoints, overflow handling (`min-width: 0`, wrapping), images with dimensions, tables in scroll containers.
6. **Render and inspect** if tooling exists: several widths, keyboard pass, focus visibility, contrast on computed colors. Otherwise, mark visual findings as inferred.
7. **Write findings** with file and line locations, evidence (code excerpt), evidence type, severity, recommendation, and a code-level example correction.
8. **Group systemic issues** (a token or a shared component causing many findings) so they are fixed once.

## Relevant references

[../references/anti-patterns.md](../references/anti-patterns.md), [../references/accessibility.md](../references/accessibility.md), [../references/component-design.md](../references/component-design.md), [../references/design-systems.md](../references/design-systems.md), [../references/responsive-design.md](../references/responsive-design.md), [../templates/design-review.md](../templates/design-review.md).

## Expected output

A code audit report: scope, tools run with results, prioritized findings with file:line and code-level corrections, systemic issues, and what could not be assessed without rendering.

## Common failure modes

- Treating grep hits as defects without reading context (e.g. a radio-card group legitimately uses cards).
- Reporting runtime behavior without running the code.
- Recommending a new library or framework rewrite for issues fixable in place.
- Ignoring the design system and suggesting raw values.

## Completion criteria

- Every finding cites file and location with evidence.
- Signals were confirmed or dismissed by reading context.
- Tool results reported accurately (including "not run").
- Systemic causes identified where they exist.
