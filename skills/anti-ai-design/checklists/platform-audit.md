# Platform audit checklist

Check the sections for the target platform(s). Details live in the platform files.

## Web ([../platforms/web.md](../platforms/web.md))

- [ ] Semantic landmarks and heading order; `button` vs `a` used correctly
- [ ] Every meaningful view has a URL; back/forward work; shareable state in URL where useful
- [ ] Works at 320 px width without horizontal page scroll; tables scroll in their region
- [ ] Media has dimensions/aspect ratio (no layout shift); fonts load without large shifts
- [ ] `prefers-reduced-motion`, `prefers-color-scheme`, `forced-colors` handled
- [ ] Sticky headers don't obscure focused elements
- [ ] No console errors on load and main interactions

## macOS ([../platforms/macos.md](../platforms/macos.md))

- [ ] All commands in the menu bar with standard menus and shortcuts
- [ ] Windows resizable with sensible minimum; state restored
- [ ] Sidebar ≤ 2 levels, hideable; split view/inspector where appropriate
- [ ] Full keyboard navigation; visible system focus ring
- [ ] Native controls at Mac sizes; desktop density
- [ ] Respects system appearance, accent color, Increase Contrast, Reduce Transparency
- [ ] Context menus duplicate (not replace) commands; undo/redo for edits

## iOS / iPadOS ([../platforms/ios-ipados.md](../platforms/ios-ipados.md))

- [ ] Platform navigation (tab bar / navigation stack / sheets) with edge-swipe back intact
- [ ] Safe areas respected; content not under system UI
- [ ] Dynamic Type supported to the largest sizes without losing content
- [ ] Targets meet Apple's sizes (44×44 pt default; ≥ 28×28 pt minimum)
- [ ] Gesture actions have visible alternatives
- [ ] iPad uses available space (split view, multiple columns), supports multitasking sizes
- [ ] Dark Mode, Reduce Motion, VoiceOver labels and order
- [ ] Offline/poor network states designed

## Android ([../platforms/android.md](../platforms/android.md))

- [ ] Layout adapts by window size class; state survives configuration changes
- [ ] System back behaves correctly; no traps
- [ ] Edge-to-edge with insets handled; nothing hidden behind system bars
- [ ] Touch targets ≥ 48×48 dp
- [ ] Text in `sp`; works at largest font scale
- [ ] Dynamic color decision documented
- [ ] TalkBack descriptions and roles; keyboard/mouse support on large screens

## Cross-platform desktop ([../platforms/desktop-cross-platform.md](../platforms/desktop-cross-platform.md))

- [ ] Architecture classified (native / native controls / custom-rendered / web-based)
- [ ] Native menus and platform-correct shortcuts (⌘ vs Ctrl)
- [ ] Window behavior: size/position restore, minimum size, title bar dragging, full screen
- [ ] No browser behaviors leaking (reload, text selection of chrome, link drag)
- [ ] Desktop density; right-click menus
- [ ] Accessibility exposed to OS screen readers

## Enterprise ([../platforms/enterprise-interfaces.md](../platforms/enterprise-interfaces.md))

- [ ] Density appropriate for daily expert use
- [ ] Tables: sorting, filtering, selection, bulk actions, sticky headers, keyboard access
- [ ] Filter state shareable; saved views if users repeat queries
- [ ] Permissions visible and explained
- [ ] Audit history for important objects
- [ ] Long-running operations with progress and results
- [ ] Shortcuts for frequent actions
