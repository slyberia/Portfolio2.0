import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ResumeView from '../views/ResumeView';

describe('ResumeView', () => {
  it('renders the evidence-first resume hierarchy', () => {
    render(<ResumeView />);

    expect(
      screen.getByText('Forward Deployed Engineer | Technical Systems Translator'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack Geospatial & Data Systems/)).toBeInTheDocument();

    expect(
      screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent),
    ).toEqual([
      'Profile',
      'Technical Skills',
      'Selected Systems',
      'Professional Experience',
      'Education & Credentials',
    ]);
  });

  it('surfaces the HPS platform and its evidence links', () => {
    render(<ResumeView />);

    expect(screen.getByRole('heading', { name: 'HPS Geospatial Platform' })).toBeInTheDocument();
    expect(screen.getByText(/live production-database behavior was outside/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Live' })[0]).toHaveAttribute(
      'href',
      'https://hydro-frontend-786228485832.us-central1.run.app/',
    );
    expect(screen.getAllByRole('link', { name: 'Case Study' })[0]).toHaveAttribute(
      'href',
      expect.stringContaining('/projects/hps-geospatial'),
    );
  });
});
