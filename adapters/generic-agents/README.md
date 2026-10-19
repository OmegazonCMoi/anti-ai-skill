# Generic agents

Any agent that can read files can use this skill, even without native skill discovery. The skill is plain Markdown with relative links; `SKILL.md` tells the agent which linked files to read for which task.

## Option A: vendor-neutral skills directory

Many tools that implement the [Agent Skills specification](https://agentskills.io/specification) scan a skills directory. Copy or unzip the canonical folder into whatever directory your tool scans:

```bash
unzip dist/anti-ai-design-1.0.0.zip -d <your-tool-skills-directory>/
```

The folder name (`anti-ai-design`) must match the `name` field, as the spec requires.

## Option B: project instruction file

For agents that read a project instruction file (`AGENTS.md` or a tool-specific equivalent), vendor the folder into the repository (for example at `.agents/skills/anti-ai-design/`) and add:

```markdown
## Interface design

For any UI/UX design, redesign, frontend implementation, design critique, or interface audit task,
read `.agents/skills/anti-ai-design/SKILL.md` first and follow it. Load only the supporting files
its routing table (section 12) lists for the task, before making the corresponding decisions.
```

## Option C: explicit invocation in a prompt

```text
Read skills/anti-ai-design/SKILL.md and follow it for this task. Use its routing table to decide
which supporting files to read. Task: audit the checkout page in src/checkout/ and prioritize fixes.
```

## Option D: no file access

Paste `SKILL.md` into the system prompt or first message, plus the specific supporting files the routing table lists for the task. Tell the model which linked files are unavailable.

## Expectations for the host agent

The skill works best when the agent can:

- read files relative to `SKILL.md` (to load references on demand);
- inspect the project's code (for redesign, implementation, and code audits);
- run commands (type-check, tests, build) and, ideally, render the UI (browser or screenshot tools).

When a capability is missing, the skill instructs the agent to state what it couldn't verify rather than to assume.
