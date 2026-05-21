Phase 3A — Role-Lane Data Model Implementation
Goal: Add the data structures required to support recruiter-native role paths.
Source of Truth: Read docs/roadmap/portfolio-roadmap.md before executing.
Scope:

    Update the primary project TypeScript interfaces to include an optional roleLanes property (array of strings).

    The canonical lanes are exactly: "Implementation / CSE-lite", "Ops Analytics / QA", "GIS / Spatial Systems", "AI Workflow / Portfolio Governance".

    Update the existing project objects in the data store to include the appropriate roleLanes arrays.
    Strict Constraints: Do not change visual UI components, crawler mirrors, or build configs.
