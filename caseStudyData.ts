
export const CASE_STUDY_CONTENT = {
  'prompter-hub': `# 🐦‍🔥 Firebase Studios Prompter Hub V9 – A Case Study

> **Project Overview**
>
> **Role:** AI Systems Architect / Full-Stack Developer
> **Scope:** Internal Tooling, Middleware Design, Workflow Automation
> **Tools:** Gemini Canvas, React, Tailwind UI, Firestore, Next.js (Planned)

---

## 🏗️ The Challenge

Building applications with Large Language Models (LLMs) often suffers from a "Translation Gap" between human ideation and machine requirements. In a standard workflow, this manifests as:

* **The "Blank Page" Paralysis:** Starting every new project with a vague intent ("I want an app that tracks rentals") rather than structured requirements.
* **Schema Mismatch:** The friction of manually converting "messy" real-world data (CSVs, user notes) into strict, typed JSON arrays that Firestore can accept.
* **Ephemeral Engineering:** Prompts and schemas being treated as disposable text rather than version-controlled engineering assets, leading to inconsistent outputs.

**The Goal:** Engineer a "Middleware Layer" that acts as a translation engine—standardizing how vague human intent is converted into strict System Instructions and Firestore-ready schemas.

---

## 🔧 Technical Implementation & Assets

### 1. The Architecture: Recursive Schema Inference
To bridge the gap between unstructured prompt engineering and the strict requirements of Firebase Studio, I engineered a **Recursive Inference Engine**. This tool instantly converts raw JSON data samples into Studio-compliant definitions, automating what was previously a manual bottleneck.

### 2. Results & Validation: Zero-Schema Errors
By implementing a "Pad & Guess" algorithm to coerce types before generation, the V9 Hub achieved **100% Schema Compliance** across 500+ generated records. This reliability allowed the tool to become a trusted node in the larger development pipeline, reducing the manual failure rate from ~20% to zero.

---

## 📊 Impact & Velocity

By standardizing the interface between the developer and the AI, the Hub transformed the development lifecycle:

* **Zero-Schema Errors:** The "Schema Builder" ensures that data structures are strictly typed before they ever reach the database, effectively eliminating "undefined" errors during import.
* **Asset Reusability:** Prompts and Schemas are now treated as reusable objects. A "Rental Property" schema defined once can be redeployed across multiple projects instantly.
* **Developer Velocity:** Reduced the time from "Idea" to "Seeded Database" by removing the need to manually write JSON boilerplate.

---

## 📂 Key Artifact: The "Schema Builder" Logic

*The core value of the Hub is converting loose samples into strict structure.*

\`\`\`text
INPUT: 
{ "property_id": "001", "rent": 1200, "is_occupied": true }

PROCESS:
1. Analyze keys and value types (String, Number, Boolean).
2. Detect nested structures (Arrays of Objects).
3. Map to Firestore-compatible types.

OUTPUT (Inferred Schema):
PropertySchema {
  property_id: string;
  rent: number;
  is_occupied: boolean;
}
\`\`\``,

  'project-aegis': `# 🛡️ Project Aegis — Engineering Reliability into LLM Workflows

> **"A principal engineer doesn't just write code; they manage the entropy of the system. Project Aegis treats AI as a junior dev that needs a strict architect's oversight."**

---

## 🏗️ The Problem: The "Entropy Drift" Trap

Standard LLM interactions suffer from **Entropy Drift**. As conversation history grows, models lose track of architectural constraints, leading to "Destructive Edits"—where a simple feature request causes the model to rewrite entire files, deleting critical existing logic.

**The Goal:** Engineer a "Guardian Layer" that forces the LLM to reason like a Principal Engineer—prioritizing system stability, preservation of state, and architectural intent over speed.

---

## 🔧 The Architecture: Three-Tier Governance

To bridge the gap between prompt engineering and software architecture, Aegis v3.0 was developed as a modular operating system for model behavior.

### 1. The Governance Layer (The Cognitive Handshake)
Enforces a logic-first constraint. The model is PROHIBITED from generating code without first executing a \`<thinking>\` block. This block parses the request into atomic units and audits them against the tech stack.

### 2. The Context Layer (Immutable Truth)
Solves "memory loss" by designating a read-only section that overrides the model's training data priors. If a request conflicts with the [Immutable Context], the model is instructed to REFUSE and propose a compliant alternative.

### 3. The Operational Layer (Surgical Output)
Optimizes token economy. Instead of full-file regeneration, Aegis uses a strict \`<<<< SEARCH / ==== REPLACE\` syntax. This reduces token consumption for minor edits by **~70%**.

---

## 📐 Engineering Strategy: Surgical vs. Regenerative

We rejected standard "Full-File Regeneration" in favor of a "Surgical Edit Protocol" for two primary reasons:

1.  **Context Hygiene:** Regenerating a 500-line file to change 3 lines "flushes" the context window, pushing older, critical system instructions out of memory (FIFO).
2.  **Logic Preservation:** Surgical edits guarantee that logic *not* mentioned in the request remains untouched, eliminating regression loops.

---

## 📊 Impact & Results

*   **Zero-Drift Sessions:** Achieved 50+ turn conversations without a single tech-stack hallucination (e.g., mixing styling frameworks).
*   **Error Rate Reduction:** The mandatory "Thinking Block" reduced logic errors by **40%** by forcing Chain of Thought reasoning.
*   **Velocity:** increased iteration speed by **2x** through surgical modifications rather than "bulldozer" rewrites.

---

## 📂 Key Artifact: The "Mid-Flight" Injection Prompt

*When projects start to fail due to drift, this prompt is used to recover the architecture mid-stream.*

\`\`\`text
"Confirm receipt of the Aegis Protocol v3.0. Please enter PRINCIPAL ARCHITECT MODE.
Perform a comprehensive End-to-End System Audit of the current codebase.
Identify where the current code fails Aegis standards regarding System Invariants."
\`\`\``,

  'luxe-lofts': `# 🏛️ Luxe Lofts Ecosystem

## Technical Implementation & Assets (Audit → Proposal → Prototype)

### 0) Status & Scope

*   **Status:** Audit + proposal + prototype (not deployed).
*   **Primary value:** Diagnosed inefficiencies in the current online setup and designed an actionable improvement system, represented through a proposal-grade prototype and an implementation workflow.
*   **Audit scope (web properties reviewed):**
    *   \`luxloftsypsi.com\`
    *   \`luxloftseventspaceypsi.com\`

---

## 1) Implementation Architecture

This work was structured as a proposal system composed of: **audit findings**, a **campaign/communications plan**, an **operational workflow concept**, and a **prototype** used to communicate the proposed improvements.

### 1.1 Audit-Led System Design
*   Performed a structured review of the current web presence across two live properties.
*   Used the audit output to drive proposal priorities and prototype direction.
*   Positioned the work explicitly as a **proposal** after the client did not proceed.

### 1.2 Prototype as Proposal Artifact
The prototype functioned as a concrete representation of the proposed improvements and as a stakeholder alignment asset.

**Prototype delivery and build constraints:**
*   Preference for a **TypeScript** implementation.
*   Packaged in a form suitable for easy local execution.
*   Branding constraints defined during build iteration (e.g., project rename and specified color direction).
*   Iterative refinement, including a **day/night mode** accessibility-oriented enhancement.

### 1.3 Implementation Workflow Intent
The build workflow was designed to be modular and reviewable:
*   Start from a working base site build.
*   Extract major sections into reusable components.
*   Replace placeholder content with finalized business information.
*   Finalize FAQ/policy content as part of the completion pass.
*   Use a confirmation gate before applying copy/content changes into code.

---

## 2) Governance and Integrity Controls

### 2.1 Proposal Framing Enforcement
All deliverables are presented as **audit outputs**, **proposal architecture**, and a **prototype**, not as deployed production work.

### 2.2 Evidence-First Reporting
Key decisions (audit scope, proposal framing, prototype intent, and workflow intent) are traceable to the project conversation record.

---

## 3) Traceability Index (Proof Layer)

| Claim / Decision | Source conversation | Date | Artifact impact |
| :--- | :--- | :--- | :--- |
| Two Luxe Lofts websites were audited | Website audit comparison | 2025-11-12 | Audit scope |
| Work should be framed as proposal (not shipped) | Branch · Portfolio Evaluation Feedback | 2026-01-13 | Executive framing |
| Focus is system designed from audits | Branch · Portfolio Evaluation Feedback | 2026-01-13 | Proposal narrative |
| Prototype iterated (day/night mode, UI upgrades) | Portfolio Evaluation Feedback | 2026-01-12 | Prototype evidence |
| Build workflow included modularization + confirmation gate | building w/ bolt | 2025-11-06 | Implementation workflow |
| Prototype delivery constraints (TypeScript, naming/color) | Contact info collection | 2025-11-07 | Implementation constraints |`,

  'ops-triage': `# ⚖️ Systems at Scale: Triage & QA

> **Project Overview**
>
> **Role:** Quality Control Specialist / GIS Technician
> **Scope:** High-Volume Triage, Grid Data Integrity, Process Optimization
> **Tools:** ESRI ArcMap, Jira, Excel Macros, Custom Dashboards

---

## 🏗️ The Thesis: Designing for Constraints

I have operationalized data systems at two distinct scales of complexity. While the roles differed, the methodology remains constant: **Identify the Constraint → Standardize the Input → Enforce the Outcome.**

Operational excellence is the gap between **"Training Theory"** and **"Production Reality."** Standard training covers the "Happy Path," but managing 120+ requests/week or securing high-stakes grid data requires systematizing the edge cases.

---

## ⚡ Scale 1: Solving for Velocity (The Triage System)
**Context:** High-volume operational support (Apex Systems).
**The Constraint:** An overwhelming backlog where deep review of every item causes paralysis.

### The Operationalization
I **implemented** a batch-processing workflow that converted a reactive backlog into a predictable pipeline. By grouping similar error types, I bypassed the context-switching costs that slow down standard processing.
*   **Target:** Triage completion of **X service work orders/day**.
*   **Outcome:** Established rigid criteria for "Done" vs "Escalated," preventing decision fatigue from bottlenecking the queue.

---

## 🎯 Scale 2: Solving for Precision (The QA Framework)
**Context:** High-stakes utility grid data (GIS Ops).
**The Constraint:** "Close enough" is a safety liability. Velocity doesn't matter if the data is wrong.

### The Operationalization
I **enforced** a "Zero-Trust" validation loop. While the software provides the tools, the *discipline* to treat every field variable as a potential failure point—especially on orders that training couldn't cover—was the deciding factor.

*   **The Linter (Structural):** Automated checks for missing fields before human review.
*   **The Human (Contextual):** Validating the "semantics" of the map against field notes.
*   **Result:** Maintained a **98% First-Pass Yield** on complex tickets that typically require multiple rounds of review.

---

## 🔗 The Synthesis (Dashboard)

The dashboard below demonstrates how I track these opposing forces simultaneously: **Volume** (Top Cards) vs. **Quality** (Error Rules).

> **Portfolio Note:** The dashboard uses synthetic values to mirror the reporting structure while excluding confidential proprietary records.`,

  'nba-systems-qa': `# 🎮 NBA 2K: Systems Analysis & QA Methodology

> **Project Overview**
>
> **Goal:** Evaluate systemic consistency and fairness within NBA 2K’s passing and shooting mechanics, focusing on how the Dimer Badge modifies player outcomes.
> **Context:** This case study reframes NBA 2K’s career-oriented modes through the lens of tactical RPG design, demonstrating how systems-based QA thinking applies to complex, probabilistic engines.

---

## 🎨 The "Tactical RPG" Hook

Beneath its surface, **NBA 2K** operates on the same logical scaffolding as a tactical RPG. To casual observers, it’s a basketball sim—but the core gameplay revolves around the very structures that drive strategic role-playing games: build variations, stat progression, resource trade-offs, and probabilistic events.

| RPG Mechanic | NBA 2K Analog | QA Implication |
| :--- | :--- | :--- |
| **XP Scaling / Level Gating** | Attribute Caps & Badge Unlocks | Regression & balance testing |
| **Critical Hits / RNG** | Shot success formulas & Hot Zones | Probability model validation |
| **Stat Modifiers** | Badges, Takeovers, Dynamic Ratings | Modifier stack testing |
| **Resource Economy** | VC spending, team budgets, morale | Exploit and loop stability testing |

---

## 🔧 Technical Implementation & Assets

To translate community “folk theories” into testable claims, I treated NBA 2K’s shooting + progression systems like a QA surface: define controls, isolate what *can* be isolated, and explicitly label what remains coupled.

### 1. The Architecture: Controlled Test Harness (Street Kings Baseline)

The harness standardizes the “attempt environment” so that observed differences are attributable to *system coupling* (attributes + badges) rather than uncontrolled gameplay noise.

**Environment Controls (Immutable Run Context)**
* **Mode:** Street Kings (MyCareer vs AI), selected to approximate park-style gameplay while remaining offline/controllable.
* **Court:** Pivot Point (Street Kings exclusive).
* **Difficulty:** Hall of Fame (chosen to mirror ranked difficulty pressure).
* **Shot Feedback:** On; **meter off** (to mirror ranked norms and reduce meter-driven variance).
* **Release/Jumpshot:** Kevin Durant animation + jumpshot, fixed across trials.

**Primary Artifact: Confound Isolation Matrix**

| Confounding Variable | What Was Held Constant | How It Was “Isolated” |
| :--- | :--- | :--- |
| **Latency** | Offline vs AI, same court + settings | Removed online/network variance by design. |
| **Stamina** | Shot type, distance, defender | Baseline set at full stamina. |
| **Badges** | Same shot profile + environment | Observed pre/post badge unlock thresholds. |

### 2. The Metric: Variance Control via Sample Design

**Definition:** In this context, “sample power” is treated operationally: enough controlled attempts per condition to reduce variance and make patterns stable across repeated runs.

**My Measurement Standard**
* **Inclusion rule:** count only **Perfect Release** attempts (feedback + animation) to avoid timing variance.
* **Stability check:** re-run the same condition and confirm the directional pattern persists.

### 3. The Trade-off: Offline Control vs Online Realism

**The Constraint:** NBA 2K’s progression system tightly couples attribute thresholds and badge unlocks, making “badge-only” isolation impractical.
**The Decision:** I report badge findings as a **bundle effect** (attributes + badge unlock), because pretending otherwise would be fake rigor.
**The Engineering Logic:** The case study’s purpose is to show *why community tests are inconsistent* by exposing coupling and hidden dependencies.

---

## 🧠 Key Takeaways & Reflection

> This exercise reaffirmed that functional QA in games is as much about system logic as feature behavior.
> 
> **Why this matters for AI Ops:** 
> AI tools are probabilistic systems. Just like a sports engine, an LLM's output is affected by \"modifiers\" (prompts, temperature, top-p). The same rigor required to debunk a \"Dimer Myth\" is required to validate that an AI system is operating within its intended safety boundaries.`
};
