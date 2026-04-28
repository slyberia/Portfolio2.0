import { CASE_STUDY_REGISTRY } from '../constants';

export const CASE_STUDY_FALLBACK_ID = 'ops-triage';
export const GUYNODE_CASE_STUDY_CANDIDATE_IDS = ['guynode', 'guynode-spatial-data-hub'] as const;

export const buildCaseStudyHref = (id: string) => `/case-studies/${id}`;

const guynodeCaseStudy = CASE_STUDY_REGISTRY.find((study) =>
  GUYNODE_CASE_STUDY_CANDIDATE_IDS.some((candidateId) => candidateId === study.id),
);

// TODO: Replace fallback with dedicated Guynode case study route when the Guynode detail entry is published.
export const GUYNODE_SYSTEM_HREF = buildCaseStudyHref(
  guynodeCaseStudy?.id ?? CASE_STUDY_FALLBACK_ID,
);
