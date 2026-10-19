# Spacing and density

Purpose: spacing is grouping; density is a product decision. This file covers spacing scales, rhythm, whitespace, and how to choose density for the user rather than for the screenshot.

## Spacing scale

- Choose a base unit (commonly 4 or 8 px on web; platform layout margins and standard spacing on native) and a limited scale (e.g. 4, 8, 12, 16, 24, 32, 48, 64, 96).
- Snap every gap, padding, and margin to the scale. Repeated off-scale values are TEC-004.
- Express the scale as tokens; name by size step (`space-3`) or by role (`gap-inline`, `section-gap`), consistently.

## Spacing encodes relationship

Spacing should be **proportional to how unrelated two things are**:

| Relationship | Relative spacing |
| --- | --- |
| Label to its value / icon to its text | Smallest |
| Items within a group | Small |
| Groups within a section | Medium |
| Sections within a page | Large |
| Major narrative breaks | Largest (or a background change) |

If label-to-field space equals field-to-next-label space, the form becomes ambiguous (HIE-003). The fix is spacing, not boxes.

## Whitespace

Whitespace is an active element. It isolates the focal point, groups content, and sets pace. But whitespace is not automatically "premium":

- Large whitespace around a single strong element creates emphasis.
- Large whitespace around everything creates emptiness and forces scrolling.
- In tools, whitespace that pushes needed information below the fold is a cost (HIE-005).

## Density

Density = information per unit of attention and space. Choose it from:

- **Frequency of use**: daily expert use → higher density; occasional use → lower.
- **Task**: scanning and comparing → dense, aligned; deciding something once → spacious, focused.
- **Expertise**: experts value seeing more at once; novices need guidance.
- **Input**: touch requires larger targets and spacing; pointer and keyboard allow compact rows.
- **Platform**: macOS and desktop tools commonly run denser than iOS; enterprise tables denser than marketing pages.

### Density techniques that don't hurt readability

- Reduce padding before reducing type size.
- Use alignment and consistent columns rather than boxes, which cost space.
- Tabular numerals, right-aligned numbers, truncated text with full value on hover/focus/expand.
- Offer density settings (compact/comfortable) in data-heavy tools when users differ.
- Collapse secondary metadata into a detail panel rather than removing it.

### Making a dense UI artificially spacious (anti-pattern)

Signs: tables with tall rows and one-third of the columns hidden; dashboards showing four KPIs in huge cards while the operational list is two clicks away; forms split across many steps for no validation reason. This trades productivity for a screenshot. Restore density, then fix hierarchy with typography and alignment.

## Vertical rhythm

Keep vertical spacing consistent within a type of block (all paragraphs, all list items) and tie it to line height. Consistent rhythm makes intentional breaks noticeable.

## Responsive spacing

Spacing scales with available space at the section level (section gaps grow on large screens) but should stay stable at the component level (button padding does not need to change across breakpoints). Avoid shrinking touch spacing on small screens; that is where it matters most.
