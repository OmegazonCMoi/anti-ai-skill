# Motion design

Purpose: motion that has a job. Default to none; add motion when it explains, connects, or gives feedback, and always provide a reduced-motion path.

## The job test

Before adding any animation, name its job:

| Job | Example |
| --- | --- |
| **Orientation**: where did it come from / go? | A sheet slides from the edge it was invoked from; a deleted row collapses so the list visibly closes the gap |
| **Causality**: what caused this? | A badge count updates with a brief emphasis after an action elsewhere |
| **Feedback**: did my action register? | Pressed state, toggle movement, a checkmark on save |
| **Continuity**: this is the same object | A thumbnail expands into the detail view |
| **Status**: something is happening | Progress indicators, skeleton shimmer (subtle, respecting reduced motion) |
| **Expression**: brand character, sparingly | A single considered moment on a marketing page, not every section |
| **Immersion**: the experience is the point | A 3D product you can rotate, a scroll-told scene, a game or interactive piece (see [3d-and-webgl.md](3d-and-webgl.md)) |

No job → no animation. "Every section fades up on scroll" fails the test (GEN-015).

Apple's HIG states the same principle: add motion purposefully, don't add motion for its own sake, make motion optional, keep feedback animations brief and precise, avoid motion on frequent interactions, and let people cancel motion rather than wait for it.

## Timing and easing (starting points, not rules)

- Small feedback (button, toggle): very short, around 100-200 ms.
- Component transitions (menus, popovers, accordions): around 150-300 ms.
- Large spatial transitions (page, sheet, shared element): around 250-500 ms.
- Entering elements: decelerate (ease-out). Exiting: accelerate (ease-in), often faster than entry. Moving on screen: ease-in-out or a spring.
- Larger distances need slightly longer durations; frequent interactions need shorter ones.
- Interruptible: a new input should redirect or cancel the animation, not queue behind it.
- On native platforms, prefer system transitions and springs: they match platform feel and adapt to accessibility settings.

## Hierarchy in motion

- One thing moves at a time when attention matters; stagger only to clarify order.
- Motion draws the eye more than any static property; never animate something unimportant while the user needs to read something important.
- Avoid simultaneous unrelated motion (background loops + entrance animations + hover effects).

## Performance

- Web: animate `transform` and `opacity`; avoid animating layout properties (width, height, top, left) on large elements; avoid layout shift (see web.dev CLS guidance in [reference-library.md](reference-library.md)).
- Avoid scroll-jacking and heavy scroll listeners; prefer CSS scroll-driven animations or `IntersectionObserver` when scroll-linked effects are justified.
- Do not add an animation library for one effect that CSS can do (TEC-006).

## Reduced motion (A11Y-007)

- Web: `@media (prefers-reduced-motion: reduce)`: remove large movement, parallax, zooms, auto-playing motion; keep or replace with opacity crossfades where the change must still be perceivable.
- Apple: respect Reduce Motion (and Dim Flashing Lights, Prefer Cross-Fade Transitions where applicable). Android: respect the system animation scale / "Remove animations" setting.
- Auto-playing motion longer than 5 seconds must be pausable (WCAG 2.2.2).
- Never communicate essential information *only* through motion.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The blanket rule above is a safety net, not a design. Better: design the reduced variant per animation (e.g. crossfade instead of slide).

## Failure modes

- Scroll-triggered entrance animations on every block.
- Hover animations on non-interactive elements.
- Long, unskippable onboarding animations.
- Spinners for operations under ~300 ms (flicker); consider a short delay before showing.
- Bouncy springs in serious contexts (finance, healthcare) where they read as frivolous.
