import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ProjectDetailView from '../views/ProjectDetailView';
import { RecruiterModeProvider } from '../context/RecruiterModeContext';

// Subphase 6.12: with markdown as the only content source, ProjectDetailView must render a
// graceful empty state (not a blank panel) when a case-study body fails to load.
describe('ProjectDetailView empty state', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, headers: new Headers() }));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows a graceful empty state when the markdown body is unavailable', async () => {
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
      { initialEntries: ['/projects/guynode'] },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByTestId('case-study-empty')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'contact Kyle' })).toBeInTheDocument();
  });
});
