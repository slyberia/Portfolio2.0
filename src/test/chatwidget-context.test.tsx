import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { beforeEach, describe, expect, it } from 'vitest';
import ChatWidget from '../components/ChatWidget';

const sendMessageStreamMock = vi.fn();

vi.mock('../geminiService', () => ({
  sendMessageStream: (...args: unknown[]) => sendMessageStreamMock(...args),
}));

describe('ChatWidget contextual open event', () => {
  beforeEach(() => {
    sessionStorage.clear();
    sendMessageStreamMock.mockReset();
  });

  it('opens from implementation context and does not auto-call Gemini', async () => {
    render(<ChatWidget />);

    window.dispatchEvent(
      new CustomEvent('open-digital-twin', {
        detail: { source: 'implementation' },
      }),
    );

    expect(await screen.findByText('Forward Deployed Track')).toBeInTheDocument();
    expect(screen.getByText('Show me Kyle’s forward deployed proof.')).toBeInTheDocument();
    expect(sendMessageStreamMock).not.toHaveBeenCalled();
  });

  it('opens with QA context suggestions', async () => {
    render(<ChatWidget />);
    window.dispatchEvent(new CustomEvent('open-digital-twin', { detail: { source: 'qa' } }));
    expect(await screen.findByText('Implementation Consultant Track')).toBeInTheDocument();
    expect(screen.getByText('Show me Kyle’s Implementation Consultant proof.')).toBeInTheDocument();
  });

  it('opens with GIS context suggestions', async () => {
    render(<ChatWidget />);
    window.dispatchEvent(new CustomEvent('open-digital-twin', { detail: { source: 'gis' } }));
    expect(await screen.findByText('Spatial Systems Track')).toBeInTheDocument();
    expect(screen.getByText('Show me Kyle’s Spatial Systems Architect proof.')).toBeInTheDocument();
  });

  it('supports modeLabel override from event payload', async () => {
    render(<ChatWidget />);
    window.dispatchEvent(
      new CustomEvent('open-digital-twin', {
        detail: { source: 'implementation', modeLabel: 'Forward Deployed Track' },
      }),
    );
    expect(await screen.findByText('Forward Deployed Track')).toBeInTheDocument();
  });

  it('accepts the approved HPS deep-dive navigation command', async () => {
    const onNavigate = vi.fn();
    sendMessageStreamMock.mockImplementation(() =>
      (async function* () {
        yield 'Open the HPS system evidence. <<NAVIGATE:deep-dive:hps-geospatial>>';
      })(),
    );

    render(<ChatWidget onNavigate={onNavigate} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Ask the Digital Twin' }));
    await user.type(
      screen.getByPlaceholderText("Ask Kyle's AI Twin..."),
      'Show technical depth{enter}',
    );

    await waitFor(() => {
      expect(onNavigate).toHaveBeenCalledWith('deep-dive:hps-geospatial');
    });
    expect(screen.getByText('Open the HPS system evidence.')).toBeInTheDocument();
  });
});
