# Accessibility

Purpose: actionable requirements, their sources, and how to validate them. Accessibility is a quality gate (Gate 5), not a polish step. Critical accessibility defects block delivery regardless of visual quality.

Primary sources: WCAG 2.2 (W3C Recommendation, 12 December 2024), the WAI ARIA Authoring Practices Guide, Apple HIG Accessibility, Android accessibility guidance. Canonical URLs are in [reference-library.md](reference-library.md). Numbers below were checked against those sources on 2026-10-19; re-verify if precision matters for a compliance claim.

## Requirements by area

### Perceivable

| Requirement | Source | Practical rule |
| --- | --- | --- |
| Text contrast | WCAG 1.4.3 (AA) | ≥ 4.5:1; ≥ 3:1 for large text. Apple HIG: 4.5:1 up to 17 pt, 3:1 at 18 pt or bold. Android: 4.5:1 for small text, 3:1 otherwise |
| Non-text contrast | WCAG 1.4.11 (AA) | Input borders, focus indicators, meaningful icons and chart marks ≥ 3:1 against adjacent colors |
| Color not sole cue | WCAG 1.4.1 (A) | Status, errors, selection, links also use text, icon, shape, or underline |
| Text alternatives | WCAG 1.1.1 (A) | Meaningful images have alt text; decorative images have empty alt / are hidden from AT |
| Info and relationships | WCAG 1.3.1 (A) | Headings, lists, tables, labels expressed in markup/semantics, not only visually |
| Meaningful sequence | WCAG 1.3.2 (A) | Reading order in code matches visual order |
| Resize text | WCAG 1.4.4 (AA) | Works at 200% text size without loss of content or function |
| Reflow | WCAG 1.4.10 (AA) | No two-dimensional scrolling at 320 CSS px width (except content like data tables and maps that require it) |
| Text spacing | WCAG 1.4.12 (AA) | Survives line height 1.5×, paragraph spacing 2×, letter spacing 0.12×, word spacing 0.16× |

### Operable

| Requirement | Source | Practical rule |
| --- | --- | --- |
| Keyboard | WCAG 2.1.1 (A) | All functionality operable by keyboard |
| Focus order | WCAG 2.4.3 (A) | Logical order; avoid positive `tabindex` |
| Focus visible | WCAG 2.4.7 (AA) | A visible focus indicator always; never `outline: none` without a replacement |
| Focus not obscured | WCAG 2.4.11 (AA) | Focused element not entirely hidden by sticky headers, cookie banners, or overlays |
| Focus appearance | WCAG 2.4.13 (AAA) | Recommended: indicator area at least a 2 CSS px perimeter with 3:1 change in contrast |
| Pause, stop, hide | WCAG 2.2.2 (A) | Auto-moving content longer than 5 s can be paused |
| Animation from interactions | WCAG 2.3.3 (AAA) | Motion triggered by interaction can be disabled; honor reduced-motion preferences |
| Dragging | WCAG 2.5.7 (AA) | Single-pointer alternative to drag operations |
| Target size | WCAG 2.5.8 (AA) | Pointer targets ≥ 24×24 CSS px, or sufficient spacing (with listed exceptions such as inline links) |

### Understandable

| Requirement | Source | Practical rule |
| --- | --- | --- |
| Error identification | WCAG 3.3.1 (A) | Errors identified and described in text |
| Labels or instructions | WCAG 3.3.2 (A) | Inputs have labels; formats explained |
| Error suggestion | WCAG 3.3.3 (AA) | Suggest the correction when known |
| Redundant entry | WCAG 3.3.7 (A) | Don't make users re-enter information already given in the same process |
| Accessible authentication | WCAG 3.3.8 (AA) | No cognitive function tests without alternatives; allow paste and password managers |

### Robust

| Requirement | Source | Practical rule |
| --- | --- | --- |
| Name, role, value | WCAG 4.1.2 (A) | Custom controls expose name, role, state; state changes are announced |

## Platform target sizes (verified 2026-10-19)

| Platform | Guidance | Source |
| --- | --- | --- |
| Web | ≥ 24×24 CSS px (AA minimum) | WCAG 2.5.8 |
| iOS, iPadOS | Default control size 44×44 pt; minimum 28×28 pt | Apple HIG, Accessibility |
| macOS | Default control size 28×28 pt; minimum 20×20 pt | Apple HIG, Accessibility |
| Android | ≥ 48×48 dp touch target | Android Developers, accessibility guidance |

Enlarge the **hit area** (padding, invisible insets) without necessarily enlarging the visual.

## Platform preferences to honor

- **Reduced motion**: `prefers-reduced-motion` (web), Reduce Motion (Apple), "Remove animations" (Android). See [motion-design.md](motion-design.md).
- **Text size**: browser font size and zoom; Dynamic Type (Apple); font scale with `sp` (Android).
- **Contrast and transparency**: `prefers-contrast` and forced colors (Windows High Contrast / `forced-colors`) on web; Increase Contrast and Reduce Transparency on Apple platforms.
- **Color scheme**: `prefers-color-scheme`; system appearance on native.

## Custom controls (A11Y-003)

1. Prefer a native element or platform control.
2. If custom is unavoidable, follow the WAI-ARIA Authoring Practices pattern for that widget (keyboard model, roles, states).
3. Remember: ARIA changes semantics, not behavior. You still need focusability and key handling.
4. Test with a screen reader where tooling permits (VoiceOver, NVDA, TalkBack).

## Validation methods (state which ones you actually used)

| Method | Catches | Misses |
| --- | --- | --- |
| Automated scanners (e.g. axe-core, Lighthouse) | Missing names, some contrast, invalid ARIA | Most keyboard, order, meaning, and usability issues |
| Keyboard-only walkthrough | Focus visibility, order, traps, unreachable controls | Screen-reader semantics |
| Screen reader walkthrough | Names, roles, announcements, reading order | Visual issues |
| Zoom to 200% / 400%, 320 px viewport | Reflow, clipping, overlap | |
| Contrast checker on tokens and states | Contrast | Context such as text over images unless checked at the worst point |
| Reduced-motion and dark/high-contrast settings | Preference support | |

Automated tools cover only a portion of WCAG. Never report an interface as "accessible" or "WCAG compliant" based on an automated scan alone; report what was checked.

## Severity guidance

- **Critical**: a user cannot complete a core task (keyboard trap, unlabeled primary control, text below contrast on primary content, focus invisible).
- **High**: significant barrier with a workaround (missing reduced-motion support for large motion, small targets on a primary mobile action).
- **Medium / Low**: degraded experience on secondary paths.
