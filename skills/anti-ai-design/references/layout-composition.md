# Layout and composition

Purpose: how to turn ranked content into a structure, and how to make that structure feel intentional. This is where most generic output goes wrong: layout is chosen from a section library instead of from the content.

## Content before layout

1. **Inventory**: list every piece of content the view must hold, with realistic lengths (including the longest and empty cases).
2. **Rank**: primary (the reason the view exists), secondary (supports a decision), tertiary (reference, legal, navigation).
3. **Identify the shape of each piece**: is it a sequence, a comparison, a single highlight, a collection, a narrative, reference data, a form?
4. **Map shape to structure**:

| Content shape | Structures that fit |
| --- | --- |
| Sequence or process | Numbered steps, timeline, horizontal scroller with progress, stepper |
| Comparison across attributes | Table, matrix, side-by-side with aligned rows |
| One standout capability | Large demonstration, annotated screenshot, interactive sample |
| Collection of independent items | Grid of cards *or* list with thumbnails (cards are legitimate here) |
| Narrative or argument | Editorial single column, pull quotes, images placed in the flow |
| Reference data | Dense table, definition list, searchable index |
| Configuration | Grouped form with sections, live preview |
| Proof | One strong, sourced piece of evidence; a case study; a real quote with attribution |

5. **Give unequal things unequal space.** Primary content should be visibly dominant.

## Grids

A grid is an alignment tool, not a mold.

- Use a column grid (commonly 12 at desktop for flexibility, fewer at small widths) with consistent margins and gutters drawn from the spacing scale.
- Let elements span uneven column counts (7/5, 8/4, 5/7) to create hierarchy. Equal halves imply equal importance.
- Break the grid deliberately (full-bleed images, a heading hanging into the margin) and rarely. A break is only visible if the grid is otherwise respected.
- In apps, the grid is often structural: sidebar + content + inspector, with content columns inside.

## Asymmetry and tension

Symmetry is stable and formal; asymmetry creates direction and emphasis. Use asymmetry when one element should dominate or when the composition should lead the eye. Use symmetry for single-focus views (sign-in, a confirmation, a ceremonial statement).

Balance asymmetric layouts with visual weight: a large image on one side can be balanced by a dense text block or by generous empty space on the other.

## Editorial techniques (when the content is narrative)

- Large type set as a statement, with the supporting text in a narrower column offset from it.
- Images cropped with intent (tight on detail, wide for context), captions that add information.
- Pull quotes from *real* sources.
- Varying column widths across sections according to the content's character.
- A clear measure (line length) for body text (see [typography.md](typography.md)).

## Product-led composition

When the product's interface is the most persuasive asset:

- Show the real UI large enough to read. A tiny screenshot in a laptop mockup proves nothing.
- Crop to the part that matters; annotate it with short labels linked to the area.
- Pair each claim with the screen region that proves it.
- Prefer real states (a populated inbox, a resolved incident) over empty ones.

## Rhythm across a page

A page is a sequence. Plan it as one:

- Vary density and scale according to importance: a dense comparison, then a single quiet statement, then a demonstration.
- Keep shared alignment lines and a consistent spacing scale so variation reads as intentional.
- Avoid mechanical alternation (image left, image right, repeat) (GEN-007).
- End sections when their content ends. Do not pad to a uniform height.

## Composition for applications

- Structure follows the work: list → detail, master → detail → inspector, canvas + tool palettes, queue + workspace.
- The primary work area gets the most space and the least chrome.
- Toolbars and panels align to the same edges; avoid floating everything (GEN-003).
- Persistent context (selection, filters, current object) should stay visible while working.

## Common failure modes

- Section library thinking: "hero, logos, features, testimonials, CTA" before knowing the content (GEN-010).
- Equal columns for unequal content.
- Centering everything (GEN-007), including long text.
- Elements aligned to their own boxes rather than to a shared grid (HIE-004).
- Filling space: adding sections, cards, or decoration because the page "looks short".

## Worked example

Content: a developer CLI for database migrations. Primary content: "it previews every migration and can roll back safely". Secondary: install command, supported databases (14), pricing (free/open source), docs link.

- Generic draft: eyebrow "Developer tools" → "Migrations made simple" → paragraph → buttons; six feature cards; logos; CTA band.
- Content-led composition: the first view is a terminal recording-sized block showing a real `plan` output with a destructive change highlighted and the rollback command beneath it; a single headline set beside it at about one-third width: "See every migration before it touches production." The install command sits directly under the headline (copyable). Supported databases appear as a compact inline list, not cards. Docs and source links in the header. No CTA band: the install command is the CTA.
