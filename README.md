<div align="center">
  <img src="public/og-image.svg" width="900" alt="Kyle Semple Portfolio" />

# Kyle Semple — Professional Portfolio

**Technical Implementation · QA · GIS Systems · Ann Arbor, MI**

[Live Site](https://portfoli02-786228485832.northamerica-northeast2.run.app) · [How It Was Built](HOW_IT_WAS_BUILT.md) · [Architecture Decisions](DECISIONS.md) · [Architecture Overview](ARCHITECTURE.md)

[![CI](https://github.com/slyberia/Portfolio2.0/actions/workflows/ci.yml/badge.svg)](https://github.com/slyberia/Portfolio2.0/actions/workflows/ci.yml)
![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Vite 5](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)

</div>

---

## What This Is

Portfolio2.0 is now organized around three role-track entry points: Technical Implementation Specialist, Quality Assurance Analyst, and GIS Analyst. Guynode serves as the flagship proof system, while supporting evidence cards provide secondary method-level proof.

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

| Script                 | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Vite dev server on :5173            |
| `npm run build`        | Type-check and build for production |
| `npm test`             | Run Vitest                          |
| `npm run typecheck`    | TypeScript type checker (no emit)   |
| `npm run lint`         | ESLint (zero warnings)              |
| `npm run format:check` | Check formatting without writing    |
| `npm run dev:full`     | Vite + Express concurrently         |
| `npm run serve`        | Express server on :8080             |

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

## License

MIT
