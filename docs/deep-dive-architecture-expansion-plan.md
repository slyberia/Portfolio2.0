# Deep-Dive Architecture & Expansion Plan

> **Track E0 — planning/audit only.** This document inspects the current deep-dive architecture
> and specifies a future implementation sequence (E1–E4, F). It does **not** create or edit any
> deep dive, project entry, route, metadata, or component. It is the map those future tracks
> edit from. Companion to `docs/project-entry-decision-evidence-audit.md` (Track D1).

## Purpose

Track D applied the decision-evidence standard
(`Context → Decision Criteria → Trade-off → Evidence → Capability Signal`) to **project
entries**. Before applying it to **deep dives** (future Track E4), we need to decide whether the
deep-dive inventory is complete — specifically whether `moh` and `guynode` warrant dedicated
deep dives, and how `portfolio-pipeline` relates to `project-aegis` (Aegis/emOS). This plan
answers those questions against the repo and sequences the work.

---

## 1. Current deep-dive inventory & wiring

**Single route, query-param tabs.** All deep dives live under one route, `/deep-dives`
(`src/router.tsx:556-559`), rendered by `src/views/DeepDiveView.tsx`. A legacy route
`/portfolio2/deep-dive` redirects to it (`src/router.tsx:565-566`). The active deep dive is
chosen by a `?tab=` query param resolved in `resolveTabParam` (`DeepDiveView.tsx:25-34`), with a
back-compat alias `automation → process` (`TAB_ALIASES`, `DeepDiveView.tsx:23`).

**Tabs (`DEEP_DIVE_TABS`, `DeepDiveView.tsx:40-65`):**

| Tab id           | Label                                     | What it is                                                               |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| `landing`        | Overview                                  | Index/landing for the deep-dive layer.                                   |
| `process`        | Automation & Governance Architecture      | **Umbrella** deep dive covering `portfolio-pipeline` + `aegis` + `emos`. |
| `luxe-lofts`     | Luxe Lofts Digital Restructuring Strategy | Bespoke deep dive for `luxe-lofts`.                                      |
| `northern-grind` | Northern Grind Business Systems           | Bespoke deep dive for `northern-grind` (Tracks A/B).                     |

**So three real deep dives exist** (`process`, `luxe-lofts`, `northern-grind`) plus the
`landing` index.

**Project entries WITHOUT a dedicated deep dive:** `guynode`, `digital-twin`, `ops-triage`,
`moh`. (`portfolio-pipeline` and `project-aegis` are _both_ presented inside the shared `process`
umbrella, not as individual tabs.)

**Content style is MIXED — two patterns:**

- **Data-driven (the `process` tab):** content comes from `src/data/deepDiveContent.ts` —
  `decisionBlocks`, `architectureSummaries`, `llmRoles`, `forensicEntries`,
  `automationSystems` (ids `portfolio-pipeline` `:376`, `aegis` `:389`, `emos` `:402`), and
  `governancePrimitives` `:425` — rendered by the `process` block in `DeepDiveView.tsx:855+`.
- **Bespoke inline JSX + local consts (the `luxe-lofts` and `northern-grind` tabs):** content is
  hand-built React in `DeepDiveView.tsx` with local data consts (e.g. `NG_PHASES`, `NG_PALETTE`,
  `NG_LOGO_VARIANTS`, `NG_POS_ROWS`…, `DeepDiveView.tsx:73-196`) and a sticky **scrollspy
  sidebar** driven by an `IntersectionObserver` that iterates the phase list
  (`DeepDiveView.tsx:645-660`).

**Bridges.** Every deep dive has a `DeepDiveBridge` (Translation · Adoption · Implementation
maturity) in `DEEP_DIVE_BRIDGES: Record<'process'|'luxe-lofts'|'northern-grind', …>`
(`DeepDiveView.tsx:474-535`).

**Cross-links from project entries → deep dive.** Registry entries deep-link into the `process`
tab via anchors: `constants.tsx:114` (`/deep-dives#ci-and-tests`), `:136`
(`#validation-trail`), `:256` (`#proof-hierarchy`).

**Crawler / SEO.** `/deep-dives` is treated as a **single crawled page**: one sitemap URL
(`public/sitemap.xml:16`, priority 0.7) and a single `/deep-dives` entry across the related-link
sets in `scripts/generate-crawler-html.mjs`. **There is no per-tab crawler route or sitemap
entry today.** Implication: adding a deep-dive _tab_ does not add SEO surface automatically — a
new tab is reachable via `?tab=` but is not independently indexed unless crawler/sitemap work is
added explicitly.

### What adding a new deep-dive tab requires (technical checklist)

1. Extend the `MainTab` union (`DeepDiveView.tsx:18`).
2. Allow the param in `resolveTabParam` (`DeepDiveView.tsx:25-34`).
3. Add a `DEEP_DIVE_TABS` entry (label, accent border, visibility) (`:40-65`).
4. Add a `DEEP_DIVE_BRIDGES` key + Translation/Adoption/Maturity content (`:474+`) — the
   `Record<…>` key union must be widened too.
5. Add the render block (`activeMainTab === '<id>' && (…)`).
6. If using the scrollspy pattern: add a phases const + register it with the
   `IntersectionObserver` effect (mirror `:645-660`) and give each `<section>` a matching `id`.
7. Optionally add local data consts or a `deepDiveContent`-style data module.
8. **SEO (optional, separate):** add a crawler route / sitemap entry if independent indexing is
   wanted; otherwise it inherits the single `/deep-dives` surface.

**Bottom line:** a new deep dive is a several-step but well-patterned change, fully contained in
`DeepDiveView.tsx` (+ optional data module). No new React route is needed; tabs are query-param
driven.

---

## 2. Candidate: MOH deep dive (`moh` — Public Health GIS Workflow Support)

**Recommendation: YES — but as a carefully sanitized, advisory-framed deep dive.** MOH is
already a Track-D1 exemplar for honest scoping, and it has the **richest unused supporting
assets** of any entry without a deep dive.

**Existing assets that can support it (no new fabrication needed):**

- Interactive **"Public Health GIS — System Explorer"** hero artifact (Architecture/Workflow
  tabs) in the registry (`src/constants.tsx:831+`).
- An `artifacts` array including a **"Contact Tracing — Supervisor View (Sample)"** (backed by
  `src/data/mohSupervisorDashboard.ts`).
- `rigor` block + **4 substantive constraints** (`constants.tsx:1044`): sanitized-artifacts vs.
  real records; contribution vs. sole ownership; low-code pivot as judgment; plain-language
  translation.
- 96-line case study (`public/case-studies/moh.md`).

**What the deep dive would prove that the entry cannot:** the entry compresses the work to
"workflow support + plain-language translation." A deep dive can show the **reasoning chain** —
how contact-tracing data was modeled to move intake → GIS layers → dashboards → reports, _why_ a
low-code layer was evaluated and rejected, and how sanitization itself was a design constraint —
i.e. implementation judgment under privacy/ownership limits.

**Thesis (proposed):** _Translating a complex public-sector spatial workflow into something a
non-technical national-health team could understand, evaluate, and adopt — advisory
implementation judgment under strict sanitization and partial-ownership constraints._

**Suggested sections:** Strategic Context (sanitized) → Workflow Translation (intake → GIS →
dashboard → report) → Tool-Fit Evaluation (incl. the low-code pivot as decision evidence) →
Adoption & Plain-Language Documentation → Sanitized Artifact Gallery (System Explorer +
supervisor sample + audit matrix) → Boundaries & Reflection. Plus a `DeepDiveBridge`.

**Must be carefully scoped (overclaim guardrails):** keep sanitized naming
(`Public Health GIS Workflow Support`, `MOH`, `a national Ministry of Health engagement`); **do
not name the country**; **no metrics**; frame as **support/advisory/documentation/tool-fit
judgment, not a solo full-system build or production deployment**; reuse the entry's existing
"rather than full system ownership" honesty.

**New content/assets needed:** none mandatory — the deep dive can be assembled from existing
sanitized artifacts. Optional: one or two additional sanitized workflow diagrams.

---

## 3. Candidate: Guynode deep dive (`guynode` — Guynode Spatial Data Hub)

**Recommendation: YES — strong candidate.** Guynode is the flagship GIS entry yet currently has
no deep dive, so the portfolio's strongest spatial-systems claim is the _least_ expanded.

**Existing assets that can support it:**

- **"Guynode Data Access Flow"** hero artifact + `rigor` block + **3 constraints**
  (`src/constants.tsx:529-599`): registry-model vs. complexity; previewable vs. download-only;
  technical depth vs. general-user clarity.
- 92-line case study (`public/case-studies/guynode.md`).
- Metadata (`projectMetadata.ts:78`) now surfacing governance/discoverability criteria + capability
  signal (Track D2 Batch 2).

**What the deep dive would prove that the entry cannot:** the entry asserts "governed,
metadata-complete, discoverable." A deep dive can show the **information-architecture reasoning**
— the dataset registry model, the metadata schema that makes a dataset publishable, the
preview-vs-download decision, and the "Readiness Review" that turns onboarding into a repeatable
process — i.e. spatial-systems architecture and data governance as a method, not a result.

**Thesis (proposed):** _Turning a fragmented legacy geospatial repository into a governed,
discoverable public data product — where trust, legibility, and metadata completeness are
designed in, not cleaned up after._

**Suggested sections:** Context (legacy fragmentation) → Decision Criteria (trust · legibility ·
governance · discoverability vs. complexity) → Registry & Metadata Model → Preview-vs-Download
Decision → Readiness Review / Launch-Readiness workflow → Information Architecture for
non-technical users → Boundaries. Plus a `DeepDiveBridge`.

**Must be carefully scoped (overclaim guardrails):** honor the Track-D2 Batch-1 fixes — frame
**metadata completeness as a design property** ("every registered dataset carries complete
metadata"), and **"time-to-data" as an intended/design effect**, never a measured speedup. No
audited performance numbers unless the repo provides evidence.

**New content/assets needed:** none mandatory — assemble from the existing hero artifact +
constraints + case study. Optional: a sanitized IA / registry diagram.

---

## 4. Architecture question — Portfolio Pipeline vs. Aegis / emOS

**Are they distinct entries today?** Yes. Separate metadata (`projectMetadata.ts:184`
portfolio-pipeline, `:161` project-aegis), separate registry (`constants.tsx:736` / `:682`),
separate case studies (`portfolio-pipeline.md` / `project-aegis.md`).

**Are they already cross-linked?** Yes — and deliberately. Both are presented **inside the one
`process` umbrella deep dive** ("Automation & Governance Architecture"), where
`automationSystems` renders `portfolio-pipeline` `:376`, `aegis` `:389`, and `emos` `:402` as
three distinct system blocks under a shared `governancePrimitives` layer. A code comment notes
this was an intentional **"Option C restructure"** that renamed the old tab to `process`.

**Conceptual distinction (validated against the repo):**

| Entry                | Proves                                                                                                                     | Maturity          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `portfolio-pipeline` | Governed AI **build/delivery**: CI gates, attribution ledger, subphase protocol, repo hygiene, deploy.                     | In Production     |
| `project-aegis`      | AI **operations** governance: judge-vs-executor, HITL checkpoints, self-grading, Notion operational memory, drift control. | Working Prototype |

The hypothesis (pipeline = method/protocol for building; Aegis/emOS = operations/runtime
environment) holds: one governs **how code is built and shipped**, the other governs **how AI
agents operate at runtime**. They share a _philosophy_ (AI as an untrusted worker behind an
explicit gate) but apply it at different layers.

**Recommendation: keep separate entries, keep the shared umbrella deep dive, improve the
in-umbrella distinction and entry cross-links. Do NOT split into separate deep-dive tabs.**

- The distinction is real and worth making legible, but it is **already structurally present** as
  three system blocks. The gap is _labeling clarity_, not missing separation.
- **Risk of splitting into two deep-dive tabs:** duplicates the shared `governancePrimitives`
  narrative, fragments a deliberately unified story, and makes a reader wonder why there are two
  "governance" deep dives. High redundancy, low gain.
- **Risk of keeping them too fused:** a reader may not register that pipeline = _build_ and
  Aegis/emOS = _ops_. Mitigation is cheap: a one-line framing inside the umbrella ("build-time
  vs. run-time governance") and reciprocal cross-links between the two project entries.
- This becomes **Track E3** — a copy/cross-link clarification, explicitly _not_ a split/merge.

---

## 5. Deep-dive decision-evidence standard (for Track E4)

Adapt the Track C/D spine to deep dives. Every deep dive (new or existing) should make legible:

```md
Translation → Adoption → Implementation maturity

- Decision Criteria → Evidence → Boundaries
```

- **Translation** — what complex/opaque thing was made legible (model, workflow, artifact)?
- **Adoption** — what user/stakeholder/team constraint shaped the design?
- **Implementation maturity** — what is prototype · model · recommendation · validated ·
  production-ready? (state it explicitly)
- **Decision Criteria** — the variables that governed the choices.
- **Evidence** — the artifact, workflow, model, dataset, or implementation that proves the claim.
- **Boundaries** — what is _not_ being claimed (no metrics, no ownership overreach, sanitization
  limits, modeled-vs-measured).

The `DeepDiveBridge` already encodes Translation/Adoption/Maturity; E4 adds explicit
Decision-Criteria, Evidence, and Boundaries legibility to each.

---

## 6. Recommended implementation sequence

Endorsing the suggested order, with one framing change to E3 (clarify, don't split) and a note
that E4 retro-covers the existing deep dives.

1. **E1 — Create the MOH deep dive.** Richest unused assets; highest payoff; exemplar scoping.
2. **E2 — Create the Guynode deep dive.** Flagship GIS claim currently least expanded.
3. **E3 — Clarify Portfolio Pipeline vs. Aegis/emOS** (cross-link + build-vs-ops framing inside
   the `process` umbrella and reciprocal entry links). **Copy-only, no split.** Low-risk and
   independent — could be done anytime, even before E1/E2.
4. **E4 — Apply the deep-dive decision-evidence standard across _all_ deep dives** (`process`,
   `luxe-lofts`, `northern-grind`, plus the new E1/E2 dives).
5. **F — Optional global positioning cleanup** (FDE vs. systems-translator). Out of scope here;
   gated on explicit approval; touches the canonical positioning spine every other track preserved.

**Why this order:** E1/E2 add the missing surface before E4 standardizes it (so E4 covers a
complete set). E3 is cheap and orthogonal — slot it wherever convenient. F stays last and
optional.

---

## 7. Per-track implementation specs

### Track E1 — MOH deep dive

- **Goal:** a sanitized, advisory-framed deep dive proving implementation judgment + workflow
  translation + tool-fit evaluation under privacy/ownership constraints.
- **Target files:** `src/views/DeepDiveView.tsx` (new tab via the §1 checklist); optionally a
  data module (e.g. reuse `src/data/mohSupervisorDashboard.ts`). Likely `public/sitemap.xml` +
  `scripts/generate-crawler-html.mjs` _only if_ independent indexing is wanted.
- **Sections:** Strategic Context (sanitized) · Workflow Translation · Tool-Fit Evaluation
  (low-code pivot) · Adoption/Plain-Language Documentation · Sanitized Artifact Gallery ·
  Boundaries; plus `DEEP_DIVE_BRIDGES.moh`.
- **Assets/data:** existing System Explorer hero artifact, supervisor-view sample, audit matrix,
  `moh.md` — no new fabrication required.
- **Risks/guardrails:** **never name the country**; no metrics; advisory framing, not solo build;
  keep sanitized naming; reuse "rather than full system ownership."
- **Validation:** `format:check` · `typecheck` · `lint` · `test` · `build` ·
  `generate:crawler-html` · `validate:crawler` (crawler relevant if SEO files touched).
- **Acceptance:** MOH deep-dive tab renders and resolves via `?tab=moh`; bridge present; sanitized
  scope preserved; no metrics/country; validation green.

### Track E2 — Guynode deep dive

- **Goal:** a deep dive proving spatial-systems architecture + data governance as a repeatable
  method (registry, metadata schema, readiness review).
- **Target files:** `src/views/DeepDiveView.tsx` (new tab via §1 checklist); optional IA/registry
  data const or diagram asset. Optional crawler/sitemap if indexing wanted.
- **Sections:** Context · Decision Criteria · Registry & Metadata Model · Preview-vs-Download ·
  Readiness Review · IA for non-technical users · Boundaries; plus `DEEP_DIVE_BRIDGES.guynode`.
- **Assets/data:** existing "Guynode Data Access Flow" hero artifact, constraints, `guynode.md`.
- **Risks/guardrails:** metadata completeness = **design property**, not an audited %; time-to-data
  = **intended effect**, not a measured speedup (preserve Track-D2 Batch-1 wording). No invented
  performance numbers.
- **Validation:** full suite as above.
- **Acceptance:** Guynode deep-dive tab renders via `?tab=guynode`; bridge present; no
  unsupported measured claims; validation green.

### Track E3 — Pipeline vs. Aegis/emOS clarification (copy-only, no split)

- **Goal:** make the build-time-vs-run-time governance distinction legible and cross-link the two
  entries — without splitting, merging, or adding tabs.
- **Target files:** likely `public/case-studies/portfolio-pipeline.md` +
  `public/case-studies/project-aegis.md` (reciprocal cross-links + one framing line each), and/or
  a one-line framing in the `process` umbrella (`src/data/deepDiveContent.ts` `automationThesis`
  / `automationSystems`). Metadata copy only if needed.
- **Sections:** a short "build-time vs. run-time governance" framing; reciprocal "see also" links.
- **Assets/data:** none new.
- **Risks/guardrails:** do **not** split/merge entries, rename, add routes/tabs, or duplicate the
  shared governance layer. Keep edits to clarifying copy + links.
- **Validation:** `format:check` + (if content/SEO touched) crawler suite; full suite for safety.
- **Acceptance:** both entries clearly state the distinction and link to each other; the `process`
  umbrella names the build-vs-ops split; no structural change; validation green.

### Track E4 — Apply the deep-dive standard across all deep dives

- **Goal:** ensure `process`, `luxe-lofts`, `northern-grind`, MOH (E1), and Guynode (E2) each
  surface Decision Criteria · Evidence · Boundaries alongside the existing Translation/Adoption/
  Maturity bridge.
- **Target files:** `src/views/DeepDiveView.tsx` (and `src/data/deepDiveContent.ts` for the
  `process` tab). One deep dive at a time under the Sequential Execution Protocol.
- **Sections:** per deep dive, add/clarify the criteria/evidence/boundaries legibility; do not
  rewrite bespoke middles.
- **Assets/data:** none new; reuse existing artifacts.
- **Risks/guardrails:** additive, skimmable, no new metrics; preserve Tracks A–D wording
  (especially Northern Grind's modeled-financial caveats and AI-provenance language).
- **Validation:** full suite per deep dive.
- **Acceptance:** every deep dive legibly shows criteria/evidence/boundaries; no regressions;
  validation green.

### Track F — Optional global positioning cleanup

- **Goal (gated):** revisit "Forward Deployed Engineer" vs. systems-translator/solutions-architect
  framing. **Out of scope for the E-series; requires explicit approval.**
- **Target files:** homepage hero, role taxonomy, `CLAUDE.md`/`AGENTS.md` canonical positioning —
  the spine every other track preserved.
- **Risks/guardrails:** changes the canonical positioning; must reconcile the hard rules in
  `CLAUDE.md`/`AGENTS.md`. Do not start without sign-off.

---

## Boundaries of this plan (E0)

E0 changed only this file. No source, metadata, case-study, route, deep-dive, homepage, or
positioning files were edited. No entries were split, merged, renamed, or re-scoped. MOH naming
stays sanitized (no country). No metrics, assets, or outcomes were invented — every asset cited
above already exists in the repo at the referenced path.
