# Accessibility audit checklist

Mark each item **pass**, **fail**, or **not tested** and record *how* it was checked (automated tool, keyboard pass, screen reader, inspection of code, estimate from screenshot). Requirements and sources: [../references/accessibility.md](../references/accessibility.md).

## Perceivable

- [ ] A11Y-001: Text contrast ≥ 4.5:1 (≥ 3:1 large) in all themes and states (WCAG 1.4.3)
- [ ] A11Y-001: Input borders, focus indicators, meaningful icons/graphics ≥ 3:1 (WCAG 1.4.11)
- [ ] Information not conveyed by color alone (WCAG 1.4.1)
- [ ] A11Y-006: Images have appropriate alt text; decorative images hidden (WCAG 1.1.1)
- [ ] Headings, lists, tables, and labels are programmatic (WCAG 1.3.1)
- [ ] A11Y-004: Reading order matches visual order (WCAG 1.3.2)
- [ ] A11Y-005: Text resizes to 200% without loss (WCAG 1.4.4); Dynamic Type / font scale on native
- [ ] Reflow at 320 CSS px (WCAG 1.4.10)
- [ ] Text spacing overrides don't break content (WCAG 1.4.12)

## Operable

- [ ] USA-006: All functionality available by keyboard (WCAG 2.1.1); no keyboard traps
- [ ] A11Y-004: Focus order logical; no positive tabindex (WCAG 2.4.3)
- [ ] A11Y-002: Focus visible on every interactive element (WCAG 2.4.7)
- [ ] A11Y-002: Focused element not hidden by sticky/overlay content (WCAG 2.4.11)
- [ ] A11Y-008: Targets ≥ 24×24 CSS px (WCAG 2.5.8); platform sizes on native (Apple 44×44 pt default on iOS, Android 48×48 dp)
- [ ] Drag operations have single-pointer alternatives (WCAG 2.5.7)
- [ ] A11Y-007: Auto-moving content > 5 s can be paused (WCAG 2.2.2); reduced-motion preference honored
- [ ] Dialogs move focus in, trap while open, return focus on close

## Understandable

- [ ] Inputs have visible labels and instructions (WCAG 3.3.2)
- [ ] Errors identified in text, with suggestions where possible (WCAG 3.3.1, 3.3.3)
- [ ] No redundant entry within a process (WCAG 3.3.7)
- [ ] Authentication allows paste/password managers; no cognitive tests without alternative (WCAG 3.3.8)
- [ ] Language of page set; labels consistent across screens

## Robust

- [ ] A11Y-003: Custom controls expose name, role, value, state (WCAG 4.1.2); follow APG keyboard patterns
- [ ] A11Y-006: Icon-only buttons have accessible names
- [ ] Status messages announced (live regions / platform announcements)

## Preferences

- [ ] Reduced motion
- [ ] Dark/light appearance
- [ ] Increased contrast / forced colors
- [ ] Reduced transparency (Apple platforms)

## Reporting

- [ ] Methods used are listed; untested items are marked "not tested", never "pass"
- [ ] No claim of "WCAG compliant" based only on automated scanning
