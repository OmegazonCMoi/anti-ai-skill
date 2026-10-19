# Cross-platform desktop

Purpose: making good design decisions for desktop apps built with Electron, Tauri, Qt, Flutter, .NET MAUI, React Native for desktop, or similar, where "native" means different things depending on the stack.

## First, classify the architecture

| Architecture | Examples | What you control | Native fit strategy |
| --- | --- | --- | --- |
| **Truly native per platform** | SwiftUI/AppKit on macOS, WinUI on Windows, GTK on Linux | Everything, per OS | Follow each OS's guidelines fully |
| **Cross-platform with native controls** | Qt Widgets with native styles, .NET MAUI, React Native for Windows/macOS | Layout and composition; controls render natively | Follow OS conventions for menus, dialogs, shortcuts; share layout and IA |
| **Custom-rendered** | Flutter, Qt Quick/QML with custom styles, game engines | Pixels; controls are reimplemented | Decide deliberately how native to feel; reimplement platform behaviors (keyboard, focus, accessibility, text input) |
| **Web-based desktop** | Electron, Tauri (system webview) | HTML/CSS/JS UI inside a native window | Treat as a web app with desktop integration: native menus, shortcuts, window behavior, file handling |

Check the actual stack in the repository before advising. Use the stack's documentation to confirm which native integrations exist (application menus, context menus, native dialogs, tray, notifications, window controls, accessibility bridges). See [../references/reference-library.md](../references/reference-library.md).

## Shared vs per-platform decisions

Usually **shared** across platforms:
- Information architecture, content, terminology.
- Art direction: type, color, imagery, iconography (adjusted for platform metrics).
- Core layouts and workflows.

Usually **per platform**:
- Menu structure (macOS menu bar with app menu vs Windows/Linux in-window menus or none).
- Keyboard shortcuts (⌘ vs Ctrl; platform-standard shortcuts like ⌘, vs Ctrl+, for settings; check each OS's conventions).
- Window controls placement and title bar behavior.
- Dialog button order and wording conventions.
- File dialogs, notifications, system tray/menu bar extras.
- Scrollbar behavior, font rendering, default system font.

## Making a web-based desktop app feel like a desktop app

A web page in a window is not a desktop app. Minimum bar:

- **Native application menus** with all commands and their shortcuts (on macOS especially; people look there).
- **Keyboard first**: shortcuts for frequent commands, standard editing shortcuts working in all text fields, visible focus, no browser-only behaviors leaking (e.g. accidental page reload, link drag images, text selection of chrome).
- **Window behavior**: remembered size/position, sensible minimum size, multi-window if the model needs it, correct full-screen behavior, draggable title area if using a custom title bar, platform-correct window control placement.
- **Desktop density**: smaller controls and tighter spacing than mobile web; tables and split panes.
- **Native integrations** where users expect them: file open/save dialogs, drag files in/out, system notifications, open-at-login settings.
- **Context menus** on right-click with relevant commands.
- **Offline-first** behavior; no "you are offline" page for a local app.
- **Performance**: fast startup and low idle CPU; avoid heavy decorative effects.

## Custom-rendered apps (e.g. Flutter, QML)

- Decide the strategy: platform-adaptive (switch control styles per OS), or a deliberate custom brand UI. Either is valid; a half-native look (iOS switches on Windows) is not.
- Reimplement what native controls provide for free: keyboard navigation and shortcuts, text editing behavior (selection, IME input, spellcheck), right-click menus, scroll physics per platform, accessibility semantics exposed to the OS screen reader.
- Test with each OS's screen reader (VoiceOver, Narrator/NVDA, Orca where Linux is supported).

## When not to force native conventions

- The product is a creative canvas, game, or immersive tool whose UI is part of the experience.
- The product must be identical across platforms for documented reasons (training materials, kiosk deployments, regulated workflows).
- The technical stack cannot provide a native element without disproportionate cost.

Even then, keep the **behaviors** users depend on (shortcuts, focus, clipboard, accessibility, window management), and document the deviation.

## Anti-patterns

- Hamburger menu as the only command surface on desktop.
- Mobile-sized controls and spacing.
- Custom title bars that break window snapping, dragging, or accessibility.
- Using ⌘ shortcuts on Windows or Ctrl-only shortcuts on macOS.
- Rebuilding a native control poorly (date pickers, selects) without keyboard support.
- Web-style marketing visuals (gradients, glass cards) in a productivity tool.
