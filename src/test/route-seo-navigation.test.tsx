import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import RouteSeo from '../components/RouteSeo';

describe('route SEO navigation', () => {
  afterEach(() => document.head.querySelector('link[rel="shortlink"]')?.remove());

  it('removes a previous project markdown link when the next project has no mirror', async () => {
    render(
      <MemoryRouter initialEntries={['/projects/hps-geospatial']}>
        <RouteSeo />
        <Link to="/projects/moh">MOH</Link>
      </MemoryRouter>,
    );
    expect(document.head.querySelector('link[rel="shortlink"]')?.getAttribute('href')).toBe(
      '/markdown/projects/hps-geospatial.md',
    );
    await userEvent.setup().click(screen.getByRole('link', { name: 'MOH' }));
    await waitFor(() => {
      expect(document.head.querySelector('link[rel="shortlink"]')).toBeNull();
      expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain(
        '/projects/moh',
      );
    });
  });
});
