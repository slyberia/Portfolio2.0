# HPS Geospatial Platform

HPS Geospatial is a GIS design portal for creating and inspecting map-based outputs. My work connected country-specific river data, poster production, and georeferencing so operators could check coverage, source provenance, and Recovery results. The retained end-to-end validation covers local synthetic integration, not live production-database behavior.

> **Project Overview**
>
> **Role:** Geospatial system implementation, reliability, workflow validation, and closeout auditing
>
> **Status:** Completed components; locally validated end-to-end workflow; publication implementation not fully deployment-verified; further hardening ongoing
>
> **Technologies:** PostGIS, GeoJSON, GeoTIFF, GeoParquet, IndexedDB, Supabase Storage, Cloud Run, Secret Manager, TypeScript
>
> **Portal:** [HPS GIS design portal](https://hydro-frontend-786228485832.us-central1.run.app/) (Cloud Run). A portal link does not establish live-database or end-to-end production validation.

## At a glance

**Problem.** The HPS GIS design portal needed a reliable path from country-specific river data and Studio poster exports to inspectable, geographically recovered outputs. Existing browser regressions and ambiguous coverage states made that path harder to trust.

**My work.** I resolved 17 pre-existing browser regressions; generalized country-aware river-name artifacts; implemented the Studio-to-Georeferencer transfer, validation, and provenance workflow; and produced a formal georeferencing closeout audit. I also implemented related publish-time artifacts and operational delivery wiring.

**Outcome → evidence → boundary.** The PNG export → handoff → provenance verification → Recovery → GeoTIFF flow passed a **33/33 browser matrix** and **266 backend tests (3 skipped)**. This was **local, synthetic integration evidence**. It does not establish live production-database behavior or complete publication deployment.

**Scope.** This is one connected story about the HPS GIS design portal and its poster production and validation workflows. Guynode, the spatial data hub elsewhere in this portfolio, is a separate project. Work on a different HPS Vercel website is outside this case study.

## Stakeholder value

The implemented workflow gives operators a way to inspect country coverage, verify an exported poster's source, and see explicit transfer or processing states before working with a recovered spatial output. The closeout audit identifies which country results are verified, partial, or unavailable. The supplied record does not measure user adoption or time saved.

## Evidence by status

| Work                   | Evidence                                                                                            | Status and boundary                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Browser reliability    | 17 regressions resolved; 98 browser and 228 backend tests passed, with 2 and 3 skipped respectively | Completed reliability phase                               |
| Country artifacts      | Country profiles and QC states; Belize 178 matched reaches and 7/8 target systems                   | Implemented; Belize partial                               |
| Studio → Georeferencer | 33/33 browser matrix; 266 backend tests passed, 3 skipped; PNG → provenance → Recovery → GeoTIFF    | Implemented; locally validated with synthetic integration |
| Country closeout audit | 26 registered entries, 22 packaged JSON artifacts, 4 documented withheld entries                    | Audit completed; coverage mixed                           |
| Publication path       | Artifacts, manifests, storage, caching, API fallback, and cloud wiring                              | Implemented; deployment not fully verified                |
| Further hardening      | CRS metadata, OGC:CRS84, CDN fallback, PMTiles, R interoperability, multi-country benchmarks        | Ongoing or incomplete                                     |

## The problem and my ownership

The work extended beyond placing data on a map. Country-specific source data had to become reviewable artifacts; a Studio image needed a safe route into Georeferencer; the source of that image had to be checked; and a recovered GeoTIFF needed validation with clear limits. The country registry also had to distinguish verified coverage from partial or unavailable results. My work covered browser reliability, country-aware artifact generation, handoff and provenance, Recovery validation, and the closeout audit.

The application had 17 pre-existing browser regressions. Repairing them established a baseline for evaluating the larger workflow; that phase passed 98 browser and 228 backend tests, with 2 and 3 skipped respectively.

## System, decisions, and tradeoffs

Country profiles generalized river-name artifacts beyond Guyana while preserving Guyana compatibility; QC states made partial coverage explicit. A five-minute, single-use handoff carried Studio exports to Georeferencer, with manual upload as a fallback. Server manifests supplied provenance; upload limits, isolated workers, and timeouts bounded failure. A closeout audit compared the country registry, manifests, runtime, hashes, and ETL decisions rather than treating an artifact's existence as proof of verification.

The publication path kept PostGIS authoritative and added publish-time artifacts, manifests, storage, caching, and an API fallback. That architecture was implemented, but the supplied record does not establish complete deployment verification. The detailed states, geometry decisions, artifact types, and benchmark results are available in the **Technical Notes** tab.

## Evidence, limits, and outcome

The strongest retained end-to-end evidence is a **33/33 browser matrix**, **266 backend tests passed (3 skipped)**, and a local PNG → provenance → Recovery → GeoTIFF flow. The audit classified **26 registered country entries**: 5 verified, 10 partial, 10 unavailable, and 1 retained legacy Guyana result. This made coverage gaps inspectable; it did not turn partial countries into verified ones.

The workflow validation was **local and synthetic**, not proof of live production-database behavior. Belize remained partial; Belize and Jamaica lack comparable current-format numeric Recovery reports. Complete PMTiles support, R interoperability, and full production validation remain unproven or ongoing. The delivered outcome is a connected, inspectable production and validation workflow with explicit boundaries, not a claim that every component is deployed and fully validated.

## Technical depth

These optional engineering notes explain a constraint, the choice made, and what the retained evidence can establish.

### Recover the reliability baseline

I resolved the 17 browser regressions. The retained reliability-phase checks recorded **98 browser tests passed (2 skipped)**, **228 backend tests passed (3 skipped)**, plus passing TypeScript, ESLint, and production-build checks. Those numbers belong to this phase; the later 266-test count describes a separate workflow verification point.

### Generalize country-aware river-name artifacts

**Constraint and choice.** River-name results differed by country, so country profiles drove artifact generation beyond Guyana while Guyana compatibility was retained. OSM and Nominatim supplied offline build inputs, not runtime requests. Content-addressed artifacts identify an output by its content hash; lazy loading avoids loading all artifacts at once. QC kept **verified**, **partial**, **unavailable**, and **not evaluated** results separate.

One important modeling decision was to distinguish **source objects** from **display geometry segments**. A display segment was not treated as a separate verified source object.

Belize was the first non-Guyana evaluation. It remained intentionally partial: **178 matched reaches**, **5 ambiguous reaches**, **7 of 8 target systems passed**, and **Rio Hondo unverified**.

### Carry a Studio output into Georeferencer

**Constraint and choice.** An exported PNG needed to cross from Studio to Georeferencer without silently accepting an expired or reused handoff. The **five-minute, single-use IndexedDB handoff** recorded expired, missing, consumed, malformed, and unavailable states; blob-free cleanup tombstones tracked cleanup without retaining the image. Manual upload remained available. Readiness gating, bounded uploads, isolated workers, and timeouts constrained processing failures.

Geographic Inspection tabs and a responsive map supported review. Server manifests supplied provenance: a check of which published source produced the poster. In the retained **local synthetic** flow, a PNG export passed through handoff, provenance verification, Recovery (matching the image to spatial coordinates), and GeoTIFF output.

### Audit coverage and Recovery instead of inferring it

The closeout audit recorded **26 registered country entries**: **5 verified**, **10 partial**, **10 unavailable**, and **1 retained legacy Guyana result**. It packaged **22 JSON artifacts** and documented **4 withheld entries**. It also checked hashes and byte sizes, registry/manifest/runtime consistency, reach counts, ETL decisions, and injected faults.

Guyana supplied the strongest retained numeric Recovery evidence: **9 of 9 supported transforms accepted**, unsupported perspective rejected, and accepted-case p95 error of approximately **0.742 uploaded-image pixels** (95% of accepted errors were at or below that value). The retained report contained no wrong-source case, so it cannot establish rejection of that case. Belize and Jamaica did not have comparable current-format numeric reports.

### Implement a related publication path

PostGIS remained authoritative. The publication architecture added publish-time `dissolved`, `cell`, and `clipped_cell` GeoJSON artifacts, SHA-256 metadata, manifests, Supabase Storage integration, cache headers, sessionStorage caching, and a dynamic API fallback. It also included Secret Manager and Cloud Run wiring and an authenticated workspace portal.

These are implementation claims. Complete deployment verification for this publication work is absent from the supplied evidence.

## What the evidence supports

The work shows a shift from a map-focused application toward an **inspectable geospatial production and validation workflow**. The strongest claim is the locally validated transfer and Recovery path together with the country coverage audit. It would overstate the record to call the entire system fully production-validated, to claim complete PMTiles or R interoperability, or to treat Belize and Jamaica as having the same numeric benchmark coverage as Guyana.

For a **forward-deployed or solutions** review, the most relevant decisions are the cross-application transfer, failure states, fallback, and iterative resolution of regressions. For a **data/platform** review, follow the country profiles, PostGIS authority, artifacts, hashes, manifests, storage, and cache/API paths. For **geospatial engineering**, inspect geometry semantics, country coverage, georeferencing, CRS work, and GeoTIFF validation. For **systems analysis**, focus on explicit state models, auditability, discrepancy handling, and the closeout registry.

Technical evaluators can inspect the architecture and trade-offs tabs on this page; the table above keeps the strongest proof and its limits available on a first read.

## What to inspect by role

| Reader                       | Start with                              | Evidence and boundary                                                                                                |
| ---------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Forward deployed / solutions | Cross-application delivery and fallback | Single-use handoff, failure states, 17 regressions resolved, and 33/33 local browser matrix                          |
| Data / platform              | Artifact lineage and delivery           | PostGIS authority, 22 JSON artifacts, hashes, manifests, storage and caching; deployment verification remains open   |
| Geospatial                   | Coverage, geometry, and Recovery        | Belize partial (178 matches; 7/8 systems); Guyana 9/9 transforms and ~0.742-pixel p95; other numeric reports missing |
| Technical systems / analysis | State modeling and auditability         | 26-entry closeout audit, coverage states, provenance checks, and fault injection                                     |
