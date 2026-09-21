export type HpsEvidenceStatus =
  | 'Completed'
  | 'Partial'
  | 'Implemented · deployment unverified'
  | 'Ongoing';

export type HpsArchitectureLayer = {
  title: string;
  responsibility: string;
  decision: string;
  evidenceBoundary: string;
};

export type HpsWorkflowStep = {
  step: string;
  systemBehavior: string;
  failureHandling: string;
};

export type HpsArtifactRow = {
  artifact: string;
  purpose: string;
  evidence: string;
  status: HpsEvidenceStatus;
};

export const HPS_ARCHITECTURE_LAYERS: HpsArchitectureLayer[] = [
  {
    title: 'Country configuration and source processing',
    responsibility:
      'Country profiles drive river-name artifact generation while preserving Guyana compatibility.',
    decision:
      'Keep OSM and Nominatim as offline build inputs, distinguish source objects from display geometry segments, and retain explicit QC states.',
    evidenceBoundary:
      'Belize was the first non-Guyana evaluation and remained intentionally partial.',
  },
  {
    title: 'Studio export and controlled handoff',
    responsibility:
      'Move a generated PNG from Studio into Georeferencer without silently reusing stale transfer data.',
    decision:
      'Use a five-minute, single-use IndexedDB handoff, blob-free cleanup tombstones, readiness gating, and manual-upload fallback.',
    evidenceBoundary:
      'The retained end-to-end run was local and synthetic, not live production-database evidence.',
  },
  {
    title: 'Provenance and Recovery',
    responsibility:
      'Verify the poster source, recover geographic coordinates, and produce an inspectable GeoTIFF.',
    decision:
      'Use server manifests for provenance, bounded upload admission, isolated workers, and timeouts around processing.',
    evidenceBoundary:
      'Guyana has current numeric Recovery evidence; Belize and Jamaica do not have comparable reports.',
  },
  {
    title: 'Publication and delivery',
    responsibility:
      'Publish derived spatial products without displacing the authoritative PostGIS data store.',
    decision:
      'Generate versioned artifacts and manifests at publish time, use storage and browser caching, and retain a dynamic API fallback.',
    evidenceBoundary:
      'The architecture was implemented, but complete deployment verification is not present in the supplied record.',
  },
  {
    title: 'Coverage and closeout audit',
    responsibility:
      'Make country readiness, artifact lineage, and withheld results inspectable instead of inferring coverage from file presence.',
    decision:
      'Reconcile registry, manifest, runtime, hashes, byte sizes, reach counts, ETL decisions, and injected faults.',
    evidenceBoundary:
      'The audit records mixed coverage rather than asserting that all countries are verified.',
  },
];

export const HPS_WORKFLOW_STEPS: HpsWorkflowStep[] = [
  {
    step: '1. Export',
    systemBehavior: 'Studio produces the PNG that will be geographically recovered.',
    failureHandling:
      'Bootstrap and readiness gates prevent an unavailable workflow from appearing ready.',
  },
  {
    step: '2. Transfer',
    systemBehavior:
      'A five-minute, single-use IndexedDB record carries the export into Georeferencer.',
    failureHandling:
      'Expired, missing, consumed, malformed, and unavailable transfers remain distinct states; manual upload stays available.',
  },
  {
    step: '3. Verify provenance',
    systemBehavior: 'A server-backed manifest identifies the published source behind the poster.',
    failureHandling:
      'Malformed or unverifiable inputs are surfaced instead of being silently accepted.',
  },
  {
    step: '4. Recover',
    systemBehavior: 'Recovery matches the uploaded image to spatial coordinates.',
    failureHandling:
      'Bounded admission, worker isolation, and timeouts constrain invalid or stalled processing.',
  },
  {
    step: '5. Inspect and export',
    systemBehavior: 'Geographic Inspection supports map review before producing a GeoTIFF.',
    failureHandling:
      'Responsive inspection and explicit result states keep incomplete work visible to the operator.',
  },
];

export const HPS_ARTIFACTS: HpsArtifactRow[] = [
  {
    artifact: 'Country-aware river-name artifacts',
    purpose: 'Carry country configuration, name matches, geometry semantics, QC, and coverage.',
    evidence: 'Belize: 178 matched reaches, 5 ambiguous, 7/8 target systems; Rio Hondo unverified.',
    status: 'Partial',
  },
  {
    artifact: 'Country registry and closeout manifest',
    purpose: 'Record which countries are verified, partial, unavailable, or retained as legacy.',
    evidence: '26 entries: 5 verified, 10 partial, 10 unavailable, and 1 legacy Guyana result.',
    status: 'Completed',
  },
  {
    artifact: 'Packaged JSON artifacts',
    purpose: 'Make retained country outputs addressable and auditable by hash and byte size.',
    evidence: '22 packaged artifacts and 4 documented withheld entries.',
    status: 'Completed',
  },
  {
    artifact: 'GeoTIFF Recovery output',
    purpose:
      'Return an exported poster to a spatially referenced raster for inspection and downstream use.',
    evidence:
      'PNG → provenance → Recovery → GeoTIFF completed in the retained local synthetic flow.',
    status: 'Completed',
  },
  {
    artifact: 'Publish-time GeoJSON products',
    purpose:
      'Deliver dissolved, cell, and clipped-cell outputs while PostGIS remains authoritative.',
    evidence:
      'SHA-256 metadata, manifests, storage, cache headers, session caching, and API fallback implemented.',
    status: 'Implemented · deployment unverified',
  },
  {
    artifact: 'GeoParquet, PMTiles, and interoperability hardening',
    purpose: 'Improve CRS correctness, delivery fallback, and downstream compatibility.',
    evidence:
      'CRS metadata, OGC:CRS84, CDN fallback, R checks, and PMTiles validation were not all completed.',
    status: 'Ongoing',
  },
];

export const HPS_BENCHMARKS = [
  {
    label: 'Reliability baseline',
    value: '17 regressions resolved',
    detail: '98 browser tests passed (2 skipped); 228 backend tests passed (3 skipped).',
    boundary: 'This is the earlier regression-repair phase, not the later workflow matrix.',
  },
  {
    label: 'Workflow verification',
    value: '33/33 browser matrix',
    detail: '266 backend tests passed (3 skipped) around the Studio-to-Georeferencer work.',
    boundary:
      'Local synthetic integration only; live production-database behavior was outside the evidence set.',
  },
  {
    label: 'Guyana Recovery',
    value: '9/9 transforms accepted',
    detail:
      'Unsupported perspective rejected; accepted-case p95 error was approximately 0.742 uploaded-image pixels.',
    boundary: 'No wrong-source case was retained, so rejection of that case is not established.',
  },
  {
    label: 'Country coverage',
    value: '26 registry entries',
    detail: '5 verified, 10 partial, 10 unavailable, and 1 retained legacy Guyana result.',
    boundary: 'Belize and Jamaica lack comparable current-format numeric Recovery reports.',
  },
];

export const HPS_LIMITATIONS = [
  'The end-to-end PNG → provenance → Recovery → GeoTIFF evidence is local and synthetic, not proof of live production-database behavior.',
  'Publication artifacts, storage, caching, Secret Manager, Cloud Run wiring, and the authenticated portal were implemented without complete retained deployment verification.',
  'Belize remained partial; Rio Hondo was unverified. Belize and Jamaica do not have Guyana-equivalent current numeric Recovery reports.',
  'The retained Guyana report contains no wrong-source case.',
  'Actual R interoperability, complete PMTiles support, and full production/staging validation remain incomplete or unverified.',
];
