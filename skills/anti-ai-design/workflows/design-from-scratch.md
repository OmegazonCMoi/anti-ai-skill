# Workflow C: Design from scratch

Develop information architecture, composition, hierarchy, responsive behavior, components, and states before implementation.

## Preconditions

- Discovery done ([discover.md](discover.md)); art direction defined or explicitly deferred ([define-art-direction.md](define-art-direction.md)).
- The product or surface does not yet exist (or is being replaced entirely by request).

## Required context

Brief, art direction spec, real or realistically shaped content, platform target(s), stack (if implementation follows).

## Procedure

1. **Tasks and flows**: list primary and secondary tasks; sketch each flow as steps (screen or state, user action, system response). Remove steps that don't serve the task.
2. **Information architecture**: group content and functions by the user's mental model; define navigation (platform-appropriate, see platform files); name things in the user's vocabulary.
3. **Content inventory per screen**: list content with realistic lengths, rank it (primary/secondary/tertiary), identify its shape (sequence, comparison, highlight, collection, narrative, reference, form).
4. **Compose each screen** from its content ([../references/layout-composition.md](../references/layout-composition.md)): choose the structure the shape implies; give unequal items unequal weight; define the focal point; plan rhythm across a page. Before using any pattern listed in [../references/anti-patterns.md](../references/anti-patterns.md), write the content reason for it.
5. **Define components** needed, reusing standard and platform components; specify variants and state matrices ([../references/component-design.md](../references/component-design.md)).
6. **Define states**: loading, empty (first-use and no-results), error, success, offline/stale, permission, long content, overflow.
7. **Define responsive/adaptive behavior** per screen: what reflows, reprioritizes, transforms, or expands ([../references/responsive-design.md](../references/responsive-design.md)).
8. **Accessibility pass on the design**: heading structure, reading/focus order, labels, contrast pairs, target sizes, motion alternatives.
9. **Self-critique** (SKILL.md section 10) and revise structurally where needed.
10. **Hand off** to implementation with [../templates/implementation-plan.md](../templates/implementation-plan.md), or present the design with its rationale.

## Relevant references

Platform file for the target; [../references/layout-composition.md](../references/layout-composition.md); [../references/component-design.md](../references/component-design.md); [../references/interaction-design.md](../references/interaction-design.md); [../references/spacing-and-density.md](../references/spacing-and-density.md); [../references/accessibility.md](../references/accessibility.md); [../references/anti-patterns.md](../references/anti-patterns.md).

## Expected output

For each key screen: purpose, content ranking, structure and composition description (or wireframe-level layout), focal point, components with states, responsive behavior, accessibility notes. Plus navigation/IA and flow descriptions, and a list of assumptions and placeholders needing real content.

## Common failure modes

- Starting from a section library (hero, features, testimonials) instead of content.
- Designing only the happy path with ideal content lengths.
- Equal-weight grids for unequal content.
- Inventing features outside the requested scope without labeling them as proposals.
- Deferring accessibility to "later".

## Completion criteria

- Every screen has a stated purpose and focal point.
- Every repeated pattern has a content reason.
- States and responsive behavior are defined for each key screen.
- Accessibility requirements are designed in, not appended.
- Assumptions and placeholders are explicit.
