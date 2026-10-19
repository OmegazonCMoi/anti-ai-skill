# anti-ai-design-skill

A portable [Agent Skill](https://agentskills.io/specification) that changes how AI agents approach interface design. Instead of "make it modern and premium", it gives agents a process: understand the product, rank the content, derive an art direction, compose from content, implement with real states and accessibility, critique honestly, and report what was and wasn't verified.

Its specific target is the recognizable output of unguided AI design: eyebrow badge → headline → paragraph sections, grids of six identical feature cards, every element in a bordered, shadowed, rounded box, and purple-to-blue gradients. These patterns aren't banned. The skill teaches agents to notice when they were chosen automatically, check whether the content justifies them, and replace them when it doesn't.

## What's inside

- **A design constitution** (seven rules) in [`SKILL.md`](skills/anti-ai-design/SKILL.md), with quality gates and a routing table that loads only the guidance a task needs.
- **17 reference documents**: anti-patterns with exceptions and replacements, composition, typography, color and surfaces, spacing and density, components, interaction, motion, accessibility, responsive design, design systems, critique and scoring, a reference library with verification status, source verification, and a decision framework.
- **6 platform guides**: web, macOS, iOS/iPadOS, Android, cross-platform desktop (Electron, Tauri, Qt, Flutter), enterprise interfaces.
- **8 workflows**: discover, define art direction, design from scratch, improve an existing interface, implement, audit an interface, audit code, final quality gate.
- **Templates and checklists** for briefs, art direction specs, reviews, implementation plans, design systems, and audits.
- **Machine-readable configs**: 46 audit rules with severities, evidence, legitimate uses, alternatives, and heuristic code signals; a source registry; a platform matrix.
- **Validation and packaging tooling** in Node.js, with tests.

## Use cases

Designing new products and marketing sites; redesigning existing interfaces without breaking them; implementing UI in an existing codebase; defining an art direction or design system; designing native macOS, iOS/iPadOS, and Android apps; improving dense enterprise tools; auditing screenshots, live interfaces, or UI code with prioritized, evidence-based findings.

## Repository structure

```text
skills/anti-ai-design/     The canonical skill (this is what gets installed)
  SKILL.md                 Entry point: constitution, process, gates, routing
  references/              In-depth guidance, loaded on demand
  platforms/               Platform-specific guidance
  workflows/               Step-by-step procedures
  templates/               Fill-in documents
  checklists/              Audit checklists
adapters/                  Installation notes per tool (Claude, ChatGPT, Codex, generic)
configs/                   audit-rules.json, source-registry.json, platform-matrix.json
scripts/                   Validators and the packager
tests/                     Node test suite and anti-pattern fixtures
examples/                  Worked brief, art direction, critique, before/after
```

## Installation

Requirements for the tooling: Node.js **22.2 or later** (the packager uses `zlib.crc32`). The skill itself needs no runtime.

```bash
git clone <this repository> anti-ai-design-skill
cd anti-ai-design-skill
npm install          # installs the one dev dependency (yaml, for strict frontmatter parsing)
npm run package      # builds dist/anti-ai-design-1.0.0.zip
```

| Tool | Install | Guide |
| --- | --- | --- |
| Claude Code | `cp -R skills/anti-ai-design ~/.claude/skills/` (personal) or into `.claude/skills/` (project) | [adapters/claude](adapters/claude/README.md) |
| Claude apps | Upload the ZIP in Customize > Skills (code execution must be enabled) | [adapters/claude](adapters/claude/README.md) |
| Codex | `cp -R skills/anti-ai-design .agents/skills/` (repo) or `~/.agents/skills/` (user) | [adapters/codex](adapters/codex/README.md) |
| ChatGPT | Upload as a skill (eligible Business/Enterprise/Healthcare/Edu workspaces), or use it as an instruction document | [adapters/chatgpt](adapters/chatgpt/README.md) |
| Other agents | Point the agent at `SKILL.md` | [adapters/generic-agents](adapters/generic-agents/README.md) |

Installation paths come from vendor documentation checked on 2026-10-19 (see [adapters/README.md](adapters/README.md) for the status of each). None of these integrations is installed end-to-end by the test suite.

## Usage examples

Each example lists what the skill directs the agent to do. Results depend on the model and the tools available to it; the skill makes better outcomes likely, not guaranteed.

1. **"Create a distinctive landing page for our SaaS without the generic AI look."**
   Infers product and audience from the repo, asks at most one decisive question, defines intent and a composition strategy (optionally 2-3 directions), composes sections from real content instead of hero/features/testimonials, implements in the existing stack, runs the anti-pattern audit and quality gates, and reports kept patterns with reasons.
2. **"Redesign the settings screens in this React app, but don't break anything."**
   Inspects components, tokens, routes, and tests; records what works; audits; plans the smallest coherent change; preserves handlers, test IDs, and i18n keys; runs type-check/tests/build; reports what was verified.
3. **"Design a macOS app for managing photo shoots."**
   Loads the macOS guide: menu bar with all commands, sidebar ≤ 2 levels, split view and inspector, keyboard shortcuts, Mac control sizes and density, system appearance; avoids web-in-a-window patterns.
4. **"Design the iOS version of our habit tracker."**
   Loads the iOS guide: tab bar/navigation stack/sheets, safe areas, Dynamic Type at large sizes, 44×44 pt targets, gesture alternatives, haptics only for meaningful events, offline states.
5. **"Our ops dashboard is cluttered; improve it without losing information density."**
   Loads enterprise and density guidance: keeps density, removes nested containers and decorative surfaces, promotes the primary task (e.g. tickets about to breach SLA), turns card stacks into a sortable table with bulk actions and keyboard support.
6. **"Audit this interface and tell me what to fix first."**
   States the evidence and its limits, runs the anti-pattern, hierarchy, usability, accessibility, and platform passes, writes findings with evidence type and severity, optionally scores with coverage and gates, and prioritizes corrections.
7. **"Before writing any code, define an art direction for this product."**
   Produces an intent tied to context, distinct directions where useful, and an implementable spec (type roles and scale, palette with verified contrast pairs, surface policy, grid, imagery, motion, explicit exclusions).
8. **"Here's a screenshot. What's wrong with it?"**
   Reviews composition, hierarchy, copy, and visible anti-patterns; flags contrast as an estimate; states that focus, keyboard, semantics, responsiveness, and motion cannot be assessed from a screenshot, and says what evidence would answer them.

Invocation: Claude Code `/anti-ai-design <request>`; Codex `$anti-ai-design <request>` or `/skills`; ChatGPT `@anti-ai-design`; elsewhere, "Read `skills/anti-ai-design/SKILL.md` and follow it for this task."

Worked examples: [design brief](examples/design-brief-example.md), [art direction](examples/art-direction-example.md), [critique](examples/critique-example.md), [before/after](examples/before-after-analysis.md).

## Reference verification policy

- External sources live in [`configs/source-registry.json`](configs/source-registry.json) and are documented for agents in [`references/reference-library.md`](skills/anti-ai-design/references/reference-library.md).
- Each source has a type (normative standard, official guidance, example product, ...) and a verification status with a date: `content-inspected`, `reachable`, `unverified`, or `broken`. Statuses reflect checks made on 2026-10-19; the registry says what was inspected.
- Example products (Apple.com, Linear, Stripe, Raycast) are evidence of choices, not authorities. The skill forbids inventing brand "specs" or exact values.
- An HTTP 200 only proves a page exists. `npm run validate:references:online` probes URLs (time-bounded, warnings only) but never upgrades a status by itself.

## Local validation

```bash
npm run validate              # everything below, plus repository, rules, matrix, fixtures
npm run validate:skill        # frontmatter (strict YAML), constitution, required files, workflows, links
npm run validate:references   # registry structure, URLs, duplicates, documentation sync (offline)
npm run validate:references:online   # optional network probe
npm test                      # node --test: structure, rules, fixtures, scoring, registry, packaging
npm run check                 # validate + test + package
```

The tests check repository integrity and the rules encoded in the skill. Static tests **cannot** judge visual design; the fixture scanner finds heuristic signals in markup (and distinguishes, for example, selectable template cards from a generic feature grid), but visual evaluation needs a capable model and, ideally, rendered evidence.

## Packaging

`npm run package` validates the skill, then writes `dist/anti-ai-design-<version>.zip` containing one `anti-ai-design/` folder: every file of the canonical skill plus `LICENSE`. Tests, scripts, configs, and development files are excluded. The archive is deterministic (sorted entries, fixed timestamps) and the packager fails if any link would point outside the package.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: keep one canonical source, prefer contextual reasoning over new prohibitions, keep `SKILL.md` under 500 lines, register and date every source, and run `npm run check`.

## Known limitations

- Platform integrations are documented from vendor docs and not tested end-to-end here. ChatGPT's Help Center doesn't state which upload file formats are accepted, and skills there are limited to eligible Business, Enterprise, Healthcare, and Edu workspaces.
- The reference library reflects one day of verification; vendor guidance (notably Apple's HIG) changes often.
- Code signals are regular-expression heuristics tuned to common HTML/Tailwind idioms. They miss many cases and are never verdicts.
- The scoring model is a transparent rubric, not an objective measure of aesthetic quality.
- Agents without file access only get `SKILL.md`, which weakens results.

## License

[MIT](LICENSE) for the content and code in this repository. Third-party names and linked sources belong to their owners; no third-party documentation, screenshots, or assets are reproduced. See [CONTRIBUTING.md](CONTRIBUTING.md#source-attribution-policy) for the attribution policy.
