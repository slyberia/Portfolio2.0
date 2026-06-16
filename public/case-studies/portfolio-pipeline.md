> **Role:** AI Workflow & Automation Designer
> **Outcome:** Built and runs the governed, multi-LLM pipeline behind this site — AI-assisted development held to production-grade reliability by a one-subphase protocol, an uncompromising CI gate, semantic drift-guards, and a transparent attribution ledger.
> **Stack/Tools:** TypeScript · Vite · Vitest · Docker · Google Cloud Run · GitHub Actions · Google AI Studio SDK
> **Relevance:** Shows AI-assisted development can be production-grade when it stays under human design authority and automated assertion gates — not "vibe coding."

# 🏗️ Portfolio 2.0 — Governed AI Build Pipeline

> **Project Overview**
> **Status:** In Production (Google Cloud Run) · **Role:** AI Workflow & Automation Designer
> **Scope:** AI build governance, multi-LLM orchestration, CI/CD, attribution
> **Tools:** TypeScript, Vite, Vitest, Docker, Google Cloud Run, GitHub Actions, multi-LLM toolchain
> **Links:** [Live site](https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app) · [GitHub repo](https://github.com/slyberia/Portfolio2.0)

---

## 📋 Executive Summary

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

**At a glance:** 50+ PRs merged · 6 AI tools orchestrated · 7 build phases · 10+ canonical routes.

## 🧭 Governance protocol — the safety brake

The architecture runs on a **Sequential Execution Protocol** (defined in `CLAUDE.md`). AI agents work
**one subphase at a time**: complete a single scoped change, run the full local validation suite,
commit with a precise subphase identifier, then **STOP and wait for explicit human approval**. This is
the critical human-in-the-loop brake — it prevents runaway blast radius and keeps every diff small
enough for a human to actually review.

## 🤖 The multi-LLM toolchain

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

## 🔒 The CI gate — an uncompromising gatekeeper

On every push and pull request, `.github/workflows/ci.yml` enforces an unbroken chain: `npm ci` →
**lint (zero warnings) → format check → typecheck → Vitest → production build → gitleaks secret-scan →
key audit**. The key audit instantly fails the build if an API key (such as the Gemini key) or other
secrets bleed into the `dist/` bundle. To close the supply-chain surface, **all third-party GitHub
Actions are pinned to full, immutable commit SHAs** rather than mutable version tags.

## 🛡️ Drift guards — protecting semantic integrity

Beyond standard assertions, the repo carries **bespoke invariant checks** so AI changes can't silently
degrade meaning: `validate:crawler`, a case-study coverage guard, a skill→evidence mapping guard, a
theme-regression catch, and a project-metadata contract. These are the checks that keep a confidently
wrong AI edit from shipping.

## 📒 Attribution — trust through transparency

`AI_ATTRIBUTION.md` is the **forensic ledger**: it demarcates human design direction from AI execution
across every phase. Together with `HOW_IT_WAS_BUILT.md` and `DECISIONS.md`, it forms an auditable paper
trail of every architectural pivot and AI contribution — the actual trust layer of the system.

## 🚀 Deploy

A multi-stage Docker build (`node:20-alpine`) compiles the Vite frontend and Express backend, scrubs
dev dependencies, drops the runtime to a **non-root `appuser`**, and ships the secured container to
**Google Cloud Run** on port `8080`.

## ⚖️ Constraints & trade-offs

- **AI speed vs. review burden** → the one-subphase protocol intentionally bottlenecks velocity so
  every diff stays digestible and safe to review.
- **Secret-leak risk** → keys are stripped from the client and served only via a server-side proxy,
  enforced by the CI key-audit + gitleaks.
- **Supply-chain risk** → all CI actions pinned to immutable commit SHAs.

## 🤝 Customer / Stakeholder Value

**Who it helps:** anyone evaluating whether AI-assisted work can be trusted in a real codebase.

**What got easier:** reviewers don't have to take the build on faith — every change clears the same
gate, drift-guards block silent regressions, and the attribution ledger shows exactly who did what.

**Why it matters:** it reframes AI from an unpredictable collaborator into governed tooling with a
documented, reproducible, auditable trail — production-grade by construction.

---

> The [GitHub repository](https://github.com/slyberia/Portfolio2.0) is public as verifiable proof of
> this rigor; the
> [live application](https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app) runs on
> Google Cloud Run. No secrets or client data appear in any artifact.
