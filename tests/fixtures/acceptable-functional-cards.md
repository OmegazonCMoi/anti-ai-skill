# Fixture: legitimate functional cards

## Context

Step 2 of creating a new project in a documentation tool: the user chooses a starting template. Each template is an independent entity with its own name, page count, last-updated date, and preview. Exactly one can be selected. This screen legitimately uses cards.

## Markup

```html
<form>
  <fieldset>
    <legend>Choose a template</legend>
    <div class="template-grid" role="radiogroup">
      <label class="card">
        <input type="radio" name="template" value="api-reference" checked>
        <img src="/previews/api-reference.png" alt="Preview: endpoint list with request and response panels" width="320" height="200">
        <span class="card-title">API reference</span>
        <span class="card-meta">14 pages · updated 3 days ago</span>
      </label>
      <label class="card">
        <input type="radio" name="template" value="product-handbook">
        <img src="/previews/product-handbook.png" alt="Preview: handbook with chapters sidebar" width="320" height="200">
        <span class="card-title">Product handbook</span>
        <span class="card-meta">32 pages · updated 2 weeks ago</span>
      </label>
      <label class="card">
        <input type="radio" name="template" value="changelog">
        <img src="/previews/changelog.png" alt="Preview: dated release entries" width="320" height="200">
        <span class="card-title">Changelog</span>
        <span class="card-meta">1 page · updated yesterday</span>
      </label>
      <label class="card">
        <input type="radio" name="template" value="blank">
        <img src="/previews/blank.png" alt="Preview: empty page" width="320" height="200">
        <span class="card-title">Blank</span>
        <span class="card-meta">Start from scratch</span>
      </label>
    </div>
  </fieldset>
  <button type="submit">Create project</button>
</form>
```

## Expected audit outcome

The card signal fires (four `card` elements) but an exception signal (radio inputs, `role="radiogroup"`) is present, so the scanner must report **needs-judgment**, not a plain candidate. No surface or decoration signals fire.

```json
{
  "candidate": [],
  "absent": ["GEN-001", "GEN-003", "GEN-004", "GEN-005", "GEN-009", "GEN-011", "GEN-012", "GEN-013"],
  "needsJudgment": ["GEN-002"]
}
```

```json
{ "expectedFindings": [], "justifiedPatterns": ["GEN-002"] }
```

Expected reasoning:

- GEN-002 is **justified**: the cards are independent, selectable entities with distinct real data (previews, page counts, dates), implemented as a native radio group inside a fieldset with a legend. This meets the rule's "legitimate when" conditions.
- A reviewer may suggest refinements without calling the pattern a defect: a clearly visible selected state that does not rely on color alone; focus-visible styling on the label when its radio is focused; ensure the whole card is a comfortable target.
- A reviewer must **not** recommend replacing these cards with a list or prose simply because they are cards.
