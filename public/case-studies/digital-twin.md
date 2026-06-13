> **Role:** AI Workflow / Forward Deployed Engineer
> **Outcome:** Built a guardrailed, portfolio-scoped AI assistant that retrieves proof on demand, refuses off-topic prompts, triggers UI actions, and hands off to a human when it can't resolve a query.
> **Stack/Tools:** Gemini (server-side proxy), React, TypeScript, structured-JSON command parser
> **Relevance:** Scoped AI implementation — prompt governance, guardrails, and human handoff, not an open-ended chatbot.

# 🤖 Digital Twin AI Agent — Scoped Retrieval & Governance

> **"An AI assistant without guardrails is a liability. The Digital Twin is engineered to provide precise, low-latency proof retrieval with built-in safety and cost controls."**

> **Project Overview**
>
> **Status:** Featured AI Implementation
> **Role:** AI Workflow / Forward Deployed Engineer
> **Scope:** Scoped retrieval, operational guardrails, command parsing, human handoff
> **Tools:** Gemini API (server-side proxy), React, TypeScript

---

## 🏗️ The Challenge: Recruiter Information Friction

Recruiters skim fast and rarely have time to dig. Standard search bars often fail to surface the specific "Proof of Work" needed for a role match.

- **The Gap:** Visitors ask complex questions ("How did Kyle handle the Luxe Lofts audit?") that standard filters cannot answer.
- **The Risk:** Unrestricted LLMs can hallucinate experience or incur excessive API costs on off-topic requests.

**The Goal:** Build an AI-driven retrieval engine that autonomously routes visitors to relevant proof while strictly adhering to **Operational Guardrails**.

---

## 🔧 Technical Implementation & Assets

### 1. Architecture: The Relevance Gate

I engineered a **Multi-Stage Triage Flow** that intercepts requests before they hit the LLM. If a request is identified as out-of-scope or "expensive," it is deflected to a static response, preserving API quota for high-intent recruiters.

### 2. Operational Control: The Command Parser

The agent is not just a "chatbot"; it is an **Operational Orchestrator**. It can trigger UI commands (e.g., `TRIGGER_RESUME_DOWNLOAD`) by generating structured JSON hidden from the user, bridging the gap between chat and site action.

### 3. Sibling Agent: The Appellate Defense Node

The same scoped-agent discipline that governs the Digital Twin powers a second AI agent in this portfolio's build pipeline — the **Appellate Defense Node** (`npm run defense:codex`). When an automated peer review flags issues in a change, the Defense Node reads that report and, for **every** critique, returns a deterministic verdict — **Concede** or **Defend** — with a technical rationale: which exact file and line to fix, or which architectural invariant makes the current code the safer choice.

It is a study in the same principle: a narrow purpose, a strict output schema, and hard prohibitions (no rewriting source, no hypothetical implementations, no third classification) that keep an LLM useful and predictable instead of open-ended. The Digital Twin guards a conversation; the Defense Node guards the codebase — both prove that an AI agent earns trust through tight scope and enforced guardrails, not raw capability.

---

## 📊 Impact & Results

- **Zero-Hallucination Scope:** System instructions force the model to refuse off-topic prompts, ensuring 100% focus on portfolio evidence.
- **Escalation Path:** Integrated a **Human Handoff** flow that captures the conversation state and routes it to a contact form if the AI cannot resolve the query.
- **Cost Governance:** Implemented rate-limiting and token-caps to ensure the system remains sustainable for public use.

---

## 🤝 Customer / Stakeholder Value

**Who it helps:** Recruiters and hiring managers evaluating Kyle under time pressure — and Kyle himself, when a conversation needs a human.

**What got easier:** Getting a grounded, specific answer about Kyle's work in seconds, without wading through pages, while staying confident the assistant won't invent experience it can't back up.

**Why it matters:** A scoped, guardrailed assistant turns a six-second skim into a guided evaluation and hands off cleanly when a question exceeds it — protecting the visitor's trust and the cost of running the system in public.

---

## 📂 Key Artifact: The Failure Mode Matrix

_Proving that every failure path is planned for._

| Failure Mode    | Detection       | Fallback               |
| :-------------- | :-------------- | :--------------------- |
| **Rate Limit**  | 429 Status      | Deflect to Resume Path |
| **Injection**   | Regex Pattern   | Block & Warn           |
| **Unsatisfied** | Sentiment Check | Trigger Human Handoff  |
