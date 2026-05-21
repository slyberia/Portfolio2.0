import fs from 'fs';
import path from 'path';

/**
 * VALIDATE MEDIA LINKS - PHASE 5.3 (ROBUST VERSION)
 * Cross-checks EvidenceBlock.relatedMediaIds against MEDIA_REGISTRY[].id
 * without importing Vite-dependent code.
 */

const DOCS_DIR = 'docs/executive-summaries';
const MEDIA_REGISTRY_PATH = 'src/data/mediaRegistry.ts';

function parseRegistryIds() {
  const content = fs.readFileSync(MEDIA_REGISTRY_PATH, 'utf-8');
  const idRegex = /id:\s*['"]([^'"]+)['"]/g;
  const ids = [];
  let match;
  while ((match = idRegex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return new Set(ids);
}

function parseEvidenceMediaLinks() {
  const files = fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'));
  const links = [];

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(DOCS_DIR, file), 'utf-8');
    const match = content.match(/Related Media IDs:\s*(.+)/i);
    if (match) {
      const ids = match[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      links.push({ file, ids });
    }
  });

  return links;
}

async function validateMediaLinks() {
  console.log('--- Phase 5.3: Evidence-to-Media Link Validation ---');

  const registryIds = parseRegistryIds();
  const evidenceLinks = parseEvidenceMediaLinks();

  let totalLinks = 0;
  let missingLinks = 0;

  evidenceLinks.forEach(({ file, ids }) => {
    ids.forEach((mediaId) => {
      totalLinks++;
      if (!registryIds.has(mediaId)) {
        console.error(
          `❌ [Missing Reference] File "${file}" references non-existent media ID: "${mediaId}"`,
        );
        missingLinks++;
      }
    });
  });

  console.log('\nSummary:');
  console.log(`- Registry IDs found: ${registryIds.size}`);
  console.log(`- Evidence files with links: ${evidenceLinks.length}`);
  console.log(`- Total links checked: ${totalLinks}`);

  if (missingLinks > 0) {
    console.error(`\nFound ${missingLinks} missing media references.`);
    process.exit(1);
  } else {
    console.log('\n✅ All evidence-to-media links are valid.');
    process.exit(0);
  }
}

validateMediaLinks().catch((err) => {
  console.error('Validation script failed:', err);
  process.exit(1);
});
