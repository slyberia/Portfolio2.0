# Automation & Governance — Deep-Dive Intake (unifying Portfolio pipeline + Aegis + emOS)

Purpose: gather what's needed to build a deep dive that **unifies the three governed-AI-automation
systems** under one narrative:

1. **Portfolio 2.0 build pipeline** — governed AI build of _this_ site (human design authority + CI
   gates). _(Library entry intake: `docs/portfolio-pipeline-intake-questionnaire.md`.)_
2. **Aegis** — the governance/validation layer (the "judge"). _(Published in 7.7b.)_
3. **emOS** — the autonomous execution runtime (the "workers"). _(Published in 7.7b.)_

**Use only real facts; no invented metrics.** Deep dives are a different surface from project entries
(they render from structured content arrays in `src/data/deepDiveContent.ts` + `DeepDiveView.tsx`), so
this intake is about the **narrative + structure decision**, not registry fields.

---

## Important context: a "Process & Governance" deep-dive tab already exists

`DeepDiveView` already has a **"Portfolio 2.0 Process & Governance"** tab with sections: _Build
Overview · Build Timeline · Multi-LLM Toolchain · Delivery Model · Architecture & Governance ·
Validation & Evidence_. So this isn't a blank slate — the question is how the unified
automation/governance story relates to that existing tab.

## Decision 1 — Structure (pick one)

- **(A) Extend the existing "Process & Governance" tab** with an "Automation Systems" section that
  brings in Aegis + emOS as the standalone-automation expression of the same governance philosophy.
  _Least duplication; one place for "how Kyle governs AI."_
- **(B) Add a new dedicated tab — e.g., "Automation & Governance"** — that unifies all three (portfolio
  pipeline + Aegis + emOS) and cross-links the existing process tab. _Cleaner separation; a featured
  destination._
- **(C) Something else** (e.g., rename/restructure the process tab to be the umbrella).

⟶ **DECIDE A / B / C.** My recommendation: **B** if you want a featured, linkable "automation" story;
**A** if you'd rather keep one governance tab and avoid overlap.

## Decision 2 — The unifying thesis (confirm/refine)

Draft through-line: **"AI as an untrusted worker behind an explicit governance gate — across the
spectrum from human-in-the-loop to autonomous."** The three systems are the same philosophy at
different autonomy levels:

| System                      | Autonomy          | Who holds the Guardian seat       |
| --------------------------- | ----------------- | --------------------------------- |
| Portfolio 2.0 pipeline      | Human-led, gated  | You (design authority) + CI gates |
| Aegis (HITL iteration)      | Human-in-the-loop | You                               |
| emOS (autonomous iteration) | Autonomous        | The Aegis engine                  |

⟶ CONFIRM/refine the thesis and the table.

## Content prompts (short answers fine)

1. **The connective narrative** — in 2–3 sentences, how do these three relate as _one_ body of work?
   (Draft: "I treat AI as a worker that must pass an explicit check before its output is trusted —
   whether that check is me, a CI gate, or an automated Aegis judge.") ⟶ CONFIRM.
2. **What each contributes to the umbrella** — one line each (portfolio pipeline / Aegis / emOS).
3. **The autonomy-spectrum framing** — is "HITL → autonomous as a trust gradient" the right spine, or
   do you want a different organizing axis (e.g., governance primitives reused across all three)?
4. **Cross-links** — should the deep dive link out to the two project entries (`/projects/project-aegis`
   and the new `/projects/portfolio-pipeline`) and the resume? (Default: yes.)
5. **Reused governance primitives** — which mechanisms recur across all three (e.g., explicit ruleset,
   `<thinking>`/reasoning trace, drift/assertion checks, audit trail, decoupled judge-vs-executor)?
   These make the strongest unifying spine.
6. **Existing metrics** — the process tab currently shows "50+ PRs / 6 LLMs / 5+ phases / 10+ routes."
   ⟶ keep, revise to defensible numbers, or drop?
7. **Guardrails** — anything to exclude (no secrets, no client data, no unverified performance claims).

## How I'll build it (for context)

- New/extended tab content lives in `src/data/deepDiveContent.ts` (e.g., `decisionBlocks`,
  `architectureSummaries`, `llmRoles`, `forensicEntries`) + a tab wired in `DeepDiveView.tsx`, with
  real anchor ids (so `/deep-dives#<id>` links resolve), SEO/crawler wiring, and the full validation
  suite. Design-system rules apply (no glassmorphism, solid borders, contrast tiers).

---

## Sequencing

These two are tracked as the next subphases (gated on these intakes):

- **7.8 — Publish the Portfolio 2.0 Build-Pipeline Library entry.**
- **7.9 — Automation & Governance deep dive** (unifying portfolio pipeline + Aegis + emOS).
