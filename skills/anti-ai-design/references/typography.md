# Typography

Purpose: typography is the primary hierarchy tool and the cheapest source of identity. This file covers roles, scales, readability, platform text systems, and typographic expression.

## Roles before fonts

Define the roles the interface needs, then choose families:

| Role | Job | Typical requirements |
| --- | --- | --- |
| Display | Statements, page titles, marketing headlines | Character at large sizes; tight spacing tolerance |
| Text | Paragraphs, articles, descriptions | Comfortable at 16-20px web; open apertures; good italics |
| UI | Labels, buttons, menus, form text | Legible at small sizes; clear numerals; compact |
| Data | Tables, metrics, code | Tabular (fixed-width) figures; possibly monospaced |

One family can fill several roles. Two families is usually plenty; three needs a reason. On native platforms, the system font is usually the right UI and text choice (see platform files) because it integrates with Dynamic Type, font scaling, and system rendering.

## Scale

- Use a defined scale (a ratio such as 1.2-1.333 for UI-heavy products, larger ratios for expressive editorial pages) and snap to it. Fewer distinct sizes produce stronger hierarchy (HIE-002).
- Adjacent levels must be clearly different. If two levels are close in size, differentiate them by weight or case, or merge them.
- Pair each size with a line height: tighter for display (around 1.0-1.2), looser for text (around 1.4-1.6), compact for UI rows.
- Define responsive behavior: display sizes can scale with viewport (e.g. CSS `clamp()`), while text and UI sizes should remain stable and respect user settings.

## Readability

- **Measure**: body text lines of roughly 45-75 characters read comfortably. Constrain text width independently of the layout column.
- **Contrast**: meet WCAG text contrast (see [accessibility.md](accessibility.md)). Light gray body text on white is a common failure.
- **Alignment**: start-aligned for anything longer than two lines.
- **Case**: all-caps reduces reading speed; reserve it for short labels, with added letter spacing.
- **Numerals**: use tabular figures in tables and changing numbers so columns align and values don't jitter.
- **Hyphenation and wrapping**: allow wrapping of long words and URLs (`overflow-wrap: anywhere` on user content); consider `text-wrap: balance` for short headings where supported.

## Scaling and user preferences

- Web: size text in `rem` so browser font-size settings apply; ensure text can be resized to 200% without loss (WCAG 1.4.4) and that layouts reflow (1.4.10).
- iOS/iPadOS: use text styles that respond to Dynamic Type; test at the largest accessibility sizes.
- Android: use `sp` for text so font scaling applies.
- macOS: the system respects user text-size settings in some contexts; use system text styles where available.
- Never set fixed heights on containers that hold text.

## Expression

Typographic identity comes from decisions, not from a trendy font:

- **Scale contrast**: one very large statement against small, precise text.
- **Weight strategy**: a single weight at display sizes can be more distinctive than bold everything.
- **Serif/sans pairing** with a clear division of roles.
- **Typeset detail**: proper quotes and dashes, optical alignment of punctuation, consistent numeral styles.
- **Text as image**: a typographic composition can replace an illustration entirely.

## Anti-patterns in typography

- The same oversized, tightly tracked, centered bold sans headline on every project (part of GEN-008).
- An eyebrow label above every heading (GEN-001, GEN-014).
- Gradient-filled headline text (GEN-005), which also complicates contrast.
- Five or more sizes within one card.
- Body text below comfortable size to "look elegant".
- Mixing three or more families without roles.

## Licensing note

Check font licenses before recommending a font for production: web embedding, app embedding, and desktop use can be licensed separately. Prefer system fonts, the project's existing fonts, or fonts whose open licenses (e.g. SIL Open Font License) permit the intended use.
