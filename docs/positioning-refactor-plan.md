# Implementation Plan — Phase 6: Positioning Refactor (Forward Deployed Engineer)

> **Tool target:** Claude Code (web or CLI).
> **Status:** Plan only. No refactor work has been executed. Each subphase below is
> implemented one at a time under the Sequential Execution Protocol in `CLAUDE.md`.

This plan adapts a Codex-authored refactor brief for Claude Code and corrects several
factual errors in that source (see "Corrections from the source brief" below). It is the
master execution document referenced by `CLAUDE.md` for Phase 6.

---

## 1. Goal

Move the portfolio from a **role-track-led** presentation to a **single coherent thesis**,
without deleting the existing role structure. Role tracks become **supporting metadata and
role-relevance tags**, woven into project cards, case studies, and deep dives.

The central argument the site must make legible in the first ~6 seconds:

> Kyle helps teams turn complex technical, operational, and spatial problems into systems
> people can understand, adopt, and use.

Fewer "choose your Kyle" entry points; one professional argument with role relevance
attached as evidence.

---

## 2. Canonical positioning (authoritative — use verbatim)

| Field             | Value                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name              | **Kyle Semple**                                                                                                                                                       |
| Primary title     | **Forward Deployed Engineer**                                                                                                                                         |
| Central thesis    | _I help teams turn complex technical, operational, and spatial problems into systems people can understand, adopt, and use._                                          |
| Supporting bridge | _My work connects forward-deployed engineering, technical implementation, customer success, solutions/systems architecture, GIS, operations, and AI workflow design._ |

**Hero copy (default):**

```md
Kyle Semple
Forward Deployed Engineer
I help teams turn complex technical, operational, and spatial problems into systems
people can understand, adopt, and use.
```

**Portfolio reframe:** from "Explore my work by role track" → "Explore how I translate complex
needs into adoption-ready systems, workflows, and proof."

### Corrections from the source (Codex) brief

The Codex brief contained errors that MUST NOT propagate into the site:

1. **Primary title.** The brief used "Solutions Architect & Technical Systems Translator."
   The chosen primary title is **Forward Deployed Engineer** (best evidence match, searchable,
   avoids overclaiming enterprise-architect seniority). The "systems translator" line is kept
   only as the supporting thesis sentence, never as the job-title anchor.
2. **Name.** The brief wrote "Kyle Genesis." The correct name is **Kyle Semple**. The string
   "Kyle Genesis" must appear nowhere.
3. **Projects not in the repo.** The brief supplied ready-made card/case-study copy for
   **Northern Grind** and **MOH (Ministry of Health)** as if they were already on the site.
   They are real projects of Kyle's but are **not yet implemented** in this iteration. Do not
   author their content from the brief's copy; add them only via the gated subphase 6.11 using
   Kyle-provided source material. Phase 6 work uses the real on-site inventory (§5).
4. **Customer Success scope.** CS is an **evidence layer only**. Kyle has support/triage
   experience but no managed book of business. Never claim CSM seniority, ARR/NRR, renewals,
   or expansion ownership in the headline, resume summary, or machine summaries.

---

## 3. Claude Code execution conventions

This refactor runs under the existing **Sequential Execution Protocol** (`CLAUDE.md`):

- **One subphase at a time.** Implement a single subphase, validate, commit, STOP, and wait
  for explicit approval before the next. Do not read ahead and pre-build later subphases.
- **Branch:** in a Claude Code web session, develop on the designated session branch. If
  running locally, a descriptive branch such as `phase/positioning-refactor` is acceptable.
- **Tools:** prefer `Read`/`Edit` for surgical changes. Use the `Explore` subagent for any
  discovery, the `Plan` subagent if a subphase needs design, and the `/code-review` skill on
  the diff after each subphase. Use the `/run` or `/verify` skill to confirm the homepage
  renders before committing visual subphases.
- **Design system:** all visual work obeys the non-negotiable Design System Rules in
  `CLAUDE.md` (no glassmorphism, solid 1px borders, contrast tiers). The pillar/section work
  in 6.2 must not reintroduce gradient/hero-tile/SaaS-template patterns.

### Validation suite (run after every subphase)

```bash
npm run typecheck            # zero errors
npm run lint                 # zero warnings
npm run format:check         # prettier clean (run `npm run format` first)
npm test -- --run            # vitest, single run
npm run build                # tsc + vite build
npm run generate:crawler-html  # only for subphases that touch crawler/SEO/content
npm run validate:crawler       # only for subphases that touch crawler/SEO/content
```

If any command fails on the base branch too, document it as **pre-existing** and do not
hide it. Never add a "launch-ready" claim unless the full suite passes.

---

## 4. Key files (verified to exist)

| Concern                        | File(s)                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Homepage hero + tracks + About | `src/views/HomeView.tsx`                                                                                 |
| Homepage subsections           | `src/components/home/` (`FlagshipSystemSection.tsx`, `SupportingEvidenceSection.tsx`)                    |
| Role-track content             | `src/data/trackContent.ts`; track views `src/views/*TrackView.tsx`                                       |
| Project registry + metadata    | `src/constants.tsx` (`PROJECT_REGISTRY`); `src/data/projectMetadata.ts`                                  |
| Case-study bodies              | `src/data/caseStudyData.ts`                                                                              |
| Case-study content loader      | `src/hooks/useCaseStudyContent.ts` (see §6, subphase 6.5 — known bug)                                    |
| Project detail rendering       | `src/views/ProjectDetailView.tsx`; `src/components/MarkdownSection.tsx`                                  |
| Deep dives                     | `src/views/DeepDiveView.tsx`                                                                             |
| Digital Twin prompt + widget   | `server/geminiProxy.ts`; `src/components/ChatWidget.tsx`                                                 |
| Routes / nav                   | `src/router.tsx`; `src/components/TopNav.tsx`, `SidebarNav.tsx`                                          |
| Crawler / LLM visibility       | `scripts/generate-crawler-html.mjs`; `scripts/validate-crawler.mjs`; `src/lib/seo.ts`; `public/llms.txt` |
| Resume                         | `src/views/ResumeView.tsx`                                                                               |

Do not assume any other filenames; inspect before editing.

---

## 5. Real project / case-study inventory

Registry projects (`src/constants.tsx`): `luxe-lofts`, `ops-triage`, `guynode`, `digital-twin`.

Additional case-study bodies (`src/data/caseStudyData.ts`): `prompter-hub`, `project-aegis`,
`nba-systems-qa`.

**Real projects not yet implemented on the site:** **Northern Grind** (a local-business systems
case study — brand identity, menu experience, POS/loyalty, customer experience) and **MOH —
Ministry of Health** (a GIS / spatial-data project). These are genuine projects of Kyle's; they
simply have not been added to this iteration. They are **out of scope for Phase 6** and must be
added only via subphase 6.11 (gated), using Kyle-provided source material. Do not fabricate
their content or metrics, and do not silently drop them as if they were never real.

---

## 6. Subphases

Each subphase lists scope, target files, acceptance, and a commit message. Implement in order.

### 6.1 — Central positioning & hero

- **Scope:** Replace the "three target roles" hero framing in `HomeView.tsx` with the §2
  canonical positioning (name, FDE title, thesis sentence, supporting bridge). Update the
  `ResumeView.tsx` summary so the resume and site agree on "Forward Deployed Engineer" as the
  lead, with implementation/technical-CS as adjacent.
- **Files:** `src/views/HomeView.tsx`, `src/views/ResumeView.tsx`.
- **Acceptance:** Above the fold, a visitor reads one title + one thesis. No competing list of
  separate "target roles." Resume summary leads with FDE.
- **Commit:** `feat: subphase 6.1 — central FDE positioning & hero thesis`

### 6.2 — "What I Help Teams Do" pillars

- **Scope:** Add a homepage section with four proof pillars (design-system compliant, solid
  cards, no glassmorphism): **Translate Complexity**, **Build Adoption-Ready Systems**,
  **Support Better Decisions**, **Bridge Technical and Non-Technical Teams**. This section
  takes the visual prominence formerly held by the role tracks.
- **Files:** `src/views/HomeView.tsx` (+ a new component in `src/components/home/` if warranted).
- **Acceptance:** Pillars render as the primary "what I do" block; copy is recruiter-readable.
- **Commit:** `feat: subphase 6.2 — "What I Help Teams Do" proof pillars`

### 6.3 — Demote role tracks to role-relevance lenses

- **Scope:** Move the three role-track cards out of the hero/primary position into a lower,
  lower-emphasis "Explore by role lens" section. Keep the routes (`/tracks/*`) intact;
  repurpose pages as role-lens pages. Standardize the role labels (§ role labels below).
  Resolve the existing **title/content mismatch**: the "Solutions Architect" track is wired to
  QA content (`QA_TRACK`) — pick one (rename the lens to its real QA/reliability content, or
  rewrite the content) so title and body agree.
- **Files:** `src/views/HomeView.tsx`, `src/data/trackContent.ts`, track views, `src/constants.tsx`.
- **Acceptance:** Tracks no longer compete with hero/featured proof; labels consistent;
  no broken routes; title/content mismatch resolved.
- **Commit:** `feat: subphase 6.3 — demote role tracks to role-relevance lenses`

Consistent role labels: `Forward-Deployed Engineering`, `Technical Implementation`,
`Customer Success`, `Solutions / Systems Architecture`, `GIS / Spatial Systems`,
`AI Workflow Design`, `Operations & Support Triage`.

### 6.4 — Project cards: stakeholder value layer

- **Scope:** Extend project cards to communicate **Purpose · Stakeholder/Customer Value ·
  Role Relevance · Proof Type**. Add the data fields to `projectMetadata.ts` / `constants.tsx`
  and render them in the card component(s). Use real projects only (§5).
- **Files:** `src/data/projectMetadata.ts`, `src/constants.tsx`, project card component(s),
  `src/components/home/SupportingEvidenceSection.tsx`.
- **Acceptance:** Each card answers "who did this help / what got easier," not just "what was built."
- **Commit:** `feat: subphase 6.4 — stakeholder value layer on project cards`

### 6.5 — Case-study "Customer / Stakeholder Value" sections + content-loader bug fix

- **Scope (content):** Add a project-specific **"Customer / Stakeholder Value"** section to
  each major case study in `caseStudyData.ts` (`guynode`, `digital-twin`, `ops-triage`,
  `luxe-lofts`; extend to `prompter-hub`, `project-aegis`, `nba-systems-qa` where it fits).
  Write distinct copy per project — no copy-paste blocks.
- **Scope (bug fix — fold in here):** `useCaseStudyContent.ts` special-cases `guynode` and
  `digital-twin` to fetch crawler **stub** files (`/markdown/projects/*.md`), so their detail
  pages render the stub instead of the full body. Remove that special-case so both fall back to
  the full content (like every other project). The crawler stubs stay for SEO. **Validate with
  `generate:crawler-html` + `validate:crawler` in this subphase.**
- **Files:** `src/data/caseStudyData.ts`, `src/hooks/useCaseStudyContent.ts`.
- **Acceptance:** Guynode and Digital Twin show full case studies again; every major case study
  has a tailored stakeholder-value section; crawler still validates.
- **Commit:** `feat: subphase 6.5 — case-study stakeholder value + content-loader fix`

### 6.6 — Deep dive role/value bridges

- **Scope:** Add a short, deep-dive-specific bridge tying each relevant deep dive to adoption /
  stakeholder value / implementation maturity (not generic boilerplate).
- **Files:** `src/views/DeepDiveView.tsx` (and any deep-dive data source it reads).
- **Acceptance:** Each deep dive reinforces the translation/adoption thesis with specific copy.
- **Commit:** `feat: subphase 6.6 — deep dive value bridges`

### 6.7 — Digital Twin prompt + need-based routing

- **Scope:** Update the assistant system prompt to the §2 positioning (FDE, correct name,
  thesis-first). Replace role-track-first routing with **need-based** routing, and verify every
  internal navigation target matches a real route in `router.tsx`.
- **Files:** `server/geminiProxy.ts`, `src/components/ChatWidget.tsx`.
- **Need-based routing (real targets only):** AI work → Digital Twin / AI deep dives;
  customer-facing work → Luxe Lofts, Ops Triage; GIS work → Guynode; implementation proof →
  Guynode, Ops Triage, build/release governance deep dive; technical depth → deep dives; resume → Resume.
- **Acceptance:** Assistant explains the thesis first, routes by need, no stale track names or
  dead routes. Update `server/__tests__/geminiProxy.test.ts` expectations as needed.
- **Commit:** `feat: subphase 6.7 — Digital Twin positioning & need-based routing`

### 6.8 — Crawler / LLM visibility alignment

- **Scope:** Update machine-readable summaries so Kyle is described primarily as a
  **Forward Deployed Engineer** with the thesis, and the portfolio as proof of technical
  implementation, customer success, GIS/spatial, operations triage, and AI workflow design.
  Regenerate artifacts.
- **Files:** `scripts/generate-crawler-html.mjs`, `src/lib/seo.ts`, `public/llms.txt`, any
  generated crawler HTML; then run `generate:crawler-html` + `validate:crawler`.
- **Acceptance:** No stale "three separate target roles" framing in machine summaries; crawler
  validates; sitemap/route naming unchanged.
- **Commit:** `feat: subphase 6.8 — crawler/LLM summary alignment`

### 6.9 — Navigation & route preservation

- **Scope:** Keep top-level nav simple (`Home`, `Projects`, `Deep Dives`, `Resume`, `About`,
  `Contact`/`Gallery` as already present). Ensure no role-track label dominates primary nav.
  Preserve all existing routes; only repurpose, never break (add redirects if a route truly
  must change).
- **Files:** `src/components/TopNav.tsx`, `src/components/SidebarNav.tsx`, `src/router.tsx`.
- **Acceptance:** Nav is thesis-forward; all prior links resolve.
- **Commit:** `feat: subphase 6.9 — nav alignment & route preservation`

### 6.10 — Docs, release notes, final validation

- **Scope:** Update `README.md` / docs to describe this phase as a **Positioning Refactor —
  Forward Deployed Engineer model** (IA refactor, role-track demotion, stakeholder-value layer,
  Digital Twin positioning, crawler alignment). Run the full validation suite.
- **Files:** `README.md`, `docs/*`.
- **Acceptance:** Docs reflect the new positioning; full suite green; no overstated claims.
- **Commit:** `docs: subphase 6.10 — positioning refactor notes & final validation`

### 6.11 — Integrate Northern Grind & MOH (PARTIALLY DONE — both staged as hidden drafts)

> **Status.** A project/deep-dive `visibility` flag now exists (`ProjectMetadata.visibility`,
> default `'public'`; non-public entries are filtered from every list, the switcher, structured
> data, and crawler output, but stay reachable by direct URL for preview). Both projects are added
> as `visibility: 'draft'` entries:
>
> - **Northern Grind** — **PUBLISHED** (`visibility: 'public'`, in switcher + sitemap). Renders the
>   real staged case study at `public/case-studies/northern-grind.md`.
> - **MOH (Ministry of Health)** — still `visibility: 'draft'`; no staged content yet, carries an
>   honest placeholder body. Use `docs/moh-intake-questionnaire.md` to collect source material.
>
> **Remaining (gated on Kyle):** supply MOH source material (via the intake questionnaire); then
> publish by flipping `visibility`. Do not fabricate MOH content.

- **Scope:** Add the two real-but-unimplemented projects to the site:
  - **Northern Grind** — local-business systems case study (brand identity, menu experience,
    POS/loyalty thinking, customer experience). Likely role relevance: Customer Experience ·
    Operations Design · Service Design · Small Business Systems.
  - **MOH (Ministry of Health)** — GIS / spatial-data project. Likely role relevance:
    GIS / Spatial Systems · Public-Sector Implementation · Data Governance. Slots into the
    Digital Twin's GIS routing alongside Guynode.
- **Files (when unblocked):** `src/constants.tsx` (`PROJECT_REGISTRY`), `src/data/projectMetadata.ts`,
  `src/data/caseStudyData.ts`, project assets under `public/`, plus crawler/SEO updates
  (`scripts/generate-crawler-html.mjs`, `src/lib/seo.ts`, `public/llms.txt`) and Digital Twin
  routing (`server/geminiProxy.ts`).
- **Inputs required from Kyle (before starting):** project summary, scope/role, stakeholders,
  real outcomes (no invented metrics), any links/screenshots, and which role-relevance tags apply.
- **Acceptance:** Both projects appear with the §6.4 card pattern and §6.5 stakeholder-value
  section, content sourced only from Kyle's material; crawler validates; routes resolve.
- **Commit:** `feat: subphase 6.11 — integrate Northern Grind & MOH projects`

### 6.12 — Consolidate case-study content to a single markdown source of truth

> **Context (found during 6.5).** Case-study bodies live in **two parallel stores** that have
> already diverged: `public/case-studies/*.md` (fetched at runtime by `useCaseStudyContent`, and
> the version that actually renders) and `CASE_STUDY_CONTENT` in `src/data/caseStudyData.ts`
> (imported into `src/constants.tsx` as the `activeProject.content` fallback). For example
> `ops-triage` has different copy in each. Only `guynode` and `digital-twin` render from the TS
> store today (they have no `public/case-studies/*.md` file, so the fetch 404s and falls back).
> This subphase removes the duplication. **Chosen direction: markdown files are canonical
> (fetch-only); retire `CASE_STUDY_CONTENT`.**

- **Scope:** Make `public/case-studies/*.md` the single source of truth and remove the TS body store.
  - Port the two TS-only bodies into new `public/case-studies/guynode.md` and
    `public/case-studies/digital-twin.md`, carrying over the 6.5 "Customer / Stakeholder Value"
    sections verbatim. Pick the most current body where the two stores diverge (do not silently
    drop richer copy; reconcile deliberately).
  - Delete `CASE_STUDY_CONTENT` and its `src/constants.tsx` references; collapse the render path
    in `useCaseStudyContent.ts` / `ProjectDetailView.tsx` to the single fetch (drop the
    `activeProject.content` fallback that 6.5 relied on).
  - Add a graceful empty/error state for when a body fails to load, with a test covering it.
  - Add a drift/coverage guard test: every routed case study has a matching
    `public/case-studies/<id>.md`, so the two stores can never silently diverge again.
  - **Leave the crawler stubs under `public/markdown/projects/` intact** — they are a separate
    SEO concern, not the case-study render source.
- **Files:** `public/case-studies/*.md` (+ `guynode.md`, `digital-twin.md`),
  `src/data/caseStudyData.ts` (remove bodies), `src/constants.tsx`,
  `src/hooks/useCaseStudyContent.ts`, `src/views/ProjectDetailView.tsx`, tests under `src/test/`.
- **Acceptance:** One content store; `CASE_STUDY_CONTENT` gone; every case study renders from its
  `.md`; `guynode`/`digital-twin` still show full bodies including the stakeholder-value section;
  empty/error state handled; drift guard passes; full validation suite green (the pre-existing
  crawler route failure remains 6.8's unless already landed).
- **Commit:** `refactor: subphase 6.12 — consolidate case-study content to markdown source of truth`

---

## 7. Acceptance criteria (phase complete)

**Content**

- Homepage leads with one identity (FDE + thesis), not prominent role-track choice.
- Role tracks demoted to metadata / lower-priority lenses; labels consistent; QA/Solutions
  title-content mismatch resolved.
- Project cards include stakeholder/customer value.
- Major case studies include a tailored "Customer / Stakeholder Value" section.
- Guynode and Digital Twin detail pages render full content (loader bug fixed).
- Case-study content has a single source of truth (markdown); the duplicate `CASE_STUDY_CONTENT`
  store is retired (6.12).
- Digital Twin explains Kyle via the FDE thesis and routes by need.
- Deep dives reinforce translation/adoption with specific copy.

**Technical** — full validation suite passes (or pre-existing failures documented).

**Documentation** — README/docs describe the phase accurately; no "launch-ready" claim
without a green suite; route naming and crawler sitemap do not drift.

---

## 8. Guardrails

- Do not remove major projects or delete role-track routes without safe redirects + reference updates.
- Do not invent metrics or customers. Northern Grind and MOH (Ministry of Health) are real but
  not yet on the site — add them only via the gated subphase 6.11 with real source material,
  never fabricated from the brief's placeholder copy.
- Do not overstate CSM relevance; CS is an evidence layer, not the identity.
- Name is **Kyle Semple**; title is **Forward Deployed Engineer**; never "Kyle Genesis," never
  "Solutions Architect" as the lead title.
- Preserve the Design System Rules in `CLAUDE.md` (no glassmorphism; solid 1px borders; contrast tiers).
- Keep copy concise and recruiter-readable; keep the positioning technical, strategic, and customer-aware.
