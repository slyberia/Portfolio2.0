import { describe, it, expect } from 'vitest';
import { serializeTranscript, transcriptFilename } from '../lib/digitalTwinTranscript';

const date = new Date('2026-06-07T12:00:00Z');

describe('serializeTranscript', () => {
  it('maps roles to readable speakers and includes a dated header', () => {
    const md = serializeTranscript(
      [
        { role: 'model', text: 'How can I help?' },
        { role: 'user', text: 'Tell me about Guynode.' },
        { role: 'model', text: 'It is a spatial data hub.' },
      ],
      { date },
    );
    expect(md).toContain("# Kyle's Digital Twin — Conversation Transcript");
    expect(md).toContain('_Exported 2026-06-07_');
    expect(md).toContain('**You:** Tell me about Guynode.');
    expect(md).toContain('**Digital Twin:** It is a spatial data hub.');
  });

  it('drops empty streaming placeholders', () => {
    const md = serializeTranscript(
      [
        { role: 'user', text: 'Hi' },
        { role: 'model', text: '   ' },
        { role: 'model', text: '' },
      ],
      { date },
    );
    expect(md).toContain('**You:** Hi');
    expect(md).not.toContain('**Digital Twin:**');
  });

  it('notes the active mode when provided', () => {
    const md = serializeTranscript([{ role: 'user', text: 'Hi' }], {
      date,
      modeLabel: 'Implementation Consultant Track',
    });
    expect(md).toContain('· Implementation Consultant Track mode');
  });

  it('builds a dated filename', () => {
    expect(transcriptFilename(date)).toBe('digital-twin-transcript-2026-06-07.md');
  });
});
