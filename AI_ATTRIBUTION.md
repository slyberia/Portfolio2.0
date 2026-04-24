# AI_ATTRIBUTION.md

Source of truth for all AI-assisted work across Portfolio2.0, Guynode, and HPS Geospatial.

**How to use this document:**

- Part 1 is the verified session evidence log. Use it for attribution updates to `HOW_IT_WAS_BUILT.md`, `DECISIONS.md`, `public/llms.txt`, and related files. Do not infer beyond what it states.
- Part 2 is the Project Aegis context. It documents the prompt engineering work that underlies several Guynode and HPS session protocols. It is source material for `public/case-studies/project-aegis.md` attribution only.
- Where Part 2 informs a session already logged in Part 1, the Part 1 entry takes precedence.

---

## Part 1 — Session Evidence Log

Attribution record for AI-assisted work across Portfolio2.0, Guynode, and HPS Geospatial projects.
Generated from conversation history search + repo inspection. Only evidenced contributions are documented.
Ambiguous or unsupported entries are flagged.

---

### How to Read This Document

- **My Direction** — constraints, pushback, intent, or framing I supplied
- **Model Contribution** — what the model generated, decided, or produced
- **Attribution Strength:**
  - `PRIMARY` — model produced the artifact with minimal or no prior direction
  - `SUPPORTING` — model generated structure/code under explicit constraints I set
  - `DIRECTIONAL` — model influenced a decision through analysis; I executed

---

### Portfolio2.0

---

#### SESSION: P2-01

**Topic:** KS_01 vs. main layout design evaluation
**Date (approx.):** 2026-04-21
**Source chat:** `3304ac6c-7579-4ede-8784-e8943aaba651`

**Decision/Artifact:**
Evaluation of two hero layout directions against `.impeccable.md` design principles. Model assessed KS_01 (editorial grid, sidebar nav, versioned title, node diagram) as passing all five principles; original main hero as failing the #1 anti-reference (generic SaaS template: center-aligned, pill badge, dual CTAs).

**Repo Mapping:**

- `.impeccable.md` (design criteria used as evaluation rubric)
- `CHANGELOG.md` (v2.0.0 entry documenting pivot decision)
- `HOW_IT_WAS_BUILT.md` (Design Iteration: The KS_01 Pivot section)
- Tag `v1.5.0-pre-redesign` (preservation of pre-pivot state)

**My Direction:**

- Supplied `.impeccable.md` as the evaluation framework
- Decision to preserve original main as a documented artifact of iteration, framing it as evidence of operational maturity
- Framing of the progression itself as portfolio content

**Model Contribution:**

- Performed the comparative design critique
- Named the specific anti-reference violations in the original hero (center-aligned, pill badge, dual CTAs)
- Mapped KS_01 against all five `.impeccable.md` principles with explanations
- Recommended merging KS_01 and preserving prior state via git tag
- Drafted prose for both `HOW_IT_WAS_BUILT.md` (KS_01 Pivot section) and `CHANGELOG.md` (v2.0.0 entry)

**Attribution Strength:** `SUPPORTING` (for critique) / `PRIMARY` (for documentation prose)

---

#### SESSION: P2-02

**Topic:** Git workflow for KS_01 → main promotion
**Date (approx.):** 2026-04-21–22
**Source chats:** `3304ac6c-7579-4ede-8784-e8943aaba651`, `a154ca8d-6a36-4830-b95e-0479a0a0c818`

**Decision/Artifact:**
Full git workflow for promoting KS_01 to main with versioned tagging and GitHub releases. Converted into a single Claude Code prompt.

**Repo Mapping:**

- Git tags: `v1.5.0-pre-redesign`, `v2.0.0`
- GitHub releases (linked to both tags)

**My Direction:**

- Specified `--no-ff` merge to preserve branch topology
- Specified conflict resolution: KS_01 wins on UI/design files, main wins on documentation
- Requested terminal-based workflow; identified Windows/PowerShell environment

**Model Contribution:**

- Full git command sequence (clone → tag → docs commit → merge → push → tag → release)
- Claude Code prompt encapsulating the entire workflow
- Conflict resolution instructions

**Attribution Strength:** `SUPPORTING`

---

#### SESSION: P2-03

**Topic:** Claude Code prompt evaluation for content/copy additions
**Date (approx.):** 2026-04-23
**Source chat:** `010730a6-0aba-4e32-a7ed-9cacf20a5793`

**Decision/Artifact:**
Audit of a Claude Code prompt for token efficiency and effectiveness. Identified: six instances of redundant constraint repetition, missing file targeting as the highest-impact gap, suboptimal task ordering (priority-first vs. dependency-first), `Implementation Guidance` block as redundant with Claude Code defaults. Recommended restructure reducing estimated token cost from ~1,880 to ~900.

**Repo Mapping:**

- Tooling/process artifact — no committed file
- Relevant to `src/data/trackContent.ts`, `src/data/caseStudyData.ts`, case study markdown files

**My Direction:**

- Supplied the prompt document for evaluation
- Requested both token efficiency and effectiveness analysis

**Model Contribution:**

- Full structural audit with token budget table
- Identified "no file targeting" as the single highest-impact gap
- Produced recommended restructure

**Attribution Strength:** `DIRECTIONAL`

---

#### SESSION: P2-04

**Topic:** ship-safe security audit prompt
**Date (approx.):** 2026-04-22
**Source chat:** `a154ca8d-6a36-4830-b95e-0479a0a0c818`

**Decision/Artifact:**
Claude Code prompt to install and run ship-safe security scanner, targeting API key handling, rate limiting, prompt injection defenses, CI/CD pipeline, and dependency vulnerabilities.

**Repo Mapping:**

- `server/geminiProxy.ts`
- `.github/workflows/ci.yml`
- `SECURITY_AUDIT.md`

**My Direction:**

- Supplied ship-safe GitHub URL
- Specified security intent: harden application and API access

**Model Contribution:**

- Fetched and read the ship-safe repo
- Structured 6-step audit prompt with failure-handling instructions
- Identified specific scan commands relevant to this codebase

**Attribution Strength:** `SUPPORTING`

---

#### SESSION: P2-05 ⚠️ GEMINI — NOT CLAUDE

**Topic:** Original prototype build in Google AI Studio
**Date (approx.):** Prior to all chat history available
**Source:** `HOW_IT_WAS_BUILT.md` Phase 1 narrative

**Decision/Artifact:**
Per `HOW_IT_WAS_BUILT.md`: initial portfolio scaffolding, component structure, and hero copy produced through directed conversation in Google AI Studio (Gemini). Named artifacts: `SkillDiscoveryModal` pattern (after pushback on flat tag list), hero copy rewrite (after pushback on generic language).

**Repo Mapping:**

- `src/components/SkillDiscoveryModal.tsx`
- Hero section copy (superseded by KS_01)

**My Direction:**

- Rejected flat tag wall; specified hover-reveal, category-grouped, modal container
- Rejected generic hero copy; specified audience, tone, and value proposition

**Model Contribution (Gemini):**

- Generated `SkillDiscoveryModal` pattern after direction
- Rewrote hero copy after direction

**Attribution Strength:** `SUPPORTING` (Gemini, not Claude)

---

#### SESSION: P2-06 ⚠️ UNATTRIBUTED

**Topic:** Phases 1–4 migration work (tsconfig, DOMPurify, React Router, Recruiter Mode, CI, tests)
**Date (approx.):** 2025-04 (per CHANGELOG)

**Decision/Artifact:**
Per `CHANGELOG.md` (v1.1.0–v1.4.0): tsconfig.json with strict mode, DOMPurify integration, React Router v6 migration, Express Gemini proxy, Vitest test suite, GitHub Actions CI, Recruiter Mode context, markdown content migration.

**Repo Mapping:**

- `tsconfig.json`, `src/components/ErrorBoundary.tsx`
- `src/components/HTMLSection.tsx` (DOMPurify)
- `src/router.tsx`, `server/geminiProxy.ts`, `server/index.ts`
- `src/hooks/useCaseStudyContent.ts`
- `src/context/RecruiterModeContext.tsx`
- `.github/workflows/ci.yml`
- `src/test/`, `server/__tests__/`
- `public/case-studies/*.md`

**My Direction:**
Per documented record: identified CDN/importmap problem, specified server-side migration, identified API key exposure vulnerability.

**Model Contribution:** Undetermined — no session evidence in Claude history.

**Attribution Strength:** ⚠️ CANNOT DETERMINE

---

#### SESSION: P2-07

**Topic:** Impeccable skill-driven UI/UX refinement — hero copy, terminology, track content
**Date (approx.):** 2026-04 (between `claude-hero-redesign-uupm` branch and KS_01 promotion)
**Source:** Branch `claude-hero-redesign-uupm` (artifact evidence); sessions T-01/T-02 (skill installation context)

**Decision/Artifact:**
Application of the Impeccable skill collection (installed globally per T-01/T-02) to refine portfolio UI/UX. Changes are evidenced by diff between the `claude-hero-redesign-uupm` branch and `main`:

- Hero copy rewritten from track-listing description to role-positioning statement ("Technical Customer Success and Solutions Enablement hybrid specializing in AI workflows, operational triage, and reliable data systems...")
- Terminology shift throughout: "revision trail" / "proof structure" → "forensic archive" / "proof hierarchy"
- Case study section subcopy tightened
- Typography and spacing micro-adjustments in `HomeView.tsx` (vw scaling, padding alignment)

The KS_01 layout evaluation (P2-01) followed this refinement work and applied `.impeccable.md` criteria to assess the result — this session produced the content state that P2-01 then evaluated structurally.

**Repo Mapping:**

- `src/views/HomeView.tsx` — hero copy, vw scaling, padding
- `src/views/DeepDiveView.tsx` — forensic archive terminology, section headings
- `src/data/trackContent.ts` — track descriptions, proof block copy, terminology

**My Direction:**

- Supplied `.impeccable.md` as the governing design constraint document
- Selected which Impeccable sub-skills to invoke (critique, clarify, layout)
- Made final copy decisions from model-generated options

**Model Contribution:**

- Applied `/impeccable critique` and `/clarify` to produce copy variants
- Generated "forensic archive" framing and associated terminology
- Spacing and typography refinements via `/layout` sub-skill

**Attribution Strength:** `SUPPORTING`

**⚠️ Note:** Specific sub-skills invoked are inferred from the Impeccable collection capabilities and the nature of the diffs. No session transcript survives for this work. The branch serves as the artifact evidence.

---

### Guynode

---

#### SESSION: G-01

**Topic:** Senior engineer system prompt / session protocol design
**Date (approx.):** 2026-03-26
**Source chat:** `fc7468bf-af5b-4e1f-974b-e961b2853846`

**Decision/Artifact:**
Session protocol governing all Claude Code sessions on Guynode. Now committed as `CLAUDE.md`. Rules: no preamble, one clarifying question max, changed-block-only output, grouped terminal commands, scope discipline, TypeScript minimal-fix rules, context-load awareness, DONE summary format.

**Repo Mapping:**

- `CLAUDE.md` (Guynode_v2-main)

**My Direction:**

- Full authorship of all rules and the DONE format
- Added context-load awareness section and "Do not touch" list
- **Note:** This protocol is a direct adaptation of the Aegis/Guynode v3 protocol (see Part 2) into the Claude Code behavioral format

**Model Contribution:**

- Demonstrated compliance by requesting session brief before acting
- No code produced in recovered Claude session fragment

**Attribution Strength:** `DIRECTIONAL`

---

#### SESSION: G-02

**Topic:** Multi-agent architecture design
**Date (approx.):** 2026-03-26
**Source chat:** `f6acfa20-804e-4bb1-88cc-67513ad550c9`

**Decision/Artifact:**
Architecture discussion: superscalar multi-agent pipeline (Antigravity Manager view, OS/soccer team metaphors) and Notion-driven async multi-agent system. Tooling split recommendation: direct Claude for architecture, Antigravity for multi-model work, Jules for implementation.

**Repo Mapping:** Conceptual — no committed artifact

**My Direction:**

- Originated both architecture concepts
- Raised the Antigravity consolidation question

**Model Contribution:**

- Recommended against Antigravity intermediary for deep design sessions
- Articulated tradeoffs; proposed three-way tooling split

**Attribution Strength:** `DIRECTIONAL`

---

#### SESSION: G-03 ⚠️ UNATTRIBUTED

**Topic:** Refactor Definition of Done, DECISIONS.md, architectural ADRs
**Date (approx.):** Unknown

**Decision/Artifact:**
`Refactor Definition of Done (DoD).md`, `DECISIONS.md` (4 ADRs: query-param routing, static JSON, Leaflet over MapboxGL, custom sanitizer), `CLAUDE.md` behavioral rules. Exist in repo; no matching session found.

**Repo Mapping:**

- `CLAUDE.md`, `DECISIONS.md`, `Refactor Definition of Done (DoD).md`

**Attribution Strength:** ⚠️ CANNOT DETERMINE

---

#### SESSION: G-04 ⚠️ GEMINI — NOT CLAUDE

**Topic:** Pre-v2 build: Dataset contract, Catalog/Viewer wiring, polygon rendering
**Date (approx.):** 2026-02-12
**Source:** `migrated_prompt_history/prompt_2026-02-12T20_13_24.406Z.json`

**Decision/Artifact:**
Three work items from migrated Gemini prompt history:

1. Dataset contract consolidation: `DatasetStyle` interface added to `types.ts`; `MOCK_DATASETS` updated with per-dataset style configs; `Catalog.tsx` and `MapViewer.tsx` refactored to use centralized style.
2. Verification pass: static analysis of all invariants — all PASS verdicts.
3. Polygon rendering fix: stale `handleMapMove` closure diagnosed; `layersRef`/`viewerStateRef` pattern introduced; `invalidateSize()` added with `setTimeout`.

**Repo Mapping:**

- `types.ts`, `components/Catalog.tsx`, `components/MapViewer.tsx`, `data/logEntries.ts`

**My Direction:**

- Authored all task prompts under "GUYNODE MASTER INSTRUCTION FILE (v3)" protocol (see Part 2)
- Specified execution vs. verification-only mode per task
- Required logging mandate compliance

**Model Contribution (Gemini):**

- Full file rewrites for `types.ts`, `Catalog.tsx`, `MapViewer.tsx`
- PASS/WARN/FAIL verification verdicts
- Stale closure root cause diagnosis
- `layersRef`/`viewerStateRef` fix

**Attribution Strength:** `SUPPORTING` (Gemini, not Claude)

---

#### SESSION: G-05 ⚠️ GEMINI — NOT CLAUDE

**Topic:** Security hardening, Firebase excision, Hero UX refactor
**Date (approx.):** Unknown
**Source:** `dev_log_security_ux.txt` (GuynodeRedesigned repo)

**Decision/Artifact:**
Phase 1: importmap removal, CSP hardening in `firebase.json`, dual CTA Hero.
Phase 2: Firebase excision — deleted `firebase.json`/`.firebaserc`, migrated CSP to `index.html` meta tag.

**Repo Mapping:**

- `index.html`, `components/Hero.tsx`, `package.json`

**My Direction:**

- Firebase excision decision; specified no misleading language in Hero; view-state routing must be preserved in CTA links

**Model Contribution (Gemini):** Generated all changes; produced dev log entry.

**Attribution Strength:** `SUPPORTING` (Gemini, not Claude)

---

#### SESSION: G-06 ⚠️ GEMINI — NOT CLAUDE

**Topic:** SEO domain migration and canonical URL strategy
**Date (approx.):** Unknown
**Source:** `dev_log_seo_update.txt` (GuynodeRedesigned repo)

**Decision/Artifact:**
Domain standardization `guynode.gy` → `guynode.com`; `SITE_URL`/`SUPPORT_EMAIL` constants; sitemap refactor; OG image migrated from `picsum.photos` to local file; `MetaManager.tsx` canonical routing (7 indexable views; `noindex` for detail/internal pages).

**Repo Mapping:**

- `utils/env.ts`, `scripts/generate-sitemap.js`, `components/Footer.tsx`, `components/ReportIssuePage.tsx`, `components/developers/DatasetEndpointPanel.tsx`, `utils/meta.ts`, `index.html`, `utils/datasetRegistration.ts`, `utils/contextCardUtils.ts`, `tests/datasetRegistration.test.ts`, `components/core/MetaManager.tsx`

**My Direction:**

- `.com` domain decision; zero-tracking compliance requirement; canonical strategy definition

**Model Contribution (Gemini):** All file changes; `noindex`/canonical logic; dev log entry.

**Attribution Strength:** `SUPPORTING` (Gemini, not Claude)

---

#### SESSION: G-07 ⚠️ UNATTRIBUTED

**Topic:** GuynodeRedesigned → Guynode_v2 refactor
**Date (approx.):** Between G-06 and 2026-03-26

**Decision/Artifact:**
Additions in Guynode_v2 not present in GuynodeRedesigned: `CLAUDE.md`, `DECISIONS.md`, `public/_redirects` (Cloudflare), Learn section (2 pages + 12 JSON files), `AttributionPage.tsx`, `LocatorPage.tsx`, `ImageViewer.tsx`, `PdfViewer.tsx`, `config.ts`, full test suite (5 test files), 9 new utils.

**Repo Mapping:** All listed files in `Guynode_v2-main`.

**Attribution Strength:** ⚠️ CANNOT DETERMINE

---

### HPS Geospatial

---

#### SESSION: H-01

**Topic:** Claude for Excel + Survey123 XLSForm QA/QC workflow
**Date (approx.):** 2026-03-26
**Source chat:** `f6acfa20-804e-4bb1-88cc-67513ad550c9`

**Decision/Artifact:**
Workflow design for using Claude for Excel to audit Survey123 XLSForms: constraint logic audit, field naming standardization, inconsistency detection, bulk correction. Skills feature identified as path to repeatability.

**Repo Mapping:** Process/tooling recommendation — no committed artifact

**My Direction:** Identified project context; raised the Claude for Excel question

**Model Contribution:** Researched capabilities; mapped to XLSForm use case; flagged plan implications

**Attribution Strength:** `DIRECTIONAL`

---

#### SESSION: H-02 ⚠️ GEMINI — NOT CLAUDE

**Topic:** HPSgeospatial-main — initial site build
**Date (approx.):** Unknown
**Source:** `README.md` references `ai.studio/apps/b498bd53...`; `hpsOS Instruction File.md` addresses Jules

**Decision/Artifact:**
Full React + Vite + TypeScript + Tailwind SPA: 9 pages, components, lib files, `src/data/index.ts` (placeholder content), `api/contact.ts`, `vercel.json`, `eslint.config.js`, 7 placeholder SVGs.

**Repo Mapping:** `HPSgeospatial-main` (entire repo)

**My Direction:**

- Authored `hpsOS Instruction File.md` (Zero Scope Creep, No Redesigns, No Trust Leaks, No Hallucinated Success, SSG/React 19 fallback authorization)
- All five Strict Operating Rules are user-authored constraints

**Model Contribution (Gemini/Jules):** Full SPA scaffold, serverless handler, Vercel config.

**Attribution Strength:** `SUPPORTING` (Gemini/Jules, not Claude)

---

#### SESSION: H-03 ⚠️ GEMINI — NOT CLAUDE

**Topic:** HPSgeospatial-template-cms-foundation — Sanity CMS layer and white-label template
**Date (approx.):** Unknown
**Source:** Same `hpsOS Instruction File.md` as H-02

**Decision/Artifact:**
Sanity schemas (siteSettings, teamMember, jobPosting), Sanity client + GROQ queries, three hooks (useSiteSettings with HPS_FALLBACK, useTeamMembers, useJobPostings), three integration stubs (forms, booking, analytics), and four documentation files (TEMPLATE.md, DEPLOYMENT.md, INTEGRATIONS.md, updated README).

TEMPLATE.md notably includes a systematic audit of all hardcoded HPS values requiring replacement per client — the most substantive deliverable.

Known gaps documented in TEMPLATE.md: Footer.tsx and Nav.tsx do not call useSiteSettings(); primaryColor/socialLinks/logo Sanity fields not wired to any component; JSON-LD address/phone mismatches in HomePage.tsx.

**Repo Mapping:** `HPSgeospatial-template-cms-foundation` (entire repo)

**My Direction:**

- White-label template decision; stable stub contract signatures; directed TEMPLATE.md as client handoff document

**Model Contribution (Gemini/Jules):** All schemas, hooks, stubs, documentation; hardcoded-values audit.

**Attribution Strength:** `SUPPORTING` (Gemini/Jules, not Claude)

---

### Cross-Project Tooling

---

#### SESSION: T-01

**Topic:** Impeccable skill pack — global installation strategy
**Date (approx.):** 2026-04-13
**Source chat:** `c825c5b8-44af-4e9b-ad7e-4ba1609f5ef2`

**Decision/Artifact:**
Strategy for installing Impeccable skill collection globally via `~/.claude/skills/` symlink, available across all projects without per-project installation. Shell commands for global install.

**Repo Mapping:** `~/.claude/skills/` (global, outside any project repo)

**My Direction:** Wanted global availability without per-project install; specified Claude Code as target

**Model Contribution:** Designed symlink strategy; produced shell commands

**Attribution Strength:** `SUPPORTING`

---

#### SESSION: T-02

**Topic:** Impeccable skill consolidation (18 skills → 1 nested folder)
**Date (approx.):** 2026-04-13–20
**Source chat:** `fb051f05-2e62-437b-92c0-87e35f02c8ca`

**Decision/Artifact:**
Restructuring of Impeccable collection from 18 separate folders into one nested folder matching the skill-creator pattern. Includes frontmatter cleanup (strip disallowed keys), sub-skill folder structure, packaged `.skill` file.

**Repo Mapping:** `~/.claude/skills/impeccable/`

**My Direction:** Identified desired organizational structure from skill-creator example

**Model Contribution:** Designed merge approach; Python scripts to strip invalid frontmatter from all 18 sub-skills; packaged `.skill` artifact

**Attribution Strength:** `SUPPORTING`

---

#### SESSION: T-03

**Topic:** Playbook skill creation
**Date (approx.):** 2026-04-13
**Source chat:** `fb051f05-2e62-437b-92c0-87e35f02c8ca`

**Decision/Artifact:**
`playbook` skill — personal prompt library for repeatable workflows. Initial entry: `design-audit` (runs `/impeccable audit` with structured output format).

**Repo Mapping:** `~/.claude/skills/playbook/`

**My Direction:** Named the skill; selected categories; directed `design-audit` entry

**Model Contribution:** Authored `SKILL.md`; authored `design-audit` prompt; packaged `.skill` file

**Attribution Strength:** `SUPPORTING`

---

### Appendix: Unattributed Work

| Work Area                                    | Repo Evidence                           | Likely Tool              | Status        |
| -------------------------------------------- | --------------------------------------- | ------------------------ | ------------- |
| Initial Google AI Studio prototype           | `HOW_IT_WAS_BUILT.md` Phase 1           | Gemini (confirmed)       | P2-05         |
| v1.1.0–v1.4.0 migration phases               | `CHANGELOG.md`                          | Unknown                  | P2-06 flagged |
| Impeccable skill UI/UX refinement            | Branch `claude-hero-redesign-uupm` diff | Claude (inferred)        | P2-07         |
| Case study content                           | `public/case-studies/*.md`              | Unknown                  | Unattributed  |
| Portfolio2.0 ADRs 001–006                    | `DECISIONS.md`                          | Unknown                  | Unattributed  |
| CI pipeline configuration                    | `.github/workflows/ci.yml`              | Unknown                  | Unattributed  |
| Guynode dataset contract + polygon fix       | `migrated_prompt_history/`              | Gemini (confirmed)       | G-04          |
| Guynode security hardening                   | `dev_log_security_ux.txt`               | Gemini (confirmed)       | G-05          |
| Guynode SEO migration                        | `dev_log_seo_update.txt`                | Gemini (confirmed)       | G-06          |
| Guynode Cloudflare migration + Learn section | File delta v1→v2                        | Unknown                  | G-07 flagged  |
| Guynode DECISIONS.md + DoD                   | Repo files                              | Unknown                  | G-03 flagged  |
| HPS full site build                          | AI Studio README + Jules IF             | Gemini/Jules (confirmed) | H-02          |
| HPS CMS layer + white-label template         | Repo files                              | Gemini/Jules (confirmed) | H-03          |
| HPS content (`src/data/index.ts`)            | Repo files                              | Unknown                  | Unattributed  |

---

_Generated: 2026-04-24. Search scope: all Claude.ai conversations outside projects._
_Repos: Portfolio2.0-main, Guynode_v2-main, GuynodeRedesigned-refactor-static-registry-v1, HPSgeospatial-main, HPSgeospatial-template-cms-foundation._
_Total sessions: 21 (8 confirmed Claude, 8 confirmed Gemini/Jules, 5 unattributed)._

---

## Part 2 — Project Aegis Context

This section documents the prompt engineering work underlying the Guynode and HPS session protocols. It is source material for `public/case-studies/project-aegis.md` attribution only.

**Important:** All Aegis work is confirmed Gemini (Google AI Studio). The portfolio case study `project-aegis.md` correctly attributes this. No Claude involvement is evidenced. The Guynode `CLAUDE.md` is a downstream adaptation of this work into the Claude Code behavioral format — that adaptation is the user's work (see G-01 in Part 1).

---

### Aegis Attribution Summary

| Artifact                                     | Description                                                                                                                                                                                                           | Tool                     | My Direction                                                                                            |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `AEGIS PROTOCOL v3.0`                        | Master system prompt: three cognitive modes (Execution, Architect, Patch), Guardian Layer, Drift Detection, Two-Path failure protocol                                                                                 | Gemini 1.5 Pro           | Defined the problem (entropy drift), specified the three modes, authored Immutable Invariants structure |
| `GUYNODE MASTER INSTRUCTION FILE v3`         | Aegis adapted for the Guynode SPA: subsystem mandates (Catalog, Viewer, Blog, Logging, Admin), Guardian Layer integrated, file output discipline rules                                                                | Gemini 1.5 Pro           | Applied Aegis to Guynode-specific stack and subsystems; authored all subsystem mandates                 |
| `GUYNODE x AEGIS — UNIFIED STUDIO SYSTEM v1` | Condensed merge of both protocols for session injection; adds PROJECT CONTEXT fill-in block                                                                                                                           | Gemini 1.5 Pro           | Decision to unify into a single injectable prompt; defined North Star Metric field                      |
| `CLAUDE.md` (Guynode_v2)                     | Claude Code behavioral adaptation: strips Aegis governance overhead (Architectural Review Block, Principal Architect Mode) not relevant to Claude Code; retains scope discipline, DONE format, context-load awareness | User-authored (see G-01) | Full authorship — this is the user's translation of Aegis concepts into Claude Code protocol            |

---

### What `project-aegis.md` Claims vs. What the Evidence Shows

The case study is accurate. Specific verifications:

**Phase 1 — Guardian Layer Architecture**

- ✅ Cognitive Mode Switching (Execution/Architect/Patch): evidenced in `AEGIS PROTOCOL v3.0` Section 1
- ✅ Thinking Block Mandate (pre-computation step listing files touched, logic preserved, pattern applied): evidenced in Section 1.1 Architectural Review Block
- ✅ Drift Detection with Immutable Invariants and REFUSE behavior: evidenced in Section 2.2 and 6.x

**Phase 2 — AI Studio Implementation**

- ✅ Patch Mode with `<<<< SEARCH / ==== REPLACE` syntax: evidenced in `AEGIS PROTOCOL v3.0` Section 1.3
- ✅ Project Context header for project-agnostic use: evidenced in `GUYNODE x AEGIS` PROJECT CONTEXT fill-in block
- ✅ Token efficiency claim: Patch Mode is a documented feature; the ~70% reduction metric is asserted in the case study and not contradicted by the artifacts
- ⚠️ "15+ iterations of few-shot prompting to perfect Search/Replace syntax" — asserted in retrospective; not evidenced in surviving artifacts. Flag as claimed but unverifiable from this evidence base.

**Phase 3 — Metrics**

- ⚠️ "50+ turn conversations without stack hallucination," "40% error rate reduction," "2x iteration speed," "90% regression loop elimination" — these are performance metrics asserted in the case study. They are not contradicted by any evidence here but cannot be verified from surviving artifacts. Flag as claimed outcomes rather than documented measurements.

**Stack/Tools field in `project-aegis.md`:**

- Currently reads: `Google AI Studio (Gemini 1.5 Pro), Markdown, System Prompting`
- This is accurate. No amendment needed.

---

### Lineage Map

```
AEGIS PROTOCOL v3.0 (Gemini, AI Studio)
    └── GUYNODE MASTER INSTRUCTION FILE v3 (Gemini, AI Studio)
            ├── GUYNODE x AEGIS UNIFIED (Gemini, AI Studio) — merged session-injection variant
            ├── Used as protocol in G-04 sessions (Guynode Dataset contract, polygon fix)
            └── Adapted by user → CLAUDE.md in Guynode_v2 (user-authored, see G-01)
                    └── hpsOS Instruction File.md (Jules/Gemini, H-02, H-03) — parallel adaptation
```

---

_Part 2 prepared: 2026-04-24. Source documents: AEGIS PROTOCOL v3.0, GUYNODE MASTER INSTRUCTION FILE v3, GUYNODE x AEGIS UNIFIED STUDIO SYSTEM v1, project-aegis.md case study._
