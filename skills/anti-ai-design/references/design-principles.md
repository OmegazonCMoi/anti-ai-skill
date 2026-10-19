# Design principles

Purpose: the small set of perceptual and task principles that every other file builds on. Use these to explain *why* a layout works or fails, in terms that are not matters of taste.

## 1. Task first

An interface exists to let a specific person do a specific thing. Before evaluating anything visual, write the primary task in one sentence ("A dispatcher assigns an incoming job to the nearest available driver within 30 seconds"). Then judge every element by whether it helps that task, supports a secondary task, or is noise.

- Rank tasks by frequency × importance. The most frequent important task gets the most prominent, fastest path.
- Rare but critical tasks (deleting an account, exporting data) need to be findable and safe, not prominent.
- If you cannot state the task, you are not ready to choose a layout (see [../workflows/discover.md](../workflows/discover.md)).

## 2. Hierarchy: one thing first

Each view should have an answer to "where does the eye go first, second, third?" that matches task priority.

Hierarchy is built from (roughly in order of strength): **size**, **contrast** (value and color), **position** (top-left in LTR reading cultures, center in symmetrical compositions), **isolation** (surrounding space), **weight**, and **motion**. Use as few of these as needed. Pushing all of them at once on several elements cancels the effect.

Test: squint, or blur the screenshot. The blurred shapes should still show one dominant mass and a clear secondary group. If everything is the same gray texture, hierarchy is missing (audit rule HIE-001).

Counterexample: a data grid in an operations tool may deliberately have no single focal point; the user's query creates the focus. Hierarchy then lives in the controls (filters, selection, bulk actions) and in column order.

## 3. Grouping and proximity

Things that are close together read as related. Spacing is the cheapest and most precise grouping tool; borders and boxes are the most expensive (they add edges and cost space).

- Space inside a group must be clearly smaller than space between groups. A ratio around 1:2 or more is usually readable; near-equal spacing makes groups dissolve.
- Use common region (a shared background or box) only when proximity alone is insufficient: interactive objects, regions that scroll, overlays.
- Similarity (same color, shape, type style) groups items across distance: all links look alike, all destructive actions look alike.

## 4. Alignment

Alignment creates invisible lines the eye follows. Fewer, stronger lines produce calmer layouts.

- Pick alignment lines from a grid and reuse them. "Almost aligned" is worse than clearly offset (HIE-004).
- Left-aligned (start-aligned) text is easier to read for more than a couple of lines; centered text suits short, standalone statements.
- Align numbers by their decimal or right edge in tables.

## 5. Contrast with purpose

Contrast is how you say "this is different". If two things differ in meaning, they must differ visibly; if they are the same, they should look the same. Weak contrast between levels (16px vs 18px headings) looks like an error rather than a choice. Contrast also has a minimum for legibility, defined by accessibility requirements (see [accessibility.md](accessibility.md)).

## 6. Consistency and standards

Users transfer knowledge from other products and from other parts of yours. Consistency within the product (same action, same control, same place) and with platform conventions (back navigation, menu locations, keyboard shortcuts) reduces learning. Distinctiveness belongs in art direction, content, and composition, not in reinventing standard controls.

This is one of Nielsen Norman Group's ten usability heuristics ("Consistency and Standards"); the others, including visibility of system status, error prevention, and recognition rather than recall, are a useful audit lens. See [reference-library.md](reference-library.md).

## 7. Recognition over recall

Show options rather than requiring users to remember them: visible navigation, recent items, autocomplete, inline examples of valid input. Hidden menus and gesture-only actions trade discoverability for tidiness; make that trade knowingly.

## 8. Progressive disclosure

Show what most users need most of the time; make the rest reachable in one predictable step. Do not hide information that experts need constantly in the name of a clean look (HIE-005). In enterprise tools, disclosure is often a density control rather than a hiding place.

## 9. Information architecture

Group and label by the user's mental model, not the org chart or the database schema (USA-007).

- Use the user's vocabulary for labels; verify with existing content, support tickets, or the user's own wording in the request.
- Each item should have one obvious home. If you need to put it in two places, the categories are probably wrong.
- Depth vs breadth: shallow and broad navigation usually beats deep trees when labels are clear.

## 10. Feedback and state visibility

Every action produces visible acknowledgment; every system state that matters (saving, offline, syncing, error) is visible. Details: [interaction-design.md](interaction-design.md).

## Applying principles to anti-patterns

| Anti-pattern | Principle it violates |
| --- | --- |
| Six equal cards for unequal features | Hierarchy; contrast with purpose |
| Boxes inside boxes | Grouping (region used where proximity suffices) |
| Eyebrow + headline + paragraph everywhere | Hierarchy (four levels where two carry meaning) |
| Spacious enterprise tables | Task first; progressive disclosure misapplied |
| Custom-styled native controls that behave differently | Consistency and standards |
