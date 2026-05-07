# Codex Appellate Defense

**Generated:** 5/6/2026, 8:14:44 PM

<Defense_Block>

- **Issue:** `run-jules-review.mjs` relies on global `fetch`, creating an implicit Node.js >=18 runtime requirement.
- **Classification:** Concede
- **Rationale:** Change `package.json` at line 6 by adding an explicit `engines.node` constraint before the `scripts` block.
  </Defense_Block>

<Defense_Block>

- **Issue:** `run-jules-review.mjs` dereferences `data.candidates[0].content.parts[0].text` without validating the Gemini response shape.
- **Classification:** Concede
- **Rationale:** Change `scripts/run-jules-review.mjs` at line 60 to validate `candidates`, `content`, `parts`, and `text` before dereference and fail with a deterministic error path.
  </Defense_Block>

<Defense_Block>

- **Issue:** `run-jules-review.mjs` and `run-appellate-defense.mjs` lack automated tests for developer workflow behavior.
- **Classification:** Defend
- **Rationale:** The architectural invariant is that these scripts are developer-only orchestration tools outside the application runtime and outside the phase validation contract; failures are surfaced synchronously through process exit behavior and do not affect routes, components, production bundles, accessibility, SEO, or design-system state.
  </Defense_Block>
