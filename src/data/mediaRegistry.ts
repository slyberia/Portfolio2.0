import type { MediaAsset, RecruiterRoleLane } from '../types';

/**
 * MEDIA REGISTRY - PHASE 5.1
 * This is the central repository for all visual assets in the portfolio.
 *
 * Naming Convention: [projectId]-[surface]-[viewport]-[variant].[ext]
 */
export const MEDIA_REGISTRY: MediaAsset[] = [
  // --- CORE SURFACES ---
  {
    id: 'portfolio-v2-home-hero-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['AI Workflow / Portfolio Governance'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-home-hero-desktop-v1.png',
    alt: 'Portfolio 2.0 Landing Page Hero',
    caption: 'Main landing page showcasing the unified portfolio system.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },
  {
    id: 'portfolio-v2-site-index-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['Implementation Consultant'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-site-index-desktop-v1.png',
    alt: 'Site Index and Connectivity Map',
    caption: 'System-wide inventory demonstrating full project connectivity.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },

  // --- ROLE TRACKS ---
  {
    id: 'portfolio-v2-impl-overview-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['Forward Deployed Engineer'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-impl-overview-desktop-v1.png',
    alt: 'Implementation Track Overview',
    caption: 'Curated evidence for implementation and engineering excellence.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },
  {
    id: 'portfolio-v2-ops-overview-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['Implementation Consultant'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-ops-overview-desktop-v1.png',
    alt: 'Ops & Analytics Track Overview',
    caption: 'Metrics and QA focused view of portfolio systems.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },
  {
    id: 'portfolio-v2-gis-overview-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['Spatial Systems Architect'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-gis-overview-desktop-v1.png',
    alt: 'GIS Track Overview',
    caption: 'Spatial intelligence and mapping project integration.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },

  // --- PROJECTS ---
  {
    id: 'portfolio-v2-index-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['AI Workflow / Portfolio Governance'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-index-desktop-v1.png',
    alt: 'Project Catalog Surface',
    caption: 'Full listing of active and archived technical projects.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },
  {
    id: 'codex-technical-tide-codex-detail-desktop-v1',
    projectId: 'codex-technical-tide',
    roleLanes: ['Forward Deployed Engineer', 'AI Workflow / Portfolio Governance'],
    mediaType: 'screenshot',
    src: '/media/codex-technical-tide/screenshots/codex-technical-tide-codex-detail-desktop-v1.png',
    alt: 'Codex Project Architecture Deep Dive',
    caption: 'Detailed view of the Codex technical implementation.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },
  {
    id: 'spatial-intel-ops-spatial-intel-detail-desktop-v1',
    projectId: 'spatial-intel-ops',
    roleLanes: ['Spatial Systems Architect'],
    mediaType: 'screenshot',
    src: '/media/spatial-intel-ops/screenshots/spatial-intel-ops-spatial-intel-detail-desktop-v1.png',
    alt: 'Spatial Intelligence Project Detail',
    caption: 'Mapping and spatial data operations interface.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'desktop',
    capturedBy: 'agent',
  },

  // --- MOBILE ---
  {
    id: 'portfolio-v2-home-mobile-mobile-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['Forward Deployed Engineer'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/screenshots/portfolio-v2-home-mobile-mobile-v1.png',
    alt: 'Mobile Responsive Landing Page',
    caption: 'Demonstration of responsive UI across mobile breakpoints.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'approved',
    viewport: 'mobile',
    capturedBy: 'agent',
  },
];

/**
 * Helper to get public media by project
 */
export const getPublicMediaByProject = (projectId: string) =>
  MEDIA_REGISTRY.filter(
    (m) => m.projectId === projectId && m.visibility === 'public' && m.captureStatus !== 'rejected',
  );

/**
 * Helper to get public media for evidence block
 */
export const getPublicMediaForEvidence = (evidenceId: string) =>
  MEDIA_REGISTRY.filter(
    (m) =>
      m.relatedEvidenceIds.includes(evidenceId) &&
      m.visibility === 'public' &&
      m.captureStatus !== 'rejected',
  );

/**
 * Helper to get public media by role lane
 */
export const getPublicMediaByRole = (role: RecruiterRoleLane) =>
  MEDIA_REGISTRY.filter(
    (m) =>
      m.roleLanes.includes(role) && m.visibility === 'public' && m.captureStatus !== 'rejected',
  );

/**
 * Helper to get all visible media assets
 */
export const getVisibleMediaAssets = () =>
  MEDIA_REGISTRY.filter((m) => m.visibility === 'public' && m.captureStatus !== 'rejected');

/**
 * Helper to get specific media assets by their IDs
 */
export const getMediaByIds = (mediaIds: string[]) => {
  const idSet = new Set(mediaIds);
  return MEDIA_REGISTRY.filter(
    (m) => idSet.has(m.id) && m.visibility === 'public' && m.captureStatus !== 'rejected',
  );
};
