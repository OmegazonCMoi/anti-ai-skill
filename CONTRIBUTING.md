# Contributing

Thanks for improving the skill. Its value depends on clear, contextual, honest guidance, so contributions are judged on those qualities more than on volume.

## Principles

1. **One canonical source.** All skill content lives in `skills/anti-ai-design/`. Adapters document installation; they never copy instructions.
2. **Contextual reasoning over prohibitions.** A new anti-pattern needs detection signs, *legitimate uses*, replacement strategies, and an example. Rules that ban shapes outright will be declined.
3. **No arbitrary minimalism.** Guidance must leave room for dense, expressive, colorful, or unconventional design when the context calls for it.
4. **Proportionality.** Keep `SKILL.md` under 500 lines; put depth in references and wire it through the routing table (section 12).
5. **Honesty.** Don't add exact values for third-party brands, unverified platform claims, or fabricated examples presented as real.

## Adding or changing content

| Change | Also update |
| --- | --- |
| New reference/platform/workflow/template/checklist | Link it from `SKILL.md`; add it to `REQUIRED_FILES` in `scripts/validate-skill.mjs` if it is essential |
| New audit rule | `configs/audit-rules.json` (id, category, severity, evidence, legitimateWhen, alternatives, references) and an entry in `references/anti-patterns.md` (detailed section for GEN rules; the index table for others) |
| New task route | `configs/platform-matrix.json` `taskRoutes` and the SKILL.md routing table |
| New external source | `configs/source-registry.json` and a table row in `references/reference-library.md` with the same id, URL, and status |
| Workflow | Keep the seven sections: Preconditions, Required context, Procedure, Relevant references, Expected output, Common failure modes, Completion criteria |
| Version bump | `package.json` `version`, `SKILL.md` `metadata.version`, `CHANGELOG.md` |

## Source attribution policy

- Link to sources and summarize transferable principles **in your own words**.
- Do not copy third-party documentation text beyond short quotations needed for accuracy (with attribution), and never copy screenshots, icons, fonts, illustrations, or other assets.
- Register every source with: real canonical URL, type, platforms, what it teaches, decisions it informs, caveats, and a verification status with date. Use `content-inspected` only if you read the specific content; `reachable` if you only confirmed the page exists; `unverified` otherwise.
- Example products are inspiration, not authority. Don't describe them as setting rules.
- If a source's license or provenance is unclear, link to it instead of incorporating its material, and note the limitation.
- Never include secrets, credentials, personal data, or machine-specific paths. `npm run validate` checks for common home-directory paths.

## Development

```bash
npm install
npm run check   # validate + test + package
```

Requirements: Node.js 22.2+. The only dependency is `yaml` (dev), used for strict frontmatter parsing. Please don't add dependencies for things the standard library does.

Tests must assert real behavior. When adding a validator check, add a negative test proving it catches the problem.

## Pull requests

Describe what changed and why, which checks you ran, and anything you couldn't verify. If you changed verification statuses, say how you verified each source.
