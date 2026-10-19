# Component design

Purpose: designing components as semantic, stateful, composable units, and choosing the right component for the content (including when a card is right).

## Start from semantics

Pick the component by **what it does**, not how it looks:

| Behavior | Component / element |
| --- | --- |
| Navigates to another place | Link (`<a href>`, navigation item) |
| Performs an action | Button |
| Chooses one of a few options | Radio group or segmented control |
| Chooses one of many | Select, combobox, or list with search |
| Toggles a setting with immediate effect | Switch |
| Includes/excludes an item | Checkbox |
| Displays structured comparable data | Table (with header cells) |
| Shows a transient message | Toast / status region; dialog if action required |
| Groups independent entities | List or card collection |

Using a link styled as a button for an action, or a `div` with a click handler, breaks keyboard and assistive technology behavior (TEC-005, A11Y-003). Prefer native elements and platform controls; build custom controls only when no native one fits, following the ARIA Authoring Practices Guide on web.

## Cards: when they are right

A card is a container for **one independent entity** with its own identity and usually its own action.

Use cards when:
- Each item is a distinct thing (product, template, person, saved report, plan).
- Items are browsed, filtered, compared, or selected.
- Items carry varied media or data that a table row cannot hold well.
- The card as a whole is a target (opens, selects, drags).

Avoid cards when:
- Items are attributes of one thing (features of a product) → list, demonstration, or prose.
- Items are rows of comparable data → table.
- The card would contain a single sentence → list item.
- Cards would be nested in cards → flatten.

When using cards: one clear primary target per card (avoid nested competing links), consistent internal structure, real differing content, a visible selected state for selection cards (not color alone).

## Variants

Keep variants few and meaningful:

- Buttons: primary (one per view), secondary, tertiary/ghost, destructive. Size variants by context (toolbar vs form).
- Variation should express **role or state**, not decoration. "Gradient button" is not a variant.
- Document when to use each variant. Variants without rules drift.

## Primary vs secondary actions (HIE-008)

- One primary action per view or decision point.
- Place primary actions where the platform expects them (dialog button order differs across platforms; follow the target platform's conventions).
- Destructive actions are clearly distinguished and, depending on reversibility, protected by undo or confirmation.

## State matrix

For each interactive component, define the states that apply (TEC-008):

| State | Notes |
| --- | --- |
| Default | |
| Hover | Pointer devices only; never the only cue |
| Focus (keyboard) | Always visible; meets contrast; not obscured |
| Active / pressed | Immediate feedback |
| Selected / checked | Not color alone |
| Disabled | Explain why when possible; consider not disabling and validating instead |
| Loading / pending | Keep size stable; prevent double submit |
| Error | Specific message, adjacent to the source |
| Read-only | Distinguishable from disabled |

For data views and containers:

| State | Notes |
| --- | --- |
| Loading | Skeletons shaped like content, or a progress indicator; avoid layout shift |
| Empty (first use) | Explain what goes here and the first action (USA-005) |
| Empty (no results) | Show the query/filters and how to broaden |
| Error | What failed, whether data is stale, how to retry |
| Partial / offline | Mark stale data; queue actions if supported |
| Overflow | Long text, many items, large numbers |

## Composition

- Build larger components from smaller ones; avoid "god components" with dozens of props.
- Keep layout (spacing between components) the parent's responsibility; components should not carry external margins.
- Icons: one set, consistent size and stroke; icon-only buttons need accessible names and usually tooltips.
- Content: design with real lengths; allow wrapping; define truncation rules with access to the full value.

## Counterexample check

"This dashboard uses cards everywhere": first ask whether each card is a widget with distinct live data and its own controls. If yes, cards are legitimate; then check for redundant nesting, uniform sizes that ignore importance, and shadows on static content.
