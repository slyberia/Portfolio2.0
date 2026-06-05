# 🗺️ Guynode Spatial Data Hub — Modernizing Geospatial Access

> **"Spatial data is only as valuable as it is accessible. Guynode transforms fragmented legacy data into a governed, high-fidelity public resource."**

### 🗺️ Launch Guynode Environments

Experience the live GIS solutions. Compare the current legacy stable production version with the modern, high-fidelity Redesigned Spatial Data Hub mockup.

- [Launch Live Production Site →](https://guynode.com/)
- [Launch Redesigned Mockup →](https://guynode-spatial-data-hub-786228485832.us-central1.run.app/)

---

## 🏗️ The Challenge: Legacy Fragmentation

Geospatial data for Guyana was historically siloed across fragmented legacy systems, leading to:

- **Information Decay:** Inconsistent metadata making datasets difficult to verify or trust.
- **Access Friction:** Obscure download paths and lack of visual previews for non-technical users.
- **Maintenance Debt:** Unstructured storage making it difficult to audit or expand the catalog.

**The Goal:** Engineer a unified spatial hub that prioritizes **Dataset Governance**, **Metadata Integrity**, and **User-Centric Discovery**.

---

## 🔧 Technical Implementation & Assets

### 1. Architecture: Metadata-Driven Registry

We implemented a **Type-Safe Dataset Registry** using TypeScript, ensuring that every spatial asset follows a strict governance schema. This allows for automated validation of provenance, format, and download availability.

### 2. Implementation: Map-Based Preview Workflow

To bridge the gap between "Raw Data" and "User Comprehension," I integrated a **Leaflet-based Preview Engine**. This allows users to inspect GeoJSON and spatial layers directly in the browser before committing to a download.

---

## 📊 Impact & Results

- **Audit-Ready IA:** The new Information Architecture supports 100% metadata coverage across all registered datasets.
- **Reduced Friction:** Automated route/link validation ensures zero broken paths for public users.
- **Launch Readiness:** Established a reproducible "Readiness Review" protocol for onboarding new spatial agencies.

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
