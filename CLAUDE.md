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
  were retired in 7.7a. **Northern Grind** is now implemented as a public project entry and deep
  dive; **MOH (Ministry of Health)** is now implemented as a public project entry (no deep dive
  yet). Future edits to either must use **Kyle-provided source material** and never fabricate
  metrics, customers, or outcomes.

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

## Authoring Standards — Decision-Evidence Layer

Every project entry and deep dive keeps the existing **stakeholder-value frame** (Purpose ·
Stakeholder/Customer Value · Role Relevance · Proof Type · Role/Outcome/Stack/Relevance ·
Overview/Executive Summary · Challenge/Implementation/Impact · Constraints & Trade-offs ·
Customer/Stakeholder Value). On top of that, each entry must also make a **decision-evidence
layer** visible so strong work reads as a hiring argument, not a list of outputs. This layer is
additive and must stay skimmable — no bloated prose.

**The spine (make these legible, not necessarily as literal headings):**

```md
Context → Decision Criteria → Trade-off → Evidence → Capability Signal
```

- **Context** — the messy business/technical/operational/stakeholder problem that existed.
- **Decision Criteria** — the variables that governed the choice (e.g. legibility, scalability,
  maintainability, adoption, risk, cost, quality, local fit, implementation burden).
- **Trade-off** — what was gained and what was sacrificed.
- **Evidence** — the artifact, model, reference input, test, audit, dataset, or workflow that
  supports the decision.
- **Capability Signal** — what a recruiter/client should recognize (e.g. implementation
  judgment, systems translation, UX reasoning, governance discipline, stakeholder adoption,
  operational rigor).

### Project-library cards (compact)

Card metadata stays compact but must compress the decision-evidence layer into first-read
clarity. For `shortSummary`, `purpose`, `stakeholderValue`, `proofType`, and
`canonicalRoleLanes`, the card should answer, at a glance:

- What problem was solved? · Who benefited? · What got easier? · What proof type is this? ·
  What capability should the reader recognize?

Keep copy **capability-first**; do not job-title-stuff. Role lanes may remain, but they are
metadata, not the headline.

### Case-study bodies

Each case-study body includes **at least one explicit decision-evidence moment** — a "Decision
Rationale" subsection, a "Trade-offs" section, a concise evidence block, a before/after
comparison, an artifact explanation, or a criteria-based selection note.

> **Do not claim unmeasured outcomes.** Use careful language — "designed to reduce", "intended
> to improve", "modeled", "implementation-ready", "supports". Avoid "increased revenue",
> "reduced line time", "improved conversion", "proved adoption" unless real measured evidence
> exists.

### Deep dives

Preserve the bespoke `DeepDiveBridge` pattern — **Translation · Adoption · Implementation
maturity**. The middle of a deep dive may stay bespoke, but the entry must still make decisions
and evidence visible:

- What was opaque/complex, and how was it translated into a model, workflow, artifact, or
  recommendation?
- What adoption constraint shaped the design?
- What implementation-maturity boundary is explicit (modeled · prototype-only · validated ·
  production-ready)?

### AI-assisted work

When AI is used in any entry or deep dive, the write-up must distinguish: **human direction**,
**AI-assisted generation/drafting/exploration**, **reference/source inputs**, **human
curation/validation**, **provenance/risk boundaries**, and **what was production-ready vs.
prototype/model-only**. Never present AI as final legal, strategic, or technical authority.

- **Creative/asset work:** include provenance and derivative-risk caution when relevant.
- **Code/system work:** include validation, testing, CI, review, or handoff boundaries when
  relevant.

> Applying this layer to existing entries is **future, separate work** — see the
> Decision-Evidence Workstream (Tracks A–F) in `docs/positioning-refactor-plan.md`. Do not
> retrofit existing entries under this guidance task.

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
