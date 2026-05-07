# Codex Appellate Defense

**Generated:** 5/6/2026, 10:10:43 PM

<Defense_Block>

- **Issue:** Duplicated `canonicalRoleAccent` constant creates maintenance risk.
- **Classification:** Concede
- **Rationale:** Change `src/data/projectMetadata.ts:21` to export a single canonical role-to-accent mapping, then replace duplicate local declarations at `src/components/home/SupportingEvidenceSection.tsx:13` and `src/views/ProjectDetailView.tsx:26`.
  </Defense_Block>

<Defense_Block>

- **Issue:** `ProjectsIndexView` uses local hardcoded `roleStyles` instead of the shared role accent recipe.
- **Classification:** Concede
- **Rationale:** Change `src/views/ProjectsIndexView.tsx:12` to remove the local `roleStyles` map, then update role chip style derivation at `src/views/ProjectsIndexView.tsx:82` and `src/views/ProjectsIndexView.tsx:149` to use the centralized accent mapping plus `getRoleAccentRecipe`.
  </Defense_Block>

<Defense_Block>

- **Issue:** Missing component test updates for modified `canonicalRoleLanes` UI rendering.
- **Classification:** Concede
- **Rationale:** Change `src/test/components.test.tsx:110` to add component-level coverage for rendered canonical role lane text and chip styling behavior for `SupportingEvidenceSection`, `ProjectDetailView`, and `ProjectsIndexView`.
  </Defense_Block>
