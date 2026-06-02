# AGENTS.md — Portfolio 2.0

Cross-tool instructions for any AI agent (Claude Code, Codex, Jules, etc.) working in this
repository. **`CLAUDE.md` is the canonical source of truth** for the full design system,
formatting, and execution rules — read it first. This file is the short, tool-agnostic
summary plus the current positioning north star.

## Positioning north star (keep all copy consistent with this)

- **Name:** Kyle Semple — never "Kyle Genesis" or any other variant.
- **Primary title:** Forward Deployed Engineer.
- **Central thesis:** _I help teams turn complex technical, operational, and spatial problems into systems people can understand, adopt, and use._
- **Supporting bridge:** _My work connects forward-deployed engineering, technical implementation, customer success, solutions/systems architecture, GIS, operations, and AI workflow design._

The site leads with this one argument. Role tracks are supporting metadata / lower-priority
lenses, not the primary framing. The active workstream is **Phase 6 — Positioning Refactor**,
detailed in `docs/positioning-refactor-plan.md`.

## Hard guardrails

- **Customer Success is an evidence layer, not the identity.** No CSM seniority, managed book
  of business, or ARR/NRR/renewal/expansion claims anywhere.
- **Do not invent** metrics or customers. On-site inventory: `luxe-lofts`, `ops-triage`,
  `guynode`, `digital-twin` (registry) + `prompter-hub`, `project-aegis`, `nba-systems-qa`
  (case studies). **Northern Grind** and **MOH (Ministry of Health)** are real projects not yet
  on the site — add them only via the gated subphase 6.11, with Kyle-provided source material.
- **Design system is non-negotiable** (see `CLAUDE.md`): no glassmorphism, solid 1px borders,
  the documented light/dark contrast tiers. No generic SaaS-template aesthetics.
- **Preserve routes.** Repurpose role-track pages; never break links without redirects and
  reference updates.
- **No "launch-ready" claims** unless the full validation suite passes.

## Execution protocol

- **One subphase at a time.** Implement a single subphase, validate, commit with the subphase
  identifier, STOP, and wait for explicit approval before the next. Do not pre-build later
  subphases.
- Prefer surgical edits. Inspect the repo before assuming filenames; key file locations are
  listed in `docs/positioning-refactor-plan.md` §4.

## Validation suite

```bash
npm run typecheck            # zero errors
npm run lint                 # zero warnings
npm run format:check         # prettier clean (run `npm run format` first)
npm test -- --run            # vitest, single run
npm run build                # tsc + vite build
# For content / SEO / crawler changes, additionally:
npm run generate:crawler-html
npm run validate:crawler
```

If a command fails on the base branch too, document it as **pre-existing** — do not hide it.

## Commit convention

Conventional commits with the subphase identifier, e.g.
`feat: subphase 6.1 — central FDE positioning & hero thesis`.
