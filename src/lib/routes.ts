import { PROJECT_REGISTRY } from '../constants';

export const PROJECT_FALLBACK_ID = 'ops-triage';
// TODO: remove case-study route aliases after all internal references are migrated.
export const CASE_STUDY_FALLBACK_ID = PROJECT_FALLBACK_ID;

export const GUYNODE_PROJECT_CANDIDATE_IDS = ['guynode', 'guynode-spatial-data-hub'] as const;
export const GUYNODE_CASE_STUDY_CANDIDATE_IDS = GUYNODE_PROJECT_CANDIDATE_IDS;

export const HOME_HREF = '/';
export const IMPLEMENTATION_TRACK_HREF = '/tracks/implementation';
export const QA_TRACK_HREF = '/tracks/ops-analytics';
export const GIS_TRACK_HREF = '/tracks/gis';
export const PORTFOLIO_PROCESS_HREF = '/portfolio2/deep-dive';
export const RESUME_HREF = '/resume';
export const SITE_INDEX_HREF = '/site-index';
export const PROJECTS_HREF = '/projects';

export const buildProjectHref = (id: string) => `${PROJECTS_HREF}/${id}`;
export const PROJECTS_DEFAULT_HREF = PROJECTS_HREF;
export const SUPPORTING_PROJECTS_DEFAULT_HREF = PROJECTS_DEFAULT_HREF;

const guynodeProject = PROJECT_REGISTRY.find((project) =>
  GUYNODE_PROJECT_CANDIDATE_IDS.some((candidateId) => candidateId === project.id),
);

export const GUYNODE_SYSTEM_HREF = buildProjectHref(guynodeProject?.id ?? PROJECT_FALLBACK_ID);
export const DIGITAL_TWIN_PROJECT_HREF = buildProjectHref('digital-twin');

// TODO: remove case-study route aliases after all internal references are migrated.
export const buildCaseStudyHref = buildProjectHref;
export const SUPPORTING_EVIDENCE_DEFAULT_HREF = PROJECTS_DEFAULT_HREF;
