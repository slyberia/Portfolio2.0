Phase 3C — Role Lane UI Integration
Goal: Wire the updated track configurations (from Phase 3B) into the frontend React components to visually render the new Role Lanes.
Scope:

1. Locate the UI components responsible for rendering portfolio projects or tracks (e.g., `src/components/`, `TrackList.tsx`, `ProjectCard.tsx`).
2. Update the rendering logic to group, filter, or display projects based on the `roleLanes` data structure introduced in Phase 3A and populated in Phase 3B.
3. Ensure the UI cleanly distinguishes between the lanes (e.g., "AI Workflow / Portfolio Governance" vs "Implementation / CSE-lite").
   Strict Constraints: Do not alter the underlying data files modified in Phase 3B. Focus strictly on React component logic, state mapping, and safe prop drilling.
