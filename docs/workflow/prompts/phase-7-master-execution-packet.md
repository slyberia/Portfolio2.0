# Phase 7 — Application Packaging: Job-Specific Proof Bundles

## Shared Operating Rules

1. **Atomic Execution**: Do not execute all subphases at once. Execute only the active subphase specified by the Architect. Use the rest of this document as context, constraints, and sequencing guidance.
2. **Git Preflight**: Before any implementation subphase, verify branch synchronicity with `archive/phase-3-baseline` and ensure a clean working tree.
3. **Artifact Archival**: Every subphase must result in an archived prompt and report in `docs/workflow/prompts/` and `docs/workflow/reports/` respectively.
4. **Governance First**: All technical changes must be accompanied by governance validation (review, audit, ledger update).
5. **No Blind Merges**: All mutations must be reviewed by the Architect or a designated reviewer (e.g., Jules).

## Phase 7 Goals

- Define static, recruiter-friendly entry paths (Start Paths) for different roles (e.g., Implementation, Ops Analytics).
- Package existing evidence into job-specific proof bundles.
- Ensure the UI for these bundles relies on simple, robust routing rather than fragile, complex state-based filtering (per Phase 6 FMEA).
- Prepare the portfolio's architecture for targeted outreach applications.

## Phase 7 Scope Boundaries

- **In Scope**: Creating static route definitions for roles, assembling existing components into proof bundles, updating navigation to support recruiter start paths, generating documentation for these paths.
- **Out of Scope**: Creating entirely new tracking pages, migrating to a backend database, implementing complex multi-select filtering UIs, altering the core sanitization logic.

## Phase 7 Subphase Map

### 7.0 — Start Path & Bundle Architecture
### 7.1 — Recruiter Start Path Implementation
### 7.2 — Component Assembly & Static Bundle UI
### 7.3 — Validation & Routing Integrity

## Execution Modes

| Mode                   | Purpose               | Recommended Executor | Fallback        | When NOT to use |
| :--------------------- | :-------------------- | :------------------- | :-------------- | :-------------- |
| **review**             | Critique and feedback | Gemini / Claude API  | Codex           | During mutation |
| **implementation**     | Code modification     | Claude Code / Codex  | Gemini          | Review only     |
| **resolution**         | Repair and fixes      | Claude Code          | Codex           | Initial build   |
| **documentation**      | Doc generation        | Claude API / Gemini  | Codex           | Logic changes   |
| **fmea**               | Failure audit         | Claude API / Gemini  | Claude Code     | Token-heavy     |
| **release-validation** | Final check           | local-script         | Assistant Coach | Early phase     |
| **manual**             | Human oversight       | manual-human         | N/A             | Automated tasks |

## Executor Classes

- **claude-code-cli**: Local CLI for high-fidelity code edits and command execution.
- **codex**: High-performance agentic coding interface.
- **gemini**: High-context, reasoning-heavy analysis.
- **claude-api**: Structured response and formatting specialist.
- **local-script**: Deterministic validation scripts.
- **manual-human**: The user (Architect) for final approvals.

## Executor Recommendation Policy

- **Review / critique**: Gemini or Claude API first.
- **Implementation / mutation**: Claude Code or Codex first.
- **Resolution / repair**: Claude Code recommended, Codex fallback.
- **Documentation**: Claude API or Gemini first.
- **Release validation**: local-script first, then Assistant Coach review.

## Claude Code / Codex Substitution Policy

Claude Code may substitute for Codex only when:
1. the task requires or benefits from local file edits;
2. validation commands may need to be run;
3. the task is implementation/resolution-oriented;
4. quota health is acceptable;
5. the Architect approves the recommendation.

## Command Ledger Requirements

Every command execution must be tracked in a durable ledger.
- **Human-readable**: `docs/workflow/reports/phase-7-command-ledger.md`
- **Machine-readable**: `.agent/state/command-ledger.json`

---

# Runnable Subphase Prompt Sections

## Subphase 7.0 — Start Path & Bundle Architecture

### Objective
Define the static routes and mapping schema for job-specific proof bundles.

### Mandatory Pre-flight
Before making any changes, you MUST run the following commands and confirm you are on `archive/phase-3-baseline` and synced with remote:
```bash
git status --short
git branch --show-current
git fetch origin
git status -sb
git rev-parse HEAD
git rev-parse origin/archive/phase-3-baseline
git log --oneline --decorate -5
```
If the branch is incorrect, behind remote, or the working tree is dirty, halt and report to the Architect.

### Allowed Scope
- Creation of `docs/workflow/prompts/bundle-schema-spec.md`.
- Defining static URL structures (e.g., `/apply/pm`, `/apply/engineer`).
- Mapping existing evidence IDs to specific job profiles.

### Forbidden Scope
- Modifying React Router configuration (`App.tsx` / `main.tsx`) in this subphase.
- Planning complex dynamic UI filters.

### Required Outputs
- `docs/workflow/prompts/bundle-schema-spec.md`

### Recommended Mode
documentation

### Recommended Executor Policy
Claude API or Gemini.

### Completion Criteria
- Route schema and evidence-to-role mapping are fully documented and approved.

---

## Subphase 7.1 — Recruiter Start Path Implementation

### Objective
Implement the defined static recruiter start paths within the application router.

### Mandatory Pre-flight
Before making any changes, you MUST run the following commands and confirm you are on `archive/phase-3-baseline` and synced with remote:
```bash
git status --short
git branch --show-current
git fetch origin
git status -sb
git rev-parse HEAD
git rev-parse origin/archive/phase-3-baseline
git log --oneline --decorate -5
```

### Allowed Scope
- Modifying router configuration to support recruiter entry URLs.
- Creating placeholder views for the specific roles if they do not exist.

### Forbidden Scope
- Injecting stateful URL query params as the primary delivery mechanism (prefer discrete static paths).

### Required Outputs
- Updated Router configuration.
- Basic views for start paths.

### Recommended Mode
implementation

### Recommended Executor Policy
Claude Code or Codex.

### Completion Criteria
- New routes load correctly without 404s.

---

## Subphase 7.2 — Component Assembly & Static Bundle UI

### Objective
Assemble the pre-existing evidence and media components into the recruiter start paths to create the "proof bundles".

### Mandatory Pre-flight
Before making any changes, you MUST run the following commands and confirm you are on `archive/phase-3-baseline` and synced with remote:
```bash
git status --short
git branch --show-current
git fetch origin
git status -sb
git rev-parse HEAD
git rev-parse origin/archive/phase-3-baseline
git log --oneline --decorate -5
```

### Allowed Scope
- Populating the start path views with `MediaProofGrid` or related components.
- Tailoring copy and layout specifically for the targeted job role.

### Forbidden Scope
- Introducing new client-side filtering logic to handle the display of evidence. (We are displaying pre-curated bundles to avoid Phase 6 FMEA risks).

### Required Outputs
- Fully populated recruiter bundle views.

### Recommended Mode
implementation

### Recommended Executor Policy
Claude Code or Codex.

### Completion Criteria
- The job-specific views render the correct subset of evidence data.

---

## Subphase 7.3 — Validation & Routing Integrity

### Objective
Ensure the new static bundles did not break existing architecture and are fully accessible.

### Mandatory Pre-flight
Before making any changes, you MUST run the following commands and confirm you are on `archive/phase-3-baseline` and synced with remote:
```bash
git status --short
git branch --show-current
git fetch origin
git status -sb
git rev-parse HEAD
git rev-parse origin/archive/phase-3-baseline
git log --oneline --decorate -5
```

### Allowed Scope
- Running `npm run validate:phase`.
- Auditing the crawler output to ensure new paths are indexed or explicitly excluded.
- Minor resolution patches for tests.

### Forbidden Scope
- Major architectural changes.

### Required Outputs
- `docs/workflow/reports/phase-7-validation-report.md`

### Recommended Mode
release-validation

### Recommended Executor Policy
local-script -> Assistant Coach

### Completion Criteria
- All tests pass, crawler completes successfully, and no broken links are detected.
