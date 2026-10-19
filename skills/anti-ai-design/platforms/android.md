# Android

Purpose: designing Android apps that adapt across phones, foldables, tablets, and desktop windows. Primary references: Android Developers documentation and Material Design 3 ([../references/reference-library.md](../references/reference-library.md)). Verify current APIs and component names before relying on them.

Material is the well-supported default for Android, not an obligation. A strongly branded app can use its own visual language as long as platform behaviors (back navigation, system bars, accessibility, adaptive layout) remain correct. Don't force Material components onto a product whose framework or brand points elsewhere (e.g. a Flutter app with a custom design system), and don't make a branded app ignore Android conventions either.

## Adaptive layout

Use **window size classes** (Android Developers, inspected 2026-10-19):

| Width class | Breakpoint | Typical device |
| --- | --- | --- |
| Compact | < 600 dp | Phones in portrait |
| Medium | 600-840 dp | Tablets/foldables in portrait |
| Expanded | 840-1200 dp | Tablets in landscape |
| Large | 1200-1600 dp | Large tablets |
| Extra-large | ≥ 1600 dp | Desktop displays |

Height classes: compact < 480 dp, medium 480-900 dp, expanded ≥ 900 dp. Large and extra-large width classes require opting in.

- Make high-level decisions with width class: single pane vs list-detail vs supporting pane, navigation component.
- Navigation commonly adapts: navigation bar at compact width, navigation rail at medium/expanded, persistent navigation drawer at larger widths. Confirm current Material guidance for the specific components you use.
- Handle configuration changes (rotation, fold/unfold, window resizing, multi-window) without losing state.
- Design for windows of any size, including desktop-style windowing and external displays.

## Navigation

- Respect the system **Back** behavior (gesture and button); back moves up the user's history and must not trap. Support predictive back where the platform version provides it.
- Top app bar with title and contextual actions; bottom app bar or FAB only when the primary action warrants it (a FAB on every screen is a formula).
- Deep links land on correct screens with a sensible back stack.

## System bars and edge-to-edge

- Modern Android apps draw edge to edge behind status and navigation bars; apply window insets so content and controls aren't obscured. Check current behavior for the target SDK in Android documentation.
- Handle display cutouts and gesture navigation areas; don't put swipe-sensitive controls at screen edges where system gestures live.

## Touch targets and input

- Minimum 48×48 dp touch targets (Android accessibility guidance); visual size can be smaller if the touch area is padded.
- Support keyboard, mouse, trackpad, and stylus on large screens: focus indicators, hover states, right-click context menus, keyboard shortcuts for productivity apps.

## Color and theming

- **Dynamic color** lets users' wallpaper-derived colors personalize the app. Decide deliberately: personalization suits utility and communication apps; strong brands may keep brand color for key moments while using dynamic color elsewhere, or opt out. Document the choice.
- Use color roles (primary, surface, on-surface, error...) through the theme rather than hard-coded colors, to support light/dark and contrast.

## Typography and font scaling

- Use `sp` for text so user font scaling applies; test at the largest scale. Avoid fixed heights for text containers.
- Use the type scale from your theme (Material type roles or your own) consistently.

## Accessibility

- TalkBack: content descriptions convey purpose ("Share", not "Share button" or "icon"); decorative images hidden from accessibility; merge descendants for list rows that act as one item; use roles (button, switch) via semantics.
- Contrast: 4.5:1 for small text, 3:1 for larger text (Android guidance mirrors WCAG).
- Respect "Remove animations" / animation scale settings.
- Test with TalkBack, Switch Access, and keyboard navigation on large screens.

## Platform-specific interaction

- Long press for selection mode in lists, with a visible alternative.
- Snackbars for brief feedback with optional undo; dialogs for decisions only.
- Notifications: channels with clear purposes; respect user control.
- Share via the system sharesheet; open links via the user's default handlers.

## Implementation notes

- Jetpack Compose: Material 3 components, adaptive libraries for window size classes and list-detail/supporting-pane layouts (verify artifact names and versions in current docs).
- Views: Material Components for Android; `WindowInsets` handling; `sp`/`dp` units.
- Flutter / React Native: check that your component set implements Android back behavior, insets, font scaling, and TalkBack semantics correctly; they do not come automatically with custom widgets.

## Anti-patterns specific to Android

- iOS conventions ported directly (back buttons in the top-left as the only back path, iOS-style tab bars with iOS icons).
- Phone layout stretched across a tablet or foldable.
- Ignoring insets so content hides behind system bars.
- Fixed text sizes in `dp`.
- A FAB, a bottom bar, a top bar, and a drawer all at once.
