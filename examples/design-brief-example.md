# Example: design brief

A filled-in [design brief](../skills/anti-ai-design/templates/design-brief.md) for a **hypothetical** product. Names and details are invented for illustration; no metrics are real.

**Request (user's words)**: "Build the marketing site for Tessel, our tool that lets independent bookshops share inventory so they can fulfil orders from each other's stock. Make it not look like every other startup site."

## 1. Request

- **Deliverable**: art direction + implemented landing page (Next.js, existing repo).
- **Scope**: home page only; pricing and sign-up pages exist and are out of scope.
- **Key requirement**: "not look like every other startup site."

## 2. Product and users

- **Product**: a shared inventory network for independent bookshops; a shop can see whether a nearby member shop has a title and request a transfer.
- **Primary user**: independent bookshop owner, often the sole manager, non-technical, evaluates tools between serving customers *(assumed from the request; confirmed by existing site copy)*.
- **Primary task**: understand within a minute whether Tessel helps them sell books they don't have in stock, and how much effort joining takes.
- **Other tasks**: check which shops nearby are members; see pricing; contact the team.
- **Objective**: sign-ups for a free trial from shops in the three launch regions.

## 3. Platform and technology

- **Platform**: web, visited mostly on desktop during quiet shop hours and on phones *(assumed: no analytics provided)*.
- **Stack**: Next.js App Router, Tailwind CSS, no component library (inspected `package.json`, `tailwind.config.ts`).
- **Brand**: logo and a single brand color (deep green `#1F4D3A` in `tailwind.config.ts`); no typography defined beyond system fonts.
- **Reuse**: header and footer components exist in `app/(marketing)/`.

## 4. Constraints

- **Accessibility**: WCAG 2.2 AA *(default)*.
- **Content**: real member map data available via an existing API endpoint (`/api/members`); three real quotes from pilot shops with permission (provided in `content/quotes.json`).
- **Assets**: photos of two pilot shops supplied; no product screenshots yet *(open question)*.
- **Localization**: English only for launch.

## 5. Required interactions

- Postcode lookup showing member shops nearby (uses the existing API).
- Links to pricing and sign-up.

## 6. References

- User likes "the way some publishers' sites feel like a printed catalogue" (no URL given).
- Sources: `wcag-22` for contrast and target sizes; no example product is needed.

## 7. Assumptions and open questions

| # | Assumption or question | Default if unanswered | Impact if wrong |
| --- | --- | --- | --- |
| 1 | Are product screenshots available? | Design around the member map and the transfer request flow described in text and a simple diagram | Medium: a screenshot would strengthen the "how it works" section |
| 2 | Primary audience is owners, not staff | Copy addresses owners | Low |

## 8. Decision log

| ID | Decision | Why | Alternatives | Revisit if |
| --- | --- | --- | --- | --- |
| D-01 | Lead with the postcode lookup ("Which shops near you are on Tessel?") rather than a headline + CTA hero | The network's value depends on who is nearby; real data answers the owner's first question | Headline + illustration hero; product screenshot hero (no screenshots yet) | Member density is low in a region (empty results would discourage) |
