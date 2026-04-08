# ⚖️ Systems at Scale: Triage & QA

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

> **Portfolio Note:** The dashboard uses synthetic values to mirror the reporting structure while excluding confidential proprietary records.