<div align="center">
  <img src="public/og-image.svg" width="900" alt="Kyle Semple Portfolio" />

# Kyle Semple — Professional Portfolio

**Technical Implementation · QA · GIS Systems · Ann Arbor, MI**

[Live Site](https://kyle-semple-technical-portfolio-786228485832.us-central1.run.app) · [How It Was Built](HOW_IT_WAS_BUILT.md) · [Architecture Decisions](DECISIONS.md) · [Architecture Overview](ARCHITECTURE.md)

[![CI](https://github.com/slyberia/Portfolio2.0/actions/workflows/ci.yml/badge.svg)](https://github.com/slyberia/Portfolio2.0/actions/workflows/ci.yml)
![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite 5](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)

</div>

---

## Current Portfolio Architecture

Portfolio2.0 is organized around three role-track entry points: Technical Implementation Specialist, Quality Assurance Analyst, and GIS Analyst. Guynode functions as the flagship proof system, while Supporting Evidence cards provide secondary method-level proof across implementation, QA, GIS, and AI-assisted workflow governance.

### Redesign Phase Sequence

1. Role-track hero
2. Guynode flagship proof
3. Supporting evidence archive
4. Track page alignment
5. Copy/naming polish
6. Final QA/release prep

## Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | React 19, TypeScript strict, Vite 5, Tailwind v3 |
| Routing  | React Router v6                                  |
| AI       | Gemini 2.0 Flash via server-side Express proxy   |
| Server   | Express on Cloud Run                             |
| Testing  | Vitest + Testing Library                         |
| CI       | GitHub Actions                                   |

## Getting Started

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

## Documentation

| File                                       | Description                                         |
| ------------------------------------------ | --------------------------------------------------- |
| [HOW_IT_WAS_BUILT.md](HOW_IT_WAS_BUILT.md) | Build narrative and AI/human contribution breakdown |
| [DECISIONS.md](DECISIONS.md)               | 6 Architecture Decision Records                     |
| [ARCHITECTURE.md](ARCHITECTURE.md)         | Stack overview and security notes                   |
| [public/llms.txt](public/llms.txt)         | Machine-readable project context                    |

## Security Posture

- Gemini calls are proxied server-side; the Gemini API key is not exposed in client bundles.
- `/api/chat` includes server-side rate limiting, input validation, topic/prompt-injection filtering, and chat-history sanitization.
- Helmet security headers are enabled on the Express server.
- CI includes a Gemini bundle leak check and a general secret scan.
- Dependabot is configured for npm and GitHub Actions updates.
- Threat modeling is documented in `THREAT_MODEL.md`.
- Known limitation: rate limiting is in-memory and resets on container restart/scale events.
- Manual follow-up: set Gemini API quota cap in Google Cloud Console.
- Manual follow-up: verify deployed production headers after each release.

## License

MIT
