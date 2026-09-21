# Systems at Scale: Triage & QA

> **Project Overview**
>
> **Role:** Quality Control Specialist / GIS Technician
>
> **Scope:** High-volume triage, grid data integrity, process improvement
>
> **Tools:** ESRI ArcMap, Jira, Excel Macros, Custom Dashboards
>
> **Outcome:** Used batch triage and escalation criteria in utility GIS work. A prior portfolio audit records Kyle's confirmation of a conservative 100+ work-orders/day workload; this is operating context, not a measured improvement caused by the portfolio simulator.
>
> **Relevance:** Operational systems thinking through repeatable QA and escalation decisions

---

## The thesis: designing for constraints

I have operationalized data systems at two distinct scales of complexity. While the roles differed, the methodology remains constant: **Identify the Constraint → Standardize the Input → Enforce the Outcome.**

Standard training covers common cases, but utility data work also requires a process for incomplete requests, conflicting records, and escalation. The prior portfolio audit records a Kyle-confirmed **100+ work-orders/day** workload across utility GIS roles. A separate résumé entry reports **120+ weekly electric utility service requests**; the available sources do not establish that these describe the same queue or period. Neither figure measures a gain caused by the simulator.

---

## Scale 1: solving for velocity (triage)

**Context:** High-volume operational support (Apex Systems).
**The Constraint:** An overwhelming backlog where deep review of every item causes paralysis.

### The operational approach

I **implemented** a batch-processing workflow that converted a reactive backlog into a predictable pipeline. By grouping similar error types, I bypassed the context-switching costs that slow down standard processing.

- **Volume context:** Kyle-confirmed 100+ work orders/day from the prior portfolio audit; the synthetic simulator did not generate this workload figure.
- **Process:** Used criteria for "Done" versus "Escalated" to make ambiguous cases easier to route.
- **Prior scale (Printful):** The same throughput discipline was built earlier in technical customer support — handling high daily volumes of live chats and email tickets under the same speed-vs-quality pressure.

---

## Scale 2: solving for precision (QA)

**Context:** High-stakes utility grid data (GIS Ops).
**The Constraint:** "Close enough" is a safety liability. Velocity doesn't matter if the data is wrong.

### The operational approach

I **enforced** a "Zero-Trust" validation loop. While the software provides the tools, the _discipline_ to treat every field variable as a potential failure point—especially on orders that training couldn't cover—was the deciding factor.

- **The Linter (Structural):** Automated checks for missing fields before human review.
- **The Human (Contextual):** Validating the "semantics" of the map against field notes.
- **Evidence boundary:** The supplied entry does not establish a numeric first-pass acceptance rate or a measured reduction in rework.

---

## The synthesis (dashboard)

The portfolio dashboard models how volume and quality rules can be inspected together. It uses synthetic values; it does not report measured production performance.

> **Portfolio Note:** The dashboard uses synthetic values to mirror the reporting structure while excluding confidential proprietary records.

---

## Stakeholder value

**Who it helps:** Operations leads accountable for SLAs, the downstream teams that inherit the queue's output, and the requesters waiting on a resolution.

**What the approach addresses:** Explicit escalation criteria make ambiguous cases easier to review and hand off.

**Why it matters:** The model makes the throughput-versus-validation decision visible. Its effect on staffing, defects, or SLA performance was not measured here.
