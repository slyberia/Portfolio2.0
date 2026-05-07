# AI Delivery Pipeline & The RALPH Loop

## The Four-Agent Model

1. **ChatGPT/Gemini (Architect):** Defines phase contracts, scopes, and triage decisions.
2. **Codex (Builder):** Primary implementation agent for scoped repo changes.
3. **Jules (Reviewer):** Async PR reviewer and test coverage auditor. Does not build features.
4. **Antigravity (Operator):** Local orchestration, visual QA, and context compiler.

## The RALPH Execution Loop (Superscalar)

- **R (Read):** Architect reads roadmap and defines scope.
- **A (Analyze):** Architect/Operator define validation metrics.
- **L (Launch):** Codex implements.
- **P (Prove):** Operator runs `validate:phase`, visual QA, and crawler checks concurrently.
- **H (Handoff):** Operator generates state report; Architect triages.
