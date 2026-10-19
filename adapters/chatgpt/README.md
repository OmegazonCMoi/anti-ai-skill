# ChatGPT

ChatGPT can use this skill in different ways depending on the interface. They are not equivalent; pick the one that matches what you have.

## 1. As an importable skill (ChatGPT skills)

OpenAI's [Academy page on skills](https://academy.openai.com/public/resources/skills) (checked 2026-10-19) states that ChatGPT skills use the `SKILL.md` format, can be built inside ChatGPT or **uploaded**, are applied automatically when relevant or **selected with an @-mention**, and can be exported to other Agent Skills tools such as Codex. It does not state which plans support skills or the accepted upload formats.

The [OpenAI Help Center article "Skills in ChatGPT"](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) (read 2026-10-19) states that:

- skills are available to **eligible ChatGPT Business, Enterprise, Healthcare, and Edu users**, subject to workspace settings and product availability (admins control who can create, use, upload, share, or install skills);
- you upload a skill from **Skills > Create > Upload from your computer**;
- ChatGPT **scans uploaded skills** before they become available; some may be marked *Needs Review* or *Blocked*;
- skills can be shared with your workspace.

The article text we read does **not** list accepted upload file formats or size limits. Search-engine excerpts mention `.md`, `.zip`, and `.skill` uploads, but that wording was not in the page we inspected; treat it as unconfirmed.

Suggested procedure (adjust to what the current UI shows):

1. Run `npm run package` and take `dist/anti-ai-design-<version>.zip` (a single `anti-ai-design/` folder containing `SKILL.md` and its references, about 100 KB).
2. In ChatGPT, go to Skills, select **Create**, then **Upload from your computer**, and select the ZIP.
3. If the upload only accepts a single Markdown file, upload `SKILL.md`. The routing table will then point to files that aren't available, so expect weaker guidance on references, platforms, and workflows.
4. Wait for the scan, then invoke with `@anti-ai-design` or let ChatGPT select it.

## 2. As a coding agent that reads a repository (Codex)

If you work in Codex (CLI, IDE extension, or Codex in ChatGPT with repository access), use the [Codex adapter](../codex/README.md). That path gives the agent the whole folder and lets it inspect your codebase, which this skill relies on for redesign and implementation work.

## 3. As a plain instruction document

In a chat without file access or skill support, attach or paste `SKILL.md` and, as needed, the specific reference files the routing table lists for your task (e.g. `references/anti-patterns.md` and `references/design-critique.md` for an audit). Tell the model: "Follow the attached skill. Linked files I haven't attached are unavailable; say so when you'd need them."

## Limits to keep in mind

- Not every ChatGPT mode has filesystem access, code execution, or automatic loading of linked files. Without them the model can't open `references/...` on its own.
- A chat model cannot inspect your codebase or render your interface unless the mode provides those tools; the skill's honesty rules require it to say what it couldn't verify.
- Not verified: an end-to-end upload in ChatGPT as part of this repository's tests.
