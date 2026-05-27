import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoleTrackPage from '../RoleTrackPage';
import { implementationTrackContent } from '../../../data/trackContent';
import { vi, describe, it, expect } from 'vitest';

import { EvidenceBlock } from '../../../types';

// Mock the evidence blocks to control the test environment
vi.mock('../../../utils/evidenceBlocks', () => ({
  executiveEvidenceBlocks: {
    blocks: [
      {
        id: 'proof-1',
        initiativeTitle: 'Proof 1',
        context: 'Context 1',
        technicalDetail: 'Detail 1',
        businessValue: 'Value 1',
        roleLanes: ['Forward Deployed Engineer'],
      },
      {
        id: 'proof-2',
        initiativeTitle: 'Proof 2',
        context: 'Context 2',
        technicalDetail: 'Detail 2',
        businessValue: 'Value 2',
        roleLanes: ['Forward Deployed Engineer'],
      },
      {
        id: 'proof-3',
        initiativeTitle: 'Proof 3',
        context: 'Context 3',
        technicalDetail: 'Detail 3',
        businessValue: 'Value 3',
        roleLanes: ['Forward Deployed Engineer'],
      },
      {
        id: 'proof-4',
        initiativeTitle: 'Proof 4',
        context: 'Context 4',
        technicalDetail: 'Detail 4',
        businessValue: 'Value 4',
        roleLanes: ['Forward Deployed Engineer'],
      },
      {
        id: 'proof-5',
        initiativeTitle: 'Proof 5',
        context: 'Context 5',
        technicalDetail: 'Detail 5',
        businessValue: 'Value 5',
        roleLanes: ['Forward Deployed Engineer'],
      },
    ],
  },
}));

// Mock the mapping utility
vi.mock('../../../utils/mapEvidenceToProofCard', () => ({
  mapEvidenceToProofCard: (block: EvidenceBlock) => ({
    id: block.id,
    title: block.initiativeTitle,
    summary: block.context,
    whyItMatters: block.businessValue,
    artifactChips: ['Tech'],
    href: '#',
  }),
}));

describe('RoleTrackPage', () => {
  it('renders the "Automated Governance Proof" section when evidence exists', () => {
    render(
      <MemoryRouter>
        <RoleTrackPage content={implementationTrackContent} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Automated Governance Proof')).toBeInTheDocument();
  });

  it('initially shows only 4 evidence blocks', () => {
    render(
      <MemoryRouter>
        <RoleTrackPage content={implementationTrackContent} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Proof 1')).toBeInTheDocument();
    expect(screen.getByText('Proof 4')).toBeInTheDocument();
    expect(screen.queryByText('Proof 5')).not.toBeInTheDocument();
  });

  it('expands to show all blocks when "View More" is clicked', () => {
    render(
      <MemoryRouter>
        <RoleTrackPage content={implementationTrackContent} />
      </MemoryRouter>,
    );

    const viewMoreButton = screen.getByText(/View 1 More Proof Blocks/i);
    fireEvent.click(viewMoreButton);

    expect(screen.getByText('Proof 5')).toBeInTheDocument();
    expect(screen.getByText('Show Less')).toBeInTheDocument();
  });

  it('manages focus when expanding', () => {
    render(
      <MemoryRouter>
        <RoleTrackPage content={implementationTrackContent} />
      </MemoryRouter>,
    );

    const viewMoreButton = screen.getByText(/View 1 More Proof Blocks/i);
    fireEvent.click(viewMoreButton);

    // Jules: Robustly verify focus lands on the first link inside the NEW batch container
    const newBatch = screen.getByTestId('evidence-batch-new');
    // The first link should be the one for "Proof 5"
    const firstLinkInNewBatch = within(newBatch).getAllByRole('link')[0];
    expect(firstLinkInNewBatch).toHaveFocus();
    expect(firstLinkInNewBatch).toHaveAttribute('aria-label', expect.stringContaining('Proof 5'));
  });

  it('updates aria-expanded attribute on toggle', () => {
    render(
      <MemoryRouter>
        <RoleTrackPage content={implementationTrackContent} />
      </MemoryRouter>,
    );

    const viewMoreButton = screen.getByRole('button', { name: /View 1 More Proof Blocks/i });
    expect(viewMoreButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(viewMoreButton);
    expect(viewMoreButton).toHaveAttribute('aria-expanded', 'true');
  });
});
