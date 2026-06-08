import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const crawlerDir = resolve(distDir, 'crawler');
const siteUrl = (
  process.env.SITE_URL || 'https://kyle-semple-portfolio-786228485832.us-central1.run.app'
).replace(/\/$/, '');

const sharedLinks = `<nav aria-label="Related routes"><ul><li><a href="/">Home</a></li><li><a href="/projects">Projects</a></li><li><a href="/resume">Resume</a></li><li><a href="/site-index">Site Index</a></li><li><a href="/ai-index">AI Index</a></li><li><a href="/llms.txt">llms.txt</a></li></ul></nav>`;

const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

const routes = [
  [
    '/',
    'Kyle Semple — Forward Deployed Engineer',
    'Kyle Semple is a Forward Deployed Engineer who turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use.',
    'Kyle Semple — Forward Deployed Engineer',
    'Portfolio of Kyle Semple, a Forward Deployed Engineer. He turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use — work that connects technical implementation, customer success (as an evidence layer), solutions/systems architecture, GIS/spatial systems, operations, and AI workflow design.',
    ['/projects', '/projects/guynode', '/projects/digital-twin', '/deep-dives'],
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
    'Role Lens: Solutions / Systems Architecture',
    'Solutions architecture lens: validation, issue triage, failure planning, and QA-backed reliability that keep delivered systems trustworthy.',
    'Solutions / Systems Architecture (Role Lens)',
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
    'Start Path: Solutions / Systems Architecture',
    'Recruiter start path with curated proof for solutions/systems architecture and QA-backed reliability roles.',
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
    'Project evidence from Kyle Semple, a Forward Deployed Engineer: Guynode, Digital Twin, Ops Triage, Luxe Lofts, and supporting implementation work.',
    'Project Portfolio',
    'Project index showing how Kyle turns complex problems into adopted systems — flagship GIS (Guynode), AI implementation (Digital Twin), operations triage, and customer-facing delivery.',
    ['/projects/guynode', '/projects/digital-twin', '/projects/ops-triage', '/projects/luxe-lofts'],
    '/markdown/index.md',
  ],
  [
    '/projects/guynode',
    'Guynode — Flagship Spatial Data Hub',
    'Flagship GIS system: dataset governance, metadata integrity, and high-fidelity public access — built so spatial data is trustworthy and usable.',
    'Guynode (Flagship Spatial Data Hub)',
    'Flagship project: a governed spatial data hub that makes a fragmented dataset trustworthy and publicly navigable, with metadata-driven architecture and map-based access.',
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
    'The governed, multi-LLM pipeline behind this site: AI-assisted build under a one-subphase protocol, an uncompromising CI gate, drift guards, and a Docker → Cloud Run deploy.',
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
    '/deep-dives',
    'Deep Dives — Process, Governance & Strategy',
    'Process and governance behind the portfolio: multi-LLM delivery, validation discipline, and the Luxe Lofts restructuring strategy.',
    'Portfolio Deep Dives',
    'Process and governance evidence: how an AI-assisted build was scoped, governed, and validated — plus the Luxe Lofts restructuring strategy.',
    ['/projects/guynode', '/projects/digital-twin', '/resume'],
    '/markdown/process.md',
  ],
  [
    '/resume',
    'Kyle Semple — Resume Summary',
    'Forward Deployed Engineer turning complex technical, operational, and spatial problems into adopted systems — implementation, GIS, operations, and AI workflow evidence.',
    'Resume Summary',
    'Kyle Semple, Forward Deployed Engineer: turns complex technical, operational, and spatial problems into systems people can understand, adopt, and use. Customer success appears as an evidence layer, not a title.',
    ['/projects/guynode', '/projects/digital-twin', '/deep-dives'],
    '/markdown/resume.md',
  ],
  [
    '/site-index',
    'Portfolio Site Index',
    'Route-level site index for crawler and no-JS navigation across Kyle Semple’s portfolio.',
    'Site Index',
    'Human-readable index for navigating projects, role-relevance lenses, deep dives, and resume across Kyle Semple’s Forward Deployed Engineer portfolio.',
    ['/ai-index', '/projects', '/deep-dives'],
    '/markdown/index.md',
  ],
  [
    '/ai-index',
    'Portfolio AI Index',
    'Machine-oriented route index for Kyle Semple’s portfolio: flagship projects, role-relevance lenses, and evidence links.',
    'AI Index',
    'AI-readable route index for Kyle Semple, Forward Deployed Engineer — structured discovery of flagship systems, role-relevance lenses, and supporting evidence.',
    ['/site-index', '/projects/guynode', '/projects/digital-twin'],
    '/markdown/index.md',
  ],
];

for (const [route, title, desc, heading, summary, links, md] of routes) {
  const canonical = `${siteUrl}${route}`;
  const crawlerMirrorRoute = route === '/' ? '/crawler/' : `/crawler${route}`;
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
    route === '/'
      ? resolve(crawlerDir, 'index.html')
      : resolve(crawlerDir, route.slice(1), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');
}

console.log(`Generated ${routes.length} crawler HTML snapshots in dist/crawler/.`);
