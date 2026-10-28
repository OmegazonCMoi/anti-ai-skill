# Reference library

Purpose: a curated, categorized set of external sources with what each can teach, which decisions it informs, and its limits. Use with [source-verification.md](source-verification.md). The machine-readable registry lives in the development repository at `configs/source-registry.json`; this file is the version the agent reads.

**Verification**: statuses below reflect checks performed on **2026-10-19**. `content-inspected` = specific content read and summarized; `reachable` = URL returned success with the expected title, content not reviewed; `unverified` = not confirmed. Re-verify before citing anything precise, and never report a source as verified in your own session unless you inspected it.

**How to use a reference**: open the specific page, confirm it supports the claim, extract a transferable principle, adapt it. Never copy compositions, assets, copy, or invent "brand specs".

## Normative standards and accessibility

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `wcag-22` | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | normative-standard | content-inspected |
| `wcag-22-understanding` | [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) | implementation-guidance | reachable |
| `w3c-wai` | [W3C WAI](https://www.w3.org/WAI/) | implementation-guidance | reachable |
| `wai-aria-apg` | [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | implementation-guidance | reachable |
| `mdn-accessibility` | [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) | implementation-guidance | reachable |
| `mdn-prefers-reduced-motion` | [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | implementation-guidance | reachable |
| `web-dev-cls` | [web.dev CLS](https://web.dev/articles/cls) | implementation-guidance | reachable |

- **WCAG 2.2** (W3C Recommendation, 12 Dec 2024) is the only *normative* source here. Use it for requirements and compliance language: contrast (1.4.3, 1.4.11), reflow (1.4.10), focus (2.4.7, 2.4.11), target size (2.5.8), dragging (2.5.7), errors (3.3.1), redundant entry (3.3.7), authentication (3.3.8), name/role/value (4.1.2). Informs: tokens, focus styles, form behavior. Caveat: levels matter; AAA criteria (e.g. 2.4.13, 2.3.3) are recommendations unless a project targets AAA.
- **Understanding WCAG** explains intent and exceptions (e.g. inline link exception for target size). Use it before declaring a failure on an edge case.
- **APG** gives keyboard models for custom widgets. Informs: tabs, menus, comboboxes, grids, dialogs. Caveat: prefer native elements; APG examples are not production components.
- **MDN** for implementation details and browser support. **web.dev CLS** for avoiding layout shift during loading (reserve space for media, stable skeletons).

## Apple platforms

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `apple-hig` | [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) | official-guidance | reachable |
| `apple-hig-accessibility` | [HIG: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) | official-guidance | content-inspected |
| `apple-hig-designing-for-macos` | [HIG: Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos) | official-guidance | content-inspected |
| `apple-hig-designing-for-ios` | [HIG: Designing for iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios) | official-guidance | content-inspected |
| `apple-hig-materials` | [HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | official-guidance | content-inspected |
| `apple-hig-motion` | [HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion) | official-guidance | content-inspected |
| `apple-hig-sidebars` | [HIG: Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) | official-guidance | content-inspected |
| `apple-hig-dark-mode` | [HIG: Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode) | official-guidance | content-inspected |
| `apple-hig-buttons` | [HIG: Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) | official-guidance | content-inspected |

Transferable lessons (as inspected):
- **Accessibility**: control sizes by platform (iOS/iPadOS default 44×44 pt, minimum 28×28 pt; macOS default 28×28 pt, minimum 20×20 pt); contrast 4.5:1 up to 17 pt and 3:1 at 18 pt or bold; support Dynamic Type, Reduce Motion, Increase Contrast.
- **macOS**: use large displays to show more content with fewer nested levels and less modality; resizable windows and full screen; the menu bar holds all commands; keyboard shortcuts; personalization (customizable toolbars). Informs: density, navigation, command structure.
- **iOS**: limit onscreen controls and make secondary actions discoverable; adapt to orientation, Dark Mode, Dynamic Type; place controls within comfortable reach (middle/bottom); support swipe back.
- **Materials**: Liquid Glass is a functional layer for controls and navigation above content; don't use it in the content layer; use it sparingly. Directly relevant to auditing decorative glass (GEN-012).
- **Motion**: purposeful, optional, brief, cancelable; avoid motion on frequent interactions.
- **Sidebars**: at most two levels of hierarchy; let people hide them; avoid critical actions at the bottom of macOS sidebars; consider a tab bar first on iPhone/iPad.
- **Dark Mode**: respect the system setting; avoid app-specific appearance switches.
- Caveat for all: HIG pages change (the Sidebars page lists a June 2026 update). The HIG describes Apple platforms; it is not a style to impose on web products.

## Android and Material

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `material-design-3` | [Material Design 3](https://m3.material.io/) | official-guidance | reachable |
| `android-design` | [Android: Design & Plan](https://developer.android.com/design) | official-guidance | reachable |
| `android-accessibility` | [Android: Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/apps) | official-guidance | content-inspected |
| `android-window-size-classes` | [Android: Window size classes](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes) | official-guidance | content-inspected |
| `android-adaptive` | [Android: Adaptive apps](https://developer.android.com/develop/ui/compose/layouts/adaptive) | official-guidance | reachable |
| `android-dynamic-color` | [Android: Dynamic color](https://developer.android.com/develop/ui/views/theming/dynamic-colors) | official-guidance | reachable |

- **Accessibility**: 48×48 dp touch targets; 4.5:1 contrast for small text, 3:1 otherwise; `sp` for text; content descriptions convey purpose, not appearance.
- **Window size classes**: width compact < 600 dp, medium 600-840, expanded 840-1200, large 1200-1600, extra-large ≥ 1600 (large/XL require opting in). Informs: single vs multi-pane, navigation component choice.
- **Material 3**: component and color-role system, dynamic color. Caveat: client-rendered site; a deep link tested on 2026-10-19 returned 404, so open pages before citing. Material is a strong default for Android, not a mandate for branded apps.

## Microsoft and Windows

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `fluent-2` | [Fluent 2](https://fluent2.microsoft.design/) | official-guidance | content-inspected |
| `windows-app-design` | [Design Windows apps](https://learn.microsoft.com/en-us/windows/apps/design/) | official-guidance | reachable |

- **Fluent 2** provides design resources for web (React), iOS, Android, and Windows. Informs: products in the Microsoft ecosystem (Teams, Office add-ins), Windows conventions. Caveat: only the homepage was inspected.

## Research and education

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `nngroup` | [Nielsen Norman Group](https://www.nngroup.com/) | research-education | reachable |
| `nngroup-heuristics` | [10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | research-education | content-inspected |

- **Heuristics** (updated 30 Jan 2024): visibility of system status; match between system and real world; user control and freedom; consistency and standards; error prevention; recognition rather than recall; flexibility and efficiency of use; aesthetic and minimalist design; help users recognize, diagnose, and recover from errors; help and documentation. Informs: audit lens and critique vocabulary. Caveat: secondary source; heuristics support expert review, not a substitute for research. Note that "aesthetic and minimalist design" means removing irrelevant information, not visual minimalism (Rule E).

## Example products (inspiration, not authority)

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `apple-website` | [apple.com](https://www.apple.com/) | example-product | reachable |
| `linear` | [Linear](https://linear.app/) | example-product | content-inspected |
| `stripe` | [Stripe](https://stripe.com/) | example-product | content-inspected |
| `raycast` | [Raycast](https://www.raycast.com/) | example-product | content-inspected |

Observations come from automated fetches of homepages on 2026-10-19; marketing pages change frequently.

- **Linear**: real product UI is the main visual across sections (workspace, backlog, timeline, code review). Lesson: *product-led composition*, showing real, populated states. Caveat: the page also uses a three-column icon card row and testimonial cards. References are not anti-pattern-free; take the principle, not the page. Its dark aesthetic is not a default (GEN-008).
- **Stripe**: evidence-led sections (concrete metrics, named case studies by segment). Lesson: specific, sourced evidence beats generic claims. Caveat: metrics are the company's own claims; the page also uses an animated gradient background and card groups.
- **Raycast**: demonstrates a keyboard-first product with keyboard visuals and real launcher screenshots; the extensions catalog is a legitimate card collection (independent entities). Lesson: *demonstrate the interaction model*, and cards are fine for real collections.
- **Apple.com**: product imagery at large scale, short statements, deliberate pacing. Lesson: one message per section, imagery as structure. Caveat: depends on exceptional photography and brand recognition; content not inspected in detail this session.

## Pattern galleries and component libraries

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `mobbin` | [Mobbin](https://mobbin.com/) | pattern-gallery | reachable |
| `shadcn-ui` | [shadcn/ui](https://ui.shadcn.com/) | component-library | content-inspected |

- **Mobbin**: survey how shipped apps solve a flow. Caveats: commercial, mostly behind an account; screenshots belong to the depicted products; popularity is not quality.
- **shadcn/ui**: describes itself as "not a component library" but a way to build one: component code is copied into your project. Lesson: you own the code, so apply the project's art direction. Caveat: unmodified defaults are now so common they read as generic.

## Cross-platform desktop tooling

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `electron-docs` | [Electron docs](https://www.electronjs.org/docs/latest/) | tooling-documentation | reachable |
| `tauri` | [Tauri](https://tauri.app/) | tooling-documentation | reachable |
| `qt-docs` | [Qt Documentation](https://doc.qt.io/) | tooling-documentation | reachable |
| `flutter-adaptive` | [Flutter adaptive & responsive](https://docs.flutter.dev/ui/adaptive-responsive) | tooling-documentation | reachable |

Use these to check what native integration (menus, dialogs, window controls, accessibility bridges) a stack actually provides before designing around it. See [../platforms/desktop-cross-platform.md](../platforms/desktop-cross-platform.md).

## Skill format and agent tooling

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `agent-skills-spec` | [Agent Skills specification](https://agentskills.io/specification) | tooling-documentation | content-inspected |
| `claude-code-skills` | [Claude Code skills](https://code.claude.com/docs/en/skills) | tooling-documentation | content-inspected |
| `claude-platform-skills` | [Claude Platform: Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) | tooling-documentation | reachable |
| `claude-help-skills` | [Claude Help: Use skills](https://support.claude.com/en/articles/12512180-using-skills-in-claude) | tooling-documentation | content-inspected |
| `codex-skills` | [OpenAI: Build skills (Codex)](https://learn.chatgpt.com/docs/build-skills) | tooling-documentation | content-inspected |
| `openai-academy-skills` | [OpenAI Academy: Skills](https://academy.openai.com/public/resources/skills) | tooling-documentation | content-inspected |
| `chatgpt-help-skills` | [OpenAI Help: Skills in ChatGPT](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) | tooling-documentation | content-inspected |

These document how this skill is installed; they are not design references. Details are in the repository's `adapters/` directory.

## AI-pattern catalogs

| ID | Source | Type | Status |
| --- | --- | --- | --- |
| `impeccable-slop` | [Impeccable: Slop catalog](https://impeccable.style/slop) | pattern-gallery | content-inspected |
| `anthropic-frontend-skills` | [Anthropic: Improving frontend design through Skills](https://claude.com/resources/articles/improving-frontend-design-through-skills) | implementation-guidance | content-inspected |
| `hustletoai-vibe-coded` | [How to tell if a website is vibe coded](https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120) | implementation-guidance | content-inspected |

- **Impeccable Slop catalog**: about 67 named patterns across visual details, typography, color, layout, motion, copy, and imagery. Source of GEN-024 to GEN-027 and several detection lines. Caveat: a commercial tool's opinionated list; patterns are tells, not defects by themselves.
- **Anthropic article** (2025-11-12): explains why unguided models converge on "Inter fonts, purple gradients on white backgrounds, and minimal animations" (distributional convergence). Caveat: written to promote a skill; its own suggestions (atmospheric backgrounds, staggered page-load reveals) can become new defaults.
- **hustletoai article**: signs that no human reviewed generated output: dead buttons, forms without feedback, placeholder testimonials, builder badges, upbeat microcopy. Source of GEN-028. Caveat: blog post, anecdotal.

## Adding a reference

A new reference needs: a real, specific URL; a type from the vocabulary above; what it teaches and which decisions it informs; caveats; a verification status with date. Prefer official and normative sources for requirements, and treat example products as evidence of choices, not as rules.
