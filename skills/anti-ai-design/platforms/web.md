# Web

Purpose: guidance for marketing sites, landing pages, content sites, SaaS applications, and dashboards on the web. Load with the references named in SKILL.md section 12.

## Identify the kind of web surface

| Surface | Primary job | Typical structure | Typical trap |
| --- | --- | --- | --- |
| Marketing site | Explain value, earn trust, convert | Narrative sequence answering visitor questions | Stock section sequence (GEN-010), generic hero |
| Product landing page | One product/feature, one action | Demonstration + evidence + action | Feature card grid (GEN-002) |
| Content site / docs | Find and read | Navigation + readable article layout + search | Marketing chrome around reading content |
| SaaS application | Do work repeatedly | App shell: navigation, workspace, contextual panels | Marketing aesthetics inside the app; island mode |
| Data dashboard | Monitor and decide | Prioritized metrics + drill-down + tables | KPI cards that hide the operational detail |

## Marketing and landing pages

Do not assume every site needs a hero, logo strip, feature cards, testimonials, pricing cards, and a repeated CTA band. Start from the visitor's questions, in the order they arise:

1. What is this, and is it for me? (first view)
2. How does it work / what does it look like? (demonstration)
3. Why should I believe it? (evidence: real customers, real numbers with sources, security facts, docs)
4. What does it cost / what do I do next? (pricing, sign-up, contact)

Build one section per question that has real material. Compose each from its content (see [../references/layout-composition.md](../references/layout-composition.md)).

First-view options beyond the formula (pick by content):
- The product itself, large and real, with a short statement.
- A working mini-tool (search, calculator, playground) when the product can be tried instantly.
- A typographic statement alone, when the message is strong and the product is not visual.
- An editorial image with a headline set into the composition, when photography carries the brand.

## Content sites and documentation

- Reading comfort first: measure, line height, contrast, heading structure that matches the document outline.
- Navigation: persistent sidebar or table of contents for long docs; breadcrumbs for deep hierarchies; in-page anchors.
- Search is primary navigation for docs; make it reachable by keyboard (`/` or `Ctrl/Cmd+K` are common conventions; don't conflict with browser shortcuts).
- Code blocks: copy button, language label, horizontal scroll inside the block, not the page.

## SaaS applications

- An app shell (navigation + workspace + optional detail/inspector) with the workspace dominant.
- Flatten containers: regions separated by background or a divider; content in lists and tables; cards only for genuine entities (GEN-003).
- URLs for every meaningful view and for shareable state (filters, selected item).
- Keyboard support for frequent actions; command palette for large command sets.
- Design the states: first-run empty, loading, no results, error, permission denied, offline/stale.

## Dashboards

- Start with the decisions the dashboard supports ("Is anything on fire? Which region is behind target?").
- Prioritize: one or two key indicators prominent; supporting metrics compact; the actionable list/table directly reachable, often on the same screen.
- Every number has context: comparison period, target, unit, freshness ("Updated 2 min ago").
- Widgets as cards are legitimate when each is an independent view with its own data and controls; avoid uniform tiles when importance differs.
- Charts: label directly where possible, avoid decorative chart types, don't rely on color alone.

## Semantic HTML

Use the platform's semantics; they bring keyboard behavior and accessibility for free:

- Landmarks: `header`, `nav`, `main`, `aside`, `footer`; one `main` per page.
- Headings in order (`h1` once per page, no skipping levels for size; style with CSS).
- `button` for actions, `a href` for navigation, `form` with `label`/`fieldset`/`legend`.
- `table` with `th`, `scope`, and `caption` for tabular data.
- `dialog` element or a well-tested dialog primitive with focus management.
- `ul`/`ol` for lists, including navigation lists.

## Forms and validation

Follow [../references/interaction-design.md](../references/interaction-design.md). Web specifics: correct `type` and `autocomplete` attributes, `inputmode` for numeric input, native validation as a baseline with accessible custom messages, `aria-describedby` linking errors to fields, focus the first invalid field (or an error summary) on submit.

## Loading, empty, error, success

- Loading: skeletons that match final layout; reserve image dimensions; avoid spinners for short waits.
- Empty: explain, then offer the first action.
- Error: inline for field errors; a region-level message for failed data loads with retry; a page-level state for fatal errors.
- Success: confirm briefly; move the user to the result.

## Performance and layout stability

- Set `width`/`height` or `aspect-ratio` on media; avoid late-inserted banners pushing content (CLS).
- Load fonts deliberately (subset, `font-display`, limit families/weights).
- Avoid heavy effects (large blurs, `backdrop-filter` everywhere, scroll-linked JS) that cost frame rate.
- Ship only the JS the page needs; marketing pages should work without client-side frameworks when possible.

## Component architecture and maintainability

- Reuse the project's components and tokens; build page sections from them.
- Section components accept content, not styling flags ("variant=gradient").
- Keep layout responsibilities in parents; avoid external margins on components.
- In Tailwind projects: use the theme scale, extract repeated class combinations into components, avoid arbitrary values except for documented exceptions.
- In shadcn/ui projects: components are in your repository; customize them to the art direction rather than shipping defaults unchanged.

## Web-specific audit points

- 320 px reflow, 200% text, keyboard-only pass, focus visible and unobscured by sticky headers (WCAG 2.4.11).
- `prefers-reduced-motion`, `prefers-color-scheme`, `forced-colors` handled.
- No horizontal page scroll; tables scroll within their region.
- Console free of errors on load and on main interactions.
