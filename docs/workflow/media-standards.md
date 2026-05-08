# Media & Visual Proof Standards (Phase 5.0)

This document defines the enforceable standards for visual assets within the Portfolio 2.0 system.

## 1. Directory Structure

All media assets must be stored within the `public/media/` directory, organized by project ID:

```text
public/media/
├── [projectId]/
│   ├── screenshots/       # UI/UX Evidence
│   ├── diagrams/          # Architecture & Logic
│   └── raw/               # Original assets before processing
```

## 2. Naming Conventions

All files must follow the strict kebab-case naming pattern:

**Pattern:** `[projectId]-[surface]-[viewport]-[variant].[ext]`

- **projectId**: The slug of the project (e.g., `codex-v2`)
- **surface**: The specific UI area or component (e.g., `role-track`, `hero`, `data-grid`)
- **viewport**: `desktop`, `tablet`, or `mobile`
- **variant**: Optional versioning or state (e.g., `v1`, `dark`, `hover`)
- **ext**: Prefer `webp` for images, `mp4` for video.

**Examples:**
- `portfolio-v2-home-desktop-v1.webp`
- `gis-track-map-view-mobile-v2.webp`

## 3. Technical Requirements

| Specification | Requirement |
| :--- | :--- |
| **Format** | WebP (Lossless for screenshots, Lossy for photos) |
| **Resolution** | Max 1920px width (Desktop), 768px (Tablet), 390px (Mobile) |
| **File Size** | < 300KB per asset (highly recommended) |
| **Aspect Ratio** | Standard 16:9 for desktop, 9:19 for mobile |

## 4. Metadata Governance

Every asset must be registered in `src/data/mediaRegistry.ts` with the following:

- **MaturityStatus**: Defines the readiness of the project depicted.
- **Visibility**: Controls whether the asset is shown to the public.
- **RoleLanes**: Maps the asset to recruiter-specific interest areas.
- **CaptureStatus**: Tracks the lifecycle from "pending-capture" to "approved".

## 5. Capture Workflow (Phase 5.1)

1. **Define**: Add target to `src/data/mediaCapturePlan.ts`.
2. **Capture**: Run Automated Capture Agent.
3. **Register**: Add entry to `src/data/mediaRegistry.ts` with `captureStatus: 'pending-review'`.
4. **Approve**: Human review sets status to `approved`.
5. **Consume**: Frontend components filter for `approved` and `public` assets.
