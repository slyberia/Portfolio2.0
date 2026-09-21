import React from 'react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { RecruiterModeProvider } from '../context/RecruiterModeContext';
import ProjectDetailView from '../views/ProjectDetailView';

const markdown = readFileSync(join(process.cwd(), 'public/case-studies/hps-geospatial.md'), 'utf8');

describe('HPS reader paths', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, text: async () => markdown }));
  });

  afterEach(() => vi.unstubAllGlobals());

  it('opens technical notes only when requested and preserves the validation boundary', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(
      [
        {
          path: '/projects/:projectId',
          element: (
            <RecruiterModeProvider>
              <ProjectDetailView />
            </RecruiterModeProvider>
          ),
        },
      ],
      { initialEntries: ['/projects/hps-geospatial'] },
    );
    render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(screen.getByText(/The workflow validation was/)).toBeInTheDocument(),
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('link', { name: /Visit the GIS design portal/ })).toHaveAttribute(
      'href',
      'https://hydro-frontend-786228485832.us-central1.run.app/',
    );
    expect(screen.getByRole('heading', { name: 'Evidence by status' })).toBeInTheDocument();
    for (const link of screen.getAllByRole('link', { name: 'View HPS System Deep Dive' })) {
      expect(link).toHaveAttribute('href', '/deep-dives?tab=hps-geospatial');
    }
    expect(screen.queryByText(/five-minute, single-use IndexedDB handoff/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open technical notes →' }));

    expect(screen.getByRole('tab', { name: 'Technical Notes' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(
      await screen.findByText(/five-minute, single-use IndexedDB handoff/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Belize and Jamaica did not have comparable current-format numeric reports/),
    ).toBeInTheDocument();
  });
});
