# Design systems

Purpose: encode the art direction as tokens and reusable patterns so it survives implementation, and allow controlled variation without drifting back to generic defaults.

## Working with an existing system (most cases)

1. **Find it**: theme files, CSS variables, Tailwind config, component library, Figma tokens exports, platform asset catalogs, Compose themes, SwiftUI styles.
2. **Map it**: which tokens exist, which components exist, which are used inconsistently.
3. **Extend minimally**: add tokens or variants only when the design needs something the system cannot express; name them consistently with existing ones.
4. **Don't fork**: no parallel color set, no second button component, no new styling approach alongside the existing one (Rule F).
5. **Fix drift where you touch it**: replace hard-coded values with existing tokens in the code you edit.

## Token layers

| Layer | Example names | Purpose |
| --- | --- | --- |
| Primitive / reference | `green-600`, `space-4`, `radius-2` | The raw palette and scales |
| Semantic / system | `color-action-primary`, `color-text-muted`, `color-surface-raised`, `space-section` | Roles; what components use |
| Component (optional) | `button-primary-bg`, `table-row-height-compact` | Local overrides where a component needs its own knob |

Components consume semantic tokens. Themes (light/dark/high-contrast, brand variants) remap semantic tokens to different primitives.

## What to tokenize

- Color roles (text, surface, border, action, status, data).
- Type roles (family, size, line height, weight per role).
- Spacing scale and layout constants (gutters, margins, max widths).
- Radii scale (few steps, tied to component size).
- Elevation scale (few steps, used only for layers).
- Motion durations and easings.
- Breakpoints / container sizes.
- Density modes when the product supports them.

Do not tokenize every one-off. A token used once is a magic number with a name.

## Naming

- Name by role, not appearance (`danger`, not `red`), so values can change.
- Be consistent in order (`color-text-muted`, not a mix of `mutedText` and `text-color-muted`).
- Follow the platform/framework idiom (CSS custom properties in kebab-case; Swift/Kotlin properties in camelCase inside theme objects).

## Controlled variation

A system should allow distinctive pages without breaking coherence:

- **Composition is free; primitives are fixed.** Marketing sections can vary layout per content while using the same type, color, and spacing tokens.
- **Define "expressive" tokens explicitly**: a display type size, an editorial measure, a full-bleed image treatment, so expressive moments are part of the system.
- **Document anti-variants**: what the system intentionally does not include (e.g. "no gradient buttons", "no shadow on static cards"), so contributors don't re-add them.

## Component contracts

Each shared component documents: purpose and when not to use it; variants and their rules; states (see [component-design.md](component-design.md)); accessibility behavior (keyboard, roles, names); content rules (lengths, truncation); responsive behavior.

## Anti-patterns in systems

- Tokens copied from a popular library wholesale, with no relationship to the product's direction.
- Dozens of near-identical grays.
- Radius and shadow tokens applied globally to every component by default (GEN-003/004 at the system level).
- A "Card" component used as the universal layout primitive.
- Utility classes with repeated arbitrary values (`mt-[13px]`) instead of the scale (TEC-004).
