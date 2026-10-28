# Workflow B: Define art direction

Translate product goals into a distinctive visual direction and an implementation-ready specification.

## Preconditions

- Discovery is complete enough to state product, audience, context of use, and constraints ([discover.md](discover.md)).
- Either no visual identity exists, the user asked for a new direction, or the existing identity needs extension to a new surface.

## Required context

Brand assets and guidelines (if any), existing UI, content and imagery available, competitors or references the user mentions, platform targets.

## Procedure

1. **Establish authority order**: existing brand/system > audience and context > product character > content and assets > stated preferences ([../references/art-direction.md](../references/art-direction.md)).
2. **Write the intent**: 2-4 qualities, each tied to a reason from the context. Reject qualities that describe any product.
3. **Translate qualities into properties** for typography, color, surfaces, spacing/density, grid, imagery, iconography, radii, motion. Decide only what the task needs.
4. **Choose the composition strategy** for the main surfaces (product-led, editorial, evidence-led, utility-first, catalog, immersive/spatial, kinetic type, interactive object, scroll-told narrative, print-inspired, raw, maximalist, or a justified mix). Write down the median version, find the signature idea, and change at least three axes from the median ([../references/art-direction.md](../references/art-direction.md#step-4b-push-past-the-median)). Consider Three.js when the subject is physical or spatial ([../references/3d-and-webgl.md](../references/3d-and-webgl.md)).
5. **Explore directions when useful**: if the direction is open and the user wants options, develop two or three that differ in composition and strategy (not just accent color); at least one should be unconventional when the context allows. For each: rationale, key type/color decisions, primary screen description, main risk. Recommend one. Skip when the user asked for direct implementation or constraints decide the answer.
6. **Stress-test the direction** against: accessibility (contrast of the palette, legibility of type at small sizes), platform conventions, density needs, content reality (does the imagery exist?), implementation cost, and the substitution test (would this direction fit an unrelated product equally well?).
7. **Write the specification** with [../templates/art-direction-spec.md](../templates/art-direction-spec.md): values or decision rules, never bare adjectives. Include explicit "do not" rules for the patterns this direction avoids.
8. **Map to tokens** if implementation follows ([../references/design-systems.md](../references/design-systems.md)).

## Relevant references

[../references/art-direction.md](../references/art-direction.md), [../references/typography.md](../references/typography.md), [../references/color-and-surfaces.md](../references/color-and-surfaces.md), [../references/layout-composition.md](../references/layout-composition.md), [../references/motion-design.md](../references/motion-design.md), [../references/reference-library.md](../references/reference-library.md), [../references/source-verification.md](../references/source-verification.md).

## Expected output

An art direction spec containing: intent with reasons; type roles and scale; palette with semantic roles and verified contrast pairs; surface/border/elevation policy; spacing and density targets; grid; imagery and iconography rules; radii; motion policy; composition strategy per main surface; explicit exclusions; open risks.

## Common failure modes

- Picking a trend or theme (dark + neon, glass, gradient mesh) and calling it direction.
- Directions that differ only in color.
- Overriding an existing brand without being asked.
- Specs full of adjectives with no implementable values.
- A palette that fails contrast once applied to text.
- Citing a reference brand ("like Linear") instead of the observed principle.

## Completion criteria

- Each intent quality has a reason from the context.
- Every visual decision in the spec is implementable without guessing.
- Palette text/background pairs used for content meet contrast requirements.
- The direction passes the substitution test or the reason it doesn't matter is stated.
- Exclusions name the generic patterns this product will avoid.
