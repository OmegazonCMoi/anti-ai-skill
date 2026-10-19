# Fixture: over-containerized dashboard

## Context

An internal support dashboard for a team triaging customer tickets. Primary task: see which tickets breach SLA soon and assign them. Users work in it all day on desktop.

## Markup

```html
<div class="min-h-screen bg-gray-100 p-6">
  <aside class="fixed left-6 top-6 bottom-6 w-60 rounded-2xl border bg-white p-4 shadow-xl">
    <nav class="rounded-xl border bg-gray-50 p-2 shadow-sm">…</nav>
  </aside>
  <main class="ml-72 space-y-6">
    <header class="rounded-2xl border bg-white p-4 shadow-lg"><h1>Dashboard</h1></header>
    <div class="grid grid-cols-4 gap-6">
      <div class="rounded-2xl border bg-white p-6 shadow-md"><div class="rounded-xl border bg-gray-50 p-4 shadow-sm"><p>Open tickets</p><p class="text-3xl">128</p></div></div>
      <div class="rounded-2xl border bg-white p-6 shadow-md"><div class="rounded-xl border bg-gray-50 p-4 shadow-sm"><p>Breaching in 1h</p><p class="text-3xl">9</p></div></div>
      <div class="rounded-2xl border bg-white p-6 shadow-md"><div class="rounded-xl border bg-gray-50 p-4 shadow-sm"><p>Avg first response</p><p class="text-3xl">42m</p></div></div>
      <div class="rounded-2xl border bg-white p-6 shadow-md"><div class="rounded-xl border bg-gray-50 p-4 shadow-sm"><p>CSAT</p><p class="text-3xl">4.6</p></div></div>
    </div>
    <section class="rounded-2xl border bg-white p-6 shadow-lg">
      <div class="rounded-xl border bg-gray-50 p-4 shadow-sm">
        <h2>Recent tickets</h2>
        <div class="space-y-3">
          <div class="rounded-xl border bg-white p-4 shadow-sm">#4812 · Refund not received · 52m to breach</div>
          <div class="rounded-xl border bg-white p-4 shadow-sm">#4809 · Cannot log in · 1h 10m to breach</div>
          <div class="rounded-xl border bg-white p-4 shadow-sm">#4801 · Invoice wrong · 3h to breach</div>
        </div>
      </div>
    </section>
  </main>
</div>
```

## Expected audit outcome

```json
{
  "candidate": ["GEN-003", "GEN-004"],
  "absent": ["GEN-005", "GEN-011", "GEN-012"],
  "needsJudgment": []
}
```

```json
{ "expectedFindings": ["GEN-003", "GEN-004", "HIE-005", "TEC-005", "HIE-001"] }
```

Expected reasoning:

- Containers are nested three levels deep (page → panel → inner panel → row card), each with border, background, radius, and shadow (GEN-003, GEN-004). The sidebar and header are floating islands.
- Shadows sit on static content that never moves above anything.
- The primary task (tickets about to breach SLA) is buried below four equal KPI tiles; "Breaching in 1h" has the same weight as CSAT (HIE-001).
- Tickets are rendered as stacked cards with three per screen instead of a dense, sortable table (HIE-005, TEC-005: tabular data without table semantics).
- Proposed alternative: flat app shell (sidebar separated by a background shift, no floating), a single compact status line or small stat row with "Breaching in 1h" emphasized, and a full-width table of tickets sorted by time to breach, with assignee column, row selection, and bulk assign. Elevation reserved for menus and dialogs.
- What not to propose: removing all structure. The KPI row and the table are legitimate; the defect is redundant separation, nesting, and misplaced priority.
