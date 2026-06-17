# Project-Card Positioning Verification (Track F3)

> **Track F3 — verification-first.** This note records the audit of project-card labels, project
> metadata, role-lane display logic, and supporting-evidence copy against the hybrid, FDE-anchored
> positioning model adopted in Tracks F0/F1 and implemented on visitor-facing copy in F2:
>
> > **Forward Deployed Engineer · Technical Systems Translator**
>
> Outcome: the **project-card / metadata layer already meets the standard — no metadata edits were
> required.** One adjacent visible-copy drift (a Customer-Success target-identity line in the
> contact modal) was found and corrected under F3 rule #5.

## Prerequisite check

- **F0** present — `docs/global-positioning-audit.md`. ✅
- **F1** present — hybrid model recorded in `CLAUDE.md`, `AGENTS.md`, `docs/positioning-refactor-plan.md`. ✅
- **F2** present/merged — verified in the working tree: `src/views/HomeView.tsx` hero reads
  `Forward Deployed Engineer · Technical Systems Translator`; `src/router.tsx` footer reads
  `Forward-Deployed Engineering, Implementation & Technical Systems Roles`. ✅

F3 was run on a fresh branch off `main` after F2 merged.

## Files inspected

- Canonical/positioning docs: `docs/global-positioning-audit.md`, `CLAUDE.md`, `AGENTS.md`,
  `docs/positioning-refactor-plan.md`
- Metadata & taxonomy: `src/data/projectMetadata.ts`, `src/types.ts`, `src/constants.tsx`,
  `src/data/trackContent.ts`
- Card / role-lens rendering: `src/components/home/SupportingEvidenceSection.tsx`,
  `src/views/HomeView.tsx` (role-lens section + project cards)
- Adjacent visible copy (drift scan): `src/components/ContactModal.tsx`, `src/views/ResumeView.tsx`,
  `src/components/tracks/RoleTrackPage.tsx`

## How the card layer renders (capability-first confirmed)

`SupportingEvidenceSection.tsx` renders each card as:

1. **Status / featured label** + **`proofType`** chip (evidence type — e.g. _System_, _Workflow_,
   _System Architecture_, _Case Study_).
2. **Headline = `displayTitle`** — the _project name_ (e.g. "Guynode Spatial Data Hub"), **not** a
   role title.
3. **`shortSummary`** — capability-first problem/solution copy.
4. **`ProjectValueLayer`** — `purpose` + `stakeholderValue` (who benefited / what got easier).
5. **Role lanes** under a small `Role Relevance` label, rendered as **tiny chips** — i.e. metadata,
   not the headline.

This matches the F3 standard: cards read as **evidence**, role lanes are **metadata/lenses**.

## Projects verified (capability signal vs. evidence)

All eight public projects in `PROJECT_METADATA` carry capability-first `shortSummary` /
`purpose` / `stakeholderValue` and correct canonical role lanes:

| Project                                              | Capability signal (from existing metadata)                                                       | Role lanes (metadata)                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `guynode` — Guynode Spatial Data Hub                 | Spatial systems + dataset/metadata governance + public-data discoverability & trust              | Spatial Systems Architect · Forward Deployed Engineer · Implementation Consultant          |
| `digital-twin` — Digital Twin AI Agent               | Grounded AI assistant, scoped retrieval, handoff boundaries, portfolio navigation                | AI Workflow / Portfolio Governance · Forward Deployed Engineer · Implementation Consultant |
| `ops-triage` — Ops Triage                            | Operational QA, escalation/triage logic, throughput-vs-quality judgment, audit trail             | Implementation Consultant · Spatial Systems Architect                                      |
| `project-aegis` — Automation & Operational Protocols | AI-ops governance, judge/executor separation, HITL checkpoints, drift control, audit trail       | AI Workflow / Portfolio Governance · Forward Deployed Engineer                             |
| `portfolio-pipeline` — Portfolio 2.0 Build Pipeline  | Governed AI build pipeline, CI gates, drift-guards, attribution, deploy readiness                | AI Workflow / Portfolio Governance · Forward Deployed Engineer                             |
| `luxe-lofts` — Luxe Lofts                            | Requirements → scoped, phased, priceable build plan for a non-technical client                   | Forward Deployed Engineer                                                                  |
| `northern-grind` — Northern Grind                    | Small-business systems: brand/menu UX, AI-assisted assets, break-even POS/loyalty, owner handoff | Forward Deployed Engineer                                                                  |
| `moh` — Public Health GIS Workflow Support           | Public-sector GIS workflow translation, dashboard/reporting planning, adoption docs, tool-fit    | Spatial Systems Architect · Implementation Consultant · Forward Deployed Engineer          |

Each supports the decision-evidence spine (`Context → Decision Criteria → Trade-off → Evidence →
Capability Signal`) via `purpose` (context/criteria), `stakeholderValue` (trade-off/value), and
`proofType` (evidence) — no literal five-label scaffolding required, and none added.

## Drift findings

| #   | Location                                     | Finding                                                                                                                                                                                                                                                                                                | Action                                                                                                                         |
| --- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `src/components/ContactModal.tsx:90`         | ⚠️ Subline read "Currently accepting new opportunities in AI Operations & **Customer Success**." A footer-style CTA presenting Customer Success as a **target role identity** — violates the F1 canonical guardrail and rule #5. (The F0 audit checked only the modal header and missed this subline.) | **Fixed.** → "Currently accepting new opportunities in forward-deployed engineering, implementation, and AI workflow systems." |
| 2   | `src/views/ResumeView.tsx:82`                | "Customer Success Support • Technical Troubleshooting • Issue Triage" — CS as **past-experience evidence** in a skills line.                                                                                                                                                                           | **No change.** Allowed: evidence/experience, not a target identity.                                                            |
| 3   | `src/components/tracks/RoleTrackPage.tsx:34` | Skill-label map value "Customer Success Support" — describes past support experience as evidence on a role-lens page.                                                                                                                                                                                  | **No change.** Allowed: evidence framing, not a project card or target identity.                                               |
| 4   | `src/constants.tsx:361`                      | `SKILL_CHIP_CONFIG` key `'Customer Success Support'` — a skill chip (experience evidence).                                                                                                                                                                                                             | **No change.** Allowed: evidence.                                                                                              |
| 5   | `src/views/HomeView.tsx:479`                 | About-Me paragraph lists "solutions architecture" as a connecting **discipline** (lowercase, work area — not the rejected role title "Solutions Architect").                                                                                                                                           | **No change.** Out of F3 card/metadata scope; rule #6 permits "architecture" as work evidence. Flagged for F6 consideration.   |

### Customer Success

Not presented as a target identity anywhere after fix #1. Remaining references are valid
past-experience / support-operations evidence — preserved per rule #5.

### Solutions Architect

**Not reintroduced** as a role, lane, or primary identity anywhere in metadata or card copy. The
role-lane taxonomy retains `Implementation Consultant` (not "Solutions Architect"). The only
"architecture" usages describe **system / information / spatial-systems architecture** as work
evidence (e.g. `proofType: 'System Architecture'`, the `Spatial Systems Architect` lane), which
rule #6 explicitly permits.

## Taxonomy preserved

`RecruiterRoleLane` (`src/types.ts:38–42`) is unchanged:
`Forward Deployed Engineer` · `Implementation Consultant` · `Spatial Systems Architect` ·
`AI Workflow / Portfolio Governance`. No lanes renamed, added, or removed; sort order, IDs,
visibility, and proof artifacts untouched.

## Changes made

- `src/components/ContactModal.tsx` — one-line CTA reframe (drift fix #1). **No** project-card,
  metadata, taxonomy, route, SEO, Digital Twin, crawler, deep-dive, or case-study edits.

## Recommendations for Track F6 (final review)

- Confirm the contact-modal CTA reads consistently with the hero/footer on a live preview.
- Consider, in a copy-only pass, whether the About-Me paragraph's "solutions architecture" phrasing
  (HomeView.tsx:479) should be tightened to match the F2 hero bridge — minor, optional, not drift.
- Re-verify role-lane chips render as metadata (not headlines) across desktop/mobile.

## Validation

See the Track F3 completion report. `npm run format:check` is load-bearing for this docs + one-line
change; `typecheck`/`lint`/`test`/`build` share the pre-existing unpopulated-`node_modules`
environment limitation documented in F0–F2.
