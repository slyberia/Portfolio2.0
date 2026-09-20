import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ProjectsIndexView from '../views/ProjectsIndexView';

describe('project index controls', () => {
  it('keeps the project link and Ask AI action separate', async () => {
    const user = userEvent.setup();
    const listener = vi.fn();
    window.addEventListener('open-digital-twin', listener);
    try {
      render(
        <MemoryRouter>
          <ProjectsIndexView />
        </MemoryRouter>,
      );

      const projectLink = screen.getByRole('link', { name: 'HPS Geospatial Platform' });
      const askButton = screen.getByRole('button', {
        name: 'Ask AI about HPS Geospatial Platform',
      });
      expect(projectLink).toHaveAttribute('href', '/projects/hps-geospatial');
      expect(projectLink).not.toContainElement(askButton);
      await user.click(askButton);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(projectLink).toBeInTheDocument();
    } finally {
      window.removeEventListener('open-digital-twin', listener);
    }
  });
});
