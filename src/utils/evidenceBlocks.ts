import type { EvidenceBlock } from '../types';

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

const REQUIRED_EVIDENCE_FIELDS: Array<keyof EvidenceBlock> = [
  'initiativeTitle',
  'context',
  'technicalDetail',
  'businessValue',
];

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
  _sourcePath: string,
): EvidenceBlockParseIssue[] {
  return REQUIRED_EVIDENCE_FIELDS.flatMap((field) =>
    block[field].trim() ? [] : [{ sourcePath: _sourcePath, reason: `Missing ${field}` }],
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
    roleLanes = lanesText.split(',').map(s => s.trim()) as RecruiterRoleLane[];
  }

  // Look for Artifact Chips metadata
  const artifactChipsIndex = contentParagraphs.findIndex((p) => /^Artifact Chips:\s*/i.test(p));
  let artifactChips: string[] | undefined;
  if (artifactChipsIndex >= 0) {
    const chipsText = contentParagraphs[artifactChipsIndex].replace(/^Artifact Chips:\s*/i, '');
    artifactChips = chipsText.split(',').map((s) => s.trim());
  }

  const contextIndex = contentParagraphs.findIndex((paragraph) =>
    /^Initiative Context:\s*/i.test(paragraph),
  );

  const context =
    contextIndex >= 0
      ? contentParagraphs[contextIndex].replace(/^Initiative Context:\s*/i, '').trim()
      : (contentParagraphs[0] ?? '');

  const afterContext = contentParagraphs.filter(
    (_, index) =>
      index !== contextIndex && index !== roleLanesIndex && index !== artifactChipsIndex,
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

  return {
    id,
    initiativeTitle,
    context,
    technicalDetail,
    businessValue,
    roleLanes: roleLanes || [],
    artifactChips: artifactChips || [],
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
