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
    'Kyle Semple Portfolio — Technical Implementation, QA/Ops, GIS',
    'Portfolio overview for Kyle Semple across technical implementation, QA/operations analytics, GIS systems, and AI governance evidence.',
    'Kyle Semple Portfolio',
    'Portfolio overview with route-level evidence for implementation, operations analytics, GIS systems, and AI-governed delivery work.',
    [
      '/tracks/implementation',
      '/tracks/ops-analytics',
      '/tracks/gis',
      '/projects/guynode',
      '/projects/digital-twin',
    ],
    '/markdown/home.md',
  ],
  [
    '/tracks/implementation',
    'Track: Technical Implementation Specialist',
    'Role track focused on implementation delivery, system integration, release reliability, and structured project execution.',
    'Technical Implementation Specialist Track',
    'Evidence of implementation planning, scoped execution, reliability controls, and system-delivery ownership across portfolio projects.',
    ['/projects/guynode', '/projects/project-aegis', '/deep-dives'],
    '/markdown/tracks/implementation.md',
  ],
  [
    '/tracks/ops-analytics',
    'Track: QA and Operations Analytics',
    'Role track focused on quality assurance, operations triage, incident handling, and analytics-backed workflow improvement.',
    'QA and Operations Analytics Track',
    'Evidence of QA systems, triage frameworks, defect reduction practices, and operational decision support workflows.',
    ['/projects/ops-triage', '/projects/nba-systems-qa', '/projects/prompter-hub'],
    '/markdown/tracks/ops-analytics.md',
  ],
  [
    '/tracks/gis',
    'Track: GIS Analyst Systems',
    'Role track for GIS analysis, spatial data operations, and map-enabled system delivery in production-style workflows.',
    'GIS Analyst Track',
    'Evidence of GIS system operations, spatial dataset handling, mapping support patterns, and technical communication of geospatial work.',
    ['/projects/guynode', '/projects/luxe-lofts', '/projects/digital-twin'],
    '/markdown/tracks/gis.md',
  ],
  [
    '/apply/implementation',
    'Start Path: Implementation / CSE',
    'Recruiter start path featuring curated proof bundles for Technical Implementation and Customer Success Engineering roles.',
    'Implementation / CSE Proof Bundle',
    'A curated subset of flagship implementation and operations triage evidence assembled for hiring teams.',
    ['/tracks/implementation', '/projects/guynode', '/projects/project-aegis'],
  ],
  [
    '/apply/ops-analytics',
    'Start Path: Operations / QA',
    'Recruiter start path featuring curated proof bundles for Operations Analytics and Quality Assurance roles.',
    'Operations / QA Proof Bundle',
    'A curated subset of systems QA and triage framework evidence assembled for hiring teams.',
    ['/tracks/ops-analytics', '/projects/ops-triage', '/projects/nba-systems-qa'],
  ],
  [
    '/apply/gis',
    'Start Path: GIS / Spatial Systems',
    'Recruiter start path featuring curated proof bundles for GIS Analyst and Spatial Systems Engineering roles.',
    'GIS / Spatial Systems Proof Bundle',
    'A curated subset of spatial data hub and workflow evidence assembled for hiring teams.',
    ['/tracks/gis', '/projects/guynode', '/projects/luxe-lofts'],
  ],
  [
    '/projects',
    'Projects Portfolio Index',
    'Index of flagship and supporting projects including Guynode, Digital Twin, Ops Triage, and additional implementation evidence.',
    'Project Portfolio',
    'Primary project index covering flagship systems, featured AI implementation work, and supporting operational delivery artifacts.',
    [
      '/projects/guynode',
      '/projects/digital-twin',
      '/projects/ops-triage',
      '/projects/project-aegis',
    ],
    '/markdown/index.md',
  ],
  [
    '/projects/guynode',
    'Guynode — Flagship System',
    'Flagship systems page showing metadata-driven architecture, GIS-oriented data operations, and implementation governance practices.',
    'Guynode (Flagship System)',
    'Flagship project demonstrating structured system architecture, spatial content organization, and implementation governance discipline.',
    ['/tracks/implementation', '/tracks/gis', '/deep-dives'],
    '/markdown/projects/guynode.md',
  ],
  [
    '/projects/digital-twin',
    'Digital Twin — Featured AI Implementation',
    'Featured AI implementation page covering constrained assistant design, workflow support, and production safety boundaries.',
    'Digital Twin (Featured AI Implementation)',
    'Featured AI implementation demonstrating scoped automation, safe prompt-routing boundaries, and measurable workflow support goals.',
    ['/tracks/implementation', '/projects/prompter-hub', '/deep-dives'],
    '/markdown/projects/digital-twin.md',
  ],
  [
    '/projects/ops-triage',
    'Ops Triage Project',
    'Operations triage project emphasizing incident classification, prioritization logic, and response workflow standardization.',
    'Ops Triage',
    'Operational project focused on triage quality, escalation clarity, and repeatable response handling for support reliability.',
    ['/tracks/ops-analytics', '/projects/prompter-hub', '/projects/nba-systems-qa'],
  ],
  [
    '/projects/prompter-hub',
    'Prompter Hub Project',
    'Prompt workflow project focused on reusable prompt governance, quality controls, and operational AI support structure.',
    'Prompter Hub',
    'Project focused on practical prompt governance, reusable patterns, and low-risk AI workflow enablement for teams.',
    ['/tracks/ops-analytics', '/projects/digital-twin', '/deep-dives'],
  ],
  [
    '/projects/project-aegis',
    'Project Aegis',
    'Project Aegis implementation page covering quality controls, system hardening priorities, and delivery governance evidence.',
    'Project Aegis',
    'Implementation-focused project showing hardening strategy, reliability controls, and governance-aware execution patterns.',
    ['/tracks/implementation', '/projects/ops-triage', '/deep-dives'],
  ],
  [
    '/projects/nba-systems-qa',
    'NBA Systems QA Project',
    'QA project summary for NBA systems testing, defect lifecycle management, and release-readiness support practices.',
    'NBA Systems QA',
    'Quality-focused project documenting structured QA workflows, defect management practice, and release confidence support.',
    ['/tracks/ops-analytics', '/projects/ops-triage'],
  ],
  [
    '/projects/luxe-lofts',
    'Luxe Lofts Project',
    'Luxe Lofts case project highlighting GIS-adjacent data handling, system documentation, and implementation outcomes.',
    'Luxe Lofts',
    'Project summary with GIS-adjacent analysis context, technical execution notes, and delivery-oriented outcomes.',
    ['/tracks/gis', '/projects/guynode'],
  ],
  [
    '/deep-dives',
    'Portfolio2.0 Deep Dive — Process and Governance',
    'Deep dive into Portfolio2.0 process, delivery timeline, governance decisions, testing evidence, and AI safety controls.',
    'Portfolio2.0 Deep Dive',
    'Process and governance evidence including architecture decisions, security boundaries, testing discipline, and documented tradeoffs.',
    ['/projects/guynode', '/projects/digital-twin', '/resume'],
    '/markdown/process.md',
  ],
  [
    '/resume',
    'Kyle Semple Resume Summary',
    'Concise resume summary covering implementation, operations QA, GIS capability, and core professional outcomes.',
    'Resume Summary',
    'Concise professional summary: Technical implementation specialist with QA/operations and GIS systems experience, focused on dependable delivery and AI-governed workflows.',
    ['/tracks/implementation', '/tracks/ops-analytics', '/tracks/gis'],
    '/markdown/resume.md',
  ],
  [
    '/site-index',
    'Portfolio Site Index',
    'Route-level site index for crawler and no-JS navigation across primary portfolio sections and supporting resources.',
    'Site Index',
    'Human-readable site index for quick navigation across track pages, project pages, process documentation, and resume.',
    ['/ai-index', '/projects', '/deep-dives'],
    '/markdown/index.md',
  ],
  [
    '/ai-index',
    'Portfolio AI Index',
    'Machine-oriented route index summarizing role tracks, flagship projects, and evidence links for automated readers.',
    'AI Index',
    'AI-readable route index for structured discovery of key role tracks, flagship systems, and supporting project evidence.',
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
