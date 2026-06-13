> **Role:** Spatial Systems Architect / Forward Deployed Engineer
> **Outcome:** Rebuilt a fragmented legacy geospatial site into a governed, previewable public data hub — dataset governance, consistent metadata, and in-browser map previews replacing obscure file listings.
> **Stack/Tools:** TypeScript, Leaflet, GeoJSON, metadata-driven registry, Google Cloud Run
> **Relevance:** Spatial systems thinking and implementation discipline — turning scattered legacy data into a trustworthy, public-facing product.

# 🗺️ Guynode Spatial Data Hub — Modernizing Geospatial Access

> **"Spatial data is only as valuable as it is accessible. Guynode transforms fragmented legacy data into a governed, high-fidelity public resource."**

> **Project Overview**
>
> **Status:** Featured System (Redesign Prototype)
> **Role:** Spatial Systems Architect / Forward Deployed Engineer
> **Scope:** Dataset governance, metadata schema, map-based preview, launch readiness
> **Tools:** TypeScript, Leaflet, GeoJSON, metadata-driven registry, Google Cloud Run

### 🗺️ Launch Guynode Environments

Experience the live GIS solutions. Compare the current legacy stable production version with the modern, high-fidelity Redesigned Portal Preview.

- [Launch Live Production Site →](https://guynode.com/)
- [Launch Redesigned Portal Preview →](https://guynode-spatial-data-hub-786228485832.us-central1.run.app/)

---

## 🏗️ The Challenge: Legacy Fragmentation

Geospatial data for the country of Guyana is difficult to locate, and typically scattered across fragmented legacy websites, with inconsistent formatting and metadata. Guynode was created as an answer to this issue, but its UI/UX design was in need of updating, as its visual appearance and inconsistencies diminished its value.

- **Design Decay:** An outdated, inconsistent UI/UX that buried datasets behind visual clutter and undercut the platform's credibility — making the data feel less trustworthy than it actually was.
- **Access Friction:** Obscure download paths and lack of visual previews for non-technical users.
- **Maintenance Debt:** Unstructured storage making it difficult to audit or expand the catalog.

**The Goal:** Overhaul the unified spatial hub by engineering a new iteration that prioritizes **Dataset Governance**, **Metadata Integrity**, and **User-Centric Discovery**.

---

## 🔧 Technical Implementation & Assets

### 1. Architecture: Metadata-Driven Registry

We implemented a **Type-Safe Dataset Registry** using TypeScript, ensuring that every spatial asset follows a strict governance schema. This allows for automated validation of provenance, format, and download availability.

### 2. Implementation: Map-Based Preview Workflow

To bridge the gap between "Raw Data" and "User Comprehension," I integrated a **Leaflet-based Preview Engine**. This allows users to inspect GeoJSON and spatial layers directly in the browser before committing to a download.

---

## 📊 Impact & Results

The overhaul reframes Guynode from a hard-to-navigate file repository into a credible, public-facing data product. That shift is the point: the same datasets become dramatically more usable simply because they can now be found, previewed, and trusted — and a platform that _looks_ as authoritative as its data is one that agencies and users will actually adopt.

**How the business is affected**

- **Restored Credibility:** A coherent, modern interface signals that the underlying catalog is maintained and authoritative. First impressions stop working against the data, lowering the barrier for partner agencies to publish through Guynode rather than their own scattered legacy pages.
- **Audit-Ready IA:** The new Information Architecture supports 100% metadata coverage across all registered datasets, so the catalog can be reviewed, corrected, and expanded without archaeology through unstructured storage.
- **Scalable Operations:** A type-safe registry plus automated route/link validation turns onboarding into a repeatable "Readiness Review" instead of bespoke cleanup — new agencies and datasets can be added without re-engineering the platform each time.

**How it benefits consumers and visitors**

- **Faster Time-to-Data:** Clear categories, consistent descriptions, and visible download paths let a visitor go from landing on the site to the exact dataset they need — without decoding a file system or guessing at obscure links.
- **Trust Before Download:** In-browser map previews and verified provenance let users confirm a layer is the _right_ one, and is correct, _before_ committing it to an analysis — catching mistakes up front instead of after a bad decision is already made.
- **Inclusive of Non-Technical Users:** Visual previews and plain-language metadata open the catalog to planners, researchers, journalists, and citizens — not just GIS specialists — widening who can actually put Guyana's spatial data to work.

---

## 🤝 Customer / Stakeholder Value

**Who it helps:** The agencies that publish Guyana's spatial data, and the analysts and citizens who depend on those datasets being correct.

**What got easier:** Finding, previewing, and trusting a dataset _before_ downloading it — provenance and metadata are verified up front instead of discovered after a bad analysis.

**Why it matters:** Decisions built on geospatial data — infrastructure, environment, social planning — are only as sound as the data's integrity. Governing that integrity at the source protects every downstream decision instead of pushing verification onto each user.

---

## 📂 Key Artifact: The Dataset Governance Schema

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
