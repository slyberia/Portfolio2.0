# CLAUDE.md — Portfolio 3.0 (codex-technical-tide-v2)

## Project Overview

This is Kyle Semple's professional portfolio site. It is a React + TypeScript + Vite application with a Tailwind CSS design system, an Express server backend, and a Gemini-powered Digital Twin chatbot. It deploys via Docker multi-stage build to Google Cloud Run.

## Positioning & Messaging (north star)

The portfolio leads with **one** professional argument, not a menu of role tracks. All
copy — hero, About, project cards, case studies, deep dives, Digital Twin prompt, and
machine-readable crawler/LLM summaries — must stay consistent with this.

- **Name:** Kyle Semple (never "Kyle Genesis" or any other variant).
- **Primary title:** Forward Deployed Engineer.
- **Central thesis:** _I help teams turn complex technical, operational, and spatial problems into systems people can understand, adopt, and use._
- **Supporting bridge:** _My work connects forward-deployed engineering, technical implementation, customer success, solutions/systems architecture, GIS, operations, and AI workflow design._

Messaging guardrails:

- **Customer Success is an evidence layer, not the identity.** Do not claim CSM seniority,
  a managed book of business, or ARR/NRR/renewal/expansion ownership anywhere.
- **Role tracks are supporting metadata**, surfaced as role-relevance tags and lower-priority
  lenses — never the primary homepage framing.
- **Do not invent** metrics or customers. The on-site project inventory is `luxe-lofts`,
  `ops-triage`, `guynode`, `digital-twin`, `project-aegis` (Automation & Operational Protocols —
  Aegis/emOS, published in 7.7b), `portfolio-pipeline` (Portfolio 2.0 — Governed AI Build Pipeline,
  published in 7.8), `northern-grind`, and `moh` (registry). `prompter-hub` and `nba-systems-qa`
  were retired in 7.7a. **Northern Grind** and **MOH (Ministry of Health)** are real
  projects not yet implemented on the site — add them only via the gated subphase 6.11 in
  `docs/positioning-refactor-plan.md`, using Kyle-provided source material, never fabricated copy.

The active positioning workstream is **Phase 6 — Positioning Refactor**, documented in
`docs/positioning-refactor-plan.md`. See also `AGENTS.md` for the cross-tool summary.

## Quick Reference Commands

```bash
# Development
npm run dev              # Start Vite dev server (frontend only)
npm run serve            # Start Express backend server
npm run dev:full         # Start both concurrently

# Validation (run after every subphase)
npm run typecheck        # TypeScript type checking (zero errors required)
npm run lint             # ESLint (zero warnings required)
npm run test             # Vitest test suite
npm run build            # Full production build (tsc + vite build)
npm run format:check     # Prettier formatting check

# Specialized
npm run generate:crawler-html   # Generate static crawler HTML
npm run validate:crawler        # Validate crawler/LLM output (run after content/SEO edits)
npm run build:crawler           # Build + generate crawler HTML
npm run defense:codex           # Run appellate defense script
```

## Architecture

```
src/
├── views/               # Page-level components (one per route)
│   ├── HomeView.tsx
│   ├── ProjectsIndexView.tsx
│   ├── ProjectDetailView.tsx
│   ├── DeepDiveView.tsx
│   ├── ResumeView.tsx
│   ├── SiteIndexView.tsx
│   ├── GisTrackView.tsx
│   ├── ImplementationTrackView.tsx
│   └── OpsAnalyticsTrackView.tsx
├── components/          # Reusable UI components
│   ├── TopNav.tsx       # Top navigation bar
│   ├── SidebarNav.tsx   # Left sidebar navigation
│   ├── ChatWidget.tsx   # Digital Twin chatbot widget
│   ├── MarkdownSection.tsx  # Markdown/HTML content renderer
│   ├── tracks/          # Career track page components
│   └── home/            # Homepage-specific components
├── constants.tsx        # Project metadata, track data, content strings
├── router.tsx           # All route definitions
├── index.css            # Global CSS and design tokens
├── types.ts             # Shared TypeScript types
└── mockups.ts           # Mockup/prototype data
server/                  # Express backend (TypeScript)
tailwind.config.js       # Tailwind theme tokens and extensions
```

## Design System Rules

These rules are non-negotiable. Violating them will result in a failed review.

### Typography Contrast

- **Light mode primary text**: Pure black `#000000` or `text-slate-950`. Never use mid-grey for body copy.
- **Light mode subtext**: `text-slate-600` or warm amber-tinted grey. Never lighter than `text-slate-600`.
- **Dark mode primary text**: `text-white` or `text-slate-50`.
- **Dark mode subtext**: `text-slate-200` or `text-zinc-300`. Never darker than `text-slate-300`.
- All dark mode body text must meet WCAG AAA (7:1 contrast ratio minimum).

### Card & Border Treatment

- **NO glassmorphism.** No `backdrop-blur` with translucent white fills. This is a hallmark of generic AI-generated sites and is explicitly banned by the project's design principles.
- **Light mode cards**: Solid `border-slate-200` on `bg-white` or `bg-slate-50`.
- **Dark mode cards**: Solid `border-slate-800` on `bg-[#0B0F19]` or `bg-slate-900`. Hover states may use `hover:border-amber-500/30` for warm accent.
- Borders must be razor-thin (1px) and clearly visible in both themes.

### Anti-Patterns (from .impeccable.md — MUST AVOID)

1. Generic SaaS startup template aesthetics (indigo/purple gradients, glassmorphism, hero metric tiles, gradient text)
2. Overly corporate/stuffy layouts
3. Design-flex creative portfolio (wrong audience)
4. Plain developer resume site (forgettable)

### Design Principles (from .impeccable.md)

1. Evidence over assertion — show the work, not claim it
2. Scannable at speed, rewarding at depth — 90-second clear path; deeper exploration reveals substance
3. Distinctly human — signal a real person with taste, not a template
4. Confident restraint — hierarchy through space and weight, not effects
5. One clear step ahead — feel designed by someone who knows what's coming

## Formatting

- Prettier config is in `package.json` (printWidth: 100, singleQuote: true, trailingComma: all)
- Always run `npm run format` after edits, then verify with `npm run format:check`
- Line endings: LF

## Git Commit Convention

Use conventional commits with the subphase identifier:

```
feat: subphase 1.1 — contrast correction & typography hardening
fix: subphase 4.1 — markdown parsing regression
style: subphase 1.1 — dark mode border contrast boost
```

## Sequential Execution Protocol

This project uses a phased execution plan. The current master execution document is
`docs/positioning-refactor-plan.md` (Phase 6 — Positioning Refactor). The critical rule is:

**ONE SUBPHASE AT A TIME.**

After completing a subphase:

1. Run the full validation suite: `npm run typecheck && npm run lint && npm run format:check && npm test -- --run && npm run build`. For any subphase that touches content, SEO, or crawler files, also run `npm run generate:crawler-html && npm run validate:crawler`.
2. Commit with the subphase identifier
3. STOP and report what was done
4. Wait for explicit approval before starting the next subphase

Do NOT read ahead and pre-implement tasks from later subphases. Each subphase builds on the verified output of the previous one.
