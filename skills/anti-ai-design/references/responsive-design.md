# Responsive and adaptive design

Purpose: adapting structure to context, not shrinking a desktop layout. Covers adaptation strategies, breakpoints, long content, and testing.

## Adapt, don't shrink

Each change in available space is a chance to reconsider structure:

| Strategy | When | Example |
| --- | --- | --- |
| **Reflow** | Content is linear | Multi-column text becomes a single column |
| **Reprioritize** | Space forces a choice | Secondary panel moves below or behind a toggle; primary content stays first |
| **Reveal / disclose** | Detail is useful but not primary | Table columns collapse into an expandable row detail |
| **Transform** | The component's form must change | Sidebar navigation becomes a tab bar or drawer; data table becomes a list of summaries with key fields |
| **Expand** | Large screens have spare space | Add a detail pane (list-detail), show an inspector, increase density; don't just widen line lengths |

Avoid hiding essential content or actions on small screens. If something is not needed on mobile, question whether it is needed on desktop.

## Breakpoints

- Choose breakpoints where **the content breaks**, not from device lists.
- Use container queries for components that appear in containers of different widths (sidebars, cards, dashboards).
- Native platforms provide size classes: Android window size classes (compact < 600 dp, medium 600-840 dp, expanded 840-1200 dp, large 1200-1600 dp, extra-large ≥ 1600 dp per current Jetpack Compose docs); Apple platforms use size classes and adaptive layouts. Design for classes, not specific devices.
- Consider height as well as width: landscape phones, split-screen, browser windows with toolbars.

## Fluid techniques (web)

- Intrinsic layout: `flex-wrap`, `grid-template-columns: repeat(auto-fit, minmax(…, 1fr))` for genuine collections.
- `clamp()` for display type and section spacing; keep body text sizes stable and user-scalable.
- `min-width: 0` on flex/grid children that contain long text, to allow shrinking.
- Max-width for text measure independent of container width.
- Responsive images with `srcset`/`sizes` and explicit dimensions or `aspect-ratio` to avoid layout shift.

## Long and unexpected content (TEC-002)

Design and test with:

- Long names, emails, URLs, and unbroken strings.
- Translations that expand text substantially (German, Finnish) and right-to-left scripts (Arabic, Hebrew) if localization is in scope.
- Large numbers and currencies with many digits.
- Zero, one, and many items.
- User-provided images of extreme aspect ratios.

Truncation must keep the full value reachable (tooltip, expansion, detail view) and should not truncate the distinguishing part of a value.

## Input adaptation

- Touch: larger targets, no hover-dependent content, gestures with visible alternatives.
- Pointer and keyboard: hover affordances allowed (as enhancement), shortcuts, denser layouts.
- Detect capability, not device: `@media (hover: hover) and (pointer: fine)`.
- Many devices have both (touch laptops, tablets with keyboards).

## Testing checklist

- 320 CSS px width (WCAG reflow) and common widths in between your breakpoints, not only at them.
- 200% text size and 400% zoom.
- Portrait and landscape; split-screen / resized windows on tablets and desktop.
- Long content cases above.
- Real devices when available; otherwise browser device emulation (state which).
