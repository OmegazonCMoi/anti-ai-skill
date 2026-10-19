# Release audit checklist

Final technical and honesty checks before delivering implemented UI. Pair with [../workflows/final-quality-gate.md](../workflows/final-quality-gate.md).

## Functionality

- [ ] Every interactive element does what it appears to do (no fake controls)
- [ ] Primary flows completed end to end (state how: manual run, tests, not run)
- [ ] Existing behavior preserved: handlers, routes, validation, analytics, i18n, test IDs
- [ ] Loading, empty, error, success, and offline states reachable and correct where relevant
- [ ] Long content, many items, zero items checked

## Technical

- [ ] Type-check run (result: …)
- [ ] Lint run (result: …)
- [ ] Tests run (result: counts)
- [ ] Build run (result: …)
- [ ] App rendered and inspected at representative sizes (or "not available")
- [ ] No console/runtime errors in inspected flows (TEC-007)
- [ ] No new dependencies without justification (TEC-006)
- [ ] Tokens used instead of new magic numbers (TEC-004)
- [ ] No unrelated changes in the diff

## Content

- [ ] No fabricated metrics, testimonials, logos, or prices presented as real (GEN-013)
- [ ] Placeholders clearly marked and listed in the report
- [ ] No secrets, personal data, or environment-specific paths in code or copy

## Design

- [ ] Follows the agreed direction/spec
- [ ] Anti-pattern audit done; kept patterns justified
- [ ] Accessibility audit done; methods listed

## Report

- [ ] What changed
- [ ] Key decisions with reasons
- [ ] Anti-patterns removed / deliberately kept
- [ ] Verification actually performed, with results
- [ ] Not verified, assumptions, proposals beyond scope
