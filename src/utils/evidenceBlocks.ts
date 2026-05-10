import type {
  EvidenceBlock,
  RecruiterRoleLane,
  EvidenceType,
  ProofCategory,
  MaturityStatus,
  Visibility,
  EvidencePriority,
} from '../types';

type MarkdownModuleMap = Record<string, string>;

export interface EvidenceBlockParseIssue {
  sourcePath: string;
  reason: string;
}

export interface EvidenceBlockParseResult {
  blocks: EvidenceBlock[];
  issues: EvidenceBlockParseIssue[];
}

const executiveSummaryModules = import.meta.glob<string>('../../docs/executive-summaries/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as MarkdownModuleMap;

const REQUIRED_EVIDENCE_FIELDS = [
  'initiativeTitle',
  'context',
  'technicalDetail',
  'businessValue',
] as const;

type RequiredEvidenceField = (typeof REQUIRED_EVIDENCE_FIELDS)[number];

function stripMarkdownInline(value: string): string {
  return value
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function toParagraphs(markdown: string): string[] {
  return markdown
    .replace(/\r\n/g, '\n')
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => stripMarkdownInline(paragraph.replace(/\n+/g, ' ')))
    .filter(Boolean);
}

function parseInitiativeTitle(markdown: string): string {
  const headingMatch = markdown.replace(/\r\n/g, '\n').match(/^#\s+(.+)$/m);
  return headingMatch ? stripMarkdownInline(headingMatch[1]) : '';
}

function validateEvidenceBlock(
  block: EvidenceBlock,
  sourcePath: string,
): EvidenceBlockParseIssue[] {
  return REQUIRED_EVIDENCE_FIELDS.flatMap((field: RequiredEvidenceField) =>
    block[field].trim() ? [] : [{ sourcePath, reason: `Missing ${field}` }],
  );
}

export function parseEvidenceBlockMarkdown(
  markdown: string,
  _sourcePath = 'inline',
): EvidenceBlock {
  const initiativeTitle = parseInitiativeTitle(markdown);
  const contentParagraphs = toParagraphs(markdown).filter(
    (paragraph) => !paragraph.startsWith('# '),
  );

  // Generate a stable ID from the source path.
  // Throws if path is generic to ensure we have a unique, traceable ID.
  const id = _sourcePath.split('/').pop()?.replace('.md', '');
  if (!id || _sourcePath === 'inline') {
    throw new Error(`EvidenceBlock parser requires a unique source path. Found: ${_sourcePath}`);
  }

  // Look for Role Lanes metadata
  const roleLanesIndex = contentParagraphs.findIndex((p) => /^Role Lanes:\s*/i.test(p));
  let roleLanes: RecruiterRoleLane[] | undefined;

  if (roleLanesIndex >= 0) {
    const lanesText = contentParagraphs[roleLanesIndex].replace(/^Role Lanes:\s*/i, '');
    roleLanes = lanesText.split(',').map((s) => s.trim()) as RecruiterRoleLane[];
  }

  // Look for Artifact Chips metadata
  const artifactChipsIndex = contentParagraphs.findIndex((p) => /^Artifact Chips:\s*/i.test(p));
  let artifactChips: string[] | undefined;
  if (artifactChipsIndex >= 0) {
    const chipsText = contentParagraphs[artifactChipsIndex].replace(/^Artifact Chips:\s*/i, '');
    artifactChips = chipsText.split(',').map((s) => s.trim());
  }

  // Look for Project ID metadata
  const projectIdIndex = contentParagraphs.findIndex((p) => /^Project ID:\s*/i.test(p));
  const projectId =
    projectIdIndex >= 0
      ? contentParagraphs[projectIdIndex].replace(/^Project ID:\s*/i, '').trim()
      : undefined;

  // Look for Evidence Types metadata
  const evidenceTypesIndex = contentParagraphs.findIndex((p) => /^Evidence Types:\s*/i.test(p));
  const evidenceTypes =
    evidenceTypesIndex >= 0
      ? (contentParagraphs[evidenceTypesIndex]
          .replace(/^Evidence Types:\s*/i, '')
          .split(',')
          .map((s) => s.trim()) as EvidenceType[])
      : undefined;

  // Look for Proof Categories metadata
  const proofCategoriesIndex = contentParagraphs.findIndex((p) => /^Proof Categories:\s*/i.test(p));
  const proofCategories =
    proofCategoriesIndex >= 0
      ? (contentParagraphs[proofCategoriesIndex]
          .replace(/^Proof Categories:\s*/i, '')
          .split(',')
          .map((s) => s.trim()) as ProofCategory[])
      : undefined;

  // Look for Maturity Status metadata
  const maturityStatusIndex = contentParagraphs.findIndex((p) => /^Maturity Status:\s*/i.test(p));
  const maturityStatus =
    maturityStatusIndex >= 0
      ? (contentParagraphs[maturityStatusIndex]
          .replace(/^Maturity Status:\s*/i, '')
          .trim() as MaturityStatus)
      : undefined;

  // Look for Visibility metadata
  const visibilityIndex = contentParagraphs.findIndex((p) => /^Visibility:\s*/i.test(p));
  const visibility =
    visibilityIndex >= 0
      ? (contentParagraphs[visibilityIndex].replace(/^Visibility:\s*/i, '').trim() as Visibility)
      : undefined;

  // Look for Priority metadata
  const priorityIndex = contentParagraphs.findIndex((p) => /^Priority:\s*/i.test(p));
  const priority =
    priorityIndex >= 0
      ? (contentParagraphs[priorityIndex].replace(/^Priority:\s*/i, '').trim() as EvidencePriority)
      : undefined;

  const contextIndex = contentParagraphs.findIndex((paragraph) =>
    /^Initiative Context:\s*/i.test(paragraph),
  );

  const context =
    contextIndex >= 0
      ? contentParagraphs[contextIndex].replace(/^Initiative Context:\s*/i, '').trim()
      : (contentParagraphs[0] ?? '');

  const metaIndices = [
    roleLanesIndex,
    artifactChipsIndex,
    projectIdIndex,
    evidenceTypesIndex,
    proofCategoriesIndex,
    maturityStatusIndex,
    visibilityIndex,
    priorityIndex,
  ].filter((i) => i >= 0);

  const afterContext = contentParagraphs.filter(
    (_, index) => index !== contextIndex && !metaIndices.includes(index),
  );

  const businessValueIndex = afterContext.findIndex((paragraph) =>
    /\bbusiness value\b/i.test(paragraph),
  );

  const businessValue =
    businessValueIndex >= 0
      ? afterContext[businessValueIndex]
      : (afterContext[afterContext.length - 1] ?? '');

  const technicalDetail =
    businessValueIndex >= 0
      ? afterContext.filter((_, index) => index !== businessValueIndex).join('\n\n')
      : afterContext.slice(0, -1).join('\n\n');

  // Determine metadata status
  const hasExplicitMeta = roleLanesIndex >= 0 || projectIdIndex >= 0;

  return {
    id,
    initiativeTitle,
    context,
    technicalDetail,
    businessValue,
    roleLanes: roleLanes || [],
    artifactChips: artifactChips || [],
    projectId,
    evidenceTypes,
    proofCategories,
    maturityStatus,
    visibility,
    priority,
    metadataStatus: hasExplicitMeta ? 'explicit' : 'needs-tagging',
  };
}

export function parseEvidenceBlocks(
  markdownModules: MarkdownModuleMap = executiveSummaryModules,
): EvidenceBlockParseResult {
  return Object.entries(markdownModules)
    .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
    .reduce<EvidenceBlockParseResult>(
      (result, [sourcePath, markdown]) => {
        const block = parseEvidenceBlockMarkdown(markdown, sourcePath);
        const issues = validateEvidenceBlock(block, sourcePath);

        return issues.length > 0
          ? { blocks: result.blocks, issues: [...result.issues, ...issues] }
          : { blocks: [...result.blocks, block], issues: result.issues };
      },
      { blocks: [], issues: [] },
    );
}

export const executiveEvidenceBlocks = parseEvidenceBlocks();
