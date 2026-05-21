# UX QA and Accessibility Audit Report

**Date:** 2026-05-14
**Phase:** 6.3 - Skim Path & Accessibility QA
**Target Surfaces:** `HomeView.tsx`, `ProjectDetailView.tsx`, `CaseStudyComponents.tsx`

## Overview

This report details the findings and remediations applied during the Subphase 6.3 UX QA audit. The focus was ensuring the portfolio supports a 6-second scanability window ("Skim Path") for recruiters while maintaining robust accessibility standards (ARIA, keyboard navigation).

## 1. Skim Path Audit

### HomeView

- **Hierarchy:** Clear semantic structure utilizing `h1` through `h4`.
- **CTA Placement:** Primary actions ("View Flagship Project", "Download Resume") are heavily weighted visually and positioned above the fold.
- **Scanning Context:** Role track cards use distinct background/accent colors (`tide-aqua`, `tide-blue`, `cyan-600`) and visually separate tracks, allowing recruiters to quickly identify their preferred lens.

### Project Detail

- **Navigation:** The sticky `ProjectSwitcher` enables rapid lateral movement between projects without requiring users to navigate back to the home page.
- **Proof Scannability:** The `MediaProofGrid` and `RigorCard` components provide immediately digestible, outcome-oriented validation of technical claims.

## 2. Accessibility (ARIA) & Keyboard Navigation Fixes

Several critical accessibility refinements were implemented to ensure the portfolio is navigable via keyboard and screen readers.

### Interactive Prototype (`HtmlPreviewCard`)

- **Issue:** The interactive prototype preview relied on an `onClick` handler on a generic `<div>`, making it inaccessible to keyboard users.
- **Remediation:**
  - Added `role="button"` and `tabIndex={0}` to the wrapper `div`.
  - Implemented an `onKeyDown` handler to capture `Enter` and `Space` keys to trigger the `handleLaunch` function.
  - Added an `aria-label` providing context on what the prototype launches.
  - Set `aria-hidden="true"` on the underlying iframe to prevent it from confusing screen readers before it is interacted with.

### Artifact Tabs (`TabsArtifact`)

- **Issue:** Tabs lacked proper ARIA roles for screen readers to interpret them as a tabbed interface.
- **Remediation:**
  - Applied `role="tablist"` and `aria-label="Artifact Views"` to the container.
  - Assigned `role="tab"`, `aria-selected`, `aria-controls`, and `id` attributes to individual tab buttons.
  - Assigned `role="tabpanel"`, `id`, and `aria-labelledby` attributes to the rendered content panel.

### Skill Matrix (`HomeView.tsx`)

- **Issue:** Skill buttons conveyed state changes visually (a checkmark appearing) but lacked robust contextual cues for screen readers beyond `aria-pressed`. Empty `<span>` elements were rendered when inactive.
- **Remediation:**
  - Added an `sr-only` span text ("Active skill:" or "Activate skill:") to clearly announce the intended action to screen readers.
  - Checkmarks are now conditionally rendered entirely, avoiding empty elements in the DOM.

## Conclusion

The portfolio's UX is now highly aligned with the Skim Path objectives. Structural headings allow for rapid information ingestion. The implemented accessibility changes successfully ensure that interactive components, specifically proofs and artifact tabs, can be fully experienced by users relying on keyboard navigation and assistive technologies.
