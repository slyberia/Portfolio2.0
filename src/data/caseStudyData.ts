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

> **Project Overview**
>
> **Role:** Strategy & Implementation
> **Scope:** Digital Restructuring, Ecosystem Unification, Conversational UI
> **Tools:** Next.js, Cloud Run, Firebase, Gemini Genkit

[View the Cloud Run Mockup Prototype →](https://luxe-lofts-roadmap-repo-786228485832.us-central1.run.app/)

## 1) Strategic Narrative

Luxe Lofts needed a unified digital presence to replace a fragmented setup. The goal was to build a system where the "space sells itself" through high-fidelity visual design, while an intelligent backend handles the friction of event planning. 

### Brand Personality & Aesthetic
**Refined · Grounded · Genuine**

The design avoids the coldness of generic luxury, aiming instead for an unpretentiously inviting atmosphere. This is achieved through:
* **Warm Dark Mode:** Avoiding "AI neon" in favor of lighting that mimics a well-designed evening space.
* **Editorial Typography:** Pairing *Spectral* (literary, warm) with *Jost* (geometric, clean) to create a premium feel without wedding clichés.
* **Intentional Layout:** Asymmetric treatments and generous vertical spacing.

### Core Design Principles
1. **Let the space sell itself:** Photography takes precedence; UI supports rather than competes.
2. **Conversion is the north star:** Every path leads clearly to the booking inquiry form.
3. **Premium without pretension:** A grounded, versatile aesthetic suitable for both corporate events and private parties.

---

## 2) Technical Implementation & Architecture

This build was structured to integrate aesthetic overhaul with operational utility:
* **Framework:** Next.js 15 App Router, styled with Tailwind CSS and shadcn/ui.
* **Backend:** Google Cloud Run handling form submissions and logic routing.
* **Intelligent Features:** A Gemini 2.5 Flash / Genkit-powered Event Planner flow (\`/planner\`) to assist users in structuring their inquiries.
* **Client Portals:** Firebase Auth-gated dashboard prototypes for post-booking management.

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

  'ops-triage': `# ⚖️ Operational Workflow Intelligence: Triage & QA

> **Project Overview**
>
> **Role:** Systems Analyst & Operational Lead
> **Scope:** High-Volume Triage, Workflow Reliability, Defect Leakage Prevention
> **Tools:** Jira, Service Desk, Data Verification Tools, Process Control Dashboards

---

## 🏗️ The Thesis: Engineering Reliable Workflows

Operational excellence isn't just about working harder; it's about building **Operational Workflow Intelligence**. It is the discipline of bridging the gap between "Training Theory" and "Production Reality" in high-throughput environments. 

Whether managing a massive backlog of support escalations or ensuring zero-defect data entry for critical systems, the methodology remains constant: **Identify the Constraint → Standardize the Input → Enforce the Outcome.**

---

## ⚡ Solving for Throughput: The Triage System

**Context:** High-volume operational support and escalation management.
**The Constraint:** An overwhelming reactive backlog where attempting deep, ad-hoc review of every item causes systemic paralysis and SLA breaches.

### The Operationalization
I engineered a batch-processing triage workflow that converted a reactive backlog into a predictable, high-velocity pipeline. By recognizing error patterns and categorizing requests into standardized handling paths, I bypassed the severe context-switching costs that typically degrade workflow reliability.

*   **Escalation Logic:** Established rigid criteria for what constitutes a "Resolved" state versus what requires immediate escalation, eliminating decision fatigue from the queue.
*   **Throughput Impact:** Maintained aggressive SLA targets (processing 120+ complex items per week) without sacrificing baseline quality.

---

## 🎯 Solving for QA: The Zero-Defect Framework

**Context:** Production data maintenance where errors cascade into downstream failures.
**The Constraint:** Velocity must never compromise system integrity. "Close enough" is an unacceptable liability.

### The Operationalization
I enforced a "Zero-Trust" validation loop. The key to workflow reliability is the discipline to treat every variable as a potential failure point, especially for edge cases that bypass standard automation.

*   **Structural Audits:** Utilizing systemic linters to catch missing dependencies and structural flaws before human evaluation.
*   **First-Pass Yield:** Validating the contextual semantics of requests against strict compliance rules, sustaining a **98% First-Pass Yield** on complex escalations that previously required multiple revision cycles.

---

## 🔗 The Synthesis: The Operational Dashboard

The interactive simulator below demonstrates how these opposing forces are balanced in real-time. You can adjust the **Policy Slider** to see how prioritizing raw throughput affects defect leakage, and how over-indexing on QA impacts the unprocessed backlog.

> **Portfolio Note:** The dashboard uses synthetic values and telemetry to demonstrate the workflow logic while protecting proprietary operational data.`,

  guynode: `# 🗺️ Guynode Spatial Data Hub — Modernizing Geospatial Access

> **"Spatial data is only as valuable as it is accessible. Guynode transforms fragmented legacy data into a governed, high-fidelity public resource."**

### 🗺️ Launch Guynode Environments

Experience the live GIS solutions. Compare the current legacy stable production version with the modern, high-fidelity Redesigned Spatial Data Hub mockup.

- [Launch Live Production Site →](https://guynode.com/)
- [Launch Redesigned Mockup →](https://guynode-spatial-data-hub-786228485832.us-central1.run.app/)

---

## 🏗️ The Challenge: Legacy Fragmentation
Geospatial data for Guyana was historically siloed across fragmented legacy systems, leading to:
* **Information Decay:** Inconsistent metadata making datasets difficult to verify or trust.
* **Access Friction:** Obscure download paths and lack of visual previews for non-technical users.
* **Maintenance Debt:** Unstructured storage making it difficult to audit or expand the catalog.

**The Goal:** Engineer a unified spatial hub that prioritizes **Dataset Governance**, **Metadata Integrity**, and **User-Centric Discovery**.

---

## 🔧 Technical Implementation & Assets

### 1. Architecture: Metadata-Driven Registry
We implemented a **Type-Safe Dataset Registry** using TypeScript, ensuring that every spatial asset follows a strict governance schema. This allows for automated validation of provenance, format, and download availability.

### 2. Implementation: Map-Based Preview Workflow
To bridge the gap between "Raw Data" and "User Comprehension," I integrated a **Leaflet-based Preview Engine**. This allows users to inspect GeoJSON and spatial layers directly in the browser before committing to a download.

---

## 📊 Impact & Results
* **Audit-Ready IA:** The new Information Architecture supports 100% metadata coverage across all registered datasets.
* **Reduced Friction:** Automated route/link validation ensures zero broken paths for public users.
* **Launch Readiness:** Established a reproducible "Readiness Review" protocol for onboarding new spatial agencies.

---

## 📂 Key Artifact: The Dataset Governance Schema
*The core of the system is the strict metadata contract for every spatial node.*

\`\`\`typescript
interface DatasetNode {
  id: string;
  category: 'Infrastructure' | 'Environment' | 'Social';
  metadata: {
    provenance: string;
    lastUpdated: ISOString;
    format: 'GeoJSON' | 'SHP' | 'KML';
  };
}
\`\`\``,

  'digital-twin': `# 🤖 Digital Twin AI Agent — Scoped Retrieval & Governance

> **"An AI assistant without guardrails is a liability. The Digital Twin is engineered to provide precise, low-latency proof retrieval with built-in safety and cost controls."**

---

## 🏗️ The Challenge: Recruiter Information Friction
Recruiters spend an average of 6 seconds per portfolio. Standard search bars often fail to surface the specific "Proof of Work" needed for a role match.
* **The Gap:** Visitors ask complex questions ("How did Kyle handle the Lux Loft audit?") that standard filters cannot answer.
* **The Risk:** Unrestricted LLMs can hallucinate experience or incur excessive API costs on off-topic requests.

**The Goal:** Build an AI-driven retrieval engine that autonomously routes visitors to relevant proof while strictly adhering to **Operational Guardrails**.

---

## 🔧 Technical Implementation & Assets

### 1. Architecture: The Relevance Gate
I engineered a **Multi-Stage Triage Flow** that intercepts requests before they hit the LLM. If a request is identified as out-of-scope or "expensive," it is deflected to a static response, preserving API quota for high-intent recruiters.

### 2. Operational Control: The Command Parser
The agent is not just a "chatbot"; it is an **Operational Orchestrator**. It can trigger UI commands (e.g., \`TRIGGER_RESUME_DOWNLOAD\`) by generating structured JSON hidden from the user, bridging the gap between chat and site action.

---

## 📊 Impact & Failure Mode Resilience
* **Zero-Hallucination Scope:** System instructions force the model to refuse off-topic prompts, ensuring 100% focus on portfolio evidence.
* **Escalation Path:** Integrated a **Human Handoff** flow that captures the conversation state and routes it to a contact form if the AI cannot resolve the query.
* **Cost Governance:** Implemented rate-limiting and token-caps to ensure the system remains sustainable for public use.

---

## 📂 Key Artifact: The Failure Mode Matrix
*Proving that every failure path is planned for.*

| Failure Mode | Detection | Fallback |
| :--- | :--- | :--- |
| **Rate Limit** | 429 Status | Deflect to Resume Path |
| **Injection** | Regex Pattern | Block & Warn |
| **Unsatisfied** | Sentiment Check | Trigger Human Handoff |
\`\`\``,

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
> **Why this matters for implementation and QA systems work:** 
> AI tools are probabilistic systems. Just like a sports engine, an LLM's output is affected by "modifiers" (prompts, temperature, top-p). The same rigor required to debunk a "Dimer Myth" is required to validate that an AI system is operating within its intended safety boundaries.`,
};
