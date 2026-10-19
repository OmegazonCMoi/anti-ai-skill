# Workflow A: Discover

Understand the product, inspect existing context, identify constraints, and determine what (if anything) must be clarified, without turning discovery into a questionnaire.

## Preconditions

- A design, redesign, implementation, or audit request has been received.

## Required context

Whatever is available: the request text, the repository, screenshots, design files, brand assets, existing copy, analytics or research the user shares.

## Procedure

1. **Read the request twice.** Extract explicit requirements, constraints, and stated preferences. Note the deliverable (direction, mockup description, code, audit).
2. **Inspect what exists** (when there is a codebase or files):
   - Stack: framework, styling approach, component library, build tooling (`package.json`, `Podfile`, `build.gradle`, `pubspec.yaml`, `Cargo.toml`...).
   - Design system: tokens, theme files, Tailwind config, CSS variables, shared components.
   - Existing screens related to the task; their patterns and conventions.
   - Content: real copy, data shapes, assets.
   - Accessibility and test setup: linters, a11y tests, Storybook, visual tests.
3. **Fill in the discovery sheet** ([../checklists/pre-design.md](../checklists/pre-design.md)): product, primary user, main tasks, objective, platform/devices, brand/system, stack, components, accessibility requirements, performance constraints, required interactions, content/assets, delivery expectations, references.
4. **Classify each unknown**:
   - *Inferable* → infer and record as an assumption.
   - *Decisive and not inferable* → candidate question.
   - *Irrelevant to this task* → ignore.
5. **Ask at most one or two concise questions**, only for decisive unknowns, and only if waiting for the answer is acceptable. Otherwise choose the safer default and flag it.
6. **Write the brief**: for larger tasks, fill [../templates/design-brief.md](../templates/design-brief.md); for small tasks, a 3-5 line summary of task, user, constraints, and assumptions is enough.
7. **Choose the next workflow** (art direction, design from scratch, improve existing, implement, or audit) and the reference files to load (SKILL.md section 12).

## Relevant references

[../checklists/pre-design.md](../checklists/pre-design.md), [../templates/design-brief.md](../templates/design-brief.md), [../references/design-principles.md](../references/design-principles.md), [../references/decision-framework.md](../references/decision-framework.md).

## Expected output

A brief (or short summary) stating: what is being designed, for whom, to achieve what, on which platform and stack, under which constraints; explicit assumptions; open questions (if any) with the default chosen if unanswered.

## Common failure modes

- Asking a long list of questions the repository already answers.
- Assuming a stack or design system without checking.
- Treating aesthetic adjectives ("modern", "clean") as requirements.
- Inventing users, metrics, or content.
- Skipping discovery entirely and producing a generic layout.

## Completion criteria

- Primary user and primary task can be stated in one sentence each.
- Platform, stack, and existing design system are identified (or confirmed absent).
- Assumptions are written down.
- Any question asked is decisive and could not be inferred.
