# Phase 6 Governance Contract: Model-Agnostic Agent Orchestration

## 1. Overview

This contract establishes the formal interaction protocols between the **Architect** (User), the **Assistant Coach** (Orchestrator), and the **Executors** (Implementation Agents) for Phase 6 of the Portfolio2.0 project.

## 2. Agent Roles & Definitions

### 2.1 The Assistant Coach (Orchestrator)

- **Role**: Process Governance & State Management.
- **Responsibilities**:
  - Enforce the **Mandatory Pre-flight** (Git sync check).
  - Load subphase context and prompt payloads.
  - Maintain the `.agent/state/command-ledger.json`.
  - Coordinate handoffs between different Executor models.
- **Strict Constraint**: The Assistant Coach _never_ writes application code. It only writes documentation, state files, and orchestrator scripts.

### 2.2 The Executor (Implementation)

- **Role**: Targeted Implementation & Debugging.
- **Capabilities**:
  - **Claude Code/Codex**: High-complexity logic, refactoring, and visual QA.
  - **Claude API/Gemini**: Documentation, schema generation, and routine boilerplate.
- **Strict Constraint**: Must wait for the Assistant Coach to provide the context and subphase-specific instructions before execution.

## 3. Communication Protocol

### 3.1 The Command Ledger (`.agent/state/command-ledger.json`)

Every action taken by an Executor must be logged in the ledger.

```json
{
  "phase": "6.0A",
  "subphase": "6.0A-1",
  "executor": "Claude-3.5-Sonnet",
  "timestamp": "ISO-8601",
  "commands": [
    {
      "cmd": "npm run validate",
      "exitCode": 0,
      "summary": "Full suite pass"
    }
  ],
  "mutations": ["docs/workflow/contracts/phase-6-governance-contract.md"]
}
```

### 3.2 Prompt Inheritance

All Phase 6 subphase prompts MUST inherit the **Mandatory Pre-flight** block. This is not optional. Any agent receiving a prompt without this block must halt and request an updated prompt from the Master Execution Packet.

## 4. Execution Workflow

1. **Pre-flight**: Agent verifies branch `archive/phase-3-baseline` is synced and clean.
2. **Context Load**: Agent reads `docs/workflow/architect-context.md` and the relevant section of the `phase-6-master-execution-packet.md`.
3. **Execution**: Agent performs the task defined in the subphase.
4. **Validation**: Agent runs `npm run validate:phase`.
5. **Reporting**: Agent generates a `Phase Report` and updates the `command-ledger.json`.
6. **Handover**: Agent specifies the next subphase and recommended Executor.

## 5. Failure & Resolution

- **Git Sync Failure**: Halt. Do not attempt manual merges unless explicitly ordered by the Architect.
- **Validation Failure**: The Assistant Coach must be invoked with the failure log to generate a "Resolution Ruling" before any further mutations are attempted.

---

**Status**: DRAFT | **Governance Level**: MANDATORY
