# Fixture: generic feature grid

## Context

A "Features" section for a field-service scheduling product used by HVAC companies. The product's documented differentiator (from the brief) is route-aware scheduling: technicians are assigned based on location, skills, and parts on the van. The section was generated as six equal cards.

## Markup

```html
<section class="features">
  <h2>Features</h2>
  <div class="grid">
    <article class="card"><svg aria-hidden="true" class="icon icon-bolt"></svg><h3>Smart scheduling</h3><p>Schedule jobs in seconds.</p></article>
    <article class="card"><svg aria-hidden="true" class="icon icon-map"></svg><h3>Route optimization</h3><p>Save time on the road.</p></article>
    <article class="card"><svg aria-hidden="true" class="icon icon-users"></svg><h3>Team management</h3><p>Keep your team in sync.</p></article>
    <article class="card"><svg aria-hidden="true" class="icon icon-chart"></svg><h3>Reporting</h3><p>Track what matters.</p></article>
    <article class="card"><svg aria-hidden="true" class="icon icon-phone"></svg><h3>Mobile app</h3><p>Work from anywhere.</p></article>
    <article class="card"><svg aria-hidden="true" class="icon icon-plug"></svg><h3>Integrations</h3><p>Connect your tools.</p></article>
  </div>
</section>
```

## Expected audit outcome

```json
{
  "candidate": ["GEN-002"],
  "absent": ["GEN-001", "GEN-003", "GEN-004", "GEN-005", "GEN-011", "GEN-012"],
  "needsJudgment": []
}
```

```json
{ "expectedFindings": ["GEN-002", "HIE-001"] }
```

Expected reasoning:

- Six cards with icon, title, and one sentence, all equal in size and treatment (GEN-002, High). They are capabilities of one product, not independent entities the user selects among.
- The differentiator ("route optimization" plus skills and parts matching) gets the same weight as "Integrations" (HIE-001: no focal point).
- Descriptions are generic and could belong to any scheduling product (substitution test fails).
- Content-driven alternatives a reviewer should propose (choose by content, not all at once):
  - A large annotated map/schedule view showing one day's assignments with callouts explaining why each technician got each job.
  - A short sequence: job comes in → system proposes technician (with reasons: 4 km away, certified, has the part) → dispatcher confirms.
  - The remaining capabilities as a compact two-column list with links (mobile app, reporting, integrations), or removed if they are table stakes.
- The reviewer should *not* recommend simply restyling the cards (new colors, removing icons); the problem is structural.
