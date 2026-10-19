# Claude

Claude supports Agent Skills natively. The canonical folder `skills/anti-ai-design/` is already in the expected format: a directory named after the skill containing `SKILL.md` with `name` and `description` frontmatter, plus supporting files linked with relative paths.

Sources (checked 2026-10-19): [Claude Code skills docs](https://code.claude.com/docs/en/skills), [Claude Help Center: Use skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude), [Claude Platform: Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview). These locations and UI paths change; re-check them if something doesn't match.

## Claude Code

Claude Code discovers skills in these locations (per the Claude Code docs):

| Scope | Path |
| --- | --- |
| Personal (all projects) | `~/.claude/skills/anti-ai-design/SKILL.md` |
| Project (commit to share with a team) | `.claude/skills/anti-ai-design/SKILL.md` |
| Plugin | `<plugin>/skills/anti-ai-design/SKILL.md` |

### Install (personal)

From a clone of this repository:

```bash
mkdir -p ~/.claude/skills
cp -R skills/anti-ai-design ~/.claude/skills/
cp LICENSE ~/.claude/skills/anti-ai-design/
```

To track updates from the clone instead of copying, use a symbolic link:

```bash
ln -s "$(pwd)/skills/anti-ai-design" ~/.claude/skills/anti-ai-design
```

### Install (project)

```bash
mkdir -p .claude/skills
cp -R /path/to/anti-ai-design-skill/skills/anti-ai-design .claude/skills/
```

Or unzip the packaged archive (it contains a single `anti-ai-design/` folder):

```bash
unzip dist/anti-ai-design-1.0.0.zip -d .claude/skills/
```

### Use

- **Automatic**: Claude matches the task against the skill's description (UI/UX design, redesigns, frontend implementation, critiques, audits) and loads `SKILL.md`, then the linked files the routing table calls for.
- **Explicit**: type `/anti-ai-design` followed by the request, or ask by name: "Use the anti-ai-design skill to audit `src/app/page.tsx`."

## Claude apps (claude.ai, desktop)

Per the Help Center article (checked 2026-10-19):

1. Make sure **code execution** is enabled (Settings > Capabilities for individual plans; organization settings for Team/Enterprise).
2. Run `npm run package` and take `dist/anti-ai-design-<version>.zip`. The ZIP contains the skill folder, as the upload expects.
3. Go to **Customize > Skills**, choose to create a skill, then **Upload a skill**, and select the ZIP.
4. Enable the skill. Invoke it by asking for design work or by naming it.

Custom skills uploaded this way are private to your account, according to the Help Center at the time of checking. Upload size limits are not stated there; the package is about 100 KB.

## Claude API

The Claude API supports Agent Skills (see the Platform docs link above). Uploading a custom skill through the API was **not** verified for this repository; follow the current Platform documentation for the upload endpoint and required beta headers, and upload the contents of the packaged folder.

## What was and wasn't verified

- Verified: the frontmatter satisfies the Agent Skills spec constraints (`npm run validate:skill`), all links resolve inside the package, and the ZIP is well-formed (`npm test`).
- Not verified: an end-to-end install in Claude Code, Claude apps, or the API as part of this repository's tests.
