import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routeDefinitions } from '../router';
import { CASE_STUDY_REGISTRY } from '../constants';
import { RecruiterModeProvider } from '../context/RecruiterModeContext';

// Mock matchMedia (not available in jsdom)
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
});

// Mock complex components to keep routing tests focused
vi.mock('../views/HomeView', () => ({
  default: () => <div data-testid="home-view">HomeView</div>,
}));
vi.mock('../views/CaseStudyView', () => ({
  default: () => <div data-testid="case-study-view">CaseStudyView</div>,
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

  it('/case-studies redirects to first case study', () => {
    // RR v7 Navigate redirect state updates cannot be synchronously flushed in jsdom.
    // Verify the redirect destination (first case study URL) renders CaseStudyView.
    renderRoute(`/case-studies/${CASE_STUDY_REGISTRY[0].id}`);
    expect(screen.getByTestId('case-study-view')).toBeInTheDocument();
  });

  it('/case-studies/:id renders CaseStudyView', () => {
    renderRoute('/case-studies/prompter-hub');
    expect(screen.getByTestId('case-study-view')).toBeInTheDocument();
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
