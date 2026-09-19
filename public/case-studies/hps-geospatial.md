# HPS Geospatial Platform

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

## 🤝 Customer / Stakeholder Value

The implemented workflow gives operators a way to inspect country coverage, verify an exported poster's source, and see explicit transfer or processing states before working with a recovered spatial output. The closeout audit identifies which country results are verified, partial, or unavailable. The supplied record does not measure user adoption or time saved.

## The problem and my ownership

The work extended beyond placing data on a map. Country-specific source data had to become reviewable artifacts; a Studio image needed a safe route into Georeferencer; the source of that image had to be checked; and a recovered GeoTIFF needed validation with clear limits. The country registry also had to distinguish verified coverage from partial or unavailable results. My work covered browser reliability, country-aware artifact generation, handoff and provenance, Recovery validation, and the closeout audit.

The application had 17 pre-existing browser regressions. Repairing them established a baseline for evaluating the larger workflow; that phase passed 98 browser and 228 backend tests, with 2 and 3 skipped respectively.

## System, decisions, and tradeoffs

Country profiles generalized river-name artifacts beyond Guyana while preserving Guyana compatibility; QC states made partial coverage explicit. A five-minute, single-use handoff carried Studio exports to Georeferencer, with manual upload as a fallback. Server manifests supplied provenance; upload limits, isolated workers, and timeouts bounded failure. A closeout audit compared the country registry, manifests, runtime, hashes, and ETL decisions rather than treating an artifact's existence as proof of verification.

The publication path kept PostGIS authoritative and added publish-time artifacts, manifests, storage, caching, and an API fallback. That architecture was implemented, but the supplied record does not establish complete deployment verification. The detailed states, geometry decisions, artifact types, and benchmark results are available in the **Technical depth** tab.

## Evidence, limits, and outcome

The strongest retained end-to-end evidence is a **33/33 browser matrix**, **266 backend tests passed (3 skipped)**, and a local PNG → provenance → Recovery → GeoTIFF flow. The audit classified **26 registered country entries**: 5 verified, 10 partial, 10 unavailable, and 1 retained legacy Guyana result. This made coverage gaps inspectable; it did not turn partial countries into verified ones.

The workflow validation was **local and synthetic**, not proof of live production-database behavior. Belize remained partial; Belize and Jamaica lack comparable current-format numeric Recovery reports. Complete PMTiles support, R interoperability, and full production validation remain unproven or ongoing. The delivered outcome is a connected, inspectable production and validation workflow with explicit boundaries, not a claim that every component is deployed and fully validated.

## Read this work through your discipline

| Lens                         | Start with                                                                | Evidence to inspect                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Forward Deployed / Solutions | Operational ambiguity, cross-application delivery, and fallback           | 17 browser regressions resolved; single-use handoff, failure states, and 33/33 local browser matrix                  |
| Data / Platform              | Country profiles, artifact lineage, PostGIS authority, and delivery paths | 22 packaged JSON artifacts, hashes, manifests, storage/caching implementation; deployment verification remains open  |
| Geospatial                   | Geometry semantics, country coverage, and Recovery                        | Belize partial (178 matches; 7/8 systems); Guyana 9/9 transforms and ~0.742-pixel p95; other numeric reports missing |
| Technical Systems / Analysis | State modeling, controls, and discrepancy resolution                      | 26-entry closeout audit; verified/partial/unavailable states, provenance checks, and fault injection                 |

## Technical depth

The following engineering notes are optional. They distinguish implementation decisions from local validation and deployment evidence.

### 1. Recover the reliability baseline

I resolved the 17 browser regressions. The retained reliability-phase checks recorded **98 browser tests passed (2 skipped)**, **228 backend tests passed (3 skipped)**, plus passing TypeScript, ESLint, and production-build checks. Those numbers belong to this phase; the later 266-test count describes a separate workflow verification point.

### 2. Generalize country-aware river-name artifacts

Country profiles drove artifact generation beyond Guyana while Guyana compatibility was retained. OSM and Nominatim were offline build inputs rather than runtime dependencies. Lazy loading and content-addressed artifacts supported delivery; country-aware QC and coverage reports kept **verified**, **partial**, **unavailable**, and **not evaluated** results separate.

One important modeling decision was to distinguish **source objects** from **display geometry segments**. A display segment was not treated as a separate verified source object.

Belize was the first non-Guyana evaluation. It remained intentionally partial: **178 matched reaches**, **5 ambiguous reaches**, **7 of 8 target systems passed**, and **Rio Hondo unverified**.

### 3. Carry a Studio output into Georeferencer

The transfer used a **five-minute, single-use IndexedDB handoff** with blob-free cleanup tombstones. It represented expired, missing, consumed, malformed, and unavailable states, and included a manual-upload fallback. Bootstrap/readiness gating, upload validation and bounded admission, worker isolation, and timeouts addressed failure at the transfer and processing boundaries.

Geographic Inspection tabs and a responsive map supported review. Server manifests supplied the provenance check before Recovery. In the retained local end-to-end flow, a PNG export passed through handoff, provenance verification, Recovery, and GeoTIFF output.

**Decision rationale:** A one-time, expiring transfer makes reuse and expiry visible, while manual upload keeps the workflow usable when handoff fails. Admission limits and timeouts bound processing instead of leaving malformed or oversized inputs to fail unpredictably.

### 4. Audit coverage and Recovery instead of inferring it

The closeout audit recorded **26 registered country entries**: **5 verified**, **10 partial**, **10 unavailable**, and **1 retained legacy Guyana result**. It packaged **22 JSON artifacts** and documented **4 withheld entries**. It also checked hashes and byte sizes, registry/manifest/runtime consistency, reach counts, ETL decisions, and injected faults.

Guyana supplied the strongest retained numeric Recovery evidence: **9 of 9 supported transforms accepted**, unsupported perspective rejected, and accepted-case p95 error of approximately **0.742 uploaded-image pixels**. The retained report contained no wrong-source case. Belize and Jamaica did not have comparable current-format numeric reports.

### 5. Implement a related publication path

PostGIS remained authoritative. The publication architecture added publish-time `dissolved`, `cell`, and `clipped_cell` GeoJSON artifacts, SHA-256 metadata, manifests, Supabase Storage integration, cache headers, sessionStorage caching, and a dynamic API fallback. It also included Secret Manager and Cloud Run wiring and an authenticated workspace portal.

These are implementation claims. Complete deployment verification for this publication work is absent from the supplied evidence.

## Evidence by status

| Work                     | Retained evidence                                                                                                                     | Status and limit                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Browser reliability      | 17 regressions resolved; 98 browser tests passed, 2 skipped; 228 backend tests passed, 3 skipped; type, lint, and build checks passed | Completed reliability phase                                    |
| Country artifacts        | Country profiles, QC states, compatibility, and Belize evaluation with 178 matches and 7/8 target systems passing                     | Implemented system; Belize partial                             |
| Studio → Georeferencer   | 266 backend tests passed, 3 skipped; 33/33 browser matrix; PNG → provenance → Recovery → GeoTIFF                                      | Implemented and locally validated with synthetic integration   |
| Closeout audit           | 26 country entries, 22 packaged JSON artifacts, 4 documented withheld entries, hashes, counts, and fault injection                    | Completed audit; coverage remains mixed                        |
| Recovery benchmark       | Guyana 9/9 supported transforms; unsupported perspective rejected; ~0.742-pixel accepted-case p95                                     | Strong Guyana evidence; Belize/Jamaica numeric reports missing |
| Publication architecture | Artifacts, manifests, storage, caching, fallback, cloud wiring, and portal implementation                                             | Implemented; deployment not fully verified                     |
| Further hardening        | CRS metadata, OGC:CRS84, CDN fallback, PMTiles, R interoperability, and multi-country benchmarks                                      | Ongoing or incomplete                                          |

## What the evidence supports

The work shows a shift from a map-focused application toward an **inspectable geospatial production and validation workflow**. The strongest claim is the locally validated transfer and Recovery path together with the country coverage audit. It would overstate the record to call the entire system fully production-validated, to claim complete PMTiles or R interoperability, or to treat Belize and Jamaica as having the same numeric benchmark coverage as Guyana.

For a **forward-deployed or solutions** review, the most relevant decisions are the cross-application transfer, failure states, fallback, and iterative resolution of regressions. For a **data/platform** review, follow the country profiles, PostGIS authority, artifacts, hashes, manifests, storage, and cache/API paths. For **geospatial engineering**, inspect geometry semantics, country coverage, georeferencing, CRS work, and GeoTIFF validation. For **systems analysis**, focus on explicit state models, auditability, discrepancy handling, and the closeout registry.

Technical evaluators can inspect the architecture and trade-offs tabs on this page; the table above keeps the strongest proof and its limits available on a first read.
