Phase 4A — Evidence Schema & Parsing
Goal: Build the data layer to surface pipeline governance logs to the frontend UI.
Scope:

1. Create a strict TypeScript interface for an `EvidenceBlock`. It must include fields for: Initiative Title, Context, Technical Detail, and Business Value.
2. Create a utility script (e.g., in `src/utils/` or `src/services/`) that can parse the markdown files located in `docs/executive-summaries/` and map them to the `EvidenceBlock` interface.
   Strict Constraints: Do not build UI components yet. Focus strictly on the types and the parsing logic required to read the existing Markdown artifacts safely within a static React/Vite environment.
