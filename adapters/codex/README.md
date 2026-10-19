# Codex

Codex (CLI and IDE extension) supports skills in the Agent Skills format. Source: OpenAI's [Build skills](https://learn.chatgpt.com/docs/build-skills) documentation (reached on 2026-10-19 via a redirect from `developers.openai.com/codex/skills`).

## Where Codex looks for skills

Per that documentation, Codex scans, in order of scope:

| Scope | Path |
| --- | --- |
| Repository (current folder) | `$CWD/.agents/skills` |
| Repository (root) | `$REPO_ROOT/.agents/skills` |
| User | `$HOME/.agents/skills` |
| Admin | `/etc/codex/skills` |
| System | Bundled with Codex |

Codex loads each skill's name, description, and path first, and reads the full `SKILL.md` only when it decides to use the skill. Descriptions may be shortened to fit a context budget, which is why this skill's description front-loads its triggers.

## Install

Repository-level (shared with everyone who works in the repo):

```bash
mkdir -p .agents/skills
cp -R /path/to/anti-ai-design-skill/skills/anti-ai-design .agents/skills/
```

User-level:

```bash
mkdir -p ~/.agents/skills
cp -R skills/anti-ai-design ~/.agents/skills/
cp LICENSE ~/.agents/skills/anti-ai-design/
```

Or unzip the package: `unzip dist/anti-ai-design-1.0.0.zip -d ~/.agents/skills/`.

Restart Codex if the skill does not appear; skills are discovered on startup.

## Use

- **Explicit**: run `/skills` to pick it, or type `$` and select `anti-ai-design` in your message: `$anti-ai-design redesign the settings page without changing behavior`.
- **Implicit**: describe a UI task; Codex may select the skill from its description.

## Notes

- The documentation also mentions optional `agents/openai.yaml` metadata for UI presentation. This repository does not include it because it's not required and would be vendor-specific inside the canonical folder.
- Not verified: an end-to-end install in Codex as part of this repository's tests.
