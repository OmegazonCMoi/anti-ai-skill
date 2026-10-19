# Example: art direction

Continues the hypothetical **Tessel** brief ([design-brief-example.md](design-brief-example.md)). Shows the [define-art-direction workflow](../skills/anti-ai-design/workflows/define-art-direction.md) producing three genuinely different directions, a recommendation, and an implementable spec.

## Intent

| Quality | Reason from context |
| --- | --- |
| **Bookish** | Owners identify with the craft of bookselling; generic tech aesthetics signal "not for us" |
| **Neighbourly** | The value is local: other shops near you |
| **Plain-spoken** | Non-technical, time-poor audience; clarity beats cleverness |

## Three directions

Each differs in **composition and presentation strategy**, not just color.

### Direction 1: "Catalogue"

- **Strategy**: editorial. The page reads like a publisher's seasonal catalogue: numbered sections, a serif display face, generous margins, captions under photos of real pilot shops.
- **First view**: a large serif statement ("Sell the book you don't have.") set across two-thirds of the width, with the postcode lookup set beneath it like an index entry.
- **Risk**: can feel slow or literary for owners who want facts fast.

### Direction 2: "The map"

- **Strategy**: utility-first. The page *is* the member map. The first view is a full-width map of the visitor's region with member shops plotted and a lookup field; explanation follows below.
- **First view**: map + "12 Tessel shops within 20 km of you" (live).
- **Risk**: weak in regions with few members; the map dominates and the "how it works" story gets less room.

### Direction 3: "The transfer slip"

- **Strategy**: product-led through an artefact. The transfer request is presented as a printed transfer slip (the physical metaphor shops already use), annotated step by step: request, accept, courier, sale.
- **First view**: a slip filled with a real example title and two real shop names (with permission), and the headline written as the slip's heading.
- **Risk**: the metaphor needs careful execution so it doesn't become skeuomorphic decoration.

### Recommendation

**Direction 1 with the lookup from Direction 2 as its first interactive element.** The catalogue structure carries "bookish" and "plain-spoken" without novelty for its own sake; the lookup answers the owner's first question with real data. Direction 3's slip becomes the "how it works" section as a single annotated figure rather than a whole-page concept. *Would reconsider* if launch regions turn out to have dense membership, which would favor Direction 2.

## Specification (abbreviated)

- **Typography**: display: a text serif with good italics at large sizes (open-licensed, self-hosted) in one weight; text and UI: system sans for speed and legibility; tabular figures for counts and distances. Scale: 16/18 body, 24, 32, 48, 72 display; body measure max 68ch.
- **Color**: paper-white ground `#FBF8F2`, ink text `#1C1B19` (contrast 16.2:1, computed), brand green `#1F4D3A` for links and the single primary action (white text on it 9.6:1; green text on paper 9.1:1, computed), a muted rule color for hairlines only. No gradients.
- **Surfaces**: no cards. Sections separated by numbered headings and hairline rules. The only bordered elements are the lookup input and the transfer slip figure (it represents a physical document).
- **Layout**: 12-column grid; statements span 8 columns; captions hang in the outer 3 columns on desktop and fall below images on mobile.
- **Imagery**: real pilot-shop photography, cropped tight on shelves and hands; captions name the shop and town.
- **Motion**: none, except the lookup results appearing (opacity, 150 ms; instant with reduced motion).
- **Exclusions**: eyebrow labels, icon feature grids, testimonial carousels (the three real quotes appear as set pull quotes in the flow), logo strips, stock illustrations, decorative shapes.
