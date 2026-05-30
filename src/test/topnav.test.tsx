import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
  it('marks Home active on homepage and not tracks', () => {
    renderTopNav('/');

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('menuitem', { name: 'Forward Deployed Engineer' })).toBeNull();
  });

  it('marks Forward Deployed Engineer active on its track', () => {
    renderTopNav('/tracks/forward-deployed');

    // Open the dropdown
    const button = screen.getByRole('button', { name: 'Targeted Roles' });
    fireEvent.click(button);

    const menuItem = screen.getByRole('menuitem', { name: 'Forward Deployed Engineer' });
    expect(menuItem).toBeInTheDocument();
    expect(menuItem.className).toContain('border-tide-aqua');
  });

  it('marks Solutions Architect active on its track', () => {
    renderTopNav('/tracks/solutions-architect');

    // Open the dropdown
    const button = screen.getByRole('button', { name: 'Targeted Roles' });
    fireEvent.click(button);

    const menuItem = screen.getByRole('menuitem', { name: 'Solutions Architect' });
    expect(menuItem).toBeInTheDocument();
    expect(menuItem.className).toContain('border-tide-aqua');
  });

  it('marks Spatial Systems Architect active on its track', () => {
    renderTopNav('/tracks/spatial-systems');

    // Open the dropdown
    const button = screen.getByRole('button', { name: 'Targeted Roles' });
    fireEvent.click(button);

    const menuItem = screen.getByRole('menuitem', { name: 'Spatial Systems Architect' });
    expect(menuItem).toBeInTheDocument();
    expect(menuItem.className).toContain('border-tide-aqua');
  });

  it('marks Projects active on projects routes', () => {
    renderTopNav('/projects');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks Projects active on project detail routes', () => {
    renderTopNav('/projects/guynode');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('marks Deep Dives active on deep-dives route', () => {
    renderTopNav('/deep-dives');

    expect(screen.getByRole('link', { name: 'Deep Dives' })).toHaveAttribute('aria-current', 'page');
  });
});
