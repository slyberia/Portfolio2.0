import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, useParams } from 'react-router-dom';
import { routeDefinitions } from '../router';
import { RecruiterModeProvider } from '../context/RecruiterModeContext';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(window, 'scrollTo', { writable: true, value: vi.fn() });
  if (typeof globalThis.AbortController !== 'undefined') {
    Object.defineProperty(window, 'AbortController', {
      writable: true,
      value: globalThis.AbortController,
    });
    Object.defineProperty(window, 'AbortSignal', {
      writable: true,
      value: globalThis.AbortSignal,
    });
  }
});

vi.mock('../views/HomeView', () => ({
  default: () => <div data-testid="home-view">HomeView</div>,
}));
vi.mock('../views/ProjectDetailView', () => ({
  default: function MockProjectDetailView() {
    const { projectId } = useParams();
    return <div data-testid="project-detail-view">ProjectDetailView:{projectId}</div>;
  },
}));
vi.mock('../views/ResumeView', () => ({
  default: () => <div data-testid="resume-view">ResumeView</div>,
}));
vi.mock('../components/ChatWidget', () => ({ default: () => null }));
vi.mock('../components/ContactModal', () => ({ default: () => null }));
vi.mock('../components/CommandPalette', () => ({ default: () => null }));
vi.mock('../components/Toast', () => ({ default: () => null }));

function renderRoute(path: string) {
  const router = createMemoryRouter(routeDefinitions, { initialEntries: [path] });
  render(
    <RecruiterModeProvider>
      <RouterProvider router={router} />
    </RecruiterModeProvider>,
  );
  return router;
}

describe('routing', () => {
  it('/ renders HomeView', () => {
    renderRoute('/');
    expect(screen.getByTestId('home-view')).toBeInTheDocument();
  });

  it('/projects renders dedicated projects index', async () => {
    const router = renderRoute('/projects');
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects'));
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  });

  it('/projects/guynode renders matching project detail route param', () => {
    renderRoute('/projects/guynode');
    expect(screen.getByTestId('project-detail-view')).toHaveTextContent(
      'ProjectDetailView:guynode',
    );
  });

  it('/projects/digital-twin renders matching project detail route param', () => {
    renderRoute('/projects/digital-twin');
    expect(screen.getByTestId('project-detail-view')).toHaveTextContent(
      'ProjectDetailView:digital-twin',
    );
  });

  it('/projects/ops-triage renders matching project detail route param', () => {
    renderRoute('/projects/ops-triage');
    expect(screen.getByTestId('project-detail-view')).toHaveTextContent(
      'ProjectDetailView:ops-triage',
    );
  });

  it('/projects/nba-systems-qa renders matching project detail route param', () => {
    renderRoute('/projects/nba-systems-qa');
    expect(screen.getByTestId('project-detail-view')).toHaveTextContent(
      'ProjectDetailView:nba-systems-qa',
    );
  });

  it('/case-studies redirects to canonical project route', async () => {
    const router = renderRoute('/case-studies');
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects'));
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
  });

  it('/case-studies/guynode redirects to /projects/guynode', async () => {
    const router = renderRoute('/case-studies/guynode');
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects/guynode'));
    expect(screen.getByTestId('project-detail-view')).toBeInTheDocument();
  });

  it('/case-studies/digital-twin redirects to /projects/digital-twin', async () => {
    const router = renderRoute('/case-studies/digital-twin');
    await waitFor(() => expect(router.state.location.pathname).toBe('/projects/digital-twin'));
    expect(screen.getByTestId('project-detail-view')).toBeInTheDocument();
  });

  it('/resume renders ResumeView', () => {
    renderRoute('/resume');
    expect(screen.getByTestId('resume-view')).toBeInTheDocument();
  });

  it('unknown route shows ErrorBoundary fallback', () => {
    renderRoute('/this-route-does-not-exist');
    expect(screen.getByTestId('route-error')).toBeInTheDocument();
    expect(
      screen.getByText('This section is currently unavailable due to a technical error.'),
    ).toBeInTheDocument();
  });
});
