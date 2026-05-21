# Ops Triage Simulator & Luxe Lofts Implementation Plan

_Context for handoff to new conversation_

## 1. Version Control & Dependencies

- Checkout a new dedicated feature branch: `phase/8.2-ops-triage-simulator`.
- Run `npm install recharts` safely.

## 2. Configuration & Registries (Flagship Pruning)

- Modify `src/constants.tsx`: Remove `nba-systems-qa`, `project-aegis`, and `prompter-hub` from `PROJECT_REGISTRY`.
- Modify `src/data/projectMetadata.ts`: Update tags and featured arrays to match the pruned list.

## 3. Case Study Narrative Integration

- Modify `src/data/caseStudyData.ts`:
  - **Luxe Lofts:** Integrate the strategic narrative extracted from `scratch/luxe-lofts-repo`. Add a high-visibility CTA link out to the Cloud Run mockup.
  - **OPS Triage:** Rewrite the text to frame the case study around "operational workflow intelligence, throughput, QA, escalation, backlog, and workflow reliability" rather than just GIS.

## 4. Operational Triage Simulator (New Component)

- Create `src/components/ops-triage/OperationalTriageSimulator.tsx`:
  - **Policy Slider:** (0-33 Throughput, 34-66 Balanced, 67-100 Quality). Controls state.
  - **Dynamic Incident Queue:** Monospaced log stream blending GIS data issues and technical workflow issues, reacting to the slider state.
  - **KPI Cards:** Processed Items, First-Pass Yield, Defect Leakage, Unprocessed Backlog, SLA Risk, Escalations.
  - **Recharts Telemetry:** First-pass yield over time, Queue capacity vs. backlog over time. Responsive, dark/light mode compatible.
  - **Operational Readout Panel:** Dynamic interpretation text explaining the tradeoff state based on the slider.
  - **Visuals:** Premium technical operations console (no fake terminal cosplay, no generic SaaS clutter).

## 5. Deep Dive Launchpad Refactoring

- Modify `src/views/DeepDiveView.tsx`:
  - Refactor into a **Tabbed Launchpad**.
  - **Tab 1:** Portfolio 2.0 Process & Governance.
  - **Tab 2:** Luxe Lofts Digital Restructuring Strategy.
