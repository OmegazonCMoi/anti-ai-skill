# Color and surfaces

Purpose: palette logic, contrast, and the disciplined use of surfaces, borders, shadows, and gradients. Surfaces are where "island mode" (GEN-003, GEN-004) is born; this file defines when containment is earned.

## Palette structure

Build color in layers, each with a job:

1. **Neutrals**: background, surfaces, text, borders. Most of any interface. Choose a temperature (warm, cool, neutral) deliberately; pure gray is a choice too.
2. **Brand / accent**: identity and primary action. Usually one hue; used sparingly so it keeps meaning.
3. **Semantic**: success, warning, danger, info. Never reuse the brand hue for danger. Never rely on color alone to convey state; pair with text or icon.
4. **Data palette** (if charts): ordered for sequential data, distinct for categorical, diverging around a meaningful midpoint. Test for color-vision deficiencies.

Define colors as tokens by **role** (`text-primary`, `surface-raised`, `action-primary`, `status-danger`), not by appearance (`blue-500`), so light and dark themes map cleanly (see [design-systems.md](design-systems.md)).

## Where palettes come from

Derive from the product context, not from a gradient generator:

- The brand's existing colors (and their real usage, not only the logo).
- The domain: materials, places, objects the product deals with (soil and paper for an agriculture tool; signal colors for a monitoring tool).
- Photography or product content that will dominate the view.
- Constraints: printing, outdoor use (high glare), long sessions (lower chroma backgrounds), cultural meanings in the target market.

## Contrast

- Text: at least 4.5:1, or 3:1 for large text (WCAG 2.2 SC 1.4.3, AA).
- Non-text UI components and meaningful graphics: at least 3:1 against adjacent colors (SC 1.4.11, AA). This includes input borders, focus indicators, chart lines that carry meaning, and icon-only buttons.
- Check contrast in every theme and state (hover, disabled excluded by WCAG but still should be legible enough to understand), and over images or gradients at their worst point.
- Apple's HIG publishes contrast guidance in its accessibility section; Android's accessibility guidance mirrors WCAG ratios. See [accessibility.md](accessibility.md).

## Light and dark

- Dark mode is a remapping of roles, not an inversion. Surfaces get lighter as they rise in dark themes; saturated colors usually need lower saturation or adjusted lightness on dark backgrounds to avoid vibration.
- Respect the system preference by default on platforms that have one. Apple's HIG advises against app-specific appearance settings in most cases.
- Test both themes with increased-contrast and reduced-transparency settings where the platform offers them.

## Surfaces: when containment is earned

A surface (a region with its own background, border, or elevation) is justified when it marks one of:

| Reason | Example | Typical treatment |
| --- | --- | --- |
| A layer above content | Menu, popover, dialog, toast | Elevation (shadow) + surface color |
| An interactive object | Draggable card, selectable option | Boundary + clear selected state |
| An input | Text field, select | Visible edge with 3:1 contrast |
| An independent region | Scrollable panel, sidebar, inspector | Background shift or single divider |
| A distinct document or entity | Email in a thread, item in a catalog | Light boundary or spacing |

If none applies, use **spacing and alignment** instead of a container.

### One device per level

Choose one primary separation device per hierarchy level and keep it consistent:

- Siblings in a group → spacing.
- Groups in a region → larger spacing or a heading.
- Regions in a screen → background shift *or* a hairline divider (not both).
- Layers → elevation.

Doubling devices (border + shadow + background + radius on every card) is noise.

### Shadows

- A shadow says "this is above that". Use it for things that are above: overlays, dragged items, sticky headers when content scrolls under them.
- Keep a small elevation scale (e.g. 2-3 levels) and reuse it.
- On dark backgrounds shadows are weak; use surface lightness to convey elevation.

### Borders

- Necessary on inputs, focus rings, and tables where scanning across rows needs guides.
- Prefer one hairline between regions over full outlines around each child.
- Borders that only duplicate spacing can be deleted.

## Gradients

Use a gradient when it carries meaning (a scale, a time progression, a material's light) or is part of an established brand. Otherwise it is decoration and a contrast risk (GEN-005). If used behind text, verify contrast at the lowest-contrast point.

## Translucency and materials

Translucent materials are a platform feature with specific semantics. Apple's current HIG describes Liquid Glass as a layer for controls and navigation floating above content, says not to use it in the content layer, and advises using it sparingly; standard materials (blur, vibrancy) are for differentiation within the content layer. On the web, `backdrop-filter` has a rendering cost and unpredictable contrast. Decorative frosted cards are GEN-012.

## Counterexamples

- A banking app that uses a full red background for a fraud alert: a surface earned by urgency.
- A photo gallery with images edge to edge and no containers: the images are the structure.
- A form with clearly bordered fields and no other boxes: borders where they function, none elsewhere.
