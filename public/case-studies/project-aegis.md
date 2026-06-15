> **Role:** AI Workflow & Automation Designer
> **Outcome:** Built a decoupled AI-automation system — Aegis governance + emOS execution over a Notion state machine — that evolved from human-in-the-loop review toward autonomous operation.
> **Stack/Tools:** TypeScript · Node.js · Docker · Google Cloud Run · Notion API · Google AI Studio SDK
> **Relevance:** Shows how to put AI-generated work under explicit governance — and the judgment to decide when a human Guardian is required versus when the check can be automated.

# 🛡️ Automation & Operational Protocols

### The Aegis Governance Framework & emOS Runtime

> **Project Overview**
> **Status:** Working prototype (HITL iteration tested; autonomous iteration developed)
> **Role:** AI Workflow & Automation Designer
> **Scope:** AI workflow governance, multi-agent orchestration, operational protocols
> **Tools:** TypeScript, Node.js, Docker, Google Cloud Run, Notion API, Google AI Studio SDK

---

## 📋 Executive Summary

Aegis is a decoupled automation system that puts AI-generated work under an explicit governance layer before it is ever trusted. It separates two concerns that usually get tangled together:

- **Aegis — the governance layer.** A prompting ruleset and validation protocol (the "judge"). It enforces structural compliance, forces an explicit `<thinking>` reasoning trace, and flags drift from the task spec. It never executes workloads.
- **emOS — the execution layer.** A multi-agent runtime that routes data, runs scripts, and manipulates files inside isolated Docker containers. It is deliberately "blind" to whether its output is _correct_ until Aegis checks it.

The two layers are fully decoupled and communicate asynchronously through a **private Notion database used as a headless, human-readable state machine** — so the whole pipeline's status is visible and auditable in a normal Notion workspace, with no bespoke dashboard to build or maintain.

## The Evolution: human-governed → autonomous

The system was built in two iterations, and that progression is the point.

**Iteration 1 — Human-in-the-loop (built & tested).** The Guardian seat was filled by a human. emOS executed a ticket, and the execution log was reviewed against the Aegis ruleset in Notion before being approved or rejected. This iteration demonstrated the protocol held in a human-in-the-loop pass — auditability preserved through human review before approval or rejection.

**Iteration 2 — Autonomous (developed).** Once the protocol was trusted, the system was expanded so the **Aegis engine itself** fills the Guardian seat — evaluating the execution log automatically and resolving the ticket without a human. This iteration was developed as the next step toward a fully containerized executable, which was the planned future iteration.

The honest framing: **HITL mode is proven; autonomous mode is built and was on the path to containerized deployment.** The interesting engineering isn't "I automated it" — it's designing the governance so the _same_ pipeline can run with either a human or an automated Guardian, and knowing which to use when.

## 🔧 How it works (the loop)

1. **Task** — a structured page lands in Notion with markdown system instructions, task parameters, and target file specs (status `Pending Execution`).
2. **Route & execute (emOS)** — a lightweight TypeScript daemon polls Notion, downloads the payload, spins up an isolated Docker container, and runs the target scripts.
3. **Guard (Aegis)** — the execution log is evaluated against the ruleset: structural compliance, the mandatory `<thinking>` trace, and drift detection against the original task spec. _(In HITL mode a human is the Guardian; in autonomous mode the Aegis engine is.)_
4. **Resolve** — a detailed markdown audit trail is appended to the Notion page, and the state moves to `Completed` or `Failed: Guardrails Tripped`.

## ⚖️ Constraints & trade-offs

- **No Notion webhooks + a ~3 req/sec API cap.** Notion doesn't push database-change events and rate-limits hard. → The sync engine **polls on a ~15-second loop and batches state queries into grouped update payloads**, accepting a short propagation delay in exchange for keeping Notion as the single source of truth.
- **An agent shouldn't grade its own work.** A single model evaluating its own output is unreliable. → The **Executor and Guardian are decoupled** with no shared context, so validation stays independent of generation.
- **Validation costs time.** Running every change through the full Aegis check adds a brief delay per run. → Accepted deliberately — it avoids the far larger cost of tracing hallucinated runtime bugs later.

## 🛡️ The Guardian protocol

The governance core, stripped to its mechanism:

- **Thinking-block mandate** — endpoints must emit a separate `<thinking>` block that maps logic and assumptions _before_ producing code, so reasoning errors are caught before they become output.
- **Drift detection** — output is checked against the task layout defined in the originating Notion block; deviation trips the guardrail.
- **Binary state resolution** — every ticket resolves to a documented pass or fail; nothing mutates silently.

## 🤝 Customer / Stakeholder Value

**Who it helps:** anyone running AI agents against a real system who needs the output to be trustworthy, auditable, and safe to automate.

**What got easier:** the whole pipeline's state lives in a readable Notion board — no custom infrastructure to stand up — and every automated action leaves an audit trail.

**Why it matters:** it treats AI output as an _untrusted worker_ that has to pass an explicit check, not a partner whose word is taken on faith. That's what makes it safe to move a step at a time from human review toward automation.

---

> Sanitized for portfolio use: no Notion workspace IDs, page UUIDs, database keys, or credentials are shown. The system is internal tooling; there is no public repository at this time.
