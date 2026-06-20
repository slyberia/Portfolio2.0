<div align="center">
  <img src="public/og-image.svg" width="900" alt="Kyle Semple Portfolio" />

# Kyle Semple — Professional Portfolio

**Forward Deployed Engineer · Technical Systems Translator** · Washtenaw County, MI

[Live Site](https://kyle-semple-portfolio-786228485832.us-central1.run.app) · [How It Was Built](HOW_IT_WAS_BUILT.md) · [Architecture Decisions](DECISIONS.md) · [Architecture Overview](ARCHITECTURE.md)

[![CI](https://github.com/slyberia/Portfolio2.0/actions/workflows/ci.yml/badge.svg)](https://github.com/slyberia/Portfolio2.0/actions/workflows/ci.yml)
![React 18](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite 5](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)

</div>

---

## Current Portfolio Architecture

Portfolio2.0 leads with a single professional thesis rather than a menu of role tracks:

> Kyle Semple is a **Forward Deployed Engineer · Technical Systems Translator** who helps teams
> turn complex technical, operational, and spatial problems into systems people can understand,
> adopt, and use.

Forward Deployed Engineer is the searchable role anchor; Technical Systems Translator is the capability descriptor that explains the value at first read. The homepage opens with that identity and a "What I Help Teams Do" proof-pillar section. Role tracks are demoted to supporting **role lenses** (Forward Deployed Engineer, Implementation Consultant, Spatial Systems Architect, AI Workflow / Portfolio Governance) — surfaced as lower-priority metadata and a secondary navigation dropdown, never the primary framing. Project cards and case studies carry a stakeholder/customer-value layer (purpose · value · role relevance · proof type), deep dives reinforce the translation/adoption thesis, and the Digital Twin assistant explains Kyle via the same thesis and routes visitors by need. Machine-readable crawler/LLM summaries are aligned to the hybrid Forward Deployed Engineer · Technical Systems Translator positioning.

Customer Success is presented as an **evidence layer**, not a seniority claim — no managed book of business, ARR/NRR, or renewal/expansion ownership is asserted anywhere.

## Engineering Evidence

This repository is itself part of the portfolio. The site is the artifact, but the reasoning
behind it is documented openly — how it was built, what was decided and why, and where AI helped
versus where human judgment did the work. If you only read three files, read these.

### 🏗 How It Was Built — [`HOW_IT_WAS_BUILT.md`](HOW_IT_WAS_BUILT.md)

The honest build narrative. The portfolio was prototyped in Google AI Studio (Gemini) through
**directed, opinionated conversation** — not passive acceptance of model output. It documents real
pushback (the flat skill-tag wall rejected in favor of the `SkillDiscoveryModal` pattern; generic
"passionate developer" hero copy rewritten against a named audience). It then names the **four
concrete gaps that surfaced when the prototype was exported to production** and how each was fixed:

- **No strict `tsconfig.json`** — AI Studio's permissive in-browser typing hid real errors; strict
  mode was authored and the code brought into compliance.
- **No real build pipeline** — the prototype ran from `esm.sh` CDN imports and an importmap; it was
  migrated to a proper Vite + npm dependency pipeline.
- **API key exposed in the client bundle** — `vite.config.ts` polyfilled the Gemini key into the
  browser build; fixed with a server-side Express proxy on Cloud Run.
- **Unsanitized `dangerouslySetInnerHTML`** — an XSS vector closed by adding DOMPurify with explicit
  `FORBID_TAGS` / `FORBID_ATTR`.

It closes with a candid **AI-generated vs. human-directed** breakdown and the **KS_01 design pivot** —
evaluating the original hero against the project's own `.impeccable.md` anti-patterns, finding it
non-compliant, and acting on that rather than rationalizing it. Using AI well — knowing when to push
back, what to verify, and what to fix — is treated as the skill being demonstrated.

### 🧭 Architecture Decisions — [`DECISIONS.md`](DECISIONS.md)

Six Architecture Decision Records, each with full context, the decision, **alternatives explicitly
rejected**, and the consequences accepted:

1. **Server-side Gemini proxy** over a client-embedded key (rejected Vercel/Netlify functions and the `VITE_`-prefixed env flag).
2. **React Router v6** over prototype-grade hash routing (rejected Next.js and keeping hash routing).
3. **Markdown files** over a headless CMS for case-study content (rejected Contentful/Sanity and hardcoded TS strings).
4. **DOMPurify** over disabling HTML rendering entirely (defense at the render site, not the content pipeline).
5. **Recruiter Mode as session state**, not a URL parameter or `localStorage` (avoids two-versions-of-truth and stale state).
6. **Vitest over Jest** (no Babel/`ts-jest` friction; shared config with the Vite build).

The value here is the trade-off reasoning — each ADR shows _why this and not the obvious alternative_.

### 🗺 Architecture Overview — [`ARCHITECTURE.md`](ARCHITECTURE.md)

The system map: stack table, repository layout, the route → component contract, the
`Browser → /api/chat → Express proxy → Gemini` data flow with its in-memory rate limit, the
runtime-fetched markdown content model with its `constants.tsx` fallback, and the consolidated
security summary. Start here for a fast structural read of how the pieces fit.

### 🔍 AI Attribution — [`AI_ATTRIBUTION.md`](AI_ATTRIBUTION.md)

The source-of-truth ledger for every AI-assisted contribution across Portfolio2.0 (and related
projects). It grades each session **PRIMARY / SUPPORTING / DIRECTIONAL**, distinguishes **Gemini
from Claude** work explicitly, and — notably — **flags what cannot be attributed** rather than
papering over gaps. It also traces the Project Aegis prompt-engineering lineage. This is the
provenance discipline the portfolio's authoring standards require, applied to the portfolio itself.

## Security Posture

The full security review and its resolution trail live in
[`SECURITY_AUDIT.md`](SECURITY_AUDIT.md) (ship-safe engagement), with policy in
[`SECURITY.md`](SECURITY.md) and threat modeling in [`THREAT_MODEL.md`](THREAT_MODEL.md).

**Every finding affecting application code or the production runtime has been addressed and
resolved.** Highlights:

- Gemini calls are proxied server-side; the API key is never in the client bundle (CI fails the build on a leak).
- `/api/chat` enforces server-side rate limiting, input validation, prompt-injection filtering, and chat-history sanitization.
- Helmet security headers are enabled, including a restrictive `Permissions-Policy` — **deployed headers verified grade A** (securityheaders.com).
- All rendered HTML passes through DOMPurify; the Docker production stage runs as a non-root user; CI pins GitHub Actions to commit SHAs.
- **Production dependency tree (`npm audit --omit=dev`): 0 known vulnerabilities.** The only open advisories are dev-only build tooling (Vite/Vitest major upgrades), never shipped to production and tracked by Dependabot.
- Known limitation: rate limiting is in-memory and resets on container restart/scale events (accepted at portfolio scale).

## Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | React 18, TypeScript strict, Vite 5, Tailwind v3 |
| Routing  | React Router v7                                  |
| AI       | Gemini 2.0 Flash via server-side Express proxy   |
| Server   | Express on Cloud Run                             |
| Testing  | Vitest + Testing Library                         |
| CI       | GitHub Actions                                   |

## Documentation Index

| File                                       | Description                                                  |
| ------------------------------------------ | ------------------------------------------------------------ |
| [HOW_IT_WAS_BUILT.md](HOW_IT_WAS_BUILT.md) | Build narrative and AI/human contribution breakdown          |
| [DECISIONS.md](DECISIONS.md)               | Six Architecture Decision Records with rejected alternatives |
| [ARCHITECTURE.md](ARCHITECTURE.md)         | Stack overview, system map, and security notes               |
| [AI_ATTRIBUTION.md](AI_ATTRIBUTION.md)     | Source-of-truth ledger for AI-assisted work                  |
| [SECURITY.md](SECURITY.md)                 | Security policy and reporting                                |
| [THREAT_MODEL.md](THREAT_MODEL.md)         | Threat table, accepted risks, deferred hardening             |
| [SECURITY_AUDIT.md](SECURITY_AUDIT.md)     | Full audit findings and resolution status                    |
| [public/llms.txt](public/llms.txt)         | Machine-readable project context                             |

---

## Getting Started

> The sections below are for running the project locally. Most visitors will want the
> [live site](https://kyle-semple-portfolio-786228485832.us-central1.run.app) and the
> [Engineering Evidence](#engineering-evidence) above.

### Prerequisites

Node 20 — managed via [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

### Setup

```bash
git clone https://github.com/slyberia/Portfolio2.0.git
cd Portfolio2.0
cp .env.example .env.local
npm install
npm run dev
```

> **Note:** `VITE_GEMINI_ENABLED=true` requires the Express server running alongside Vite.
> Use `npm run dev:full` to start both.

## Scripts

| Script                          | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `npm run dev`                   | Vite dev server on :5173                                      |
| `npm run build`                 | Type-check and build for production                           |
| `npm test`                      | Run Vitest                                                    |
| `npm run typecheck`             | TypeScript type checker (no emit)                             |
| `npm run lint`                  | ESLint (zero warnings)                                        |
| `npm run format:check`          | Check formatting without writing                              |
| `npm run dev:full`              | Vite + Express concurrently                                   |
| `npm run serve`                 | Express server on :8080                                       |
| `npm run generate:crawler-html` | Generate dist HTML snapshots for crawler routes               |
| `npm run validate:crawler`      | Validate snapshot route coverage + sitemap/canonical metadata |

## Crawler Snapshot Drift Guardrail

Crawler snapshots are intentionally maintained manually for stability (not derived from React components). To reduce content drift risk, run:

```bash
npm run build
npm run validate:crawler
```

This validator checks required canonical route coverage in the generator and sitemap, snapshot metadata completeness (`title`, description, canonical, meaningful body text), `/llms.txt` and `/ai-index` links, deprecated `/case-studies` exclusions from primary sitemap entries, and stale Cloud Run domain references in sitemap/metadata/snapshots.

## Project Structure

```
src/
├── components/     # Reusable UI components (ErrorBoundary, HTMLSection, ...)
├── context/        # React Context providers (RecruiterModeContext)
├── constants/      # App-wide constants and category definitions
├── data/           # Static data files
├── hooks/          # Custom hooks (useCaseStudyContent)
├── utils/          # Utility functions (readingTime, recruiterSummary, ...)
├── views/          # Page-level components (HomeView, CaseStudyView, ResumeView)
└── test/           # Vitest setup and shared test utilities
server/
├── geminiProxy.ts  # POST /api/chat handler with rate limiting
└── index.ts        # Express entry point, static serving, SPA fallback
public/
└── case-studies/   # Markdown case study content (fetched at runtime)
```

## Positioning Refactor (Phase 6)

The information architecture was refactored from a role-track-led layout to the thesis-led model above. A later positioning workstream (Tracks F0–F6) evolved the lead identity to the hybrid **Forward Deployed Engineer · Technical Systems Translator** and propagated it across the homepage, résumé and downloadable PDF, SEO, Digital Twin, `llms.txt`, and crawler/markdown mirrors; it also added a dedicated print/PDF résumé template and a download/share flow. See [`docs/positioning-refactor-plan.md`](docs/positioning-refactor-plan.md) for the full subphase plan and [`AGENTS.md`](AGENTS.md) for the positioning north star.

1. Central FDE positioning & hero thesis
2. "What I Help Teams Do" proof pillars
3. Role tracks demoted to role-relevance lenses
4. Stakeholder-value layer on project cards
5. Case-study stakeholder-value sections
6. Deep-dive value bridges
7. Digital Twin FDE prompt & need-based routing
8. Crawler / LLM summary alignment
9. Navigation alignment & route preservation (Gallery surfaced in nav)
10. Docs, release notes & final validation

## License

[MIT](LICENSE)
</content>
</invoke>
