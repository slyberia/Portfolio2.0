# HPS Geospatial System Deep Dive

- **Canonical route:** [/deep-dives?tab=hps-geospatial](/deep-dives?tab=hps-geospatial)
- **Project entry:** [/projects/hps-geospatial](/projects/hps-geospatial)
- **System:** A GIS design portal connecting country-aware river data, poster production, provenance, georeferencing, and coverage auditing.
- **Strongest evidence:** 33/33 browser matrix; 266 backend tests passed with 3 skipped; 26 country entries audited.
- **Boundary:** The retained end-to-end evidence is local and synthetic. Full live-database and publication deployment behavior is not established.

## Architecture

Country profiles drive river-name artifacts while preserving Guyana compatibility. Offline OSM and Nominatim inputs feed content-addressed artifacts with explicit verified, partial, unavailable, and not-evaluated states. A five-minute, single-use IndexedDB handoff moves Studio PNG exports into Georeferencer. Server manifests supply provenance; bounded uploads, worker isolation, and timeouts constrain processing failures. PostGIS remains authoritative while publish-time artifacts and manifests support delivery.

## Workflow

The retained workflow is PNG export → single-use handoff → provenance verification → Recovery → map inspection → GeoTIFF. Expired, missing, consumed, malformed, and unavailable transfers remain separate states, and manual upload remains available as a fallback.

## Artifacts

- Belize river-name evaluation: 178 matched reaches, 5 ambiguous reaches, 7 of 8 target systems passed, and Rio Hondo unverified.
- Country closeout: 26 entries — 5 verified, 10 partial, 10 unavailable, and 1 retained legacy Guyana result.
- Packaging: 22 JSON artifacts and 4 documented withheld entries, including hashes and byte sizes.
- Publication architecture: dissolved, cell, and clipped-cell GeoJSON artifacts; SHA-256 metadata; manifests; storage; cache headers; session caching; and a dynamic API fallback. Deployment was not fully verified in the retained evidence.

## Benchmarks

- Reliability phase: 17 browser regressions resolved; 98 browser tests passed with 2 skipped; 228 backend tests passed with 3 skipped; TypeScript, ESLint, and production build passed.
- Studio-to-Georeferencer phase: 33/33 browser matrix and 266 backend tests passed with 3 skipped.
- Guyana Recovery: 9 of 9 supported transforms accepted; unsupported perspective rejected; accepted-case p95 error approximately 0.742 uploaded-image pixels.

## Limitations

- End-to-end validation was local and synthetic, not production or live-database proof.
- The retained Guyana report contains no wrong-source case.
- Belize and Jamaica lack comparable current-format numeric Recovery reports.
- R interoperability, complete PMTiles support, and full production/staging validation remain incomplete or unverified.
