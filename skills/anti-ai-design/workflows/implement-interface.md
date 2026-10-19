# Workflow E: Implement interface

Inspect the codebase, implement the selected design, validate behavior, and correct the result before claiming completion.

## Preconditions

- A design to implement: an art direction spec, a design description, a mockup, or a set of agreed findings to fix.
- Access to the codebase and permission to edit.

## Required context

Framework and language, styling approach, component library, tokens, routing, state management, test and lint setup, available validation tools (type checker, tests, build, browser or screenshot tooling).

## Procedure

1. **Inspect** the files, framework, dependencies, and existing components. Find the closest existing screen and follow its patterns.
2. **Identify reuse**: components, tokens, utilities, icons, layout primitives. Prefer them to new ones.
3. **Plan the smallest coherent change** ([../templates/implementation-plan.md](../templates/implementation-plan.md) for non-trivial work): files, new tokens/components (only if needed), behavior to preserve, verification steps.
4. **Implement structure first**: semantic markup or platform containers, layout, content order. Then type and spacing via tokens. Then states. Then motion (if any).
5. **Accessibility while building**: native elements, labels, focus management, contrast via tokens, target sizes, reduced-motion variants.
6. **States**: implement those defined in the design (hover, focus, active, disabled, selected, loading, empty, error, success, offline), using real conditions in the code (not hard-coded demo flags left in production code).
7. **Content**: real content where provided; clearly marked placeholders otherwise. No fabricated metrics, testimonials, or logos (GEN-013).
8. **Validate with available tools**, in this order when present: type-check, lint, unit/component tests, build, run the app, inspect the rendered result (screenshots at several widths, keyboard pass, console errors), accessibility scanner. Record which you ran and their results.
9. **Correct** any issue found and rerun the relevant checks.
10. **Report** per SKILL.md section 15.

## Stack notes

Detect the actual stack; consult only the relevant notes:

- **HTML/CSS/JS**: semantic elements, CSS custom properties for tokens, modern layout (grid/flex), `:focus-visible`, media queries for preferences.
- **React / Next.js**: follow the project's component patterns and data fetching conventions; keep server/client boundaries as the project defines them; avoid adding a UI library if one exists.
- **Vue / Svelte**: follow single-file component conventions; scoped styles or the project's approach.
- **Tailwind CSS**: use theme tokens; extend the theme rather than arbitrary values; extract repeated combinations into components.
- **shadcn/ui**: edit the copied components to match the art direction; keep Radix-style accessibility behavior intact.
- **React Native / Expo**: platform-specific navigation, safe areas, `accessibilityLabel`/`accessibilityRole`, font scaling.
- **SwiftUI / AppKit**: system containers and controls, semantic colors and text styles, `commands` for menus on macOS; check API availability for the deployment target.
- **Jetpack Compose**: Material 3 or the project's theme; semantics modifiers; window size classes for adaptation.
- **Flutter**: theme extensions for tokens; `Semantics` widgets; platform-adaptive widgets where appropriate.
- **Electron / Tauri**: native menus and shortcuts, window state, no browser behaviors leaking ([../platforms/desktop-cross-platform.md](../platforms/desktop-cross-platform.md)).

## Relevant references

[../references/component-design.md](../references/component-design.md), [../references/design-systems.md](../references/design-systems.md), [../references/accessibility.md](../references/accessibility.md), [../references/responsive-design.md](../references/responsive-design.md), the platform file.

## Expected output

Working code in the project's stack that implements the design and its states, plus a report of files changed, decisions, verification performed with results, and remaining limitations.

## Common failure modes

- Writing new components that duplicate existing ones.
- Repeated magic numbers instead of tokens (TEC-004).
- Inaccessible custom controls (A11Y-003) or fake controls that don't work.
- Leaving sample data or demo toggles in production paths.
- Adding dependencies for decorative effects (TEC-006).
- Claiming the UI "looks good" without having rendered it; claiming tests pass without running them.
- Unrelated refactors mixed into the change.

## Completion criteria

- The design is implemented, including the relevant states.
- Existing behavior is preserved; existing tests pass (if runnable).
- Available validation tools were run and their real results reported.
- Issues found during validation were fixed, or listed as known limitations.
