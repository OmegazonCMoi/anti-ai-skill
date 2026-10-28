# 3D and WebGL (Three.js)

Purpose: use real-time 3D when it makes the product or the idea easier to understand or more memorable, and build it so it stays fast, accessible, and honest. Three.js is the default library on the web; React Three Fiber (`@react-three/fiber`, with `@react-three/drei`) is the idiomatic way to use it in a React project.

3D is an art-direction tool like typography or photography. It is not a default, and it is not banned. A spinning abstract blob is GEN-029. A product you can turn in your hand is often the best page on the site.

## When 3D earns its place

Use 3D when at least one is true, and write the reason down:

| Reason | Examples |
| --- | --- |
| **The subject is physical or spatial** | Hardware, furniture, shoes, vehicles, buildings, packaging; let people rotate, open, configure it |
| **The data is spatial** | Maps and terrain, molecules, networks, point clouds, architecture, astronomy |
| **The experience is the product** | Games, creative tools, music visualizers, interactive art, event or launch microsites |
| **A mechanism is easier to show than to tell** | Exploded views, how parts fit, flows through a system, before/after transformations |
| **The brand concept is spatial or material** | A signature scene built from the product's real material, object, or metaphor, carried through the site |

Skip 3D when:
- It would decorate a SaaS app, dashboard, admin, form, or documentation. Users there need speed and density.
- The 3D object has no relation to the product (a generic glass torus, an iridescent sphere, a floating icosahedron).
- A photo, video, SVG, or CSS 3D transform says the same thing for a fraction of the cost.
- The existing project has no 3D and the request is a small change (Rule F).

When the context allows (marketing site, portfolio, launch page, product showcase, brand experience, game) and one of the reasons above holds, **propose 3D actively** instead of falling back to a flat hero. Say what it shows and what it costs.

## Strong patterns

- **Product as hero**: a real glTF model of the product, lit like a studio shot, that the visitor can rotate. Copy sits beside it, not on top of it.
- **Configurator**: materials, colors, options applied live to the model; the price and spec update with it. The 3D is the form.
- **Scroll-told object**: the camera moves around one object as the visitor scrolls through sections (exploded view, assembly, inside view). Scroll drives the scene; it never hijacks the scroll.
- **Spatial data view**: a globe, terrain, or graph the user can navigate, with the same data available as a table or list.
- **Material signature**: a shader or scene derived from the product's material (paper fibers for a print shop, water caustics for a pool builder, sound waves for an audio tool) used once, at the key moment.
- **Playful object**: a small toy-like interaction (drag, throw, assemble) when play fits the brand.

One strong scene beats a scene in every section.

## Implementation

**Stack.** Check the project first. React project → React Three Fiber + drei. Otherwise plain `three`. Do not add a second 3D library when one exists. Pin the version the project uses and read its docs for that version; the Three.js API changes between releases.

**Assets.**
- glTF/GLB only, compressed (Draco or Meshopt for geometry, KTX2 for textures). Bake lighting into textures when the scene is static.
- Budget per scene, starting points: under ~2-3 MB of compressed assets for a hero, triangle count in the low hundreds of thousands at most, a handful of draw calls. Measure on a mid-range phone, not a desktop GPU.
- Never ship a placeholder primitive (cube, sphere, torus knot) as if it were the design. If the real model does not exist, say what is needed.

**Loading.**
- Render a static poster image (a render of the same scene) first; it is the LCP element and the fallback. Load Three.js with a dynamic import after first paint or when the canvas nears the viewport.
- Show load progress only if loading is long enough to notice; never block the page's text on the scene.

**Runtime.**
- Clamp pixel ratio: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- Render on demand when nothing moves (`frameloop="demand"` in R3F, or call `render()` on change in plain three).
- Pause the loop when the canvas is off-screen (`IntersectionObserver`) or the tab is hidden (`visibilitychange`).
- Adapt quality on weak devices (drei `PerformanceMonitor`, lower DPR, fewer effects); fall back to the poster when WebGL is unavailable or the context is lost.
- Dispose geometries, materials, textures, and the renderer on unmount.
- Post-processing (bloom, depth of field, film grain) only when it carries the art direction; each pass costs every frame.

## Accessibility

- Everything essential lives in HTML: headings, copy, prices, specs, calls to action. The canvas adds; it never holds the only copy of information.
- Give the canvas an accessible name (`role="img"` and `aria-label` describing what it shows) or hide it (`aria-hidden="true"`) when it is purely illustrative and the content is in the page.
- `prefers-reduced-motion: reduce` → no autorotate, no camera flights, no scroll-driven movement; show the static poster or a still frame (A11Y-007).
- Interactive scenes need keyboard controls (arrow keys to rotate, +/- to zoom, visible focus on the canvas) and a short visible hint.
- On touch screens, do not trap page scroll: disable zoom on the canvas, or require a tap to activate interaction.
- Text inside the scene must meet contrast against every background it can appear over, or be duplicated in HTML.

## Failure modes

- **Decorative blob hero** (GEN-029): a distorted sphere, torus, or crystal with no relation to the product.
- **Scene as wallpaper**: a slow 3D loop behind text, lowering contrast and burning battery.
- **Desktop-only**: smooth on a laptop GPU, 15 fps and hot on a phone.
- **Blank canvas**: no poster, no fallback; a white rectangle on low-end devices or when WebGL fails.
- **Scroll-jacking**: the scene captures scroll and the visitor cannot leave it.
- **Content locked in the canvas**: invisible to search, screen readers, translation, and copy-paste.
- **3D everywhere**: a scene in every section, so none of them matters.

## Delivery checklist

- [ ] The reason for 3D is written down and ties to the product.
- [ ] Real model or a clearly stated asset request; no placeholder primitives shipped.
- [ ] Poster image renders first; WebGL failure falls back to it.
- [ ] Measured on a mid-range phone; loop paused off-screen and in hidden tabs.
- [ ] Reduced motion honored; keyboard and touch behavior checked.
- [ ] All essential content exists in HTML.
