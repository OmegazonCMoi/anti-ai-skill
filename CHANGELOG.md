# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/). The version in `package.json` and `metadata.version` in `SKILL.md` must match (enforced by `npm run validate:skill`).

## [Unreleased]

### Added

- Audit rules GEN-016 to GEN-023: default AI typefaces, serif italic accents, colored-border cards, icon on every element, untouched shadcn/ui defaults, opacity-only hover, em dashes in UI copy, buzzword copy.
- "Banned by default: the 20 AI tells" table in `references/anti-patterns.md`, mapping each tell to its rule.
- New code signals: gradient text and grain (GEN-005), scroll fade-ins and cursor beams (GEN-015).
- Audit rules GEN-024 to GEN-028 from published AI-pattern catalogs: hero metric strip, formulaic AI copy, default warm-editorial palette, decorative section numbering, fake or dead interactions.
- GEN-017 now covers headline accent words in any color, not only italic serif; wider detection for GEN-002 (bento), GEN-008 (glow), GEN-009 (grid backgrounds, halos), GEN-013 (John Doe, builder badges), GEN-015 (marquee, pulsing dot, typewriter), GEN-016 (Geist).
- `references/3d-and-webgl.md`: when real-time 3D (Three.js, React Three Fiber) earns its place, strong patterns, asset and runtime budgets, fallback, and accessibility; routed from SKILL.md and the platform matrix (`immersive-3d`).
- "Push past the median" in `references/art-direction.md`: write down the expected version, name a signature idea, change at least three axes, explore one unconventional direction; new composition strategies (immersive, kinetic type, interactive object, scroll-told, print-inspired, raw, maximalist).
- Audit rule GEN-029 (gratuitous 3D); TEC-006 now allows a 3D library when 3D carries the content.
- Sources `impeccable-slop`, `anthropic-frontend-skills`, `hustletoai-vibe-coded` in the registry and reference library.

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
