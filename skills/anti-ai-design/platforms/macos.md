# macOS

Purpose: designing Mac apps that feel at home on the Mac. Primary reference: Apple Human Interface Guidelines (see [../references/reference-library.md](../references/reference-library.md); re-verify specifics, the HIG changes often).

A web interface inside a desktop window is not a well-designed Mac app. But do not force native conventions onto a cross-platform product when the architecture or requirements justify another approach; see [desktop-cross-platform.md](desktop-cross-platform.md) for that trade-off.

## Context (from Apple's "Designing for macOS", inspected 2026-10-19)

- Large, high-resolution displays, often several; people sit at a desk 1-3 feet away.
- Input: keyboard, mouse, trackpad, and more, in any combination; high-precision pointing.
- Sessions range from minutes to hours of deep focus; many apps open at once with frequent switching.
- Apple's best practices: use large displays to show more content in fewer nested levels with less modality while keeping comfortable density; let people resize, hide, show, and move windows, and support full screen; put all commands in the menu bar; support high-precision input; handle keyboard shortcuts; support personalization (e.g. customizable toolbars).

## Window and navigation structure

- **Windows**: resizable, with sensible minimum sizes; content reflows rather than clipping. Restore window size/position and state between launches where appropriate. Support multiple windows if documents or contexts are independent.
- **Sidebar** for top-level navigation and collections (source list). Per the HIG: keep to two levels of hierarchy at most; let people hide it (View menu commands or a toolbar button); avoid placing critical actions at the bottom of the sidebar; consider auto-collapsing when the window narrows.
- **Split views**: sidebar → content list → detail is a standard pattern for hierarchical data deeper than two levels.
- **Inspector**: a trailing panel for properties of the current selection, toggleable.
- **Toolbar**: frequent commands and navigation for the window's content; customizable where it helps.
- **Tabs**: native window tabs for multiple documents rather than custom in-app tabs, when the model fits.

## Menus and commands

- The **menu bar** must contain every command, organized under standard menus (App, File, Edit, View, Window, Help) plus app-specific ones. The menu bar is how people discover commands and shortcuts.
- **Context menus** on right-click/Control-click for object-specific actions; they duplicate commands available elsewhere, never the only path.
- **Keyboard shortcuts** for frequent commands, shown in menus; keep standard ones (⌘N, ⌘O, ⌘S, ⌘W, ⌘Z, ⌘⇧Z, ⌘C/V/X, ⌘F, ⌘, for Settings) with their standard meanings.
- **Undo/redo** for user edits.

## Focus and keyboard navigation

- Full keyboard access: Tab moves between controls (users can enable full keyboard navigation in system settings), arrow keys within lists/tables/outlines, Return for default buttons, Escape to cancel, Space to toggle.
- Visible focus ring using the system style; don't remove it.
- Type-to-select in lists; ⌘F search in content areas.

## Appearance

- Respect system appearance (light/dark) and accent color; the HIG advises against app-specific appearance settings. If you set custom sidebar icon colors, make sure they serve a clear purpose, since people expect the system accent color to apply.
- Use system materials and semantic colors so Increase Contrast and Reduce Transparency work.
- Current HIG material guidance: Liquid Glass belongs to the control/navigation layer floating above content, not the content layer; use standard materials for content-layer differentiation.

## Controls and density

- Use native controls (buttons, pop-up buttons, segmented controls, checkboxes, steppers, date pickers, table views) through SwiftUI or AppKit; they bring correct behavior, accessibility, and appearance.
- Mac control sizes are smaller than iOS: the HIG lists 28×28 pt as the default control size and 20×20 pt as the minimum on macOS (vs 44×44 pt default on iOS).
- Denser layouts are normal and expected on the Mac; tables with sortable columns, outline views, and inspectors are core tools. Don't port iOS spacing.
- Hover is available (pointer) but never the only cue.

## Desktop interaction patterns

- Drag and drop between windows and apps (with a non-drag alternative).
- Multiple selection with ⌘-click and ⇧-click.
- Right-click context menus.
- Document-based apps: autosave/versions conventions, proxy icon, title bar document state.
- Settings in a Settings window (⌘,), not a modal sheet inside the main window.
- Notifications sparingly; status in the window when the user is present.

## SwiftUI / AppKit implementation notes

- Prefer standard containers (`NavigationSplitView`, `Table`, `Inspector`, toolbars, `commands` for menus) over custom chrome. Verify API availability against the target macOS version in Apple's developer documentation before relying on it.
- Use semantic system colors and text styles.
- Test with VoiceOver, Full Keyboard Access, Increase Contrast, Reduce Transparency, Reduce Motion, and both appearances.

## Anti-patterns specific to macOS

- Hamburger menus and in-window navigation drawers instead of a sidebar and menu bar.
- Commands available only via toolbar icons with no menu item or shortcut.
- iOS-sized controls and spacing.
- Custom title bars that break window dragging, traffic-light placement, or full screen.
- Modal dialogs for actions that could be inline or undoable.
- Card grids for content that should be a table or list.
