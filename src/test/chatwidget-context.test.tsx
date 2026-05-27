import { render, screen } from '@testing-library/react';
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
    expect(await screen.findByText('Solutions Architect Track')).toBeInTheDocument();
    expect(screen.getByText('Show me Kyle’s Solutions Architect proof.')).toBeInTheDocument();
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
});
