# Global Positioning Audit & Recommendation

> **Track F0 — audit/planning only.** This document inventories where the portfolio's global
> positioning appears, assesses its first-read clarity, compares positioning options, and
> recommends a model and a future implementation sequence (Track F1–F6). It does **not** change
> homepage copy, footer CTA, role taxonomy, project entries, deep dives, routes, visual design,
> crawler behavior, or metadata structures. It is the map that a future Track F edits from.
>
> Track F0 sits under the **Decision-Evidence Workstream (Tracks A–F)** in
> `docs/positioning-refactor-plan.md` §10, where Track F is listed as "optional global
> positioning cleanup (FDE vs. systems-translator)." This is the deferred audit that decides
> whether — and how — that cleanup should run.

---

## Purpose

Earlier tracks (A–E) improved project-entry and deep-dive clarity. A recurring critique remains
about the **global** layer: the central thesis is strong, but the first-read umbrella may
overweight the title **Forward Deployed Engineer (FDE)**, creating role ambiguity for visitors
scanning quickly.

The thesis is not in question:

> _I help teams turn complex technical, operational, and spatial problems into systems people can
> understand, adopt, and use._

The open question is narrow:

> Should **Forward Deployed Engineer** remain the **primary title**, or become **one role lens**
> under a broader capability-first umbrella (e.g. Solutions Architect / Technical Systems
> Translator), or should the portfolio adopt a **hybrid** structure?

The goal is **not** to erase FDE. The goal is to decide its altitude and fix the global-layer
inconsistencies that currently create the friction.

---

## Current Positioning Inventory

Where global positioning is encoded today, with file/path anchors.

### Canonical / governance docs

| Surface            | Location                                            | Current positioning                                                                                                                                                                      |
| ------------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project north star | `CLAUDE.md` (Positioning & Messaging)               | Primary title **Forward Deployed Engineer**; thesis + supporting bridge verbatim.                                                                                                        |
| Cross-tool summary | `AGENTS.md` (Positioning north star, lines 8–17)    | Same: **Primary title: Forward Deployed Engineer**; lenses are supporting metadata.                                                                                                      |
| Master plan        | `docs/positioning-refactor-plan.md` §2              | Canonical positioning table fixes FDE as primary; §2 corrections **explicitly reject** "Solutions Architect & Technical Systems Translator" as the title (overclaim risk).               |
| Lane decision      | `docs/positioning-refactor-plan.md` §7.4 (RESOLVED) | Second lane renamed **Solutions Architect → Implementation Consultant**; FDE retained as primary; notes Kyle has no engineering degree/licence (a flagged "Engineer" credential nuance). |

### App surfaces (visitor-facing)

| Surface                 | Location                                | Current positioning                                                                                                     |
| ----------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Hero eyebrow            | `src/views/HomeView.tsx:336`            | `SYSTEMS · ADOPTION · PROOF` (capability-first kicker — already good).                                                  |
| Hero name               | `src/views/HomeView.tsx:338–340`        | **Kyle Semple**                                                                                                         |
| **Hero title**          | `src/views/HomeView.tsx:341–343`        | **Forward Deployed Engineer** (the title line — the contested element).                                                 |
| Hero thesis             | `src/views/HomeView.tsx:349–352`        | Full thesis sentence.                                                                                                   |
| Hero supporting bridge  | `src/views/HomeView.tsx:353–357`        | The "my work connects … " multi-discipline bridge.                                                                      |
| About copy              | `src/views/HomeView.tsx:478–492`        | "systems-minded technical operator"; lists FDE, solutions architecture, spatial, support, AI.                           |
| About profile signal    | `src/views/HomeView.tsx:499–509`        | Chips: Systems thinker · Technical translator · GIS + workflow builder · QA-minded operator.                            |
| **Role-lens section**   | `src/views/HomeView.tsx:516–586`        | Header `ROLE_LENSES` / "Explore by Role Lens" (correctly framed as optional). Three cards (below).                      |
| Role-lens card titles   | `src/views/HomeView.tsx:197–302`        | **Forward Deployed Engineer** · **Implementation Consultant** · **Spatial Systems Architect**.                          |
| Experience intro        | `src/views/HomeView.tsx:634–637`        | "forward deployed engineering, spatial systems operations, workflow delivery, customer support …".                      |
| **Footer CTA headline** | `src/router.tsx:224–227`                | ⚠️ **"Open to AI-Forward Customer Success and Solutions Roles."** — contradicts FDE title + CS-evidence-only guardrail. |
| Footer CTA subcopy      | `src/router.tsx:228–231`                | "next challenge in an AI-forward company that values operational excellence."                                           |
| Contact modal           | `src/components/ContactModal.tsx:84–89` | Neutral ("Contact" / "Let's Connect") — no role claim. No conflict.                                                     |

### Role taxonomy / metadata

| Surface                          | Location                                   | Current positioning                                                                                                                |
| -------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Canonical role-lane type         | `src/types.ts:38–42` (`RecruiterRoleLane`) | `Forward Deployed Engineer` \| `Implementation Consultant` \| `Spatial Systems Architect` \| `AI Workflow / Portfolio Governance`. |
| Role-accent map                  | `src/data/projectMetadata.ts:52–57`        | Maps each canonical lane to a visual accent lane (Implementation / QA / GIS).                                                      |
| Per-project `canonicalRoleLanes` | `src/data/projectMetadata.ts:76–275`       | Every project tags 1–3 canonical lanes; most resolve up to **Forward Deployed Engineer**.                                          |
| Track content                    | `src/data/trackContent.ts:71+`             | `implementationTrackContent.title = 'Forward Deployed Engineer'`; lens-level value bridges.                                        |

### Machine-readable / AI surfaces

| Surface             | Location                            | Current positioning                                                                                                                     |
| ------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| SEO default title   | `src/lib/seo.ts:59`                 | "Kyle Semple — Forward Deployed Engineer".                                                                                              |
| SEO default desc    | `src/lib/seo.ts:60–62`              | FDE-first + thesis + discipline list (CS explicitly "as evidence").                                                                     |
| Resume SEO          | `src/lib/seo.ts:153–166`            | FDE-first resume summary.                                                                                                               |
| Track SEO           | `src/lib/seo.ts:73–114`             | Per-lens titles (Forward Deployed / Implementation Consultant / Spatial Systems Architect).                                             |
| LLM companion index | `public/llms.txt:5–8`               | "Kyle Semple is a **Forward Deployed Engineer**"; lenses explicitly "supporting metadata on a single thesis — not separate identities." |
| Digital Twin prompt | `server/geminiProxy.ts:115–165`     | "Kyle Semple is a Forward Deployed Engineer … lead with this single thesis"; need-based routing; CS = evidence layer.                   |
| Crawler generator   | `scripts/generate-crawler-html.mjs` | Emits the FDE-first machine summaries (regenerated from the same source positioning).                                                   |

**Inventory takeaway:** FDE-first is **consistently** wired across docs, app, taxonomy, and
machine surfaces — with **one material exception**: the footer CTA still markets "Customer
Success and Solutions Roles," which both contradicts the FDE title and brushes the
CS-evidence-only guardrail. That footer is the single largest internal positioning inconsistency
in the repo today.

---

## Current Message Hierarchy

As a visitor currently experiences it, top to bottom:

1. **Eyebrow** — `SYSTEMS · ADOPTION · PROOF` (capability-first; strong).
2. **Name** — Kyle Semple.
3. **Primary title** — **Forward Deployed Engineer** (single, prominent role-title line).
4. **Supporting thesis** — "I help teams turn complex … into systems people can understand,
   adopt, and use."
5. **Supporting bridge** — the multi-discipline sentence (FDE, implementation, CS,
   solutions/systems architecture, GIS, operations, AI workflow).
6. **Primary CTAs** — View Flagship Project · Download Resume.
7. **"What I Help Teams Do"** pillars (capability-first).
8. **Flagship system** (Guynode) → About → supporting evidence (project cards).
9. **Role lenses** — explicitly optional ("the same work, filtered to how a specific role
   evaluates it").
10. **Deep dives → Experience → Skills → Education.**
11. **Footer CTA** — "Open to AI-Forward **Customer Success and Solutions Roles**."

**How it reads:** Mostly **one clear professional identity, FDE-first**, with capabilities and
proof reinforcing it and role tracks correctly demoted to optional lenses. The **thesis and
pillars already do strong capability-first work.** Two hierarchy problems remain:

- **The title precedes the value proposition.** A reader meets the label "Forward Deployed
  Engineer" (step 3) before the plain-language thesis that explains what that means (step 4). For
  a reader who doesn't recognize FDE as a role, the title carries the first impression unaided.
- **The footer contradicts the top.** The closing CTA reframes Kyle as targeting "Customer
  Success and Solutions Roles," so the page **opens FDE-first and closes CS/Solutions-first** —
  competing rather than reinforcing signals.

Net classification: **FDE-first and largely coherent**, undercut by a title-before-meaning order
and a contradictory footer — not "several competing roles," but not yet frictionless either.

---

## Recruiter / Visitor Skim Risk

| Reader & budget                                | Likely first-read outcome                                                                                                                  | Friction                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Recruiter, ~10s**                            | Reads name + "Forward Deployed Engineer" + maybe the eyebrow. May not know FDE; forms a narrow or uncertain "what role is this?" snapshot. | Title is doing the work before the thesis; FDE is recognizable at Palantir-adjacent shops but niche elsewhere. |
| **Hiring manager, ~30s**                       | Reads title + thesis + pillars; gets a coherent "translates complex systems into adoption-ready tools" picture.                            | If they later hit the footer, the "CS and Solutions Roles" line muddies the target role they just inferred.    |
| **Technical reader, ~2min**                    | Title + thesis + Guynode/flagship + a lens; recognizes implementation/GIS/AI-governance substance. Strong fit.                             | Minor: "Engineer" without an engineering degree is a defensible-but-flaggable nuance (already noted in §7.4).  |
| **Non-technical stakeholder (business value)** | Thesis + pillars + "what got easier" card copy land well; this audience is served by capability-first framing, not the title.              | "Forward Deployed Engineer" is the least legible element for this reader; the thesis rescues it.               |

**Identified friction (global layer):**

- **Title-before-meaning.** FDE appears before the broader value proposition is understood
  (general critique confirmed at `HomeView.tsx:341–352`).
- **Footer CTA is both too narrow and off-thesis.** "Customer Success and Solutions Roles"
  (`router.tsx:224–227`) is the clearest skim contradiction and the highest-priority fix.
- **Title narrowness for non-FDE audiences.** Outside forward-deployed-aware orgs, the label can
  read as either narrow or unfamiliar.
- **What it is _not_:** project cards already use **capability-first** `shortSummary` /
  `stakeholderValue` copy (not job-title labels), role tracks are already demoted to optional
  lenses, and machine summaries already frame lenses as "supporting metadata on a single thesis."
  Those earlier tracks did their job. GIS, AI governance, implementation, and stakeholder-adoption
  signals **reinforce** rather than compete in the body — the problem is concentrated in the
  **title altitude** and the **footer**.

---

## Positioning Options

### Option A — Keep FDE-first (status quo, cleaned)

```txt
Forward Deployed Engineer
Turning complex systems into adoption-ready tools, workflows, and evidence.
```

- **Strengths:** Already wired end-to-end (docs, app, taxonomy, SEO, Digital Twin, crawler);
  searchable, recognizable in forward-deployed-aware orgs; evidence-matched (stakeholder-facing
  implementation, AI workflow, GIS, ops); avoids the architect-seniority overclaim the master plan
  already rejected; lowest implementation cost.
- **Risks:** Title still carries the first impression for readers who don't recognize FDE; the
  title-before-meaning order persists; doesn't, by itself, fix the footer.
- **Best-fit audiences:** Palantir-style / forward-deployed / customer engineering orgs;
  technical hiring managers.
- **Cleanup needed:** Fix the footer CTA; consider tightening the title's supporting line so the
  capability meaning lands at the same instant as the label.

### Option B — Broaden the primary title

```txt
Solutions Architect & Technical Systems Translator
```

or `AI-Forward Solutions Architect` / `Technical Systems Translator`.

- **Strengths:** Capability-first; "Technical Systems Translator" maps almost exactly to the
  thesis; broader recognition across product/implementation/ops audiences.
- **Risks:** **Directly conflicts with prior, recorded decisions** — `positioning-refactor-plan.md`
  §2 explicitly rejected "Solutions Architect & Technical Systems Translator" as the title
  (overclaim of enterprise-architect seniority), and §7.4 retired "Solutions Architect" as a lane
  label in favor of "Implementation Consultant." "Architect" overclaims seniority the evidence
  doesn't yet support; "Technical Systems Translator" alone is non-searchable and unconventional as
  a job title. Highest churn: would touch every surface in the inventory.
- **Best-fit audiences:** Generalist recruiters, product/ops orgs — but at the cost of the
  technical-implementation specificity FDE signals.
- **Cleanup needed:** Effectively a full re-spine of docs, taxonomy, SEO, Digital Twin, crawler —
  and re-litigating two already-closed decisions.

### Option C — Hybrid (umbrella + role lenses), FDE-anchored

```txt
Forward Deployed Engineer · Technical Systems Translator
Forward-Deployed Engineering · Implementation · GIS · AI Workflow Systems
```

(Variant: lead with the capability descriptor and keep FDE as the named role anchor immediately
adjacent, so the umbrella reads capability-first while the searchable title is preserved.)

- **Strengths:** Keeps FDE (searchable, evidence-matched, already wired) **and** front-loads the
  capability meaning so a non-FDE reader understands the value at first glance; honors "do not
  erase FDE" and "do not overclaim architect" simultaneously; matches what the body of the site
  already does (capability-first pillars + FDE thesis).
- **Risks:** A two-part title risks dilution if overstuffed; must stay to one tight line, not a
  slash-salad of every discipline.
- **Best-fit audiences:** Spans technical hiring managers (read FDE) and generalist/product/ops
  readers (read the translator/systems descriptor) without choosing one at the other's expense.
- **Cleanup needed:** Tighten the hero title line; **fix the footer CTA** to match; verify the
  descriptor phrase propagates consistently to SEO/Digital Twin/crawler. Lower churn than B
  because the taxonomy, lane labels, and machine summaries stay valid.

---

## Recommendation

**Adopt Option C — the Hybrid, FDE-anchored model.** Keep **Forward Deployed Engineer** as the
primary, searchable role anchor, but make the **capability-first descriptor co-equal at first
read** so a reader understands the value before (or exactly as) they parse the title — and fix the
footer so the page's close reinforces its open.

This is the recommendation because it is the only option that satisfies every standing constraint
at once: it does not erase FDE; it does not promote "Architect" to a lead title (an overclaim the
master plan already rejected twice, §2 and §7.4); it keeps Customer Success as an evidence layer;
and it respects the actual project evidence — implementation-ready systems (Luxe Lofts, Northern
Grind), AI-assisted workflow governance (Portfolio pipeline, Aegis/emOS, Digital Twin), GIS/spatial
systems (Guynode, MOH), public-health workflow support (MOH), small-business systems design
(Northern Grind), QA/operations triage (Ops Triage), and client/stakeholder adoption throughout.

Concrete answers to the recommendation's required questions:

- **Primary title?** Retain **Forward Deployed Engineer** as the role anchor, paired on one line
  with a capability descriptor (e.g. **"Technical Systems Translator"** or "Systems Implementation
  & Translation"). Do **not** replace it with "Solutions Architect."
- **Supporting thesis?** Unchanged — keep the canonical thesis verbatim. It is the asset; the
  recommendation exists to make sure it lands at first read.
- **Where should FDE appear?** As the title anchor (hero, SEO title, Digital Twin lead, resume
  lead) **and** as one named role lens — exactly its current dual placement. Its altitude doesn't
  drop; its meaning is front-loaded earlier.
- **How should role lenses be named?** Keep the current `RecruiterRoleLane` set unchanged
  (`Forward Deployed Engineer`, `Implementation Consultant`, `Spatial Systems Architect`,
  `AI Workflow / Portfolio Governance`). They are already capability-legible and decided (§7.4). No
  taxonomy change in Track F.
- **How should project cards refer to capabilities?** No change — cards already lead with
  capability-first `shortSummary` / `stakeholderValue` and carry role lanes as metadata. Track F
  should **verify**, not rewrite, this.
- **How should the footer CTA be framed?** **This is the priority fix.** Reframe away from
  "Customer Success and Solutions Roles" to a thesis-consistent, FDE-anchored invitation (e.g.
  "Open to forward-deployed engineering, implementation, and systems roles at AI-forward teams").
  Keep it capability-first; keep CS as evidence, never a target identity.
- **What should remain unchanged?** The thesis, the role-lane taxonomy, the demotion of tracks to
  optional lenses, the capability-first card copy, routes, visual design, and the machine-summary
  structure.
- **What should be explicitly avoided?** Promoting "Solutions Architect / Architect" to the lead
  title; any seniority/leadership/enterprise-ownership claim; reintroducing a CS/CSM identity;
  turning the umbrella into a generic "I solve problems" line; burying GIS, AI governance,
  implementation, or stakeholder-adoption signals.

---

## Portfolio 2.0 as Product-Positioning Evidence

This section evaluates whether the **Portfolio 2.0 project entry** and the **process/automation
deep dives** should capture the R&D process behind the portfolio's own positioning,
evidence-architecture, and copywriting system. **Track F0 only audits and recommends — it does not
implement any of this.**

### Does the current Portfolio 2.0 entry show the positioning R&D process?

**No — and that is currently a gap, not a defect.** The published entry
(`public/case-studies/portfolio-pipeline.md`) and metadata
(`src/data/projectMetadata.ts:184–204`) tell the **build-governance** story well: Sequential
Execution Protocol, the multi-LLM toolchain, the CI gate, drift-guards, `AI_ATTRIBUTION.md`,
Docker→Cloud Run. It is a strong **engineering-governance** narrative. It says **nothing** about
the **product-positioning and information-architecture** work — the role-framing hypothesis, the
reader-comprehension critique, the decision-evidence restructuring, or the deep-dive expansion.

### Does the current process deep dive show the evidence-architecture / role-framing work?

**Partially.** The deep-dive content (`src/data/deepDiveContent.ts`) and `DeepDiveView` cover
process, governance, and the automation thesis (build-time vs. run-time governance across the
HITL→autonomous spectrum). It documents **how the site was built and governed**, but not **how the
portfolio's positioning and evidence architecture were reasoned into shape** as a product-design
problem.

### Would adding this strengthen the Portfolio 2.0 case?

**Yes — meaningfully, if framed correctly.** The portfolio's current state was reached through a
genuine product-development process, and that process is itself evidence of the exact capability
the site claims (translating a messy problem into a legible system). A tightly-scoped narrative
could show:

```md
AI recommendation = input
Human / product judgment = evaluation
Portfolio changes = implementation
```

- **Initial positioning hypothesis** — FDE was adopted as a plausible AI-assisted recommendation
  because it credibly unified implementation, AI workflow, GIS, operations, and stakeholder-facing
  systems work. (Input.)
- **Reader-recognition critique** — the issue was never that FDE was false; it was that FDE may
  require too much explanation to carry the first impression alone. (Evaluation.)
- **Decision-evidence gap** — the deeper problem was evidence architecture, not just the title:
  `Strong underlying work → clear role framing → evidence grouped by decision type → reader
recognition → stronger hiring signal`.
- **Tracks A–E as product-system remediation** — Track A (Northern Grind entry correction),
  Track B (Northern Grind deep-dive correction), Track C (decision-evidence governance/template),
  Track D (project-entry decision-evidence audit), Track E (deep-dive inventory expansion &
  standardization). Frame as **operational maturity**, not internal process noise.
- **Repositioning decision** — and how FDE's altitude was reasoned (primary anchor vs. lens vs.
  one lane under a broader identity), landing on the hybrid model.

### What is the risk of including it?

- **Meta-commentary / navel-gazing.** A portfolio narrating its own copywriting can read as
  self-indulgent if it dwells on indecision.
- **Framing traps to avoid:** "Claude said one thing, then we changed it"; "AI chose the
  positioning"; "the original strategy failed"; rebranding for its own sake.
- **Guardrail exposure:** must not imply formal user testing, recruiter feedback, conversion data,
  or hiring outcomes — none of which the repo supports.

It should instead be framed as: **AI-assisted hypothesis generation → human evaluation of
role-market fit → reader-comprehension critique → product-positioning iteration →
evidence-architecture refinement → ownership of the development and content strategy.** Keep it
short and outcome-oriented, not a diary.

### Where should it be added (future implementation only)?

Recommended placement, in priority order — **all deferred to Track F4, none in F0:**

1. **`public/case-studies/portfolio-pipeline.md`** — add a compact "Positioning & Evidence
   Architecture" section (the product-development layer alongside the build-governance layer).
   _Primary home._
2. **`src/data/deepDiveContent.ts` / `src/views/DeepDiveView.tsx`** — extend the process/governance
   deep dive with the role-framing → decision-evidence → deep-dive-expansion narrative. _Secondary,
   for depth readers._
3. **`src/data/projectMetadata.ts`** — a one-line `purpose`/`stakeholderValue` nod to positioning
   R&D, only if it fits the compact card frame without bloating it.
4. **`CLAUDE.md` / `AGENTS.md`** — record the repositioning **decision** (not the narrative) once
   Track F1 lands, so the canonical positioning stays the source of truth.
5. **Crawler / `llms.txt` / Digital Twin context** — only inherit the change after F1; do not
   author bespoke positioning-R&D copy into machine summaries.

**Recommendation:** Yes, add it — but only at **Track F4**, scoped to one section in the entry and
one passage in the deep dive, framed as product maturity and explicitly distinguishing AI input
from human judgment from implemented change.

---

## Future Track F Implementation Plan

Each track runs **one at a time** under the Sequential Execution Protocol (`CLAUDE.md`): implement,
validate, commit with the track identifier, STOP, await approval. Sequence is ordered so the
canonical source of truth changes first and dependent surfaces inherit from it.

### Track F1 — Update canonical positioning docs

- **Goal:** Record the hybrid, FDE-anchored decision as the new canonical positioning.
- **Target files:** `CLAUDE.md` (Positioning & Messaging), `AGENTS.md` (Positioning north star),
  `docs/positioning-refactor-plan.md` (§2 table + §10 Track F status).
- **Risks/guardrails:** Keep the thesis verbatim; do not promote "Architect" to title; preserve the
  §2/§7.4 decisions; CS stays evidence-only. Docs-only — no app copy.
- **Validation:** `npm run format:check` (+ `npm run format` if needed).
- **Acceptance:** Canonical docs state the hybrid title model unambiguously; no contradictory
  "Solutions Architect as lead title" language; thesis unchanged.

### Track F2 — Update homepage hero, footer CTA & role-lens framing copy

- **Goal:** Front-load the capability descriptor at the title altitude; **fix the footer CTA**;
  keep role lenses as optional lenses.
- **Target files:** `src/views/HomeView.tsx` (hero title line, ~341–357; role-lens header/cards),
  `src/router.tsx` (footer CTA, 224–231), `src/views/ResumeView.tsx` (keep resume lead in sync).
- **Risks/guardrails:** Obey Design System Rules (no glassmorphism, contrast tiers, 1px borders); do
  not job-title-stuff the title line; footer must drop "Customer Success and Solutions Roles" and
  read FDE/implementation/systems-first; no invented claims.
- **Validation:** full suite — `npm run typecheck && npm run lint && npm run format:check && npm test -- --run && npm run build`; use `/run` or `/verify` to confirm the hero renders.
- **Acceptance:** Above the fold, capability + FDE land together; footer reinforces (not contradicts)
  the hero; lenses still optional; suite green.

### Track F3 — Verify/align project-card labels & capability-first metadata

- **Goal:** Confirm cards stay capability-first and lanes stay metadata; correct any drift only.
- **Target files:** `src/data/projectMetadata.ts`, `src/constants.tsx`, card components
  (`src/components/home/SupportingEvidenceSection.tsx`).
- **Risks/guardrails:** This is mostly a **verification** track — do not rewrite working copy; no
  taxonomy change; no invented metrics.
- **Validation:** full suite + `npm run generate:crawler-html && npm run validate:crawler` if any
  content/metadata changes.
- **Acceptance:** Every card answers "what problem / who benefited / what got easier / proof type /
  capability"; role lanes remain metadata; suite + crawler green.

### Track F4 — Portfolio 2.0 positioning / product-development evidence

- **Goal:** Add the positioning-R&D narrative to the Portfolio 2.0 entry and process deep dive (see
  "Portfolio 2.0 as Product-Positioning Evidence" above).
- **Target files:** `public/case-studies/portfolio-pipeline.md`, `src/data/deepDiveContent.ts`,
  `src/views/DeepDiveView.tsx`; optional one-line nods in `src/data/projectMetadata.ts`.
- **Risks/guardrails:** Frame as product maturity, not meta-commentary; distinguish AI input / human
  judgment / implementation; **no** claims of user testing, recruiter feedback, conversion, or hiring
  outcomes; keep it short.
- **Validation:** full suite + crawler regenerate/validate.
- **Acceptance:** Entry + deep dive show the positioning R&D without self-indulgence; AI-vs-human
  boundary explicit; no unsupported claims; suite + crawler green.

### Track F5 — Digital Twin / crawler / AI-readable positioning text

- **Goal:** Propagate the hybrid descriptor into machine surfaces so they inherit (not re-author)
  the new framing.
- **Target files:** `server/geminiProxy.ts` (system prompt), `server/__tests__/geminiProxy.test.ts`,
  `src/lib/seo.ts` (default + resume + track titles/descriptions), `public/llms.txt`,
  `scripts/generate-crawler-html.mjs`, generated crawler HTML.
- **Risks/guardrails:** Keep "lenses are supporting metadata on a single thesis" framing; CS = evidence;
  no dead routes / stale lane names; regenerate artifacts.
- **Validation:** full suite + `npm run generate:crawler-html && npm run validate:crawler`; update
  Digital Twin tests.
- **Acceptance:** Machine summaries and the Digital Twin lead with the hybrid framing consistently;
  crawler validates; sitemap/routes unchanged.

### Track F6 — Final live-site review & regression check

- **Goal:** Confirm the whole positioning surface is coherent end-to-end.
- **Target files:** none (review); fix-only if regressions found.
- **Risks/guardrails:** No new scope; document any pre-existing failures as pre-existing.
- **Validation:** full suite + crawler; manual `/run` skim of hero → footer → Digital Twin → resume.
- **Acceptance:** Hero, footer, lenses, cards, resume, SEO, llms.txt, and Digital Twin all tell one
  hybrid, FDE-anchored story; no contradictions; full suite green.

> **Sequencing note:** F1 → F5 follows the existing Phase 6 dependency order (canonical source →
> app copy → metadata → content → machine surfaces → review), which matches how subphases 6.1–6.10
> were sequenced. The **footer CTA fix in F2 is the highest-value single change** and could be
> pulled forward if Kyle wants an early, low-risk win.

---

## Boundaries of This Audit

Track F0 is **audit/planning only**. Per the task and the project's guardrails, this document:

- **Does not** change the canonical positioning, homepage hero, footer CTA, role taxonomy, role-lens
  copy, project entries, deep dives, crawler behavior, routes, visual design, or metadata structures.
- **Does not** implement the Portfolio 2.0 / process-deep-dive positioning-R&D copy — that is Track F4.
- **Does not** erase FDE; the recommendation explicitly retains it as the anchor.
- **Does not** make unsupported claims about seniority, leadership, enterprise ownership, production
  impact, formal user testing, recruiter feedback, conversion, or hiring outcomes.
- **Does not** over-index on one role at the expense of the project evidence, nor reduce the
  portfolio to a generic "I solve problems" site.
- **Does not** overemphasize Claude/AI as the decision-maker: AI generated a positioning hypothesis;
  human/product judgment evaluated it; changes are implementation.

The only file changed by Track F0 is **this document**. All implementation is deferred to the gated
Track F1–F6 sequence above, each under the Sequential Execution Protocol.
