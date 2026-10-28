# Anti-patterns: detection, exceptions, replacements

Purpose: recognize the patterns that make interfaces look machine-generated, decide whether each occurrence is justified, and replace unjustified ones with something the content actually calls for.

Every pattern here is **contextual**. The defect is automatic selection, not the shape itself. For each candidate hit, answer: *what content or task required this?* If there is a real answer, record it and move on. If the answer is "it fills the space" or "sections usually look like this", it is a defect.

Rule identifiers (`GEN-001` ...) match the audit rules used in [design-critique.md](design-critique.md) and the audit checklists.

## How to use this file

1. During design: read the "Detection" lines before composing, so you don't produce the pattern in the first place.
2. During audit: for each hit, record evidence, check "Legitimate when", then classify as **defect** or **justified**.
3. When replacing: pick from "Replacement strategies" based on the content, never by rotating through them. A replacement used on every section is just a new formula.

## Banned by default: the 20 AI tells

Never produce these by default. Each one is allowed only when its rule's "Legitimate when" holds, and you can say why.

| # | Tell | Rule |
| --- | --- | --- |
| 1 | Purple-to-blue gradient | GEN-005 |
| 2 | Gradient hero text | GEN-005 |
| 3 | Emojis in headings | GEN-011 |
| 4 | Inter font everywhere | GEN-016 |
| 5 | Colored border cards | GEN-018 |
| 6 | Glassmorphism cards | GEN-012 |
| 7 | Low-contrast dark mode | A11Y-001 |
| 8 | Three icon boxes in a row | GEN-002 |
| 9 | Badge above the headline | GEN-001 |
| 10 | Lucide icons everywhere | GEN-019 |
| 11 | Untouched shadcn/ui | GEN-020 |
| 12 | Fade-in on scroll | GEN-015 |
| 13 | Cursor-following beam | GEN-015 |
| 14 | Buttons that fade on hover | GEN-021 |
| 15 | Inconsistent spacing | HIE-003 |
| 16 | Em dashes everywhere | GEN-022 |
| 17 | Generic buzzword copy | GEN-023 |
| 18 | Serif italic accent words | GEN-017 |
| 19 | Space Grotesk + Instrument Serif | GEN-016 |
| 20 | Grain over a gradient | GEN-005 |

### More tells from published catalogs

Collected from the sources in [reference-library.md](reference-library.md#ai-pattern-catalogs) (checked 2026-10-28).

| Tell | Rule |
| --- | --- |
| Headline with one word in italic, serif, or the accent color | GEN-017 |
| Oversized italic serif display headline | GEN-017 |
| Bento grid where each tile is just a feature box | GEN-002 |
| Purple and bright cyan on near-black; glow borders and glowing hovers | GEN-008 |
| Grid-line or dot-pattern background; radial halo behind the hero | GEN-009 |
| Stock or AI-generated hero image unrelated to the product | GEN-009 |
| "John Doe" testimonials, "Company Name", builder badges left in | GEN-013 |
| Auto-scrolling logo marquee; pulsing status dot; typewriter or blinking cursor; elastic easing | GEN-015 |
| Geist as the only typeface | GEN-016 |
| Gray text on a colored surface | A11Y-001 |
| Hero metric strip ("10k+ users · 99.9% uptime · 24/7") | GEN-024 |
| "Not X, but Y" slogans, fragment triads, "Let's go!" microcopy | GEN-025 |
| Cream/beige + terracotta "tasteful" palette | GEN-026 |
| Decorative "01 / 02 / 03" section numbers | GEN-027 |
| Buttons to `#`, forms with no feedback | GEN-028 |
| Abstract 3D blob, torus, or crystal hero unrelated to the product | GEN-029 |

---

## GEN-001: Automatic badge + headline + description stack

**Detection.** A small label, pill, or eyebrow ("NEW", "FEATURES", "Why us") → large headline → one- or two-line paragraph → optional button, repeated as the opening of most sections. Often centered. Often the eyebrow restates the headline ("Features" above "Powerful features for modern teams").

**Why it hurts.** Every section gets the same hierarchy regardless of content, so nothing stands out. The eyebrow adds a fourth level of type that carries no information. The paragraph usually paraphrases the headline.

**Legitimate when.** The label carries real navigational or categorical information the user needs (a docs breadcrumb, a status like "Beta" on a genuinely beta feature, a date on an article, a step number in a sequence). Used once, deliberately.

**Replacement strategies.**
- Cut the eyebrow; write a headline that is specific enough to stand alone.
- Cut the paragraph when it repeats the headline; let the next element (screenshot, table, demo) be the explanation.
- Embed the heading in the content: a caption on an annotated screenshot, a label on a diagram, a sentence leading into a list.
- Change scale relationships: a very large statement with no supporting copy, or a compact heading followed immediately by dense content.
- Change position: heading in a side column alongside long content; heading below the visual it names.

**Example.**
- Before: `[pill: "Integrations"]` / `"Connect all your tools"` / `"Seamlessly integrate with the tools you already use."` / `[Learn more]`
- After: a compact heading "Works with GitHub, Linear, and Slack" placed directly above a live list of the 40 supported integrations, searchable. The list is the content; the heading names it.

## GEN-002: Repetitive equal-weight feature card grid

**Detection.** 3-8 cards in a uniform grid, each with icon, short title, one-sentence description, identical size and treatment. The most common form is three icon boxes in a row: an icon in a tinted square, a title, one line. A bento grid of mixed-size tiles is the same pattern when each tile is just another feature box. Icons are generic (bolt, shield, sparkles). Items vary wildly in real importance but are presented equally. Removing any one card would not be noticed.

**Why it hurts.** Equal weight for unequal things destroys hierarchy. Readers skim six interchangeable boxes and retain none. It signals "we listed features" rather than "we understand what matters to you".

**Legitimate when.** The items are genuinely independent entities the user browses, compares, or selects: products in a catalog, plans, templates, team members, integrations, saved reports, dashboard widgets showing different live data. Signals of legitimacy: each card links to or controls something distinct; cards carry real, differing data; the user picks among them; the set is user- or data-driven rather than marketing-authored. See fixture `acceptable-functional-cards`.

**Replacement strategies.**
- Rank the items. Give the one or two that matter most a full demonstration; put the rest in a compact list.
- If items form a process, use a sequence or timeline.
- If the user compares items on attributes, use a table.
- If items are aspects of one workflow, show one annotated screenshot and point at the parts.
- If items are proof points, use a single strong piece of evidence instead of six weak claims.
- Remove items that fail the "would anyone notice it's gone" test.

**Example.**
- Before: six cards: "Fast", "Secure", "Collaborative", "Integrations", "Analytics", "Support".
- After: a large, real screenshot of the collaboration view (the actual differentiator) with three callouts; below it, a two-column text list of security facts with links to the security page; "Fast" demonstrated by a measured, sourced number or removed.

## GEN-003: Island mode / over-containerization

**Detection.** Most content sits in floating rounded rectangles with their own background, border, and shadow, often nested two or three deep (page → panel → card → inner box). Gaps between islands are uniform. Sidebars, headers, and content are all separate floating pills.

**Why it hurts.** Containers become the most visible elements on the screen. Hierarchy is flattened because everything is "a box". Nesting wastes space in dense UIs and creates competing edges that make alignment harder to read.

**Legitimate when.** The container marks a real boundary: an overlay or popover, a draggable or selectable object, a region with independent scroll, a distinct document within an app, a widget with its own data and controls. One level of containment with a clear reason.

**Replacement strategies.**
- Remove the outer containers first; let page background and alignment define regions.
- Group with spacing and a shared alignment line instead of a box.
- Use a single divider or a background shift between major regions instead of a border on every child.
- Reserve elevation for things that are actually above other things (menus, dialogs, toasts).
- In dense data UIs, use rows and columns (table semantics), not cards.

## GEN-004: Borders and shadows on everything

**Detection.** Every card, input, button, section, and image has both a border and a drop shadow. Separators appear where spacing already separates. Shadows are applied to flat in-page content that never moves.

**Why it hurts.** When everything has an edge, edges stop meaning anything. Shadows imply elevation and interactivity; on static content they mislead and add visual noise.

**Legitimate when.** Form fields (users need to see where to type), focus rings, table structure where scanning across columns requires it, overlays that float above content, draggable items during drag, selected states.

**Replacement strategies.** Pick one separation device per level of hierarchy and use it consistently: spacing for siblings, a hairline or background change for regions, elevation only for layers. Audit by deleting all borders/shadows, then adding back only the ones whose absence causes a real problem.

## GEN-005: Default generic gradients

**Detection.** Purple-to-blue (or pink-to-orange) gradients on hero backgrounds, headline text, buttons, or card borders, unrelated to the brand. Gradient-filled hero text (`bg-clip-text text-transparent`). Grain or noise laid over a gradient to make it look crafted. Blurred color blobs behind the hero.

**Why it hurts.** It is the most recognizable marker of template output. It usually reduces text contrast and competes with content.

**Legitimate when.** The gradient is part of the established brand, or communicates something (a heat scale, a time-of-day transition, a material). Contrast is verified over every point the text covers.

**Replacement strategies.** Derive color from the brand and the content (product photography, data colors, material references). Use a flat, confident color field; use typography or imagery as the visual anchor.

## GEN-006: Excessive radii and pill shapes

**Detection.** Large corner radii on everything, including tables, images, and full-width sections; every button and tag is a pill; nested elements share the same radius (inner corners look wrong).

**Why it hurts.** Uniform softness erases the difference between interactive and static, and between components. It reads as a theme, not a decision.

**Legitimate when.** The brand voice is genuinely soft or playful; platform conventions call for it (system controls); pill shape signals a specific component type (filter chips, tokens) consistently.

**Replacement strategies.** Define a small radius scale tied to component size and role; nested radius = outer radius minus padding; allow square edges where content is document-like or tabular.

## GEN-007: Repeated symmetrical section layouts

**Detection.** Every section is centered and symmetrical, or every section alternates "image left / text right, then swap" mechanically.

**Why it hurts.** Rhythm without variation is monotony; the reader cannot tell which section matters. Mechanical alternation is still a formula.

**Legitimate when.** Content is genuinely parallel (a series of equal case studies) and consistency aids comparison.

**Replacement strategies.** Let content determine structure per section; vary scale, width, and density according to importance; use asymmetry where one element should dominate; keep a shared grid so variation stays coherent.

## GEN-008: Generic SaaS visual identity

**Detection.** Dark navy or near-black background, one neon accent, Inter-like sans everywhere at the same weights, glowing borders, abstract 3D shapes, "the platform for modern teams" copy. Interchangeable with dozens of products.

**Why it hurts.** Nothing ties the interface to this product, audience, or market. Users cannot remember it.

**Legitimate when.** Never as a default. Dark UI itself is fine when the context calls for it (media tools, low-light use, developer tools where users expect it); the defect is the bundle chosen because it is the default.

**Replacement strategies.** Run [art-direction.md](art-direction.md) from product intent; choose type with a role; pull color from the domain; show the actual product.

## GEN-009: Arbitrary decorative elements

**Detection.** Floating circles, dot grids, grid-line backgrounds, radial halos behind the hero, sparkles, squiggles, random 3D shapes, or gradient orbs placed for "visual interest", unrelated to content. Stock or AI-generated hero images that show nothing about the product.

**Why it hurts.** Decoration without meaning competes with content and dates fast.

**Legitimate when.** Part of a defined illustration system or brand language, used consistently and with purpose (e.g. a diagrammatic motif that also explains something).

**Replacement strategies.** Use content as the visual: product UI, data, photography, diagrams of the actual system, typography at scale.

## GEN-010: Sections without content-driven reason

**Detection.** The page follows hero → logo strip → features → testimonials → pricing → FAQ → CTA because "landing pages have these". Logo strips with placeholder logos; testimonials invented; a CTA band repeated three times.

**Why it hurts.** Users scroll through filler; real differentiators get the same space as boilerplate.

**Legitimate when.** Each section answers a question the target user actually has at that point, with real material.

**Replacement strategies.** List the questions a visitor needs answered, in order; build one section per question; drop sections with no real material.

## GEN-011: Emoji as production iconography

**Detection.** 🚀 ⚡ 🔒 used as feature or navigation icons in a production UI, or prefixed to headings ("🚀 Get started", "✨ Features").

**Why it hurts.** Rendering differs across platforms, they carry unintended tone, screen readers announce their names, and they cannot be styled to the system.

**Legitimate when.** User-generated content, reactions, chat, or a deliberately informal brand where emoji are part of the voice and are marked up accessibly.

**Replacement strategies.** A consistent icon set (platform symbols such as SF Symbols or Material Symbols, or the project's library), or no icon at all.

## GEN-012: Decorative glassmorphism

**Detection.** Frosted translucent panels over blurred gradients for ordinary content cards.

**Why it hurts.** Reduces legibility, costs rendering performance, and depends on what is behind it, so contrast is unpredictable.

**Legitimate when.** Platform material semantics call for it, e.g. Apple's materials for controls and navigation layers above content, used per platform guidance, respecting Reduce Transparency. Apple's HIG explicitly advises against using Liquid Glass in the content layer.

**Replacement strategies.** Solid surfaces with verified contrast; translucency only on layers that genuinely float over content.

## GEN-013: Placeholder or fabricated content presented as real

**Detection.** "Trusted by 10,000+ teams", invented testimonials ("John Doe, CEO"), fake logos, lorem ipsum or "Company Name" in shipped UI, builder badges left in ("Edit with Lovable"), made-up metrics, sample data indistinguishable from production data.

**Why it hurts.** It is dishonest, it can create legal exposure, and it hides layout problems that real content would reveal.

**Legitimate when.** Never presented as real. Clearly marked placeholders shaped like real content are fine during design.

**Replacement strategies.** Ask for real content; use bracketed placeholders ("[Metric from analytics: weekly active teams]"); design with realistic lengths, including long and empty cases.

## GEN-014: Micro-labels and pills everywhere

**Detection.** Tiny uppercase labels, tags, and badges on most elements ("NEW", "PRO", "AI", category chips) that are decorative rather than functional.

**Why it hurts.** Adds a noisy extra tier of type; dilutes the few labels that matter.

**Legitimate when.** Labels encode real state or classification the user acts on (status, plan restriction, unread count).

**Replacement strategies.** Remove labels that carry no decision; express category through grouping or headings.

## GEN-015: Gratuitous motion

**Detection.** Every section fades/slides up on scroll; a spotlight, glow, or border beam that follows the cursor; an auto-scrolling logo marquee with no pause control (WCAG 2.2.2); a pulsing status dot announcing nothing new; a typewriter headline or blinking cursor on static text; bounce or elastic easing on routine UI; hover effects on non-interactive elements; looping background animation; parallax on everything.

**Why it hurts.** Slows reading, distracts, can cause discomfort, and makes the interface feel templated.

**Legitimate when.** Motion explains a change (where something went, what caused what), gives feedback, or is the product (a motion tool, a game). It respects reduced-motion preferences.

**Replacement strategies.** See [motion-design.md](motion-design.md): remove by default, add back motion with a stated job.

## GEN-016: Default AI typeface picks

**Detection.** Inter (or Geist) for every role (display, body, UI, numbers) and nothing else. Or the current "designed" default: Space Grotesk headings with Instrument Serif accents. No one can say why the face was chosen.

**Why it hurts.** These are the generators' defaults, so they read as "no decision made". One neutral face at the same weights flattens hierarchy and voice.

**Legitimate when.** The face belongs to the established brand or design system. Or a dense product UI uses a neutral face on purpose and pairs it with a distinct display or numeric face.

**Replacement strategies.** Choose type from the product's voice and reading conditions ([typography.md](typography.md)); give display, body, and data different roles; use the system font for native apps.

## GEN-017: Accent words in headlines (italic, serif, or a different color)

**Detection.** A headline with one or two words swapped to an italic serif, a gradient, or the accent color ("Build <span class=\"text-primary\">faster</span> together"), often repeated on every section heading. Also: an oversized italic serif display headline used as the default "editorial" look.

**Why it hurts.** The contrast carries no meaning, so it becomes a tic. Repeated, it is a formula like GEN-001.

**Legitimate when.** The type system defines this contrast as a brand device with a meaning (names, quotations, titles of works) and uses it consistently.

**Replacement strategies.** Write a headline that needs no highlighted word; get emphasis from wording, scale, or weight within one family; keep italics for titles, terms, and quotations.

## GEN-018: Colored accent border cards

**Detection.** Cards whose only identity is a thick colored left or top border, or a tinted border (`border-blue-500/30`), with a different arbitrary color per card.

**Why it hurts.** Color implies meaning (status, category) that is not there, and the stripe makes a container even more prominent than its content.

**Legitimate when.** The color encodes state or category the user acts on (error, warning, priority, owner), the meaning is also given in text, and the palette is semantic. Documentation callouts following a defined system.

**Replacement strategies.** Drop the container and group with heading and spacing; show category with a label or grouping; keep color for semantic state.

## GEN-019: Default icon set on every element

**Detection.** An icon, usually from Lucide, beside every heading, button, list item, and stat. Icons picked by keyword (Zap for speed, Shield for security). The icon set is the page's only visual language.

**Why it hurts.** Icons that restate their label add noise, not recognition. The same stroke set on every AI-built page makes it interchangeable.

**Legitimate when.** Icons speed recognition in dense, repeated UI: toolbars, navigation, file types, status. Lucide is a fine library when icons are placed where they earn it.

**Replacement strategies.** Delete icons that only repeat their label; use product imagery, data, or domain-specific illustration; use platform symbols in native apps.

## GEN-020: Untouched component library defaults

**Detection.** shadcn/ui (or any kit) shipped as installed: default neutral palette, default radius, stock Card and Button styling, no project tokens. The page looks like the library's demo.

**Why it hurts.** The library is a starting point, not an identity. Thousands of products share the exact same surface.

**Legitimate when.** Internal tools or prototypes where speed beats identity, stated as such. In an existing project already built on the defaults, follow Rule F: improve gradually, do not rip it out.

**Replacement strategies.** Set project tokens (color, radius, type, spacing) from the art direction before building screens; restyle the primitives that carry identity (buttons, inputs, navigation, headings); keep the library's behavior and accessibility.

## GEN-021: Opacity fade as the only hover state

**Detection.** `hover:opacity-80` (or similar) as the whole interaction design of buttons and links, with no distinct focus, active, or pressed state.

**Why it hurts.** The control gets less visible exactly when the user is about to act, and the missing states make it feel unresponsive.

**Legitimate when.** Image or icon-only controls where dimming is the platform convention, with a separate visible focus state.

**Replacement strategies.** Shift background or text color within the palette; add a pressed state; define hover, focus-visible, active, and disabled together ([component-design.md](component-design.md)).

## GEN-022: Em dashes throughout UI copy

**Detection.** Em dashes in headings, buttons, card descriptions, and microcopy; every sentence built as "X — Y".

**Why it hurts.** It is one of the most recognized marks of generated text, and in short UI strings it splits one idea into two weak ones.

**Legitimate when.** Long-form editorial text following a house style that uses them sparingly. Ranges and empty values in data tables.

**Replacement strategies.** Use a period, colon, comma, or parentheses; split into two short sentences; cut the second clause.

## GEN-023: Generic buzzword copy

**Detection.** "Supercharge", "seamless", "effortless", "unlock", "elevate", "all-in-one", "next-generation", "lightning fast". Copy that could describe any product, with no number, example, or domain noun.

**Why it hurts.** Readers skip it, and it tells them nobody knew what was specific about the product.

**Legitimate when.** Never as a default. A specific, supported claim that happens to use one of these words is fine.

**Replacement strategies.** Say what the product does, for whom, with a concrete domain noun; replace adjectives with a number, example, or screenshot; write the line a customer would repeat.

## GEN-024: Hero metric strip

**Detection.** A row of three or four big numbers with small labels under the hero ("10k+ users", "99.9% uptime", "24/7 support"). Round, unsourced figures chosen to fill the row.

**Why it hurts.** It is one of the most familiar landing-page templates, and unsourced numbers read as filler or as fabrication (GEN-013).

**Legitimate when.** Real, sourced figures that answer a question the visitor has, shown where that question comes up. Dashboards where the numbers are the live data.

**Replacement strategies.** One sourced number next to the claim it proves; a real chart, table, or case study; cut figures nobody would miss.

## GEN-025: Formulaic AI copy constructions

**Detection.** "Not X, but Y" and "It's not just X, it's Y" slogans; fragment triads ("Fast. Simple. Secure."); over-upbeat microcopy with exclamation marks ("Let's go!", "You're all set! 🎉"); rhetorical question headlines ("Ready to transform your workflow?").

**Why it hurts.** These rhythms are recognized as generated text, and turning every point into a tagline means none of them lands.

**Legitimate when.** One deliberate use where the contrast or rhythm carries a real claim.

**Replacement strategies.** Plain declarative sentences with a concrete subject; microcopy that says what happened and what to do next; read it aloud and cut what a person would not say.

## GEN-026: Default warm-editorial palette

**Detection.** Cream or beige background, terracotta, orange, or olive accent, serif display face: the "tasteful" palette generators now reach for instead of purple. The same warmth on unrelated products.

**Why it hurts.** It swaps one default for another. The palette still says nothing about this product.

**Legitimate when.** The palette comes from the brand, the material, or the domain (paper, food, craft) and the art direction says so.

**Replacement strategies.** Derive color from the domain, imagery, and audience; choose one dominant color and one sharp accent with a stated reason.

## GEN-027: Decorative section numbering

**Detection.** Tiny "01 / 02 / 03" or "§ 01" labels, often monospace, beside section headings that have no real order.

**Why it hurts.** Numbers promise a sequence that is not there and add another tier of micro-labels (GEN-014).

**Legitimate when.** The sections are a real ordered sequence: steps, chapters, a procedure.

**Replacement strategies.** Remove the numbers and let headings carry the structure; use a real step indicator where order matters.

## GEN-028: Fake or dead interactions

**Detection.** Buttons and links to `#` or with empty handlers; forms that submit with no success or error feedback; navigation to pages that do not exist.

**Why it hurts.** The interface promises actions it cannot perform. Users lose trust at the first dead click. Rule G treats a design without working states as unfinished.

**Legitimate when.** A clearly labeled prototype in a design review, never shipped.

**Replacement strategies.** Wire the action or remove the control; list unfinished features as proposals in the final report; give every form loading, success, and error states.

## GEN-029: Gratuitous 3D

**Detection.** A distorted sphere, torus knot, glass crystal, or floating icosahedron as the hero, unrelated to the product. A slow 3D loop behind text. A WebGL canvas with no poster, no fallback, and no reduced-motion path. Content that exists only inside the canvas.

**Why it hurts.** It is the 3D version of the purple gradient: impressive for a second, then generic. It costs load time and battery, and can hide content from assistive technology.

**Legitimate when.** The subject is physical or spatial, the data is spatial, the experience is the product, or a mechanism is easier to show than tell, and the scene has a poster fallback, honors reduced motion, and keeps content in HTML. In those cases 3D is encouraged, not merely tolerated: see [3d-and-webgl.md](3d-and-webgl.md).

**Replacement strategies.** Model the actual product or subject; use photography, video, SVG, or CSS 3D when they carry the same message for less; use one strong scene at the key moment instead of 3D in every section.

---

## Other audit rules (index)

These rules are not "AI look" patterns, but they are checked in the same audit. Guidance lives in the linked files.

| ID | Rule | Guidance |
| --- | --- | --- |
| HIE-001 | Unclear focal point | [design-principles.md](design-principles.md) |
| HIE-002 | Weak typographic hierarchy | [typography.md](typography.md) |
| HIE-003 | Poor spacing rhythm | [spacing-and-density.md](spacing-and-density.md) |
| HIE-004 | Inconsistent alignment | [layout-composition.md](layout-composition.md) |
| HIE-005 | Inappropriate density | [spacing-and-density.md](spacing-and-density.md) |
| HIE-006 | Excessive decoration | [color-and-surfaces.md](color-and-surfaces.md) |
| HIE-007 | Lack of compositional intent | [layout-composition.md](layout-composition.md) |
| HIE-008 | Primary and secondary actions not distinguished | [component-design.md](component-design.md) |
| USA-001 | Unclear navigation | [interaction-design.md](interaction-design.md) |
| USA-002 | Ambiguous labels | [interaction-design.md](interaction-design.md) |
| USA-003 | Weak interaction feedback | [interaction-design.md](interaction-design.md) |
| USA-004 | Poor error prevention and recovery | [interaction-design.md](interaction-design.md) |
| USA-005 | Missing empty states | [component-design.md](component-design.md) |
| USA-006 | Inadequate keyboard interaction | [accessibility.md](accessibility.md) |
| USA-007 | Confusing information architecture | [design-principles.md](design-principles.md) |
| A11Y-001 | Insufficient contrast | [accessibility.md](accessibility.md) |
| A11Y-002 | Missing or invisible focus indicators | [accessibility.md](accessibility.md) |
| A11Y-003 | Inaccessible custom controls | [accessibility.md](accessibility.md) |
| A11Y-004 | Poor reading or focus order | [accessibility.md](accessibility.md) |
| A11Y-005 | Inadequate text scaling | [accessibility.md](accessibility.md) |
| A11Y-006 | Missing accessible names | [accessibility.md](accessibility.md) |
| A11Y-007 | Unnecessary motion without reduced-motion support | [motion-design.md](motion-design.md) |
| A11Y-008 | Inadequate touch or pointer targets | [accessibility.md](accessibility.md) |
| TEC-001 | Broken layout | [responsive-design.md](responsive-design.md) |
| TEC-002 | Overflow and long-content failure | [responsive-design.md](responsive-design.md) |
| TEC-003 | Inconsistent responsive behavior | [responsive-design.md](responsive-design.md) |
| TEC-004 | Duplicated styles and magic numbers | [design-systems.md](design-systems.md) |
| TEC-005 | Incorrect component semantics | [component-design.md](component-design.md) |
| TEC-006 | Unnecessary dependencies | [../workflows/audit-existing-code.md](../workflows/audit-existing-code.md) |
| TEC-007 | Runtime errors | [../workflows/implement-interface.md](../workflows/implement-interface.md) |
| TEC-008 | Missing interaction states | [component-design.md](component-design.md) |

## Counterexamples: things that are *not* anti-patterns

- A pricing page with three plan cards. Plans are independent, comparable entities the user selects among. Check instead that the comparison is easy (consider a table below the cards).
- A Kanban board of bordered cards. Each card is a draggable entity with its own data.
- A settings form with bordered inputs. Fields need visible edges.
- A dark interface for a video editor or code tool, where it reduces glare around content.
- A centered, symmetrical sign-in screen. One task, one focal point; symmetry fits.
- A dashboard of widgets, each showing different live metrics with its own controls.
