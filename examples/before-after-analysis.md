# Example: before/after analysis

A code-level redesign of the features section from the [generic feature grid fixture](../tests/fixtures/generic-feature-grid.md), following [improve-existing-interface](../skills/anti-ai-design/workflows/improve-existing-interface.md). Product: a **hypothetical** field-service scheduling tool for HVAC companies whose differentiator is route- and skill-aware assignment.

## Before

```html
<section class="features">
  <h2>Features</h2>
  <div class="grid">
    <article class="card"><svg class="icon icon-bolt"></svg><h3>Smart scheduling</h3><p>Schedule jobs in seconds.</p></article>
    <article class="card"><svg class="icon icon-map"></svg><h3>Route optimization</h3><p>Save time on the road.</p></article>
    <!-- four more equal cards -->
  </div>
</section>
```

**Diagnosis** (see [anti-patterns](../skills/anti-ai-design/references/anti-patterns.md)):

- GEN-002: six equal cards for capabilities of one product; the differentiator has the same weight as "Integrations".
- HIE-001: no focal point.
- Copy is generic; the substitution test fails (any scheduling tool could use it unchanged).

## What was preserved

- The section's `id` used by the header's in-page navigation (`#features`).
- The existing type scale and color tokens.
- The capabilities themselves: nothing was removed from the product story; they were re-ranked.

## After

```html
<section id="features" aria-labelledby="assign-heading" class="assign">
  <div class="assign__copy">
    <h2 id="assign-heading">The right technician, chosen for you</h2>
    <p>Each new job is matched on distance, certification, and the parts already on the van. Dispatchers confirm with one click or pick someone else.</p>
  </div>

  <figure class="assign__demo">
    <img src="/product/assign-panel.png" width="1200" height="760"
         alt="Assignment panel for job 2231, furnace not igniting: Sam R. suggested, 4 km away, gas-certified, igniter in van stock; two alternatives listed below with their distances.">
    <figcaption>Job 2231: the suggestion and why it was chosen.</figcaption>
  </figure>

  <ol class="assign__steps">
    <li><strong>Job arrives</strong> from your booking form or phone log.</li>
    <li><strong>The app suggests a technician</strong> and shows the reasons.</li>
    <li><strong>Dispatcher confirms</strong>; the technician's route updates.</li>
  </ol>

  <h3 class="also__heading">Also included</h3>
  <ul class="also">
    <li><a href="/features/mobile">Technician mobile app</a>: job details and sign-off offline</li>
    <li><a href="/features/reports">Reports</a>: first-time fix rate by technician and job type</li>
    <li><a href="/integrations">Integrations</a>: QuickBooks, Xero, Google Calendar</li>
  </ul>
</section>
```

```css
.assign {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--space-6) var(--space-5);
}
.assign__copy  { grid-column: 1 / span 4; }
.assign__demo  { grid-column: 5 / span 8; margin: 0; }
.assign__steps { grid-column: 1 / span 4; }
.also__heading, .also { grid-column: 5 / span 8; }
.also { columns: 2; column-gap: var(--space-6); }

@media (max-width: 48rem) {
  .assign > * { grid-column: 1 / -1; }
  .also { columns: 1; }
}
```

## Why this is better

| Decision | Reason | Trade-off |
| --- | --- | --- |
| One large demonstration instead of six cards | The differentiator gets the space; the screenshot proves the claim | Requires a real product screenshot (flagged to the user as needed content) |
| Ordered list for the flow | The content is a sequence | Less "visual" than icons; more informative |
| Secondary capabilities as a linked list | They're table stakes; links lead to detail | Less prominent, which is intended |
| No containers | Grouping by grid placement and spacing; the image provides the visual anchor | — |
| Descriptive `alt` text | The screenshot carries the argument; screen-reader users need the same information | Longer alt text |

## Verification reported

In the hypothetical project this would list the commands actually run (type-check, tests, build), the widths inspected, and a keyboard pass. In this example nothing was run, so nothing is claimed.
