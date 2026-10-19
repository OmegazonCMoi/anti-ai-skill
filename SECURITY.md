# Security policy

## Scope

This repository contains Markdown instructions for AI agents, JSON configuration, and small Node.js scripts for validation and packaging. It has no server component and no runtime dependencies. Security-relevant areas are:

- **Instruction integrity**: the skill is loaded into AI agents' context. Content that tries to make agents exfiltrate data, run unexpected commands, disable safety checks, or misreport results is a security issue, even if it looks like ordinary documentation.
- **Packaging**: the distributable ZIP must contain only the canonical skill folder and `LICENSE`. Any path that could make the package include files outside the skill folder, or write outside `dist/`, is a security issue.
- **Scripts**: the validators read repository files and, only with `--online`, make outbound GET requests to the URLs in `configs/source-registry.json`. They should never execute downloaded content.
- **Supply chain**: the single dev dependency (`yaml`) is pinned by `package-lock.json`.

## What the skill instructs agents not to do

The skill tells agents not to add dependencies without justification, not to fabricate test or verification results, to preserve existing functionality, and to ask before behavior-changing edits. It does not ask for credentials, network access beyond optional source verification, or elevated permissions. The `SKILL.md` frontmatter declares no `allowed-tools`.

## Reporting a vulnerability

Please report suspected vulnerabilities privately, using the repository host's private vulnerability reporting feature if it's enabled, or by contacting the maintainers directly, rather than in a public issue. Include:

- a description of the issue and its impact;
- steps to reproduce (file, line, command);
- any suggested fix.

We aim to acknowledge reports within 7 days and to fix confirmed issues in the next release, crediting reporters who wish to be credited.

## Using the skill safely

- Install skills only from sources you trust, and review `SKILL.md` and linked files before installing; skills shape what an agent does.
- Run `npm run validate` after pulling changes; it checks links, structure, and machine-specific paths, but it is not a security review.
- When an agent following this skill proposes running commands in your project, review them as you would any agent action.
