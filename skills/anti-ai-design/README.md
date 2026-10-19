# anti-ai-design (skill package)

This folder is the complete, self-contained skill. It can be copied anywhere an agent can read files.

- **Entry point**: [SKILL.md](SKILL.md): mission, the seven-rule design constitution, process, quality gates, and the routing table that says which supporting files to load for which task.
- **references/**: in-depth guidance (anti-patterns, composition, typography, color and surfaces, accessibility, critique and scoring, reference library, source verification, decision framework, and more).
- **platforms/**: web, macOS, iOS/iPadOS, Android, cross-platform desktop, enterprise interfaces.
- **workflows/**: step-by-step procedures (discover, define art direction, design from scratch, improve existing, implement, audit interface, audit code, final quality gate).
- **templates/**: design brief, art direction spec, design review, implementation plan, design system spec.
- **checklists/**: pre-design, anti-pattern, platform, accessibility, release.

All links are relative and stay inside this folder, so the package works when installed on its own.

## Install (summary)

| Tool | Location |
| --- | --- |
| Claude Code (personal) | `~/.claude/skills/anti-ai-design/` |
| Claude Code (project) | `.claude/skills/anti-ai-design/` |
| Claude apps | Upload the packaged ZIP in Customize > Skills (requires code execution) |
| Codex | `.agents/skills/anti-ai-design/` (repo) or `~/.agents/skills/anti-ai-design/` (user) |
| ChatGPT | Upload the ZIP or `SKILL.md` as a skill (see the repository's ChatGPT adapter notes) |
| Other agents | Point the agent at `SKILL.md` and let it read linked files on demand |

Full, sourced instructions are in the source repository's `adapters/` directory. Paths and UI locations were checked against vendor documentation on 2026-10-19 and may change.

## License

MIT. See `LICENSE` in this folder.
