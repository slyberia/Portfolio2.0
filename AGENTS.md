# AGENTS.md — Portfolio 2.0

Cross-tool instructions for any AI agent (Claude Code, Codex, Jules, etc.) working in this
repository. **`CLAUDE.md` is the canonical source of truth** for the full design system,
formatting, and execution rules — read it first. This file is the short, tool-agnostic
summary plus the current positioning north star.

## Positioning north star (keep all copy consistent with this)

- **Name:** Kyle Semple — never "Kyle Genesis" or any other variant.
- **Primary positioning (hybrid, FDE-anchored):** **Forward Deployed Engineer · Technical Systems Translator.**
  **Forward Deployed Engineer** is the searchable role anchor (not replaced, not demoted);
  **Technical Systems Translator** is the co-equal capability descriptor that explains the value at
  first read. The two appear together, at the same first-read altitude, on global positioning
  surfaces once the F2+ implementation tracks land.
- **Central thesis (unchanged):** _I help teams turn complex technical, operational, and spatial problems into systems people can understand, adopt, and use._
- **Supporting bridge:** _My work connects forward-deployed engineering, technical implementation, customer success, solutions/systems architecture, GIS, operations, and AI workflow design._

The site leads with this one argument. Role tracks / role lenses are supporting metadata /
lower-priority lenses, not the primary framing — FDE is **both** the anchor **and** one role lens.
The role-lane taxonomy is fixed: `Forward Deployed Engineer`, `Implementation Consultant`,
`Spatial Systems Architect`, `AI Workflow / Portfolio Governance`. The active workstream is
**Phase 6 — Positioning Refactor**, detailed in `docs/positioning-refactor-plan.md`; the global
positioning decision is recorded in `docs/global-positioning-audit.md` (Track F0).

## Hard guardrails

- **Hybrid title, not an Architect promotion.** Accept **Technical Systems Translator** as a
  capability descriptor alongside the **Forward Deployed Engineer** anchor. "Solutions Architect /
  Architect" is still **rejected** as the lead title (overclaim of enterprise-architect seniority —
  see `docs/positioning-refactor-plan.md` §2/§7.4). Do not promote "Solutions Architect & Technical
  Systems Translator" to the lead title, do not rename `Implementation Consultant` back to
  `Solutions Architect`, and do not erase the descriptor to revert to FDE-only.
- **Customer Success is an evidence layer, not the identity.** No CSM seniority, managed book
  of business, or ARR/NRR/renewal/expansion claims anywhere. Never reintroduce "Customer Success"
  or "CSM" as a primary identity or target role.
- **Do not invent** metrics or customers. On-site inventory: `luxe-lofts`, `ops-triage`,
  `guynode`, `digital-twin`, `project-aegis` (Automation & Operational Protocols — Aegis/emOS,
  published in 7.7b), `portfolio-pipeline` (Portfolio 2.0 — Governed AI Build Pipeline, 7.8),
  `northern-grind`, `moh` (registry). `prompter-hub` and `nba-systems-qa` were retired in 7.7a.
  **Northern Grind** is now implemented as a public project entry and deep dive; **MOH (Ministry
  of Health)** is now implemented as a public project entry (no deep dive yet). Future edits to
  either must use Kyle-provided source material and never fabricate metrics, customers, or
  outcomes.
- **Design system is non-negotiable** (see `CLAUDE.md`): no glassmorphism, solid 1px borders,
  the documented light/dark contrast tiers. No generic SaaS-template aesthetics.
- **Preserve routes.** Repurpose role-track pages; never break links without redirects and
  reference updates.
- **No "launch-ready" claims** unless the full validation suite passes.

## Authoring standard (decision-evidence layer)

Project entries and deep dives keep the stakeholder-value frame **and** make a decision-evidence
layer visible: `Context → Decision Criteria → Trade-off → Evidence → Capability Signal`. Cards
compress this into first-read clarity (capability-first, no job-title stuffing); case-study
bodies carry at least one explicit decision-rationale/trade-off/evidence moment; deep dives pair
the Translation/Adoption/Implementation-maturity bridge with visible decisions and maturity
boundaries. **Full spec and templates live in `CLAUDE.md` → "Authoring Standards —
Decision-Evidence Layer."** Do not duplicate it here.

When AI is used in a write-up, distinguish human direction, AI-assisted generation, reference
inputs, human curation/validation, provenance/risk boundaries, and production-ready vs.
prototype/model-only. Never present AI as final legal, strategic, or technical authority; add
provenance/derivative-risk caution for asset work and validation/CI/review boundaries for
code/system work.

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
