import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const crawlerDir = resolve(distDir, 'crawler');
const siteUrl = (
  process.env.SITE_URL || 'https://kyle-semple-ai-solutions-portfolio-341805100474.us-east1.run.app'
).replace(/\/$/, '');

const sharedLinks = `<nav aria-label="Related routes"><ul><li><a href="/">Home</a></li><li><a href="/projects">Projects</a></li><li><a href="/resume">Resume</a></li><li><a href="/site-index">Site Index</a></li><li><a href="/ai-index">AI Index</a></li><li><a href="/llms.txt">llms.txt</a></li></ul></nav>`;

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

// Deep-dive tab indexing model (Track E0.5):
//   - `/deep-dives`                     = landing / overview (canonical indexed URL)
//   - `/deep-dives?tab=<id>`            = content tab (canonical indexed URL, SPA reads ?tab=)
// The canonical/indexed URL keeps the `?tab=` query form. The static crawler MIRROR, however,
// is written to a path-safe nested folder (e.g. `/crawler/deep-dives/process`) because the
// static file server (`express.static`) resolves by path and cannot disambiguate query strings.
// Only the on-disk mirror nests the tab id; the indexed URL stays query-param. Future deep-dive
// tabs (e.g. `hps-geospatial`, `moh`, `guynode`) should be added to the `routes` list below with the same
// `/deep-dives?tab=<id>` form once their tabs exist at runtime.
const mirrorPathForRoute = (route) => {
  const [routePath, query] = route.split('?');
  if (!query) return routePath;
  const tab = new URLSearchParams(query).get('tab');
  return tab ? `${routePath}/${tab}` : routePath;
};

const routes = [
  [
    '/',
    'Kyle Semple — Forward Deployed Engineer · Technical Systems Translator',
    'Kyle Semple is a Forward Deployed Engineer · Technical Systems Translator who turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use.',
    'Kyle Semple — Forward Deployed Engineer · Technical Systems Translator',
    'Portfolio of Kyle Semple, a Forward Deployed Engineer · Technical Systems Translator. He turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use — work that connects implementation, GIS/spatial systems, operations, AI workflow governance, and stakeholder-facing systems. Customer success appears as an evidence layer, not a title.',
    ['/projects', '/projects/hps-geospatial', '/projects/guynode', '/deep-dives'],
    '/markdown/home.md',
  ],
  [
    '/tracks/forward-deployed',
    'Role Lens: Forward-Deployed Engineering',
    'Forward-deployed engineering lens on Kyle Semple’s work: implementation delivery, system integration, release reliability, and turning requirements into systems people adopt.',
    'Forward-Deployed Engineering (Role Lens)',
    'A role-relevance lens, not a separate identity: evidence of implementation planning, scoped execution, reliability controls, and delivering systems users actually adopt.',
    ['/projects/guynode', '/projects/ops-triage', '/deep-dives'],
    '/markdown/tracks/forward-deployed.md',
  ],
  [
    '/tracks/solutions-architect',
    'Role Lens: Implementation Consultant',
    'Implementation Consultant lens: validation, issue triage, launch-readiness review, and QA-backed reliability that de-risk adoption and keep delivered systems trustworthy.',
    'Implementation Consultant (Role Lens)',
    'A role-relevance lens on Kyle’s work: validation discipline, triage frameworks, failure planning, and QA-backed reliability behind the systems he ships.',
    ['/projects/ops-triage', '/projects/digital-twin', '/deep-dives'],
    '/markdown/tracks/solutions-architect.md',
  ],
  [
    '/tracks/spatial-systems',
    'Role Lens: GIS / Spatial Systems',
    'GIS and spatial-systems lens: spatial data operations, metadata governance, and map-enabled delivery in Kyle Semple’s work.',
    'GIS / Spatial Systems (Role Lens)',
    'A role-relevance lens: spatial data operations, dataset governance, metadata integrity, and map-based access — proven primarily through Guynode.',
    ['/projects/guynode', '/projects/luxe-lofts', '/deep-dives'],
    '/markdown/tracks/spatial-systems.md',
  ],
  [
    '/apply/forward-deployed',
    'Start Path: Forward-Deployed Engineering',
    'Recruiter start path with curated proof for forward-deployed engineering and technical implementation roles.',
    'Forward-Deployed Proof Bundle',
    'A curated subset of flagship implementation and operations evidence assembled for hiring teams evaluating forward-deployed engineering fit.',
    ['/tracks/forward-deployed', '/projects/guynode', '/projects/ops-triage'],
  ],
  [
    '/apply/solutions-architect',
    'Start Path: Implementation Consultant',
    'Recruiter start path with curated proof for implementation-consultant work: validation, launch-readiness review, and QA-backed reliability.',
    'Implementation Consulting Proof Bundle',
    'A curated subset of validation, triage, and reliability evidence assembled for hiring teams.',
    ['/tracks/solutions-architect', '/projects/ops-triage', '/projects/digital-twin'],
  ],
  [
    '/apply/spatial-systems',
    'Start Path: GIS / Spatial Systems',
    'Recruiter start path with curated proof for GIS and spatial-systems roles.',
    'GIS / Spatial Systems Proof Bundle',
    'A curated subset of spatial data hub and workflow evidence assembled for hiring teams.',
    ['/tracks/spatial-systems', '/projects/guynode', '/projects/luxe-lofts'],
  ],
  [
    '/projects',
    'Projects — Kyle Semple Portfolio',
    'Project evidence from Kyle Semple, a Forward Deployed Engineer · Technical Systems Translator: HPS Geospatial, Guynode, Digital Twin, and supporting implementation work.',
    'Project Portfolio',
    'Project index led by the HPS GIS design platform: spatial artifacts, poster workflow, georeferencing, validation, and explicit coverage limits. Guynode is a separate public spatial data hub.',
    [
      '/projects/hps-geospatial',
      '/projects/guynode',
      '/projects/digital-twin',
      '/projects/ops-triage',
    ],
    '/markdown/index.md',
  ],
  [
    '/projects/hps-geospatial',
    'HPS Geospatial Platform — GIS Design and Validation',
    'HPS GIS design portal case study: country-aware artifacts, Studio-to-Georeferencer workflow, provenance, Recovery, and coverage audit. End-to-end validation was local and synthetic.',
    'HPS Geospatial Platform',
    'Flagship HPS case study with 17 browser regressions resolved, a locally validated 33/33 browser workflow matrix, and a 26-entry country coverage audit. Publication deployment and live-database behavior remain separately unverified.',
    ['/projects/guynode', '/projects', '/tracks/spatial-systems'],
    '/markdown/projects/hps-geospatial.md',
  ],
  [
    '/projects/guynode',
    'Guynode — Spatial Data Hub',
    'Featured GIS system: dataset governance, metadata integrity, and public spatial data access.',
    'Guynode (Spatial Data Hub)',
    'Featured project: a governed spatial data hub that makes a fragmented dataset publicly navigable, with metadata-driven architecture and map-based access.',
    ['/tracks/spatial-systems', '/tracks/forward-deployed', '/deep-dives'],
    '/markdown/projects/guynode.md',
  ],
  [
    '/projects/digital-twin',
    'Digital Twin — AI Implementation',
    'A scoped AI assistant with operational guardrails and human-in-the-loop handoff — an AI workflow built to be safe, useful, and adoptable.',
    'Digital Twin (AI Implementation)',
    'Featured AI implementation: a scoped, guardrailed portfolio assistant with relevance and cost controls plus human handoff — AI workflow design people can trust.',
    ['/tracks/solutions-architect', '/projects/ops-triage', '/deep-dives'],
    '/markdown/projects/digital-twin.md',
  ],
  [
    '/projects/ops-triage',
    'Ops Triage — Operations & QA Workflow',
    'High-volume operations triage: escalation logic, throughput management, and QA audit trails that keep a queue predictable.',
    'Ops Triage',
    'Operations workflow turning a reactive backlog into a predictable pipeline — explicit escalation criteria, throughput discipline, and reviewable audit trails.',
    ['/tracks/solutions-architect', '/tracks/forward-deployed', '/deep-dives'],
  ],
  [
    '/projects/project-aegis',
    'Automation & Operational Protocols — Aegis & emOS',
    'A decoupled AI-automation system — Aegis governance plus emOS execution over a Notion state machine — that evolved from human-in-the-loop review toward autonomous operation.',
    'Automation & Operational Protocols',
    'Case study in AI workflow governance: a Notion database as a headless state machine links containerized emOS runners to an Aegis validation layer, with the Guardian seat run first by a human, then automated.',
    ['/projects/digital-twin', '/projects/ops-triage', '/deep-dives'],
  ],
  [
    '/projects/portfolio-pipeline',
    'Portfolio 2.0 — Governed AI Build Pipeline',
    'The governed build process behind this site: scoped work batches, CI and crawler guards, attribution, plus post-launch chatbot failure handling and deployment configuration fixes. Live outcomes of individual fixes are not established here.',
    'Governed AI Build Pipeline',
    'Case study in AI build governance: human design authority plus a multi-LLM toolchain behind a CI gate (lint/types/tests/build/secret-scan), semantic drift guards, and an attribution ledger.',
    ['/projects/project-aegis', '/deep-dives'],
  ],
  [
    '/projects/luxe-lofts',
    'Luxe Lofts — Digital Restructuring',
    'Audit-driven restructuring of a venue’s digital ecosystem into a conversion-oriented system the owner can run and customers can navigate.',
    'Luxe Lofts',
    'Case study translating audit findings into one conversion journey — pricing, policies, and spatial proof made legible for owner and customer alike.',
    ['/tracks/forward-deployed', '/projects/guynode'],
  ],
  [
    '/projects/northern-grind',
    'Northern Grind — Business Systems Redesign',
    'A small-business systems proposal connecting brand, menu experience, AI-assisted assets, and modeled POS and loyalty economics.',
    'Northern Grind',
    'Proposal and modeled economics for a café operating system; implementation and measured business outcomes are not claimed.',
    ['/deep-dives?tab=northern-grind', '/projects'],
  ],
  [
    '/projects/moh',
    'Public Health GIS Workflow Support',
    'Sanitized GIS workflow planning and implementation support for a public-health contact-tracing effort.',
    'Public Health GIS Workflow Support',
    'Advisory GIS workflow translation, dashboard planning, UI review, documentation, and tool-fit guidance; not sole ownership of the full system.',
    ['/deep-dives?tab=moh', '/projects'],
  ],
  [
    '/gallery',
    'Evidence Library — Kyle Semple Portfolio',
    'Visual project artifacts and design evidence with context about their use and provenance.',
    'Evidence Library',
    'A visual library of portfolio artifacts with links back to the relevant systems, case studies, and process explanations.',
    ['/projects', '/deep-dives'],
  ],
  [
    '/deep-dives',
    'Deep Dives — Process, Governance & Strategy',
    'Overview of the portfolio deep dives: HPS geospatial production and validation, automation and governance, and supporting systems strategy.',
    'Portfolio Deep Dives',
    'Index of the long-form deep dives — HPS geospatial production and validation, automation and governance architecture, Luxe Lofts restructuring, Northern Grind business systems, public health GIS workflow support, and Guynode spatial data governance. Each opens as a tab under /deep-dives.',
    [
      '/deep-dives?tab=hps-geospatial',
      '/deep-dives?tab=process',
      '/deep-dives?tab=luxe-lofts',
      '/deep-dives?tab=northern-grind',
      '/deep-dives?tab=moh',
      '/deep-dives?tab=guynode',
    ],
    '/markdown/process.md',
  ],
  [
    '/deep-dives?tab=hps-geospatial',
    'Deep Dive: HPS Geospatial Production & Validation',
    'Architecture, operator workflow, artifact lineage, Recovery benchmarks, and explicit evidence boundaries for the HPS GIS design portal.',
    'HPS Geospatial Production & Validation System',
    'Deep dive into the HPS GIS design portal as a connected geospatial production and validation system: country-aware source processing, Studio-to-Georeferencer transfer, provenance, Recovery, GeoTIFF output, publication artifacts, and a formal coverage audit. End-to-end evidence is local and synthetic; full production behavior is not claimed.',
    ['/projects/hps-geospatial', '/deep-dives', '/tracks/spatial-systems'],
    '/markdown/deep-dives/hps-geospatial.md',
  ],
  [
    '/deep-dives?tab=process',
    'Deep Dive: Automation & Governance Architecture',
    'How AI-assisted work is governed across the build pipeline and the Aegis/emOS operations layer — explicit rulesets, judge-vs-executor separation, CI gates, and an audit trail.',
    'Automation & Governance Architecture',
    'Umbrella deep dive unifying the governed AI build pipeline (Portfolio 2.0) with the Aegis governance layer and the emOS execution engine — AI treated as an untrusted worker behind an explicit gate, across the human-in-the-loop to autonomous spectrum.',
    ['/projects/portfolio-pipeline', '/projects/project-aegis', '/deep-dives'],
    '/markdown/process.md',
  ],
  [
    '/deep-dives?tab=luxe-lofts',
    'Deep Dive: Luxe Lofts Digital Restructuring Strategy',
    'The long-form restructuring strategy behind Luxe Lofts — audit findings translated into one conversion-oriented system the owner can run and customers can navigate.',
    'Luxe Lofts Digital Restructuring Strategy',
    'Deep dive into the audit-driven restructuring of a venue’s digital ecosystem: pricing, policies, and spatial proof made legible as a single conversion journey for owner and customer alike.',
    ['/projects/luxe-lofts', '/deep-dives', '/projects/guynode'],
  ],
  [
    '/deep-dives?tab=northern-grind',
    'Deep Dive: Northern Grind Business Systems',
    'The long-form modeling behind Northern Grind — a café rebrand reframed as one operating system across brand, menu UX, AI-assisted assets, and break-even POS/loyalty economics.',
    'Northern Grind Business Systems',
    'Deep dive into Northern Grind as a small-business systems redesign: brand identity, a Canva-assembled menu treated as a customer decision interface, an AI-assisted asset pipeline under human curation, and modeled POS/loyalty/channel economics — framed honestly as a proposal.',
    ['/projects/northern-grind', '/deep-dives'],
  ],
  [
    '/deep-dives?tab=moh',
    'Deep Dive: Public Health GIS Workflow Support',
    'The reasoning behind a national Ministry of Health contact-tracing engagement — workflow translation across intake, GIS layers, dashboards, and reporting, tool-fit evaluation, and adoption support. Sanitized; no country named, no metrics.',
    'Public Health GIS Workflow Support',
    'Sanitized, advisory-framed deep dive into a national Ministry of Health contact-tracing GIS engagement: translating intake → GIS layers → dashboards → reporting into a legible workflow, evaluating tool fit (including a deliberate low-code pivot), and supporting adoption through plain-language documentation — framed as workflow support, not sole full-system ownership.',
    ['/projects/moh', '/deep-dives'],
  ],
  [
    '/deep-dives?tab=guynode',
    'Deep Dive: Guynode Spatial Data Hub',
    'The GIS data-governance reasoning behind Guynode — turning fragmented legacy spatial data into a governed registry with complete metadata, in-browser previews, preview-vs-download logic, and a repeatable readiness review.',
    'Guynode Spatial Data Hub',
    'Deep dive into Guynode as spatial systems architecture and public data governance: a type-safe dataset registry, metadata completeness as a design property across registered datasets, an in-browser preview-vs-download model, and a repeatable launch-readiness review — discoverability, trust, and legibility designed in. Usage, adoption, and speed are framed as intended design effects, not measured claims.',
    ['/projects/guynode', '/deep-dives'],
  ],
  [
    '/resume',
    'Kyle Semple — Resume Summary',
    'Forward Deployed Engineer · Technical Systems Translator turning complex technical, operational, and spatial problems into adopted systems — implementation, GIS, operations, and AI workflow evidence.',
    'Resume Summary',
    'Kyle Semple, Forward Deployed Engineer · Technical Systems Translator: turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use. Customer success appears as an evidence layer, not a title.',
    ['/projects/guynode', '/projects/digital-twin', '/deep-dives'],
    '/markdown/resume.md',
  ],
  [
    '/site-index',
    'Portfolio Site Index',
    'Route-level site index for crawler and no-JS navigation across Kyle Semple’s portfolio.',
    'Site Index',
    'Human-readable index for navigating projects, role-relevance lenses, deep dives, and resume across Kyle Semple’s Forward Deployed Engineer · Technical Systems Translator portfolio.',
    ['/ai-index', '/projects', '/deep-dives'],
    '/markdown/index.md',
  ],
  [
    '/ai-index',
    'Portfolio AI Index',
    'Machine-oriented route index for Kyle Semple’s portfolio: flagship projects, role-relevance lenses, and evidence links.',
    'AI Index',
    'AI-readable route index for Kyle Semple, Forward Deployed Engineer · Technical Systems Translator — structured discovery of flagship systems, role-relevance lenses, and supporting evidence.',
    ['/site-index', '/projects/hps-geospatial', '/projects/guynode'],
    '/markdown/index.md',
  ],
];

for (const [route, title, desc, heading, summary, links, md] of routes) {
  const canonical = `${siteUrl}${route}`;
  const mirrorRoute = mirrorPathForRoute(route);
  const crawlerMirrorRoute = mirrorRoute === '/' ? '/crawler/' : `/crawler${mirrorRoute}`;
  const routeLinks = links.map((href) => `<li><a href="${href}">${href}</a></li>`).join('');
  const mdLink = md ? `<p>Markdown mirror: <a href="${md}">${md}</a></p>` : '';
  const routeJsonLd = jsonLd({
    '@context': 'https://schema.org',
    '@type': route.startsWith('/projects/') ? 'CreativeWork' : 'CollectionPage',
    name: heading,
    description: summary,
    url: canonical,
  });
  const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${title}</title><meta name="description" content="${desc}" /><meta property="og:title" content="${title}" /><meta property="og:description" content="${desc}" /><meta property="og:url" content="${canonical}" /><meta property="og:type" content="website" /><meta property="og:image" content="${siteUrl}/og-image.svg" /><link rel="canonical" href="${canonical}" /><link rel="alternate" href="/llms.txt" /><link rel="bookmark" href="/ai-index" /></head><body><main><p><strong>Static crawler mirror</strong> for <a href="${route}">${route}</a>. Canonical user route: <a href="${route}">${route}</a>. Mirror route: <a href="${crawlerMirrorRoute}">${crawlerMirrorRoute}</a>.</p><h1>${heading}</h1><p>${summary}</p><section><h2>Related internal routes</h2><ul>${routeLinks}</ul></section>${mdLink}${sharedLinks}</main>${routeJsonLd}</body></html>`;
  const outPath =
    mirrorRoute === '/'
      ? resolve(crawlerDir, 'index.html')
      : resolve(crawlerDir, mirrorRoute.slice(1), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');
}

console.log(`Generated ${routes.length} crawler HTML snapshots in dist/crawler/.`);
