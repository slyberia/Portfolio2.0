import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TopNav from '../components/TopNav';

function renderTopNav(pathname: string) {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <TopNav theme="light" toggleTheme={vi.fn()} onOpenContact={vi.fn()} />
    </MemoryRouter>,
  );
}

describe('TopNav active states', () => {
  it('marks Home active on homepage and not Implementation', () => {
    renderTopNav('/');

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Implementation' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('marks Implementation active on implementation track', () => {
    renderTopNav('/tracks/implementation');

    expect(screen.getByRole('link', { name: 'Implementation' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('marks QA active on QA track', () => {
    renderTopNav('/tracks/ops-analytics');

    expect(screen.getByRole('link', { name: 'QA' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks GIS active on GIS track', () => {
    renderTopNav('/tracks/gis');

    expect(screen.getByRole('link', { name: 'GIS' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks Projects active on projects routes', () => {
    renderTopNav('/projects');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks Projects active on project detail routes', () => {
    renderTopNav('/projects/guynode');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks Process active on process route', () => {
    renderTopNav('/portfolio2/deep-dive');

    expect(screen.getByRole('link', { name: 'Process' })).toHaveAttribute('aria-current', 'page');
  });
});
