// Single source of truth for résumé content. Both the screen résumé page
// (ResumeView) and the print/PDF template (ResumePrintTemplate) consume this, so the
// downloadable PDF and the on-site résumé never drift apart.
//
// This version merges Kyle's two provided résumé variants — the GIS/physical-data
// slant and the AI/SaaS-implementation slant — into one document, and carries the
// embedded portfolio links from those source files. Links are stored as absolute
// URLs so they stay clickable inside the generated PDF, not just on-site.

export interface ResumeLink {
  label: string;
  url: string;
}

export interface ResumeEntry {
  title: string;
  /** Right-aligned meta line, e.g. "Remote | 2021–Present". */
  meta?: string;
  /** Pipe-separated descriptor line under the title. */
  tagline?: string;
  linksLabel?: string;
  links?: ResumeLink[];
  bullets: string[];
}

export interface ResumeSection {
  heading: string;
  entries: ResumeEntry[];
}

export interface ResumeSkillCategory {
  label: string;
  items: string;
}

export interface ResumeEducation {
  degree: string;
  school: string;
  detail: string;
}

export interface ResumeContent {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  phone: string;
  email: string;
  headerLinks: ResumeLink[];
  summary: string;
  coreCapabilities: string;
  sections: ResumeSection[];
  skills: ResumeSkillCategory[];
  education: ResumeEducation;
  certifications: string[];
}

const PORTFOLIO_URL = 'https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app';

export const RESUME_CONTENT: ResumeContent = {
  name: 'Kyle Semple',
  title: 'Forward Deployed Engineer | Technical Systems Translator',
  subtitle: 'Full-Stack Geospatial & Data Systems | AI Workflows | Operational Reliability',
  location: 'Ann Arbor, MI',
  phone: '734-882-9095',
  email: 'kmsemple26@gmail.com',
  headerLinks: [
    { label: 'Portfolio', url: `${PORTFOLIO_URL}/` },
    { label: 'GitHub', url: 'https://github.com/slyberia' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kyle-semple-522537165/' },
  ],
  summary:
    'Implementation-oriented engineer who translates ambiguous client and operational ' +
    'requirements into working software, validated data workflows, and supportable handoffs. ' +
    'Builds across frontend, backend, spatial data, QA, and deployment controls, with experience ' +
    'carrying messy physical-world data from source review through usable systems.',
  coreCapabilities:
    'Forward-deployed delivery | Full-stack implementation | Geospatial data engineering | ' +
    'Reliability and validation | Client translation | Technical documentation',
  sections: [
    {
      heading: 'Selected Systems',
      entries: [
        {
          title: 'HPS Geospatial Platform',
          tagline:
            'React / TypeScript | Python / FastAPI | PostgreSQL / PostGIS | Geospatial production and validation',
          links: [
            {
              label: 'Live',
              url: 'https://hydro-frontend-786228485832.us-central1.run.app/',
            },
            { label: 'Case Study', url: `${PORTFOLIO_URL}/projects/hps-geospatial` },
          ],
          bullets: [
            'Stabilized the core platform by resolving 17 pre-existing browser regressions; the reliability phase passed 98 browser tests, 228 backend tests, TypeScript, ESLint, and the production build.',
            'Delivered a five-minute, single-use Studio-to-Georeferencer handoff with explicit failure states, manual fallback, worker isolation, timeouts, and manifest-backed provenance. The local synthetic PNG-to-Recovery-to-GeoTIFF flow passed a 33/33 browser matrix and 266 backend tests; live production-database behavior was outside the retained evidence.',
            'Generalized country-aware river artifacts beyond Guyana and audited 26 country entries — 5 verified, 10 partial, 10 unavailable, and 1 retained legacy result — with 22 packaged artifacts, 4 documented withheld entries, hashes, and registry/manifest/runtime checks.',
          ],
        },
        {
          title: 'Portfolio 2.0 and Digital Twin AI Agent',
          tagline:
            'React / TypeScript | Gemini proxy | CI and governance | Runtime failure handling',
          links: [
            { label: 'Live', url: `${PORTFOLIO_URL}/` },
            { label: 'Build Case Study', url: `${PORTFOLIO_URL}/projects/portfolio-pipeline` },
            { label: 'Agent Case Study', url: `${PORTFOLIO_URL}/projects/digital-twin` },
            { label: 'GitHub', url: 'https://github.com/slyberia/Portfolio2.0' },
          ],
          bullets: [
            'Built and maintained a public engineering evidence system across 400+ commits with CI gates, route validation, secret scanning, ADRs, threat modeling, AI attribution records, and implementation documentation.',
            'Implemented a scoped assistant behind a server-side Gemini proxy with prompt-injection filtering, approved command routing, request and input limits, history controls, and human handoff; later added distinct handling for rejected origins, missing configuration, oversized input, and backend outages plus deployment-safe Docker and Cloud Build configuration.',
          ],
        },
        {
          title: 'Guynode Spatial Data Hub',
          tagline:
            'Spatial data migration | Static web artifacts | Dataset governance | Citation and provenance',
          links: [
            {
              label: 'Live',
              url: 'https://guynode-spatial-data-hub-786228485832.us-central1.run.app/',
            },
            { label: 'Case Study', url: `${PORTFOLIO_URL}/projects/guynode` },
          ],
          bullets: [
            'Delivered the client-approved replacement for a legacy spatial hub by converting 34 ESRI Shapefiles into web-optimized GeoJSON and reorganizing 85 datasets across 7 categories with validation, checksums, hosted-asset governance, map previews, and citation/provenance tooling.',
          ],
        },
      ],
    },
    {
      heading: 'Professional Experience',
      entries: [
        {
          title: 'HPS Geospatial Consulting LLC — Independent Systems Consultant',
          meta: 'Remote | Oct 2021–Present',
          tagline: 'Client-facing GIS, AI workflow, and technical implementation',
          bullets: [
            'Translate unclear requirements, data limitations, and user needs into spatial workflows, implementation documentation, and handoff-ready systems; supported MOH GIS delivery through ArcGIS Online, Survey123, Dashboards, Experience Builder, troubleshooting, and stakeholder guidance.',
          ],
        },
        {
          title: 'GIS Data Analyst — Tech Providers Inc. · Consumers Energy, Gas Distribution',
          meta: 'Remote | Mar 2024–Dec 2024',
          bullets: [
            'Reconciled gas-distribution records across ArcMap, SAP, work-order systems, MicroStation drawings, and utility source materials; applied repeatable QA checks and escalated ambiguous cases before production GIS corrections.',
          ],
        },
        {
          title:
            'Quality Control Specialist / GIS Data Operations Analyst — Apex Systems · CenterPoint Energy, Electric Distribution',
          meta: 'Remote | Sept 2022–Dec 2023',
          bullets: [
            'Maintained production-quality accuracy across 120+ weekly electric-utility service requests through source-record review, repeatable QA checks, discrepancy resolution, and escalation before final ArcMap edits.',
          ],
        },
      ],
    },
  ],
  skills: [
    {
      label: 'Applications',
      items: 'React, TypeScript, Python, FastAPI, Pydantic, REST APIs, Node/Express, Vite',
    },
    {
      label: 'Data and geospatial',
      items:
        'PostgreSQL, PostGIS, SQL, ArcGIS, GDAL/ogr2ogr, GeoJSON, GeoTIFF, GeoParquet, Leaflet, IndexedDB',
    },
    {
      label: 'Delivery and reliability',
      items:
        'Docker, Cloud Run, Supabase, GitHub Actions, browser/backend testing, manifests, SHA-256 provenance, fault handling',
    },
  ],
  education: {
    degree: 'B.A., Geography',
    school: "Queen's University",
    detail: 'Kingston, Ontario | Sept 2016–Apr 2021',
  },
  certifications: ['Google Project Management Professional Certificate', 'Google Data Analytics'],
};
