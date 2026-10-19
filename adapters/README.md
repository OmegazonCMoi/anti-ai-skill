# Adapters

The skill has **one canonical source**: [`skills/anti-ai-design/`](../skills/anti-ai-design/). Adapters contain only the integration-specific information needed to install, load, invoke, or package that folder for a given tool. They never contain a copy of the skill's instructions.

| Adapter | Mechanism | Status |
| --- | --- | --- |
| [Claude](claude/README.md) | Native Agent Skills: Claude Code skill directories, ZIP upload in Claude apps | Paths and upload steps taken from Anthropic documentation (checked 2026-10-19). Not installed end-to-end as part of this repository's tests |
| [Codex](codex/README.md) | Native Agent Skills: `.agents/skills` directories | Paths and invocation taken from OpenAI documentation (checked 2026-10-19). Not tested end-to-end |
| [ChatGPT](chatgpt/README.md) | Skill upload in ChatGPT (Business, Enterprise, Healthcare, Edu workspaces), or a plain instruction document | Upload steps from the OpenAI Help Center (checked 2026-10-19); accepted file formats not stated there. Not tested |
| [Generic agents](generic-agents/README.md) | Point the agent at `SKILL.md`; it reads linked files on demand | Vendor-neutral; depends on the agent's ability to read files |

## Three ways a tool can use this skill

1. **Native skill discovery**: the tool scans a skills directory, loads only `name` and `description` at startup, and reads `SKILL.md` plus linked files when a task matches (Claude Code, Claude apps, Codex, ChatGPT skills).
2. **Repository-reading coding agent**: an agent with filesystem access reads `SKILL.md` because a project instruction file (e.g. `AGENTS.md`, `CLAUDE.md`) tells it to.
3. **Instruction document only**: a chat interface without file access receives `SKILL.md` pasted or attached. Linked reference files are then unavailable unless also provided, so results will be weaker.

## Packaging

`npm run package` produces `dist/anti-ai-design-<version>.zip`, a single top-level `anti-ai-design/` folder containing `SKILL.md`, all references, platforms, workflows, templates, checklists, the skill README, and `LICENSE`. The build is deterministic (same inputs, same bytes) and checks that every link inside the package resolves inside the package.

No tool covered here needs a structurally different layout, so no transformation step exists. If a future integration requires one, add a deterministic transform script under `scripts/` and keep the canonical folder unchanged.

## Compatibility policy

- One canonical source; adapters document, they don't fork.
- Frontmatter uses only fields defined by the [Agent Skills specification](https://agentskills.io/specification) (`name`, `description`, `license`, `metadata`), so no tool-specific field breaks another tool.
- No claim of compatibility is made beyond what each adapter states. "Documented" means vendor docs describe the mechanism; "tested" would mean an end-to-end installation was performed, which this repository does not currently do automatically.
