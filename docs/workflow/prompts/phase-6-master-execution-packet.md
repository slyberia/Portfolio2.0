# Phase 6 — Recruiter-Facing Proof Synthesis & Release Readiness

## Shared Operating Rules

1. **Atomic Execution**: Do not execute all subphases at once. Execute only the active subphase specified by the Architect. Use the rest of this document as context, constraints, and sequencing guidance.
2. **Git Preflight**: Before any implementation subphase, verify branch synchronicity with `archive/phase-3-baseline` and ensure a clean working tree.
3. **Artifact Archival**: Every subphase must result in a archived prompt and report in `docs/workflow/prompts/` and `docs/workflow/reports/` respectively.
4. **Governance First**: All technical changes must be accompanied by governance validation (review, audit, ledger update).
5. **No Blind Merges**: All mutations must be reviewed by the Architect or a designated reviewer (e.g., Jules).

## Phase 6 Goals

- Formalize the automation pipeline governance (contracts, executors, ledger).
- Synthesis of recruiter-facing narrative and proof paths.
- Final audit of the claim-to-evidence-to-proof chain.
- Release readiness validation and deployment preparation.

## Phase 6 Scope Boundaries

- **In Scope**: Documentation, governance contracts, executor routing logic, archival scripts, narrative refinements, accessibility QA, release reports.
- **Out of Scope**: Major UI redesigns, new project features unrelated to proof, database migrations, CI/CD infrastructure changes (unless related to governance logs).

## Phase 6 Subphase Map

### 6.0A — Agent Skills & Executor Governance Integration

- **6.0A-1**: Contract Foundation
- **6.0A-2**: Executor Registry Skeleton
- **6.0A-2b**: Executor Recommendation + User Selection Layer
- **6.0A-3**: Orchestrator Refactor
- **6.0A-4**: Governance Validation & Artifact Archival

### 6.0 — Baseline Audit & Release Scope Lock

### 6.1 — Recruiter Narrative Synthesis

### 6.2 — Claim → Evidence → Visual Proof Audit

### 6.3 — Skim Path, Accessibility & Conversion QA

### 6.4 — Final Release Readiness Report & Patch Notes

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
- **FMEA / appellate**: Claude API or Gemini first; Claude Code only when repo-local execution is needed.
- **Release validation**: local-script first, then Assistant Coach review if governance validation exists.

## Claude Code / Codex Substitution Policy

Claude Code may substitute for Codex only when:

1. the task requires or benefits from local file edits;
2. validation commands may need to be run;
3. the task is implementation/resolution-oriented;
4. quota health is acceptable;
5. the Architect approves the recommendation or has set a policy allowing substitution.

Claude Code must not silently replace Codex for review-only, documentation-only, or token-heavy FMEA tasks.

## Assistant Coach Recommendation Schema

The Assistant Coach serves as an orchestration advisor. Every recommendation must follow this schema:

# Assistant Coach Recommendation

## Current Phase

## Current State

## Recommended Mode

## Recommended Executor

## Fallback Executor

## Why This Mode

## Quota / Cost Note

## Commands Used

## Commands Available

## Recommended Command Path

## Halt Conditions

## Proceed / Do Not Proceed Recommendation

## Command Ledger Requirements

Every command execution must be tracked in a durable ledger.

- **Human-readable**: `docs/workflow/reports/phase-6-command-ledger.md`
- **Machine-readable**: `.agent/state/command-ledger.json` (Future)

**Ledger Fields**:

- phase
- updatedAt
- commandsAvailable
- commandsUsed
- recommendedNextCommands
- executorUsed
- recommendedExecutor
- fallbackExecutor
- mode
- status
- timestamp
- notes

---

# Runnable Subphase Prompt Sections

## Subphase 6.0A-1 — Contract Foundation

### Objective

Establish the model-agnostic contract specifications for the governance agents.

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

- Creation of documentation in `docs/workflow/contracts/` (future path) or `docs/workflow/prompts/`.
- Definition of contract schemas for `triage-rubric`, `jules-reviewer`, `appellate-defense`, `resolution-coach`, `assistant-coach`, `doc-generation`, `pipeline-architect`, and `fmea-audit`.

### Forbidden Scope

- Modification of `src/`, `scripts/`, or `.agent/`.
- Implementation of the contracts themselves in code.

### Required Inputs

- Existing Phase 5 workflow documentation.
- Current script list in `package.json`.

### Required Actions

- Draft the functional requirements for each contract.
- Define the input/output schema for inter-agent communication.
- Document the "Definition of Done" for each contract.

### Required Outputs

- `docs/workflow/prompts/contracts-specification.md`
- Updated Phase 6 roadmap with contract dependencies.

### Recommended Mode

documentation

### Recommended Executor Policy

Claude API or Gemini.

### Validation Commands

- `npm run format:check`

### Halt Conditions

- Architect rejects the contract schema.
- Ambiguity in agent roles.

### Completion Criteria

- All 8 contract specifications are documented.
- Peer review by the Architect is complete.

---

## Subphase 6.0A-2 — Executor Registry Skeleton

### Objective

Define the architecture for executor adapters and the central router.

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

- Documentation under `docs/workflow/`.
- Specification for `scripts/executors/` and `scripts/executor-router.mjs`.

### Forbidden Scope

- Creation of actual `.mjs` files in `scripts/`.
- Modification of `package.json`.

### Required Inputs

- Executor Classes list from the Master Packet.
- Current local environment tool availability check.

### Required Actions

- Define the interface for executor adapters.
- Draft the routing logic (mode-to-executor mapping).
- Define the `quota.json` schema for cost tracking.

### Required Outputs

- `docs/workflow/prompts/executor-registry-spec.md`

### Recommended Mode

documentation

### Recommended Executor Policy

Claude API or Gemini.

### Validation Commands

- `npm run format:check`

### Halt Conditions

- Tool mismatch (e.g., trying to use an executor not available in the environment).

### Completion Criteria

- Interface definition for all 6 executor classes is complete.
- Router logic is mapped to Execution Modes.

---

## Subphase 6.0A-2b — Executor Recommendation + User Selection Layer

### Objective

Define the governance layer for executor recommendation, quota management, and user approval.

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

- Documentation for the Assistant Coach recommendation workflow.
- Policies for premium executor substitution.

### Forbidden Scope

- Code implementation.

### Required Inputs

- Claude Code / Codex Substitution Policy.
- Assistant Coach Recommendation Schema.

### Required Actions

- Detail the workflow for "Architect Approval" for premium tasks.
- Define the "Automatic Substitution" safety thresholds.
- Document the quota check pre-flight requirements.

### Required Outputs

- `docs/workflow/prompts/executor-governance-policy.md`

### Recommended Mode

documentation

### Recommended Executor Policy

Claude API or Gemini.

### Validation Commands

- `npm run format:check`

### Halt Conditions

- Policy conflicts with cost/quota constraints.

### Completion Criteria

- Substitution policy is fully documented and approved by the Architect.

---

## Subphase 6.0A-3 — Orchestrator Refactor

### Objective

Plan the refactor of existing governance scripts into thin orchestrators.

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

- Analysis of `scripts/run-jules-review.mjs`, `scripts/run-appellate-defense.mjs`, `scripts/run-resolution.mjs`, and `scripts/run-documentation.mjs`.
- Refactor plan documentation.

### Forbidden Scope

- Modification of the actual scripts.

### Required Inputs

- Existing script source code.
- Contract Foundation specs from 6.0A-1.

### Required Actions

- Identify logic to be moved to contracts.
- Define how orchestrators will call the Executor Router.
- Ensure preservation of existing exit codes and entry points.

### Required Outputs

- `docs/workflow/prompts/orchestrator-refactor-plan.md`

### Recommended Mode

review / documentation

### Recommended Executor Policy

Gemini (for analysis) and Claude API (for documentation).

### Validation Commands

- N/A (Analytical task).

### Halt Conditions

- Breaking changes identified in the orchestrator interface.

### Completion Criteria

- Refactor plan covers all 4 primary governance scripts.

---

## Subphase 6.0A-4 — Governance Validation & Artifact Archival

### Objective

Establish the durable archival layer for prompts, reports, and command logs.

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

- Definition of archival file paths and structures.
- Specification for governance validation vs technical validation.

### Forbidden Scope

- Implementation of archival scripts.

### Required Inputs

- Command Ledger Requirements.
- Prompt / Report Archival Rules.

### Required Actions

- Design the directory structure for `docs/workflow/prompts/` and `docs/workflow/reports/`.
- Define the validation rubric for "Governance Pass".

### Required Outputs

- `docs/workflow/prompts/archival-governance-spec.md`

### Recommended Mode

documentation

### Recommended Executor Policy

Claude API or Gemini.

### Validation Commands

- `npm run format:check`

### Halt Conditions

- Conflicts with existing file naming conventions.

### Completion Criteria

- Archival structure is finalized and documented.

---

## Subphase 6.0 — Baseline Audit & Release Scope Lock

### Objective

Audit the post-Phase-5 state and lock the final release scope for Phase 6.

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

- Full repository audit (read-only).
- Documentation of current "Visual Proof" coverage.

### Forbidden Scope

- Any file modifications.

### Required Inputs

- Phase 5 completion reports.
- Live build status.

### Required Actions

- Verify all media assets are registered and linked.
- Identify any "Narrative Gaps" in the current portfolio state.
- Lock the Phase 6 feature set.

### Required Outputs

- `docs/workflow/reports/phase-6-baseline-audit.md`
- `docs/workflow/reports/phase-6-scope-lock.md`

### Recommended Mode

review

### Recommended Executor Policy

Gemini or Claude API.

### Validation Commands

- `npm run validate:phase`
- `npm run validate:crawler`

### Halt Conditions

- Phase 5 regressions identified.
- Incomplete media registry.

### Completion Criteria

- Audit report confirms state parity.
- Scope lock is signed off by the Architect.

---

## Subphase 6.1 — Recruiter Narrative Synthesis

### Objective

Refine the portfolio narrative to ensure clarity and impact for recruiter audiences.

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

- `src/data/` (narrative content).
- Homepage and Role Lane descriptive text.

### Forbidden Scope

- UI/UX layout changes.
- Component structural changes.

### Required Inputs

- Recruiter feedback (if any) or industry best practices.
- Current site content.

### Required Actions

- Tighten value propositions.
- Ensure "Role Tracks" clearly communicate the intended narrative.
- Optimize skim-ability of project descriptions.

### Required Outputs

- Updated narrative data files.
- `docs/workflow/reports/narrative-synthesis-report.md`

### Recommended Mode

implementation

### Recommended Executor Policy

Codex or Claude Code.

### Validation Commands

- `npm run dev` (visual verification)
- `npm run build`

### Halt Conditions

- Narrative changes negatively impact SEO or accessibility.

### Completion Criteria

- Homepage and all role-lanes are reviewed and refined for tone and clarity.

---

## Subphase 6.2 — Claim → Evidence → Visual Proof Audit

### Objective

Perform a comprehensive audit of the proof chain for every major claim.

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

- Documentation and content verification.
- Minor metadata fixes in `src/data/`.

### Forbidden Scope

- Adding new evidence types.

### Required Inputs

- Media Registry.
- Evidence blocks.
- Narrative synthesis from 6.1.

### Required Actions

- For every major "Claim" in the portfolio, verify there is an "Evidence Block".
- For every "Evidence Block", verify there is a "Visual Proof" (screenshot/media).
- Cross-link any missing nodes.

### Required Outputs

- `docs/workflow/reports/proof-chain-audit-results.md`

### Recommended Mode

review / implementation

### Recommended Executor Policy

Gemini (for auditing) and Claude Code (for minor fixes).

### Validation Commands

- `node scripts/validate-media-links.mjs`

### Halt Conditions

- "Dead-end" claims identified that cannot be proven.

### Completion Criteria

- 100% coverage of claims-to-proof for core role tracks.

---

## Subphase 6.3 — Skim Path, Accessibility & Conversion QA

### Objective

Validate the user experience for high-speed recruiter interaction.

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

- CSS refinements for hierarchy.
- Accessibility (Aria) attributes.
- Mobile responsiveness tweaks.

### Forbidden Scope

- Functional additions.

### Required Inputs

- Phase 6 subphase 6.2 outputs.
- Accessibility standards checklist.

### Required Actions

- Audit "Skim Path" (headings, bold text, CTA visibility).
- Test keyboard navigation and screen reader compatibility.
- Verify mobile comprehension (layout stability).

### Required Outputs

- `docs/workflow/reports/qa-ux-report.md`

### Recommended Mode

review / implementation

### Recommended Executor Policy

Claude Code (for implementation) and Gemini (for visual QA feedback via screenshots).

### Validation Commands

- `npm run lint`
- Manual mobile/desktop preview.

### Halt Conditions

- Accessibility regressions.
- Critical layout breaks on mobile.

### Completion Criteria

- No "Critical" or "High" accessibility issues remain.
- Skim path is verified as intuitive.

---

## Subphase 6.4 — Final Release Readiness Report & Patch Notes

### Objective

Compile the final release artifacts and perform the final deployment checklist.

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

- `docs/workflow/reports/`.
- `CHANGELOG.md` or equivalent patch notes.

### Forbidden Scope

- Application code changes.

### Required Inputs

- All Phase 6 subphase reports.
- Command ledger.

### Required Actions

- Summarize Phase 6 achievements.
- Document known limitations or deferred issues.
- Generate final patch notes.

### Required Outputs

- `docs/workflow/reports/phase-6-final-release-readiness.md`
- `docs/workflow/reports/patch-notes-v2.md`

### Recommended Mode

documentation

### Recommended Executor Policy

Claude API or Gemini.

### Validation Commands

- `npm run validate:phase`
- `npm run build:crawler`

### Halt Conditions

- Final validation suite fails.

### Completion Criteria

- Release report is complete and all "Must-Fix" issues are resolved.
- Portfolio is ready for the "Merge to Main" or final public deployment.
