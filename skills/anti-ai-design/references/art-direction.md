# Art direction

Purpose: a method for deriving a visual identity from product context, so the result belongs to *this* product rather than to a trend. Use with [../workflows/define-art-direction.md](../workflows/define-art-direction.md) and [../templates/art-direction-spec.md](../templates/art-direction-spec.md).

## Where direction comes from

Direction is derived, in this order of authority:

1. **Existing brand and design system.** If they exist, they win. Your job is to express them well, not to replace them (Rule F).
2. **Audience and context of use.** Who uses this, where, how often, under what pressure? A trading terminal used eight hours a day and a wedding-photography portfolio visited once demand opposite answers.
3. **Product character.** What does the product actually do differently? Its differentiator is the best source of visual ideas: a mapping product has cartography; an audio tool has waveforms; a legal tool has documents and precision.
4. **Content and assets.** Real photography, data, product UI, illustrations. Design around what exists.
5. **User preferences** stated in the request ("warm", "bold"). Translate them into properties; check them against 1-4.

Trends are not on this list. They can inform execution, never the starting point.

## Step 1: Intent statement

Write 2-4 qualities, each tied to a reason from the context:

> **Precise**, because operators reconcile figures to the cent. **Calm**, because the tool is used during incidents. **Fast-feeling**, because every second of triage matters.

Reject qualities that could describe any product ("modern", "clean", "user-friendly"). They do not constrain anything.

## Step 2: Translate qualities into properties

Each quality becomes concrete decisions. Examples (illustrative, not a lookup table):

| Quality | Possible expressions |
| --- | --- |
| Precise | Tabular figures, tight alignment to a strict grid, restrained palette with semantic color only, thin rules where structure is needed, monospaced data columns |
| Warm | Humanist or serif type, natural photography, off-white grounds, softer contrast in large areas (still meeting text contrast), generous line height |
| Energetic | Strong scale contrast, saturated color fields, diagonal or cropped compositions, purposeful motion on state changes |
| Calm | Low chroma, few type sizes, long measure-appropriate text blocks, minimal motion, predictable layout |
| Technical credibility | Real product UI, real code or data, documentation-grade typography, exact numbers with sources |
| Playful | Unexpected scale, illustration system with a consistent hand, expressive color, motion with character (respecting reduced motion) |
| Luxurious | Restraint, large high-quality imagery, refined serif or high-contrast type, slow pacing, very few elements per view |

The same quality can be expressed many ways. Choose the expression the content supports.

## Step 3: Visual identity decisions

Decide only what the task needs. For each, record the decision and the reason.

- **Typography**: roles (display, text, UI, data), families, scale, weights. See [typography.md](typography.md).
- **Color**: brand, neutrals, semantic (success, warning, danger, info), data palette if relevant, light/dark mapping. See [color-and-surfaces.md](color-and-surfaces.md).
- **Surfaces**: background strategy, when (and only when) containers, borders, elevation are used.
- **Spacing and density**: base unit, scale, density target per surface. See [spacing-and-density.md](spacing-and-density.md).
- **Grid**: columns, margins, how sections break the grid deliberately.
- **Imagery**: photography vs product UI vs illustration vs diagrams; cropping and treatment.
- **Iconography**: one set, one stroke/weight logic, or platform symbols.
- **Radii**: a small scale tied to component role.
- **Motion**: whether motion has a role at all, and which. See [motion-design.md](motion-design.md).

## Step 4: Composition strategy

Decide the presentation strategy for the main surfaces before styling. Examples of genuinely different strategies for the same product:

- **Product-led**: the real interface is the hero and the narrative; copy annotates it.
- **Editorial**: long-form typographic storytelling with images placed like a magazine.
- **Evidence-led**: data, benchmarks, case material front and center, sourced.
- **Utility-first**: the page *is* the tool (a calculator, a search, a configurator).
- **Catalog**: the content collection itself (templates, products) is the experience.

## Step 5: Explore distinct directions (when useful)

When the direction is open and the user wants exploration, develop two or three directions that differ in **composition and strategy**, not just accent color. For each: one-paragraph rationale, key type and color decisions, a description or sketch of the primary screen, and the main risk. Recommend one.

Skip exploration when: the user asked for direct implementation; an existing system constrains the answer; the task is a small change.

## Step 6: Specification

Write the result as rules an engineer can implement without guessing. Replace adjectives with values or decision rules:

- Not "premium feel" → "Display type 64/72 at desktop, one weight; body 18/28; no more than one accent color per view; photography full-bleed, never inside cards."
- Not "Apple-like" → name the specific transferable principle observed (e.g. "product imagery large and uncluttered, one message per section") and its implementation.

## Failure modes

- **Theme as direction**: choosing "dark + neon" or "glass" and calling it art direction.
- **Direction by adjective**: a spec that says "bold, modern, clean" and nothing implementable.
- **Ignoring the existing brand** because a new look seemed more exciting.
- **Distinctive at the expense of usable**: novel navigation or illegible type in a tool people must use daily.
- **Imitation**: reproducing a famous site's composition. Extract the principle, not the layout.

## Example (abbreviated)

Context: a scheduling tool for independent physiotherapy clinics; users are clinic receptionists on desktop, patients on phones.

- Intent: *Reassuring* (patients are often in pain or anxious), *efficient* (receptionists juggle phone and desk), *local* (clinics compete on personal care).
- Typography: a humanist sans for UI and text; one warm serif for patient-facing headings only.
- Color: neutral warm grays; a single deep green as brand/action; semantic colors reserved for availability (free/held/booked) with text labels, not color alone.
- Surfaces: receptionist calendar is a flat, dense grid with hairline rules; no cards. Patient booking uses full-width steps, one decision per screen.
- Imagery: clinic's own photos when available; otherwise none, rather than stock.
- Motion: only for confirming a booking and moving between steps; respects reduced motion.
