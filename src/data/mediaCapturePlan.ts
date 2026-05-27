import { RecruiterRoleLane } from '../types';

export interface CaptureTarget {
  id: string;
  projectId: string;
  route: string;
  selector?: string;
  viewport: 'desktop' | 'tablet' | 'mobile';
  roleLanes: RecruiterRoleLane[];
  description: string;
  priority: 'critical' | 'high' | 'medium';
}

/**
 * MASTER CAPTURE PLAN - PHASE 5.1
 * This is the source of truth for the automated screenshot agent.
 */
export const MEDIA_CAPTURE_PLAN: CaptureTarget[] = [
  // --- CORE SURFACES ---
  {
    id: 'core-home-hero',
    projectId: 'portfolio-v2',
    route: '/',
    viewport: 'desktop',
    roleLanes: ['AI Workflow / Portfolio Governance'],
    description: 'Main landing page hero and branding.',
    priority: 'critical',
  },
  {
    id: 'core-site-index',
    projectId: 'portfolio-v2',
    route: '/site-index',
    viewport: 'desktop',
    roleLanes: ['Solutions Architect'],
    description: 'System-wide inventory and connectivity proof.',
    priority: 'high',
  },

  // --- ROLE TRACKS ---
  {
    id: 'track-impl-overview',
    projectId: 'portfolio-v2',
    route: '/tracks/forward-deployed',
    viewport: 'desktop',
    roleLanes: ['Forward Deployed Engineer'],
    description: 'Implementation track evidence rendering.',
    priority: 'critical',
  },
  {
    id: 'track-ops-overview',
    projectId: 'portfolio-v2',
    route: '/tracks/solutions-architect',
    viewport: 'desktop',
    roleLanes: ['Solutions Architect'],
    description: 'Ops & Analytics track evidence rendering.',
    priority: 'critical',
  },
  {
    id: 'track-gis-overview',
    projectId: 'portfolio-v2',
    route: '/tracks/spatial-systems',
    viewport: 'desktop',
    roleLanes: ['Spatial Systems Architect'],
    description: 'GIS track evidence rendering.',
    priority: 'critical',
  },

  // --- PROJECTS ---
  {
    id: 'project-index',
    projectId: 'portfolio-v2',
    route: '/projects',
    viewport: 'desktop',
    roleLanes: ['AI Workflow / Portfolio Governance'],
    description: 'Project catalog surface.',
    priority: 'high',
  },
  {
    id: 'project-codex-detail',
    projectId: 'codex-technical-tide',
    route: '/projects/codex-technical-tide',
    viewport: 'desktop',
    roleLanes: ['Forward Deployed Engineer', 'AI Workflow / Portfolio Governance'],
    description: 'Deep dive into the Codex project architecture.',
    priority: 'high',
  },
  {
    id: 'project-spatial-intel-detail',
    projectId: 'spatial-intel-ops',
    route: '/projects/spatial-intel-ops',
    viewport: 'desktop',
    roleLanes: ['Spatial Systems Architect'],
    description: 'Spatial Intelligence project detail.',
    priority: 'high',
  },

  // --- MOBILE RESPONSIVENESS PROOF ---
  {
    id: 'core-home-mobile',
    projectId: 'portfolio-v2',
    route: '/',
    viewport: 'mobile',
    roleLanes: ['Forward Deployed Engineer'],
    description: 'Mobile responsiveness of the landing page.',
    priority: 'medium',
  },
];
