# Guynode Spatial Data Hub — Modernizing Geospatial Access

> **Links:** [Redesigned Portal Preview →](https://guynode-spatial-data-hub-786228485832.us-central1.run.app/) · [Legacy Production Site →](https://guynode.com/)

> **Project Overview**
>
> **Role:** Spatial Systems Architect / Forward Deployed Engineer
>
> **Status:** Featured System (Redesign Prototype)
>
> **Scope:** Dataset governance, metadata schema, map-based preview, launch readiness
>
> **Tools:** TypeScript, Leaflet, GeoJSON, metadata-driven registry, Google Cloud Run
>
> **Outcome:** Built a redesigned portal prototype with a governed dataset registry, consistent metadata, and in-browser map previews.
>
> **Relevance:** Spatial data governance and public-facing access design, with launch and adoption treated separately from the prototype.

> **System boundary:** The redesigned Cloud Run preview and the legacy site at guynode.com are separate. This is a public data access story, distinct from the HPS GIS design and georeferencing platform.

---

## The Challenge: Legacy Fragmentation

Geospatial data for the country of Guyana is difficult to locate, and typically scattered across fragmented legacy websites, with inconsistent formatting and metadata. Guynode was created as an answer to this issue, but its UI/UX design was in need of updating, as its visual appearance and inconsistencies diminished its value.

- **Design Decay:** An outdated, inconsistent UI/UX that buried datasets behind visual clutter and undercut the platform's credibility — making the data feel less trustworthy than it actually was.
- **Access Friction:** Obscure download paths and lack of visual previews for non-technical users.
- **Maintenance Debt:** Unstructured storage making it difficult to audit or expand the catalog.

**The Goal:** Overhaul the unified spatial hub by engineering a new iteration that prioritizes **Dataset Governance**, **Metadata Integrity**, and **User-Centric Discovery**.

---

## Technical Implementation & Assets

### 1. Architecture: Metadata-Driven Registry

I implemented a **Type-Safe Dataset Registry** using TypeScript. The registry defines a metadata contract for provenance, format, and download availability across registered entries.

### 2. Implementation: Map-Based Preview Workflow

To bridge the gap between "Raw Data" and "User Comprehension," I integrated a **Leaflet-based Preview Engine**. This allows users to inspect GeoJSON and spatial layers directly in the browser before committing to a download.

---

## Impact & Results

The redesigned prototype gives visitors a catalog and map-preview path for inspecting datasets before download. The available evidence establishes the implemented design and registry; it does not measure time-to-data, partner publishing, or public adoption.

**How the business is affected**

- **Catalog structure:** Consistent categories and metadata give a reviewer a place to inspect and correct registered entries.
- **Readiness review:** The type-safe registry and route/link checks support a repeatable review before publishing more data. No agency onboarding result is claimed.

**How it benefits consumers and visitors**

- **Designed to Shorten Time-to-Data:** Clear categories, consistent descriptions, and visible download paths are structured to let a visitor go from landing on the site to the exact dataset they need — without decoding a file system or guessing at obscure links.
- **Inspect Before Download:** In-browser map previews and metadata let visitors check a layer's context before using it. A preview alone cannot establish that the source data is correct.
- **Inclusive of Non-Technical Users:** Visual previews and plain-language metadata open the catalog to planners, researchers, journalists, and citizens — not just GIS specialists — widening who can actually put Guyana's spatial data to work.

---

## 🤝 Customer / Stakeholder Value

**Who it is designed for:** Agencies publishing Guyana's spatial data, and analysts and citizens looking for it.

**What the prototype provides:** Finding and previewing a dataset before download, with metadata visible at the point of selection.

**Why it matters:** Dataset metadata and map previews give users more context for their own checks. The available evidence does not establish downstream decision quality or adoption.

---

## Key Artifact: The Dataset Governance Schema

_The core of the system is the strict metadata contract for every spatial node._

```typescript
interface DatasetNode {
  id: string;
  category: 'Infrastructure' | 'Environment' | 'Social';
  metadata: {
    provenance: string;
    lastUpdated: ISOString;
    format: 'GeoJSON' | 'SHP' | 'KML';
  };
}
```
