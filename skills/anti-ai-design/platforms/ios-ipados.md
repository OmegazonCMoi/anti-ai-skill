# iOS and iPadOS

Purpose: designing touch-first apps that follow Apple platform conventions. Primary reference: Apple Human Interface Guidelines ([../references/reference-library.md](../references/reference-library.md)). Do not invent platform APIs or claim feature support without checking current Apple documentation for the deployment target.

## Context (from Apple's "Designing for iOS", inspected 2026-10-19)

- Medium-size display held in one or two hands; frequent orientation changes; short sessions as well as long ones; frequent app switching.
- Apple's best practices: limit onscreen controls so people focus on primary content, keeping secondary actions discoverable with minimal interaction; adapt to orientation, Dark Mode, and Dynamic Type; place controls where they are easy to reach (middle and bottom of the display), support swipe to go back and swipe actions on list rows; with permission, use platform capabilities (payments, biometrics, location) instead of asking for manual input.

Do not shrink a desktop layout. Re-plan the hierarchy for one primary task per screen.

## Navigation

- **Tab bar** for a small number of top-level areas the user switches between. On iPadOS, consider the adaptable tab bar/sidebar style; the HIG suggests considering a tab bar first.
- **Navigation stack** for hierarchical drill-down, with back via the leading button and edge swipe.
- **Sheets** for focused, self-contained tasks (compose, filter, quick create); support detents when partial height makes sense; ensure dismissal is clear and unsaved work is protected.
- **Full-screen modal** only for immersive or multi-step tasks that need the whole screen.
- **Alerts** for critical information requiring a decision; not for routine confirmations (prefer undo).
- **Menus and context menus** (long press) for secondary actions, always with another path to essential actions.

## Layout

- Respect **safe areas** (notch/Dynamic Island, home indicator, rounded corners) and system bars; extend backgrounds edge to edge but keep content and controls within safe areas.
- Use system margins and readable content guides for text width on larger devices.
- Adapt to size classes: iPhone portrait (compact width), iPhone landscape, iPad full screen, Split View, Slide Over, Stage Manager windows. On iPad, use the space: split views, sidebars, multi-column layouts. Don't stretch a phone layout.
- One-handed reach: primary actions toward the bottom or within easy reach; destructive actions away from frequent ones.

## Typography and Dynamic Type

- Use the system font and built-in text styles (Large Title, Title, Headline, Body, Callout, Footnote, Caption...) so text responds to Dynamic Type.
- Test at the largest accessibility text sizes: layouts must reflow (stack horizontal arrangements vertically, allow multiline labels), not truncate essential content.
- Custom fonts must be scaled with the text-style system to support Dynamic Type.

## Touch targets and gestures

- Apple HIG (Accessibility, inspected 2026-10-19): default control size 44×44 pt, minimum 28×28 pt on iOS/iPadOS; Buttons page: hit region of at least 44×44 pt as a general rule.
- Standard gestures (tap, swipe, long press, pinch, edge swipe back) keep their standard meanings.
- Every gesture-only action needs a visible alternative (button, menu item); gestures are not discoverable.
- Swipe actions on rows: the most common action as the full-swipe; destructive actions marked and undoable where possible.

## Haptics

- Use system feedback where it reinforces a meaningful event (success, failure, selection change, reaching a detent). Don't add haptics to every tap.
- Use the platform's feedback generators; respect system settings.

## System controls and appearance

- Prefer system controls (lists, toggles, pickers, segmented controls, search fields, share sheet). They support accessibility, Dark Mode, Dynamic Type, and current materials automatically.
- Current HIG: Liquid Glass forms the layer for controls and navigation (tab bars, toolbars, sidebars) above content; don't apply it to content-layer elements; use it sparingly on custom controls.
- Support Dark Mode and Increase Contrast with semantic colors.

## Accessibility

- VoiceOver: meaningful labels, traits, and grouping; logical order; custom actions for complex rows.
- Dynamic Type (above), Reduce Motion (replace slides/zooms with fades), Reduce Transparency, Increase Contrast, Bold Text, Button Shapes.
- Color is never the only cue.
- See [../references/accessibility.md](../references/accessibility.md).

## Offline and network states

- Mobile networks fail often: show cached content with freshness, queue actions where the product supports it, explain failures with retry, never lose user input.
- Pull to refresh for user-initiated refresh of lists, if the content updates.
- Placeholder/redacted loading states shaped like content.

## Implementation notes (SwiftUI/UIKit)

- Prefer `NavigationStack`/`NavigationSplitView`, `TabView`, `List`, `Form`, `.sheet` with detents, `.searchable`, system text styles. Check availability against the deployment target in Apple's documentation.
- React Native / Expo: use platform-appropriate navigation (native stack, native tabs), respect safe areas, support font scaling (`allowFontScaling`), test on real iOS behavior rather than assuming parity with Android.

## Anti-patterns specific to iOS/iPadOS

- Hamburger menus hiding primary navigation.
- Web-style modals and custom back buttons that break the edge swipe.
- Tiny tap targets; controls crowded at the top of tall phones.
- Ignoring Dynamic Type (fixed font sizes, fixed-height cells).
- iPad apps that are stretched iPhone layouts.
- Card stacks with shadows for ordinary list content where an inset grouped list would be clearer.
