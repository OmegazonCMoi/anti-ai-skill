# Enterprise and business interfaces

Purpose: guidance for operational tools, admin panels, back-office systems, CRMs, ERPs, analytics, and internal tools, where users work for hours, efficiency is the product, and errors are expensive.

Core stance: **don't make enterprise interfaces artificially spacious at the expense of productivity**, and don't assume every business interface should be a grid of cards. Distinctiveness here comes from clarity, speed, and fit to the workflow, not decoration.

## Understand the work

- Who are the roles (operator, approver, admin, auditor), how often do they use it, under what time pressure?
- What are the top 3-5 tasks by frequency and by risk?
- What does a "unit of work" look like (a ticket, an order, an invoice, a case)? Design around its lifecycle and states.
- What existing tools or spreadsheets do people use? Their columns and shortcuts are evidence of real needs.

## Information architecture and density

- Navigation by work area and object type; keep the hierarchy shallow; show where the user is.
- High density is a feature: compact rows, many columns, multiple panes. Reduce padding before reducing type size; use alignment rather than boxes (see [../references/spacing-and-density.md](../references/spacing-and-density.md)).
- Offer density modes when user populations differ.
- Progressive disclosure through detail panes and expandable rows, not by removing data from the default view.

## Complex tables

Tables are usually the primary surface. Get them right:

- Semantic table markup (or a grid pattern with full keyboard support when cells are interactive).
- Sticky header and first column for wide data; column resizing, reordering, and visibility settings when users differ.
- Right-align numbers, tabular figures, consistent units and precision; dates in an unambiguous format.
- Sorting with a visible indicator; multi-sort when needed.
- Row selection with checkboxes, shift-click range selection, "select all matching" vs "select page" distinction.
- Inline actions on hover/focus *and* via a row menu or keyboard (hover-only actions fail on touch and for keyboard users).
- Truncation with access to full values; wrapping option for long text columns.
- Pagination or virtualization with a visible total; preserve scroll and selection on return.
- Empty, loading (skeleton rows), partial, and error states inside the table region.

## Search, filtering, and sorting

- Global search for objects by ID/name, reachable by keyboard.
- Filters visible as chips/tokens with clear removal; saved views; filter state in the URL for sharing.
- Show the result count and active filters; "no results" states show how to broaden.
- Faceted counts when they help decisions.

## Bulk actions

- Selection-aware action bar appearing with the selection, showing count.
- Preview the effect of bulk changes ("Change status of 132 orders to Shipped"); confirm or provide undo proportionate to reversibility.
- Long-running bulk operations run in the background with progress and a results summary (successes, failures with reasons, retry failed).

## Data entry

- Keyboard-efficient forms: logical tab order, Enter to submit where safe, sensible defaults, autocomplete for reference data, paste support for lists.
- Inline validation with specific messages; preserve input on errors.
- Drafts and autosave for long forms; warn on navigating away with unsaved changes.
- Avoid redundant entry (WCAG 3.3.7): prefill known data.

## Permissions and roles

- Show what the user can't do and why, when it helps ("Requires Approver role"), instead of silently hiding features users expect.
- Disabled actions explain the reason; read-only views are clearly read-only.
- Admin screens make the impact of permission changes visible.

## Auditability

- Activity history on objects: who changed what, when, from what to what.
- Timestamps with time zones; actors named.
- Exportable logs where compliance requires it.
- Destructive actions recorded and, where possible, reversible (soft delete, restore).

## Error prevention

- Constrain inputs; validate early; confirm only high-impact irreversible actions and name the object and consequence.
- Make dangerous actions visually distinct and spatially separate from frequent safe actions.
- Guard against double submission; idempotent retries.
- Clear concurrency handling: "This record was updated by Dana 2 minutes ago. Review changes."

## Empty and exceptional states

- First-use empty states explain setup steps.
- Permission-denied, not-found, archived, locked-by-another-user, and stale-data states are designed, not raw errors.

## Workflow efficiency and keyboard

- Shortcuts for frequent actions (next/previous record, assign, approve, search), discoverable via tooltips, menus, or a command palette.
- Queue-based flows: after completing one item, go to the next.
- Remember user preferences (columns, filters, density).

## Long-running operations

- Show progress, estimated time when known, and allow continued work.
- Notify on completion; keep a jobs/history view with outcomes.
- Make cancellation possible and its consequences clear.

## Dashboards in business tools

- Answer specific operational questions; link every metric to the underlying records.
- Don't let a row of large KPI cards push the actionable list below the fold.

## Anti-patterns

- Cards for rows of data; tables reinvented as `div` grids without keyboard support.
- Marketing-style spacing in operational screens.
- Hover-only row actions.
- Modals for every edit, losing context.
- Hiding columns to "clean up" the view without letting users restore them.
- Decorative charts with no actionable link to records.
