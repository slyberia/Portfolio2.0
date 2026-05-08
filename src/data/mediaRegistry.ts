import { MediaAsset } from '../types';

/**
 * MEDIA REGISTRY - PHASE 5.0
 * This is the central repository for all visual assets in the portfolio.
 * 
 * Naming Convention: [projectId]-[surface]-[viewport]-[variant].[ext]
 */
export const MEDIA_REGISTRY: MediaAsset[] = [
  /* 
  // Template Entry:
  {
    id: 'portfolio-v2-home-desktop-v1',
    projectId: 'portfolio-v2',
    roleLanes: ['AI Workflow / Portfolio Governance'],
    mediaType: 'screenshot',
    src: '/media/portfolio-v2/portfolio-v2-home-desktop-v1.webp',
    alt: 'Portfolio 2.0 Landing Page',
    caption: 'The central hub of the unified portfolio system.',
    relatedEvidenceIds: [],
    maturityStatus: 'shipped',
    visibility: 'public',
    captureStatus: 'pending-capture',
    viewport: 'desktop',
    capturedBy: 'agent'
  }
  */
];

/**
 * Helper to get media by project
 */
export const getMediaByProject = (projectId: string) => 
  MEDIA_REGISTRY.filter(m => m.projectId === projectId && m.visibility === 'public');

/**
 * Helper to get media by evidence block
 */
export const getMediaForEvidence = (evidenceId: string) =>
  MEDIA_REGISTRY.filter(m => m.relatedEvidenceIds.includes(evidenceId) && m.visibility === 'public');

/**
 * Helper to get media by role lane
 */
export const getMediaByRole = (role: string) =>
  MEDIA_REGISTRY.filter(m => m.roleLanes.includes(role as any) && m.visibility === 'public');
