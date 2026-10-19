# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/). The version in `package.json` and `metadata.version` in `SKILL.md` must match (enforced by `npm run validate:skill`).

## [1.0.0] - 2026-10-19

### Added

- Canonical skill `skills/anti-ai-design/` with the seven-rule design constitution, discovery, art direction, references and verification, layout, implementation, self-critique, eight quality gates, conditional loading rules, missing-information handling, functionality preservation, and final reporting.
- 17 reference documents, 6 platform guides, 8 workflows, 5 templates, 5 checklists.
- `configs/audit-rules.json`: 46 rules across five categories (generic AI patterns, visual hierarchy, usability, accessibility, technical quality), severity levels, evidence types, heuristic code signals with exception signals, and a weighted scoring model with gates.
- `configs/source-registry.json`: 43 sources with type, platforms, lessons, caveats, and verification status dated 2026-10-19.
- `configs/platform-matrix.json`: platform guidance map and task routing.
- Validators (`validate-skill`, `validate-references`, `validate-repository`) using strict YAML parsing; optional, time-bounded online link probe.
- Deterministic packager producing `dist/anti-ai-design-<version>.zip`.
- Node test suite with four anti-pattern fixtures, including a legitimate functional-cards fixture that must not be flagged.
- Adapters for Claude, ChatGPT, Codex, and generic agents; worked examples.
