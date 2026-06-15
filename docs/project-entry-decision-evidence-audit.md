# Project Entry Decision-Evidence Audit

> **Track D1 — audit/planning only.** This document inspects the existing project entries
> against the decision-evidence standard added in Track C. It does **not** edit any project
> entry, case study, deep dive, metadata, or component. It is the map that Track D2 edits from.

## Purpose

Track C added a reusable **decision-evidence layer** to the authoring standard
(`CLAUDE.md` → "Authoring Standards — Decision-Evidence Layer"). Track D applies that standard
to the portfolio's existing project entries. Before any rewriting (Track D2), this audit
identifies, per entry, where the current copy is already strong and where the decision-evidence
layer is thin — so D2 can operate surgically from named file/line anchors instead of
rediscovering everything.

## Evaluation Standard

Each entry should keep the existing stakeholder-value frame **and** make this spine legible:

```md
Context → Decision Criteria → Trade-off → Evidence → Capability Signal
```

- **Context** — the messy business/technical/operational/stakeholder problem.
- **Decision Criteria** — the variables that governed the choice.
- **Trade-off** — what was gained and sacrificed.
- **Evidence** — the artifact, model, reference input, test, audit, dataset, or workflow.
- **Capability Signal** — what a recruiter/client should recognize.

Status values used below: **Strong** (legible at first read) · **Partial** (present but implicit
or buried) · **Missing** (not discernible from the entry).

## Executive Summary

- **Entries reviewed:** 8 — the complete public inventory. Every entry has a metadata record
  (`src/data/projectMetadata.ts`), a registry record (`src/constants.tsx`), and a case-study
  body (`public/case-studies/*.md`).
- **Constraints baseline:** **all 8 entries already have populated `constraints` arrays** in
  `src/constants.tsx`. The "Trade-off" axis is therefore a **quality/mapping** judgment, not a
  presence check — no entry is missing constraints.
- **Case-study decision moments:** every case study has at least one explicit decision-evidence
  section (a "Constraints & trade-offs" / "Decision Rationale" / before-after / artifact block).
  Axis #4 (case-study body strength) is satisfied across the board; the gaps are in metadata
  first-read clarity and in surfacing **Decision Criteria** and **Capability Signal**.
- **Highest-priority entries (claim-risk):** `digital-twin`, `guynode`, `ops-triage`,
  `luxe-lofts` — each carries a measured-sounding claim without a stated baseline.
- **Common gaps:**
  1. **Decision Criteria** is the most frequently _Partial_ layer — entries show the problem and
     the trade-off but rarely name the variables that governed the choice as a first-read element.
  2. **Capability Signal** is usually implicit (left for the reader to infer) rather than stated.
  3. A handful of **absolute/measured claims** (`100%`, `98%`, "Zero-Hallucination", "Faster")
     read as outcomes without a baseline or a modeled/illustrative caveat.
- **Reference exemplars:** `northern-grind` (post-Track-A/B) and `moh` already model the target
  standard — careful language, explicit trade-offs, bounded scope. Use them as the pattern for D2.

## Project-by-Project Audit

Anchors are given as `file:line` for the entry head; case-study claim flags cite the exact line.

---

### Guynode Spatial Data Hub (`guynode`)

- **Metadata:** `src/data/projectMetadata.ts:78` · **Registry:** `src/constants.tsx:529`
  (constraints at `:582`) · **Case study:** `public/case-studies/guynode.md`

**Current strength:** Flagship GIS entry; `purpose`/`stakeholderValue` are concrete (governed,
metadata-complete layers; integrity upstream). Three substantive constraints (registry vs.
complexity; previewable vs. download-only; technical depth vs. general-user clarity).

**Main gap:** Two measured-sounding claims in the body without a baseline, and the governing
**Decision Criteria** (what made the IA "trustworthy enough to publish") is implicit.

**Decision-evidence assessment:**

| Layer             | Status  | Notes                                                                          |
| ----------------- | ------- | ------------------------------------------------------------------------------ |
| Context           | Strong  | Legacy, fragmented geospatial data accumulating without governance.            |
| Decision Criteria | Partial | Trust/legibility/governance implied; not named as the variables that decided.  |
| Trade-off         | Strong  | Constraints map cleanly (catalog model vs. complexity; preview vs. download).  |
| Evidence          | Strong  | Information architecture, metadata coverage, public catalog as the artifact.   |
| Capability Signal | Partial | "Spatial systems architecture / data governance" left for the reader to infer. |

**Recommended edits for Track D2:**

- Qualify `guynode.md:57` ("supports 100% metadata coverage") — tie the figure to the registry
  scope or reframe as "metadata-complete across all **registered** datasets" so it reads as a
  design property, not an audited statistic.
- Qualify `guynode.md:62` ("Faster Time-to-Data") — use "designed to shorten" / "structured to
  reduce" rather than an unbaselined comparative.
- Surface one explicit Decision-Criteria line and a Capability-Signal tag in the card metadata.

**Unsupported-claim risk:** **Medium** — `100%` and "Faster" read as measured outcomes.

**Priority:** **Medium.**

---

### Digital Twin AI Agent (`digital-twin`)

- **Metadata:** `src/data/projectMetadata.ts:109` · **Registry:** `src/constants.tsx:602`
  (constraints at `:658`) · **Case study:** `public/case-studies/digital-twin.md`

**Current strength:** Clear scoped-AI framing with guardrails and human handoff; a real artifact
(the **Failure Mode Matrix**) and an explicit Relevance Gate / Command Parser architecture.
Strong AI-governance disclosure for an AI-built feature.

**Main gap:** An absolute reliability claim that an AI system cannot honestly guarantee.

**Decision-evidence assessment:**

| Layer             | Status  | Notes                                                                           |
| ----------------- | ------- | ------------------------------------------------------------------------------- |
| Context           | Strong  | Recruiter information friction; need for scoped, non-overstepping answers.      |
| Decision Criteria | Partial | Scope-control/accuracy/handoff implied; not surfaced as the deciding variables. |
| Trade-off         | Strong  | Guardrails + handoff = scoped accuracy over open-ended capability.              |
| Evidence          | Strong  | Failure Mode Matrix, architecture flow, command parser.                         |
| Capability Signal | Strong  | "Scoped AI implementation with governance" reads clearly.                       |

**Recommended edits for Track D2:**

- Soften `digital-twin.md:50` — "Zero-Hallucination Scope … ensuring 100% focus" overclaims.
  Reframe as "scope guardrails **designed to** keep responses on portfolio evidence and refuse
  off-topic prompts." Avoid absolute "zero" / "100%" reliability language for an LLM.
- Name the Decision Criteria (scope safety vs. answer coverage) in one line.

**Unsupported-claim risk:** **Medium-High** — "Zero-Hallucination" / "100%" are unverifiable
absolutes for a generative system.

**Priority:** **Medium-High** (credibility-sensitive, but a small, contained edit).

---

### Systems at Scale: Triage & QA (`ops-triage`)

- **Metadata:** `src/data/projectMetadata.ts:139` · **Registry:** `src/constants.tsx:471`
  (constraints at `:507`; hero artifact figures at `:485`, `:494`, `:503`) · **Case study:**
  `public/case-studies/ops-triage.md`

**Current strength:** Strong dual-lane (Velocity/Precision) decision model; three substantive
constraints (batch vs. bespoke; throughput vs. integrity). The registry hero artifact even
**defines** First-Pass Yield, which is good discipline.

**Main gap:** Two specific figures (`98% First-Pass Yield`, `120+ requests/week`) read as
measured results; provenance (measured vs. representative/illustrative) is not stated.

**Decision-evidence assessment:**

| Layer             | Status  | Notes                                                                           |
| ----------------- | ------- | ------------------------------------------------------------------------------- |
| Context           | Strong  | High-volume queue, decision fatigue, single-pace risk on disparate data.        |
| Decision Criteria | Strong  | Throughput vs. data integrity named as the governing trade-off.                 |
| Trade-off         | Strong  | Constraints map cleanly to the dual-lane design.                                |
| Evidence          | Partial | The dual-lane system is shown; the `98%`/`120+` figures lack a provenance note. |
| Capability Signal | Strong  | "Operational rigor / systems-at-scale" reads clearly.                           |

**Recommended edits for Track D2:**

- Add a one-line provenance caveat for `constants.tsx:485`/`:494` figures — label them as
  representative/modeled unless they are measured, or soften to "high first-pass yield."
- Otherwise light-touch; the decision model is already strong.

**Unsupported-claim risk:** **Medium** — specific percentages without a stated source.

**Priority:** **Medium.**

---

### Automation & Operational Protocols (`project-aegis`)

- **Metadata:** `src/data/projectMetadata.ts:161` · **Registry:** `src/constants.tsx:682`
  (constraints at `:716`) · **Case study:** `public/case-studies/project-aegis.md`
- **Note:** Aegis and emOS are **systems within this single entry**, not separate entries.

**Current strength:** Excellent decision-evidence already — judge-vs-executor separation,
HITL→autonomous spectrum, three strong constraints (Notion rate caps; self-grading; validation
delay). Iterations are carefully labeled "built & tested" vs. "developed."

**Main gap:** One word — "proved" — slightly overstates a single-iteration result.

**Decision-evidence assessment:**

| Layer             | Status | Notes                                                              |
| ----------------- | ------ | ------------------------------------------------------------------ |
| Context           | Strong | Ungoverned "vibe-coding" drift; need for an explicit gate.         |
| Decision Criteria | Strong | Independence of judge vs. executor; auditability; validation cost. |
| Trade-off         | Strong | Validation delay accepted to avoid hallucinated runtime bugs.      |
| Evidence          | Strong | Sanitized state machine, Notion audit trail, HITL iteration.       |
| Capability Signal | Strong | "Governance discipline / AI safety" reads clearly.                 |

**Recommended edits for Track D2:**

- Soften `project-aegis.md:31` — "proved the protocol worked and was trustworthy" → "demonstrated
  the protocol held in a human-in-the-loop iteration." Light wording only.

**Unsupported-claim risk:** **Low-Medium** — only the "proved" verb.

**Priority:** **Low-Medium** (near-exemplar; one-word polish).

---

### Portfolio 2.0 — Governed AI Build Pipeline (`portfolio-pipeline`)

- **Metadata:** `src/data/projectMetadata.ts:184` · **Registry:** `src/constants.tsx:736`
  (constraints at `:770`) · **Case study:** `public/case-studies/portfolio-pipeline.md`

**Current strength:** Explicit "Constraints & trade-offs" section, an attribution ledger
(`AI_ATTRIBUTION.md`), and CI-gate evidence. Three strong constraints (blast-radius cap; secret
hygiene; pinned-SHA supply chain). This entry essentially _is_ the governance standard in
practice.

**Main gap:** Minimal. `purpose` uses "Prove … production-grade reliability"; backed by CI
evidence so it reads as substantiated, but a softer verb would be safer.

**Decision-evidence assessment:**

| Layer             | Status | Notes                                                         |
| ----------------- | ------ | ------------------------------------------------------------- |
| Context           | Strong | Ungoverned "vibe coding" is brittle and unattributable.       |
| Decision Criteria | Strong | Reviewability, secret safety, supply-chain integrity.         |
| Trade-off         | Strong | One-subphase protocol caps velocity to keep diffs reviewable. |
| Evidence          | Strong | CI gate, drift guards, attribution ledger, commit/PR history. |
| Capability Signal | Strong | "AI governance / CI discipline" reads clearly.                |

**Recommended edits for Track D2:**

- Optional: soften "Prove" → "Show/Demonstrate" in `projectMetadata.ts:195` for consistency.

**Unsupported-claim risk:** **Low** — claims are CI-backed and attributable.

**Priority:** **Low.**

---

### Luxe Lofts (`luxe-lofts`)

- **Metadata:** `src/data/projectMetadata.ts:206` · **Registry:** `src/constants.tsx:417`
  (constraints at `:450`) · **Case study:** `public/case-studies/luxe-lofts.md`

**Current strength:** Clear "rough requirements → phased, priceable plan" framing; three
substantive constraints (unify vs. more point tools; low-code vs. custom; phased vs. one
commitment). Honest "Workflow Prototype / proposal" status.

**Main gap:** A roadmap table presents projected outcomes in a way that can read as achieved
results.

**Decision-evidence assessment:**

| Layer             | Status  | Notes                                                                      |
| ----------------- | ------- | -------------------------------------------------------------------------- |
| Context           | Strong  | Fragmented legacy presence across conflicting domains.                     |
| Decision Criteria | Strong  | Maintainability/adoption for a small non-technical team named explicitly.  |
| Trade-off         | Strong  | Low-code stack over custom build; phased funding over one commitment.      |
| Evidence          | Partial | Proposal-stage prototype; roadmap projections stand in for measured proof. |
| Capability Signal | Strong  | "Scoping / implementation planning" reads clearly.                         |

**Recommended edits for Track D2:**

- Qualify the roadmap outcomes at `luxe-lofts.md:86-87` ("faster bookings", "Reduced admin time,
  improved social proof") as **projected/intended** outcomes of a proposal, not delivered
  results — e.g., add a "projected" column header or caveat line.

**Unsupported-claim risk:** **Medium** — projected outcomes phrased as results.

**Priority:** **Medium.**

---

### Northern Grind (`northern-grind`)

- **Metadata:** `src/data/projectMetadata.ts:228` · **Registry:** `src/constants.tsx:790`
  (constraints at `:803`) · **Case study:** `public/case-studies/northern-grind.md`

**Current strength:** Already remediated in Tracks A/B. Richest decision-evidence in the
inventory — explicit trade-offs, modeled-figure caveats, AI-asset provenance, Canva-vs-Adobe and
local-fit-vs-generic-polish decisions. Four registry constraints added in Track A.

**Main gap:** Essentially none structural. One mild comparative ("faster, clearer ordering
experience", `:213`) could be softened, but the financial figures are already flagged as modeled.

**Decision-evidence assessment:**

| Layer             | Status | Notes                                                           |
| ----------------- | ------ | --------------------------------------------------------------- |
| Context           | Strong | Fragmented brand/menu surfaces; menu decision friction; margin. |
| Decision Criteria | Strong | Legibility, café fit, maintainability, derivative-risk, cost.   |
| Trade-off         | Strong | Canva vs. Adobe; clarity vs. density; local fit vs. AI polish.  |
| Evidence          | Strong | Break-even model, palette provenance, AI asset pipeline.        |
| Capability Signal | Strong | "Small-business systems translation" reads clearly.             |

**Recommended edits for Track D2:**

- Light only: optionally soften `:213` "faster, clearer ordering experience" → "designed for a
  clearer ordering experience." Use this entry as the **reference exemplar** for the others.

**Unsupported-claim risk:** **Low** — already careful, modeled language.

**Priority:** **Low** (exemplar).

---

### Public Health GIS Workflow Support (MOH) (`moh`)

- **Metadata:** `src/data/projectMetadata.ts:250` · **Registry:** `src/constants.tsx:831`
  (constraints at `:1044`) · **Case study:** `public/case-studies/moh.md`
- **Disclosure note:** the repo intentionally uses **sanitized** naming ("a national Ministry of
  Health"). The country is not named on-site; keep it that way in any D2 edit.

**Current strength:** A model of honest scoping. Four strong constraints (sanitized artifacts vs.
real records; contribution vs. sole ownership; low-code pivot framed as judgment; plain-language
translation). No metrics claimed; role boundaries explicit.

**Main gap:** Minimal. Capability Signal is present but could be surfaced one notch more for
first-read (it currently reads as advisory support rather than implementation judgment).

**Decision-evidence assessment:**

| Layer             | Status  | Notes                                                                     |
| ----------------- | ------- | ------------------------------------------------------------------------- |
| Context           | Strong  | Contact-tracing data across intake → GIS → dashboards; adoption barriers. |
| Decision Criteria | Strong  | Staff adoptability, sanitization, scope honesty, tool fit.                |
| Trade-off         | Strong  | Sanitized artifacts; advisory framing; low-code pivot.                    |
| Evidence          | Strong  | Workflow diagrams, audit matrix, dashboard mockups, UI/UX review.         |
| Capability Signal | Partial | Implementation judgment is there but framed modestly as "support."        |

**Recommended edits for Track D2:**

- Light only: surface the implementation-judgment Capability Signal a touch more in the card
  copy, without changing the sanitized scope or adding metrics.

**Unsupported-claim risk:** **Low** — sanitized, careful, no metrics.

**Priority:** **Low** (exemplar of honest scoping).

---

## Recommended Track D2 Batching Plan

Run one batch at a time under the Sequential Execution Protocol; validate and stop between
batches. Batch 1 first — it protects credibility and is the smallest set of contained edits.

**Batch 1 — Claim-risk remediation (highest impact, smallest diffs):**

- `digital-twin` — soften "Zero-Hallucination / 100%" (`digital-twin.md:50`).
- `guynode` — qualify "100% metadata coverage" and "Faster Time-to-Data" (`guynode.md:57`, `:62`).
- `ops-triage` — add provenance caveat to `98%` / `120+` figures (`constants.tsx:485`, `:494`).
- `luxe-lofts` — mark roadmap outcomes as projected (`luxe-lofts.md:86-87`).

**Batch 2 — Surface Decision Criteria + Capability Signal (strong artifacts, thin explanation):**

- `guynode`, `ops-triage`, `digital-twin` — add one explicit Decision-Criteria line and a
  first-read Capability-Signal tag to card metadata.
- `project-aegis` — soften "proved" (`project-aegis.md:31`).
- `portfolio-pipeline` — optional "Prove" → "Demonstrate" (`projectMetadata.ts:195`).

**Batch 3 — Light polish / exemplars:**

- `moh` — surface implementation-judgment signal in card copy (keep sanitized scope, no metrics).
- `northern-grind` — optional `:213` softening; otherwise leave as the reference exemplar.

**Sequencing note for D2:** `northern-grind` and `moh` are the target pattern — mirror their
careful language and explicit trade-offs when editing the Batch 1/2 entries. Every D2 edit must
use only evidence already present in the repo; do not introduce new metrics, customers, or
outcomes, and do not de-sanitize the MOH entry.
