import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SiteIndexView from '../views/SiteIndexView';
import DeepDiveView from '../views/DeepDiveView';

describe('site index process links', () => {
  afterEach(() => vi.unstubAllGlobals());

  it.each([
    ['Release Ladder', 'proc-2'],
    ['Decision Blocks', 'proc-5'],
    ['Architecture & QA', 'proc-6'],
    ['LLM Governance', 'proc-3'],
    ['Revision Trail', 'proc-2'],
    ['Supporting Artifacts', 'proc-6'],
  ])('opens %s at the existing %s section', async (label, sectionId) => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      window.setTimeout(() => callback(0), 0),
    );
    vi.stubGlobal('cancelAnimationFrame', (id: number) => window.clearTimeout(id));

    const router = createMemoryRouter(
      [
        { path: '/site-index', element: <SiteIndexView /> },
        { path: '/deep-dives', element: <DeepDiveView /> },
      ],
      { initialEntries: ['/site-index'] },
    );
    render(<RouterProvider router={router} />);
    const link = screen.getByRole('heading', { name: label }).closest('a');
    expect(link).not.toBeNull();
    await userEvent.setup().click(link!);

    await waitFor(() => {
      expect(
        `${router.state.location.pathname}${router.state.location.search}${router.state.location.hash}`,
      ).toBe(`/deep-dives?tab=process#${sectionId}`);
      expect(document.getElementById(sectionId)).toBeInTheDocument();
      expect(scrollIntoView).toHaveBeenCalled();
    });
  });
});
