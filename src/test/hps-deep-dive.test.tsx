import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DeepDiveView from '../views/DeepDiveView';
import {
  HPS_ARCHITECTURE_LAYERS,
  HPS_ARTIFACTS,
  HPS_BENCHMARKS,
  HPS_LIMITATIONS,
} from '../data/hpsDeepDiveContent';

describe('HPS system deep dive', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('opens from its canonical query route with every required evidence section', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );

    const router = createMemoryRouter([{ path: '/deep-dives', element: <DeepDiveView /> }], {
      initialEntries: ['/deep-dives?tab=hps-geospatial'],
    });
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole('heading', {
        name: 'HPS Geospatial: From Map Application to Inspectable Production Workflow',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Five layers, one evidence chain' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Failure states are part of the workflow' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Outputs designed to carry provenance and status' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Evidence kept with its test boundary' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What the retained evidence does not establish' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read the project overview' })).toHaveAttribute(
      'href',
      '/projects/hps-geospatial',
    );
  });

  it('keeps completed, partial, deployment-unverified, and ongoing work separate', () => {
    expect(new Set(HPS_ARTIFACTS.map((item) => item.status))).toEqual(
      new Set(['Completed', 'Partial', 'Implemented · deployment unverified', 'Ongoing']),
    );
  });

  it('preserves supplied metrics and their limitations without completeness claims', () => {
    const evidence = JSON.stringify({
      architecture: HPS_ARCHITECTURE_LAYERS,
      artifacts: HPS_ARTIFACTS,
      benchmarks: HPS_BENCHMARKS,
      limitations: HPS_LIMITATIONS,
    });

    expect(evidence).toContain('33/33 browser matrix');
    expect(evidence).toContain('approximately 0.742 uploaded-image pixels');
    expect(evidence).toContain('178 matched reaches');
    expect(evidence).toContain('local and synthetic');
    expect(evidence).toContain('deployment unverified');
    expect(evidence).not.toMatch(/production-ready|fully validated|enterprise-grade|scalable/i);
  });
});
