# Executor Registry & Recommendation Matrix

## 1. Registry

This registry defines the active implementation agents and their calibrated skill levels for specific Phase 6 tasks.

| Executor Alias      | Model Profile             | Key Strengths              | Recommended Tasks                   |
| :------------------ | :------------------------ | :------------------------- | :---------------------------------- |
| **Architect**       | User / Human              | Strategy, Ruling, Approval | Final Review, Complex Strategy      |
| **Assistant Coach** | Gemini 2.0 Flash / Claude | Governance, Logs, Docs     | Orchestration, Documentation        |
| **The Specialist**  | Claude 3.5 Sonnet / Codex | Logic, Refactoring, Types  | Component Refactoring, Bug Fixing   |
| **Visualist**       | Gemini 1.5 Pro / Flash    | Vision, Media, Layout      | Screenshot Verification, CSS Polish |

## 2. Selection Policy

- **Default for Docs**: Assistant Coach.
- **Default for Code**: The Specialist.
- **Default for Visuals**: Visualist.

## 3. Usage Context

When the Assistant Coach prepares a subphase handover, it MUST look up the recommended executor from this table and include it in the `Executor_Recommendation` section of the report.

---

**Status**: ACTIVE | **Last Updated**: 2026-05-14
