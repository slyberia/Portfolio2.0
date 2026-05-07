import { EvidenceBlock } from '../types';
import { ProofBlockCardProps } from '../components/tracks/ProofBlockCard';
import { GOVERNANCE_LOGS_HREF } from '../lib/routes';

/**
 * Maps a single EvidenceBlock (from the parser) into a ProofBlockCardProps object.
 * This ensures strict adherence to the Phase 4B metadata schema.
 */
export function mapEvidenceToProofCard(block: EvidenceBlock): ProofBlockCardProps {
  const chips = [...(block.artifactChips || [])];
  
  // If no explicit chips provided, add a generic fallback to maintain UI standards
  if (chips.length === 0) {
    chips.push('Engineering Proof');
  }

  // Limit to 3 chips for UI cleanliness per design system recipes
  const artifactChips = chips.slice(0, 3);

  return {
    id: block.id,
    title: block.initiativeTitle || 'Untitled Initiative',
    summary: block.context || '',
    whyItMatters: block.businessValue || '',
    artifactChips,
    // Since we don't have a direct URL for these blocks, we point to a general deep-dive
    // or a dedicated governance section.
    href: GOVERNANCE_LOGS_HREF,
  };
}
