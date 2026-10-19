# Workflow H: Final quality gate

Verify that the work meets the request, follows the chosen direction, avoids generic patterns, preserves functionality, and has been tested as far as the tools permit, before delivery.

## Preconditions

- A deliverable is ready: design, implementation, or audit.

## Required context

The original request, the brief and art direction (if any), the change set, available validation tools.

## Procedure

Run the eight gates. For each, answer with evidence and mark **pass**, **fail** (fix it), or **not verifiable** (state why).

1. **Intent**: Does the result fit the actual product and users from discovery? Does it do what was asked, no more (or label extras as proposals)?
2. **Composition**: Is there a clear focal point and hierarchy on each key screen? Run [../checklists/anti-pattern-audit.md](../checklists/anti-pattern-audit.md): every badge-headline stack, repeated card grid, and container layer is either removed or justified in one sentence.
3. **Distinctiveness**: Is the identity carried by more than accent color and radius (type, composition, content, imagery)? Apply the substitution test as a diagnostic; if it fails, investigate and either improve or state why genericity is acceptable here (e.g. a standard settings screen).
4. **Platform fit**: [../checklists/platform-audit.md](../checklists/platform-audit.md) for the target platform(s).
5. **Accessibility**: [../checklists/accessibility-audit.md](../checklists/accessibility-audit.md): contrast, focus, semantics, keyboard, touch targets, motion, text scaling. Note which items were tested and how.
6. **Functionality**: Do interactive elements work, including states (loading, empty, error, success)? Is existing behavior preserved?
7. **Technical integrity**: Were available tools run (type-check, lint, tests, build, render, accessibility scan)? Are results clean or are failures explained? See [../checklists/release-audit.md](../checklists/release-audit.md).
8. **Honesty**: Does the report separate done-and-verified from assumed, untested, or out of scope? Are any claimed verifications real?

If a gate fails and you have the tools and permission to fix it, fix it and rerun the affected gates. Do not deliver with an unfixed Critical issue unless the user explicitly accepts it.

## Relevant references

[../checklists/anti-pattern-audit.md](../checklists/anti-pattern-audit.md), [../checklists/accessibility-audit.md](../checklists/accessibility-audit.md), [../checklists/platform-audit.md](../checklists/platform-audit.md), [../checklists/release-audit.md](../checklists/release-audit.md), [../references/design-critique.md](../references/design-critique.md).

## Expected output

A gate summary (eight lines: gate, status, evidence) feeding the final report (SKILL.md section 15).

## Common failure modes

- Marking gates as passed without evidence.
- Treating "not verifiable" as "pass".
- Skipping the gate for "small" changes that touched shared components.
- Hiding failing tests or skipped checks in the report.

## Completion criteria

- Each gate has a status and evidence.
- Failures were fixed or are explicitly reported with reason.
- The final report reflects the gate results truthfully.
