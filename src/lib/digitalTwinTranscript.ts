export interface TranscriptMessage {
  role: 'user' | 'model';
  text: string;
}

const SPEAKER: Record<TranscriptMessage['role'], string> = {
  user: 'You',
  model: 'Digital Twin',
};

/**
 * Serialize a Digital Twin conversation into a clean, paste-ready Markdown transcript.
 * Pure + dependency-free (subphase 7.5): empty streaming placeholders are dropped, and the
 * export is entirely client-side — no backend, no PII leaves the browser.
 */
export const serializeTranscript = (
  messages: TranscriptMessage[],
  options: { modeLabel?: string; date?: Date } = {},
): string => {
  const date = options.date ?? new Date();
  const exchanges = messages
    .filter((message) => message.text.trim().length > 0)
    .map((message) => `**${SPEAKER[message.role]}:** ${message.text.trim()}`);

  const subtitle = `_Exported ${date.toISOString().slice(0, 10)}${
    options.modeLabel ? ` · ${options.modeLabel} mode` : ''
  }_`;

  return [
    "# Kyle's Digital Twin — Conversation Transcript",
    '',
    subtitle,
    '',
    ...exchanges,
    '',
  ].join('\n');
};

export const transcriptFilename = (date: Date = new Date()): string =>
  `digital-twin-transcript-${date.toISOString().slice(0, 10)}.md`;
