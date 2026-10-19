# Design system specification

Use when creating a system or formalizing an implicit one. When a system already exists, document only the extensions.

## 1. Scope and principles

- Products/platforms covered:
- Relationship to existing systems (extends / replaces / independent):
- Three to five principles, each with a consequence ("Content over chrome → no containers without a semantic reason"):

## 2. Tokens

### Primitive

| Group | Tokens | Values |
| --- | --- | --- |
| Color ramps | | |
| Spacing scale | | |
| Type families & sizes | | |
| Radii | | |
| Elevation | | |
| Durations / easings | | |
| Breakpoints | | |

### Semantic

| Token | Maps to (light) | Maps to (dark) | Maps to (high contrast) | Usage rule |
| --- | --- | --- | --- | --- |
| | | | | |

Naming convention: (e.g. `category-role-variant-state`)

## 3. Typography roles

| Role | Token(s) | Usage | Don't |
| --- | --- | --- | --- |
| | | | |

## 4. Layout

- Grid per breakpoint/container size:
- App shell patterns:
- Content widths:

## 5. Components

For each component:

| Field | Content |
| --- | --- |
| Purpose / when not to use | |
| Variants and rules | |
| States | default, hover, focus, active, disabled, selected, loading, error (as applicable) |
| Accessibility | role, keyboard, name, announcements |
| Content rules | lengths, truncation, wrapping |
| Responsive behavior | |
| Platform notes | |

## 6. Patterns

(Forms, tables, empty states, error states, navigation, notifications: composition rules built from components.)

## 7. Controlled variation

- Expressive tokens available for marketing/editorial surfaces:
- What may vary per page (composition) vs what may not (primitives):

## 8. Anti-variants (intentionally excluded)

- (e.g. gradient buttons; shadow on static cards; nested cards; eyebrow labels as a default)

## 9. Governance

- How tokens/components are proposed, reviewed, versioned, deprecated:
- Accessibility acceptance criteria for new components:
