# Recruiter Start Path & Proof Bundle Schema

## 1. Overview

This document defines the static URL structures and evidence mappings for Phase 7 Application Packaging. The goal is to create specialized "Start Paths" that serve as landing pages for recruiters, immediately surfacing the most relevant proof bundles for their specific job requisitions.

## 2. Static URL Structures

To maintain architectural simplicity and avoid complex client-side state filtering (enforcing the Phase 6 FMEA safety constraints), we will implement explicit static routes.

| Target Role           | Recruiter Start Path    | Linked Role Track        |
| :-------------------- | :---------------------- | :----------------------- |
| Implementation / CSE  | `/apply/implementation` | `/tracks/implementation` |
| Operations / QA       | `/apply/ops-analytics`  | `/tracks/ops-analytics`  |
| GIS / Spatial Systems | `/apply/gis`            | `/tracks/gis`            |

## 3. Proof Bundle Mapping

Each Start Path will render a "Proof Bundle"—a statically defined set of evidence curated for that specific hiring profile. These bundles leverage existing data structures in `src/data/trackContent.ts` and `src/data/mediaRegistry.ts`.

### 3.1 Implementation / CSE Bundle

- **Target Persona:** Engineering Managers, Technical Recruiters, CSE Managers.
- **Core Claim:** "Bridging the gap between ambiguous requirements and production-ready workflows."
- **Curated Evidence:**
  - Guynode Spatial Data Hub (Migration & System Launch)
  - Systems at Scale: Triage & QA (Operational Workflows)
  - Project Aegis Protocol (Governance)
  - Luxe Lofts Ecosystem (Implementation Planning)
- **Curated Visual Assets:**
  - `portfolio-v2-impl-overview-desktop-v1`
  - `codex-technical-tide-codex-detail-desktop-v1`

### 3.2 Ops Analytics / QA Bundle

- **Target Persona:** QA Managers, Operations Analysts, Technical Recruiters.
- **Core Claim:** "Driving system reliability through rigorous test design and root-cause analysis."
- **Curated Evidence:**
  - NBA 2K Systems Analysis (Reproducible Testing)
  - Systems at Scale: Triage & QA (Issue Triage)
  - Guynode Spatial Data Hub (Metadata Validation)
- **Curated Visual Assets:**
  - `portfolio-v2-ops-overview-desktop-v1`
  - `portfolio-v2-site-index-desktop-v1`

### 3.3 GIS / Spatial Systems Bundle

- **Target Persona:** GIS Coordinators, Spatial Data Managers, Local Government Recruiters.
- **Core Claim:** "Unlocking the value of spatial data through governed catalogs and robust metadata."
- **Curated Evidence:**
  - Guynode Spatial Data Hub (Flagship System)
  - HPS Geospatial Dashboard (Utility Ops)
  - Systems at Scale (Spatial Workflows)
- **Curated Visual Assets:**
  - `portfolio-v2-gis-overview-desktop-v1`
  - `spatial-intel-ops-spatial-intel-detail-desktop-v1`

## 4. Architectural Constraints (FMEA Enforcement)

- **No Dynamic State Filters:** Do not build a `?role=XYZ` URL router that dynamically hides/shows DOM elements based on complex state. Each `/apply/*` path must be an explicit route definition.
- **Data Re-use:** The bundles must consume the existing `supportingEvidence` arrays from `trackContent.ts` to prevent data duplication or drift. The data source remains a single source of truth.
