import { CASE_STUDY_REGISTRY } from '../constants';

export const CASE_STUDY_FALLBACK_ID = 'ops-triage';
export const GUYNODE_CASE_STUDY_CANDIDATE_IDS = ['guynode', 'guynode-spatial-data-hub'] as const;

export const HOME_HREF = '/';
export const IMPLEMENTATION_TRACK_HREF = '/tracks/implementation';
export const QA_TRACK_HREF = '/tracks/ops-analytics';
export const GIS_TRACK_HREF = '/tracks/gis';
export const PORTFOLIO_PROCESS_HREF = '/portfolio2/deep-dive';
export const RESUME_HREF = '/resume';

export const buildCaseStudyHref = (id: string) => `/case-studies/${id}`;
export const SUPPORTING_EVIDENCE_DEFAULT_HREF = buildCaseStudyHref(CASE_STUDY_FALLBACK_ID);

const guynodeCaseStudy = CASE_STUDY_REGISTRY.find((study) =>
  GUYNODE_CASE_STUDY_CANDIDATE_IDS.some((candidateId) => candidateId === study.id),
);

// TODO: Replace fallback with dedicated Guynode case study route when the Guynode detail entry is published.
export const GUYNODE_SYSTEM_HREF = buildCaseStudyHref(
  guynodeCaseStudy?.id ?? CASE_STUDY_FALLBACK_ID,
);
