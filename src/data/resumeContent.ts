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
  location: string;
  phone: string;
  email: string;
  headerLinks: ResumeLink[];
  summary: string;
  sections: ResumeSection[];
  skills: ResumeSkillCategory[];
  education: ResumeEducation;
  certifications: string[];
}

const PORTFOLIO_URL = 'https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app';

export const RESUME_CONTENT: ResumeContent = {
  name: 'Kyle Semple',
  title:
    'Forward Deployed Engineer | AI Implementation & Technical Operations | GIS / Data Systems',
  location: 'Washtenaw County, MI',
  phone: '734-882-9095',
  email: 'kmsemple26@gmail.com',
  headerLinks: [
    { label: 'Portfolio', url: `${PORTFOLIO_URL}/` },
    { label: 'GitHub', url: 'https://github.com/slyberia' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kyle-semple-522537165/' },
  ],
  summary:
    'Forward Deployed / implementation-oriented systems builder who turns messy operational ' +
    'and physical-world data into production-ready tools. Combines customer-facing technical ' +
    'support, project-based consulting, GIS/data operations, and AI-assisted development to ' +
    'translate client ambiguity into technical workflows, supportable AI tools, spatial apps, ' +
    'QA models, documentation, and handoff-ready systems.',
  sections: [
    {
      heading: 'Client & Systems Delivery Experience',
      entries: [
        {
          title: 'HPS Geospatial — Independent Systems Consultant',
          meta: 'Remote | 2021–Present',
          tagline:
            'Concurrent / project-based consulting | Client-facing spatial systems | Technical implementation',
          linksLabel: 'Selected recent work',
          links: [
            {
              label: 'Guynode Spatial Data Hub — Live Build',
              url: 'https://guynode-spatial-data-hub-786228485832.us-central1.run.app/',
            },
            { label: 'Guynode Case Study', url: `${PORTFOLIO_URL}/projects/guynode` },
            { label: 'MOH GIS Support', url: `${PORTFOLIO_URL}/projects/moh` },
          ],
          bullets: [
            'Avoided paid Google Maps API / map-server dependency by engineering a Python/GDAL/ogr2ogr pipeline that batch-converted 34 legacy ESRI Shapefiles into static, web-optimized GeoJSON assets for 32 Leaflet map previews.',
            'Built the client-approved replacement for the legacy Guynode spatial data hub, completing dataset migration for adoption and reorganizing 85 datasets across 7 categories with Zod validation, SHA-256 checksums, and hosted asset governance across 106 URLs.',
            'Built a dynamic client-side citation engine generating APA, Chicago, BibTeX, and MLA citations across 85 spatial datasets, paired with provenance metadata, caveats, and legal-use warnings for sensitive records.',
            'Supported transition from the legacy site through 17 spatial route migrations, stakeholder-facing documentation, implementation notes, and handoff materials for dataset limitations, citation behavior, map previews, and workflow changes.',
            'Supported MOH GIS workflows using ArcGIS Online, Survey123, Dashboards, Experience Builder, stakeholder documentation, workflow guidance, and implementation support.',
          ],
        },
      ],
    },
    {
      heading: 'AI Implementation & Product Systems',
      entries: [
        {
          title: 'Portfolio 2.0 — Governed AI Build Pipeline',
          tagline:
            'Personal engineering proof system | React / TypeScript / Gemini / Claude Code / CI / documentation',
          links: [
            { label: 'Case Study', url: `${PORTFOLIO_URL}/projects/portfolio-pipeline` },
            { label: 'GitHub', url: 'https://github.com/slyberia/Portfolio2.0' },
            { label: 'Live Portfolio', url: `${PORTFOLIO_URL}/` },
          ],
          bullets: [
            'Built and maintained a public React/TypeScript portfolio system with 400+ commits, 149 merged PRs, 153 test cases, 9 CI validation gates, 20 crawler-validated routes, and 8 case studies.',
            'Implemented release controls and auditability through CI gates, crawler validation, secret scanning, ADRs, AI attribution records, threat modeling, phase packets, command logs, and implementation notes.',
          ],
        },
        {
          title: 'Digital Twin AI Agent',
          tagline:
            'Scoped AI assistant | Gemini proxy | prompt guardrails | implementation safety | human handoff',
          links: [{ label: 'Case Study', url: `${PORTFOLIO_URL}/projects/digital-twin` }],
          bullets: [
            'Built a scoped AI portfolio assistant using server-side Gemini proxying, prompt-injection filtering, approved command routing, request limits, history trimming, and human-handoff logic for cases where user needs exceed safe automated guidance.',
            'Implemented guardrails including 25 requests/IP/day, 800-character message limits, 8-message history caps, 10 injection-pattern checks, 16 expensive-prompt filters, and 11 approved navigation commands.',
            'Designed the assistant around implementation safety: constrained user actions to approved routes, escalated unsupported requests toward human contact, and documented behavior so the system could support users without pretending to replace a real operator.',
          ],
        },
      ],
    },
    {
      heading: 'Operations, QA & Technical Support Experience',
      entries: [
        {
          title: 'GIS Data Analyst — Tech Providers Inc. · Consumers Energy, Gas Distribution',
          meta: 'Remote | Mar 2024–Dec 2024',
          bullets: [
            'Kept gas distribution records production-safe by reconciling ArcMap edits across SAP, internal backlog/work-order tools, unclear diagrams, missing-information cases, and utility source materials.',
            'Improved repeatability of gas GIS corrections by applying consistent QA checks to gas lines, gas meters, building footprints, and related attributes before production updates.',
          ],
        },
        {
          title:
            'Quality Control Specialist / GIS Data Operations Analyst — Apex Systems · CenterPoint Energy, Electric Distribution',
          meta: 'Remote | Sept 2022–Dec 2023',
          bullets: [
            'Maintained production-quality accuracy across 120+ weekly electric utility service requests by applying repeatable QA checks, resolving conflicting source records, and escalating ambiguous cases before final GIS edits.',
            'Improved handling of incomplete electric distribution records by standardizing how unclear diagrams, internal database results, land-use/source references, and teammate guidance were evaluated before line/pole placement.',
          ],
        },
        {
          title: 'Related Artifact: Ops Triage — Utility Workflow Decision Model',
          tagline:
            'Interactive model of backlog pressure, QA risk, escalation rules, and human-review thresholds',
          links: [{ label: 'Case Study', url: `${PORTFOLIO_URL}/projects/ops-triage` }],
          bullets: [
            'Modeled how utility GIS teams balance throughput and validation when resolving incomplete work orders, unclear diagrams, conflicting source records, and production-safe corrections.',
          ],
        },
      ],
    },
    {
      heading: 'Earlier Customer-Facing Technical Support',
      entries: [
        {
          title: 'Printful — Technical Customer Support Representative',
          meta: 'Remote | Sept 2021–Dec 2021',
          bullets: [
            'Triaged 100+ weekly support interactions across chat/email, separating user confusion, order-state issues, fulfillment constraints, account problems, and integration questions while managing 3–5 concurrent Zendesk chats.',
          ],
        },
      ],
    },
  ],
  skills: [
    {
      label: 'AI / Web Engineering',
      items:
        'React, TypeScript, Vite, Tailwind, Node/Express, Gemini API, Claude Code, Cursor, server-side AI proxies, prompt guardrails, Docker, GitHub Actions, CI validation, Cloud Run, Cloudflare Pages',
    },
    {
      label: 'GIS / Physical-World Data',
      items:
        'ArcMap, SAP, utility work orders, electric/gas distribution GIS, QA/QC workflows, shapefiles, GeoJSON, Leaflet, GDAL/ogr2ogr, spatial metadata, provenance/citation workflows',
    },
    {
      label: 'Implementation / Technical Operations',
      items:
        'Customer-facing technical support, client ambiguity translation, workflow triage, stakeholder documentation, issue escalation, missing-data investigation, support handoff, Zendesk, Notion, Jira, Asana',
    },
    {
      label: 'Data / Tools',
      items:
        'Bentley MicroStation source interpretation, internal work-order/backlog systems, Google Workspace, Microsoft Office, Tableau, Power BI, BigQuery basics',
    },
  ],
  education: {
    degree: 'B.A., Geography',
    school: "Queen's University",
    detail: 'Kingston, Ontario',
  },
  certifications: [
    'Google Project Management',
    'Google Data Analytics',
    'Google AI Essentials',
    'Google Digital Marketing & E-commerce',
    'IBM AI-Enabled Apps for Customer Service',
  ],
};
