import { PROJECT_METADATA, getProjectMetadata } from '../data/projectMetadata';

export const SITE_BASE_URL = 'https://kyle-semple-portfolio-786228485832.us-central1.run.app';

type JsonLd = Record<string, unknown>;

export type RouteSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  markdownPath?: string;
  jsonLd: JsonLd[];
};

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kyle Semple',
  url: `${SITE_BASE_URL}/`,
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kyle Semple Portfolio',
  url: `${SITE_BASE_URL}/`,
};

const profilePage = (path: string, name: string, desc: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name,
  description: desc,
  url: `${SITE_BASE_URL}${path}`,
  about: { '@type': 'Person', name: 'Kyle Semple' },
});

const trackCollection = (path: string, name: string, roleTrack: string): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  url: `${SITE_BASE_URL}${path}`,
  about: { '@type': 'DefinedTerm', name: roleTrack, inDefinedTermSet: 'Role Tracks' },
});

const sharedProjectJsonLd = PROJECT_METADATA.filter(
  (project) => (project.visibility ?? 'public') === 'public',
).map((project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.displayTitle,
  url: `${SITE_BASE_URL}${project.href}`,
  description: project.shortSummary,
  creator: { '@type': 'Person', name: 'Kyle Semple' },
}));

export const getSeoForPath = (pathname: string): RouteSeo => {
  const defaults: RouteSeo = {
    title: 'Kyle Semple — Forward Deployed Engineer',
    description:
      'Kyle Semple is a Forward Deployed Engineer who turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use — across technical implementation, customer success (as evidence), GIS/spatial systems, operations triage, and AI workflow design.',
    canonicalPath: pathname,
    jsonLd: [],
  };

  const staticRoutes: Record<string, RouteSeo> = {
    '/': {
      ...defaults,
      canonicalPath: '/',
      markdownPath: '/markdown/home.md',
      jsonLd: [person, website, profilePage('/', 'Kyle Semple Portfolio', defaults.description)],
    },
    '/tracks/forward-deployed': {
      title: 'Track: Forward Deployed Engineer',
      description:
        'Role track focused on implementation delivery, system integration, release reliability, and structured project execution.',
      canonicalPath: '/tracks/forward-deployed',
      markdownPath: '/markdown/tracks/forward-deployed.md',
      jsonLd: [
        trackCollection(
          '/tracks/forward-deployed',
          'Forward Deployed Engineer Track',
          'Forward Deployed Engineer',
        ),
      ],
    },
    '/tracks/solutions-architect': {
      title: 'Track: Implementation Consultant',
      description:
        'Role lens focused on implementation validation, launch-readiness review, operations triage, and decision-ready reporting that de-risks customer adoption.',
      canonicalPath: '/tracks/solutions-architect',
      markdownPath: '/markdown/tracks/solutions-architect.md',
      jsonLd: [
        trackCollection(
          '/tracks/solutions-architect',
          'Implementation Consultant Track',
          'Implementation Consultant',
        ),
      ],
    },
    '/tracks/spatial-systems': {
      title: 'Track: Spatial Systems Architect',
      description:
        'Role track for GIS analysis, spatial data operations, and map-enabled system delivery in production-style workflows.',
      canonicalPath: '/tracks/spatial-systems',
      markdownPath: '/markdown/tracks/spatial-systems.md',
      jsonLd: [
        trackCollection(
          '/tracks/spatial-systems',
          'Spatial Systems Architect Track',
          'Spatial Systems Architect',
        ),
      ],
    },
    '/projects': {
      title: 'Projects Portfolio Index',
      description:
        'Index of flagship and supporting projects including Guynode, Digital Twin, Ops Triage, and additional implementation evidence.',
      canonicalPath: '/projects',
      markdownPath: '/markdown/index.md',
      jsonLd: sharedProjectJsonLd,
    },
    '/deep-dives': {
      title: 'Deep Dives | Portfolio 3.0',
      description:
        'A comprehensive look at the process, governance, and strategy behind Portfolio 3.0.',
      canonicalPath: '/deep-dives',
      markdownPath: '/markdown/process.md',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'Deep Dives',
          url: `${SITE_BASE_URL}/deep-dives`,
        },
      ],
    },
    '/site-index': {
      title: 'Portfolio Site Index',
      description:
        'Route-level site index for crawler and no-JS navigation across primary portfolio sections and supporting resources.',
      canonicalPath: '/site-index',
      markdownPath: '/markdown/index.md',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Portfolio Site Index',
          url: `${SITE_BASE_URL}/site-index`,
        },
      ],
    },
    '/resume': {
      title: 'Kyle Semple Resume Summary',
      description:
        'Resume summary for Kyle Semple, Forward Deployed Engineer: turning complex technical, operational, and spatial problems into adopted systems, with implementation, GIS, operations, and AI workflow evidence.',
      canonicalPath: '/resume',
      markdownPath: '/markdown/resume.md',
      jsonLd: [
        person,
        profilePage(
          '/resume',
          'Resume Summary',
          'Forward Deployed Engineer turning complex technical, operational, and spatial problems into adopted systems.',
        ),
      ],
    },
    '/ai-index': {
      title: 'Portfolio AI Index',
      description:
        'Machine-oriented route index summarizing role tracks, flagship projects, and evidence links for automated readers.',
      canonicalPath: '/ai-index',
      markdownPath: '/markdown/index.md',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Portfolio AI Index',
          url: `${SITE_BASE_URL}/ai-index`,
        },
      ],
    },
  };

  if (staticRoutes[pathname]) return staticRoutes[pathname];
  if (pathname.startsWith('/projects/')) {
    const projectId = pathname.split('/')[2] ?? '';
    const project = getProjectMetadata(projectId);
    if (project) {
      const extra: JsonLd[] = [];
      if (project.id === 'digital-twin' || project.id === 'guynode') {
        extra.push({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: project.displayTitle,
          applicationCategory: 'BusinessApplication',
          url: `${SITE_BASE_URL}${project.href}`,
        });
      }
      if (project.id === 'guynode') {
        extra.push({
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: 'Guynode spatial dataset catalog',
          description:
            'Public-facing catalog model for spatial dataset discovery metadata and downloads.',
          creator: { '@type': 'Person', name: 'Kyle Semple' },
          isBasedOn: 'Legacy geospatial data listings reorganized into a structured catalog model.',
        });
      }
      return {
        title: `${project.displayTitle} — Portfolio Project`,
        description: project.shortSummary,
        canonicalPath: project.href,
        markdownPath: `/markdown/projects/${project.id}.md`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.displayTitle,
            url: `${SITE_BASE_URL}${project.href}`,
            description: project.shortSummary,
          },
          ...extra,
        ],
      };
    }
  }
  return defaults;
};
