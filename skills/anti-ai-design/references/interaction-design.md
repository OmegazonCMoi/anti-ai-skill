# Interaction design

Purpose: feedback, affordances, navigation, input, and error handling: what makes an interface *work*, beyond how it looks.

## Affordance and signifiers

- Interactive elements must look interactive and static elements must not. Hover effects on non-interactive cards (GEN-015) teach users wrong things.
- Links look like links in running text (underline or equivalent distinct treatment, not color alone).
- Drag handles, resize edges, and swipe actions need visible cues or an alternative path. Gesture-only actions are undiscoverable (and WCAG 2.5.7 requires a single-pointer alternative to dragging).

## Feedback (USA-003)

Every action gets a response proportional to its significance and latency:

| Latency | Feedback |
| --- | --- |
| Under ~100 ms | Immediate state change (pressed, checked) |
| ~100 ms - 1 s | Pending state on the control (spinner in button, disabled to prevent repeats) |
| 1 s - 10 s | Progress indicator, ideally determinate |
| Longer | Background task with status, notification on completion, ability to continue working |

- Confirm completion where it is not self-evident ("Saved", updated list).
- Optimistic UI is fine when failures are rare and rollback is visible.
- Announce important status changes to assistive technology (live regions on web; platform accessibility notifications natively).

## Navigation (USA-001)

- The user always knows where they are (current item marked, title matches navigation label), how they got there, and how to go back.
- Navigation model follows the platform: tab bar / navigation stack on iOS, navigation bar/rail/drawer by window size on Android, sidebar + toolbar + menu bar on macOS, header/sidebar + URLs on web.
- On the web, every meaningful view has a URL; back/forward work; state that users share (filters, tabs) lives in the URL when practical.
- Deep hierarchies (more than two levels in a sidebar) suggest a split view or a different IA.

## Labels (USA-002)

- Action labels are verb + object ("Export invoices", "Invite member"), not "Submit" or "OK" when more specific wording fits.
- Use the user's vocabulary. Match labels to resulting screen titles.
- "Learn more" links need context (visible or accessible) to be meaningful out of context.

## Forms

- Labels visible and persistent (placeholders are not labels).
- Group related fields; order fields as the user thinks about them.
- Validate at the right moment: format errors on blur or submit, not on every keystroke while typing; availability checks (usernames) can be live.
- Errors: identify the field, describe the problem and the fix in text (WCAG 3.3.1, 3.3.3), keep entered values, move focus or announce on submit failure.
- Do not ask for information already provided (WCAG 3.3.7 Redundant Entry); support autofill and password managers (3.3.8 Accessible Authentication).
- Mark required or optional consistently, whichever is the minority.

## Error prevention and recovery (USA-004)

- Prevent: constrain inputs (date pickers, steppers), sensible defaults, disable impossible options with explanation.
- Confirm only irreversible, high-cost actions; prefer **undo** for everything else (confirmation fatigue makes dialogs ineffective).
- Destructive confirmations name the object and consequence ("Delete 'Q3 Forecast' and its 14 comments?").
- System errors: say what happened, what it means for the user's data, and what to do. Offer retry. Never show raw stack traces to end users.

## Keyboard (USA-006)

- Everything operable by keyboard (WCAG 2.1.1). Logical tab order, visible focus.
- Standard keys: Enter/Space activate, Escape closes overlays, arrows move within composite widgets (menus, tabs, grids, listboxes).
- Expert tools: shortcuts for frequent actions, discoverable via menus, tooltips, or a command palette; do not override platform or browser shortcuts without reason.
- Focus management: move focus into dialogs on open, trap it while open, return it on close.

## Touch and pointer

- Targets meet platform minimums (see [accessibility.md](accessibility.md)); hit areas can exceed visual size.
- Primary actions within comfortable reach on phones (lower and middle areas of the screen, per Apple's iOS guidance).
- No hover-only information on touch devices.

## Persistence

- Preserve user work: drafts, unsaved changes warnings, restored scroll position on back navigation, remembered view preferences when appropriate.
- Communicate sync and offline state when data may be stale.
