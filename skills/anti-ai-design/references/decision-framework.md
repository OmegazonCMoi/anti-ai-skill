# Decision framework

Purpose: reason about design trade-offs in proportion to their impact, and communicate only the conclusions that help the user.

## The seven questions

For an important decision, be able to answer:

1. **Need**: what user or product need does this serve?
2. **Alternatives**: what else was considered?
3. **Choice**: why is this more appropriate than the alternatives here?
4. **Support**: which principles or verified references back it? (See [source-verification.md](source-verification.md).)
5. **Trade-offs**: what does it cost (space, complexity, familiarity, performance, effort)?
6. **Effects**: how does it affect usability, hierarchy, accessibility, and implementation?
7. **Platform**: how will it behave on the target platform(s) and inputs?

## Proportionality

| Decision weight | Examples | Reasoning | What to write |
| --- | --- | --- | --- |
| **Foundational** | Navigation model, art direction, information architecture, design system adoption, platform approach (native vs cross-platform UI) | All seven questions; explore alternatives explicitly | A short rationale in the plan or report; options presented when the user should choose |
| **Structural** | Section composition, replacing a card grid, table vs list, layout of a key screen | Questions 1, 2, 3, 6 | One or two sentences per decision in the report |
| **Local** | A component variant, a spacing adjustment, copy tweak | Consistency with the system | Nothing, unless asked |

When the user asks for speed, do the reasoning internally and report the conclusions.

## Common trade-offs

| Tension | Lean toward… | …unless |
| --- | --- | --- |
| Distinctive vs familiar controls | Familiar (platform-standard) controls; distinctiveness in composition and content | The product's core value *is* a novel interaction, and it's tested |
| Density vs approachability | Density for frequent expert use | Users are occasional or novices; then progressive disclosure |
| Consistency vs fit | Consistency with the existing system | The existing pattern actively harms the task; then change the system, not just one screen |
| Native conventions vs brand uniformity across platforms | Native conventions for navigation and controls; brand in color, type, content | The app is a custom-rendered experience (game, creative canvas) |
| Visual richness vs performance | Performance on target devices | Rich media is the product, and it's optimized |
| Exploration vs delivery | Delivery when scope is clear | The direction is genuinely open and the user wants options |
| Removing a generic pattern vs keeping it | Remove when no content reason exists | It satisfies a "legitimate when" condition in [anti-patterns.md](anti-patterns.md) |

## Making a recommendation

When presenting options, recommend one. Structure: the option, the reason, the main cost, what would change your mind.

> Recommend a list-detail layout over cards for the order queue: operators compare and process orders sequentially, and a list shows 3× more orders per screen. Cost: less room for product images (shown in the detail pane instead). I'd reconsider if orders are mostly picked visually by product photo.

## Recording decisions

For foundational decisions in longer projects, keep a short decision log in the design brief or implementation plan:

```
D-03 Navigation: sidebar (macOS) / tab bar (iOS) rather than a shared custom nav
  Why: platform conventions; users switch among 4 top-level areas frequently
  Alternatives: custom shared top bar (rejected: unfamiliar on both, worse with keyboard on macOS)
  Trade-off: two navigation implementations
  Revisit if: top-level areas exceed 5 on iOS
```
