# Portfolio 2.0 — Governed AI Build Pipeline

> **Links:** [Live site →](https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app) · [GitHub repo →](https://github.com/slyberia/Portfolio2.0)

> **Project Overview**
>
> **Role:** AI Workflow & Automation Designer
>
> **Status:** In Production (Google Cloud Run)
>
> **Scope:** AI build governance, multi-LLM orchestration, CI/CD, attribution
>
> **Tools:** TypeScript, Vite, Vitest, Docker, Google Cloud Run, GitHub Actions, multi-LLM toolchain
>
> **Outcome:** Built the governed build workflow behind this site: bounded work batches, reviewable commits, automated checks, crawler guards, and an attribution ledger. Post-launch work added explicit chatbot failure handling and deployment configuration fixes.
>
> **Relevance:** Shows human-directed implementation, validation, and failure handling across frontend, backend, and deployment configuration.

---

## Executive summary

This entry is about the pipeline that built _this_ site. The thesis is simple: **AI-assisted
development is only trustworthy when it is governed.** Here, AI is treated not as an autonomous magic
bullet but as **highly governed, specialized tooling operating under human design authority** — bounded
in scope, gated by automated CI, and tracked through an auditable attribution ledger.

> Deeper process detail lives in the **Process & Governance deep dive** ([/deep-dives](/deep-dives)) —
> this is the summary view.

> **Related system — run-time governance:** this pipeline is the **build-time** delivery side of the
> governance philosophy — how AI-assisted work gets safely built and shipped.
> [Automation & Operational Protocols (Aegis / emOS)](/projects/project-aegis) extends the same
> philosophy into the **workflow-control layer** — judge-vs-executor separation, human-in-the-loop
> checkpoints, audit trails, and drift control while AI agents operate.

**At a glance:** bounded work batches, reviewable commits, automated checks, an attribution ledger, and documented deployment and validation boundaries. Counts of PRs and routes change as the site evolves.

## Governance protocol — bounded work batches

The current protocol in `CLAUDE.md` defines a batch goal, sources, scope, acceptance criteria, and
exclusions. Related subphases can be completed within that boundary, with coherent reviewable commits
and focused checks along the way. The full applicable validation suite runs at the batch boundary
before a draft PR. Human review still controls merging and publishing. Earlier phases used a
one-subphase approval gate; that historical practice is no longer the current process.

## The multi-LLM toolchain

Six AI tools are assigned distinct roles based on their strengths, with **human design authority**
across all of them:

1. **Claude Code** — primary execution & implementation (localized code changes, terminal orchestration).
2. **Gemini 1.5 Pro (via Google AI Studio)** — foundational Aegis protocol generation, initial
   component scaffolding, and the forensic archive.
3. **Gemini API** — powers the live server-side Digital Twin chat proxy.
4. **ChatGPT** — high-level strategy, architectural auditing, and evidence-hierarchy structuring.
5. **Codex** — appellate defense and logic validation (via `npm run defense:codex`).
6. **Jules** — dedicated code-review loops and automated critiques (via `npm run review:jules`).

_(Repomix acts as the context-bundling middleware, feeding up-to-date repository state into the model
context window via `sync:architect`.)_

## The CI gate

On every push and pull request, `.github/workflows/ci.yml` enforces an unbroken chain: `npm ci` →
**lint (zero warnings) → format check → typecheck → Vitest → production build → gitleaks secret-scan →
key audit**. The key audit instantly fails the build if an API key (such as the Gemini key) or other
secrets bleed into the `dist/` bundle. To close the supply-chain surface, **all third-party GitHub
Actions are pinned to full, immutable commit SHAs** rather than mutable version tags.

## Drift guards — protecting semantic integrity

Beyond standard assertions, the repo carries **bespoke invariant checks** so AI changes can't silently
degrade meaning: `validate:crawler`, a case-study coverage guard, a skill→evidence mapping guard, a
theme-regression catch, and a project-metadata contract. These are the checks that keep a confidently
wrong AI edit from shipping.

## Attribution — trust through transparency

`AI_ATTRIBUTION.md` is the **forensic ledger**: it demarcates human design direction from AI execution
across every phase. Together with `HOW_IT_WAS_BUILT.md` and `DECISIONS.md`, it forms an auditable paper
trail of every architectural pivot and AI contribution — the actual trust layer of the system.

## Deployment

A multi-stage Docker build (`node:20-alpine`) compiles the Vite frontend and Express backend, scrubs
dev dependencies, drops the runtime to a **non-root `appuser`**, and ships the secured container to
**Google Cloud Run** on port `8080`.

## Post-launch engineering practice

The site continued to change after its original launch. I added distinct chatbot responses for
rate limits, rejected origins, missing configuration, oversized input, and backend outages, with a
troubleshooting guide for diagnosis. Deployment work included origin handling for deployed hosts,
production Docker configuration for the chatbot, dependency consolidation, and a Cloud Build
custom-service-account logging fix using `CLOUD_LOGGING_ONLY`.

These are implemented code and configuration changes. The repository and local checks establish the
implementation; the available evidence does not establish that each change was exercised on the live
deployment. No latency, availability, or incident-reduction result is claimed.

## Constraints and trade-offs

- **AI speed vs. review burden** → bounded batches reduce repeated approval and full-suite cycles;
  scoped commits and a batch-end validation gate keep the result reviewable.
- **Secret-leak risk** → keys are stripped from the client and served only via a server-side proxy,
  enforced by the CI key-audit + gitleaks.
- **Supply-chain risk** → all CI actions pinned to immutable commit SHAs.

## Positioning and evidence architecture

Portfolio 2.0 also treated the portfolio's own copy and case-study structure as a product system —
not just a website built with AI. The build governance above decides how AI-assisted work gets
planned, validated, attributed, and shipped. **Evidence governance** decides how that work gets
framed, grouped, and explained, so a reader can recognize the capability and judgment behind it.

An initial AI-assisted positioning hypothesis used "Forward Deployed Engineer" as a plausible role
anchor because the work spans implementation, AI workflow governance, GIS/spatial systems,
operations, and stakeholder-facing systems. The title was evidence-supported — but later human
review found it could create first-read friction unless the work was organized around clearer
decision evidence. The issue was reader recognition, not accuracy.

That review drove a simple corrective chain: **strong underlying work → clear role framing →
evidence grouped by decision type → reader recognition → stronger hiring signal.** The remediation
corrected project entries, defined and applied a decision-evidence authoring standard, expanded and
indexed the deep-dive inventory, and verified project cards as capability-first. The role label
settled into a hybrid model — **Forward Deployed Engineer · Technical Systems Translator** — where
FDE remains the searchable anchor and "Technical Systems Translator" clarifies the capability at
first read. FDE was refined, not abandoned.

Treated this way, the AI-assisted recommendation was an **input**, human product judgment was the
**evaluation**, and the portfolio restructuring was the **implementation**. The portfolio presents
itself as a governed product: a system for making technical judgment, implementation maturity, and
stakeholder value easier to recognize.

## Stakeholder value

**Who it helps:** anyone evaluating whether AI-assisted work can be trusted in a real codebase.

**What got easier:** reviewers can inspect scoped commits, validation checks, failure-state handling,
and the attribution ledger rather than taking the build process on faith.

**Why it matters:** the process records human direction, AI-assisted execution, and checks alongside
the engineering changes, while keeping local validation distinct from live behavior.

---

> The [GitHub repository](https://github.com/slyberia/Portfolio2.0) is public as verifiable proof of
> this rigor; the
> [live application](https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app) runs on
> Google Cloud Run. No secrets or client data appear in any artifact.
