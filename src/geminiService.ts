export type ChatHistoryEntry = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};
export type ChatHistory = ChatHistoryEntry[];

const RATE_LIMIT_MESSAGE =
  'I’ve reached today’s chat limit. You can still review Kyle’s projects, resume, or contact him directly. <<ACTION:contact>>';

const OFFLINE_MESSAGE =
  'I’m temporarily unavailable. You can still contact Kyle directly or use the site navigation to review his projects.';

const CONFIGURATION_MESSAGE =
  'The Digital Twin is enabled, but the chat service is not fully configured yet. You can still contact Kyle directly. <<ACTION:contact>>';

const ORIGIN_MESSAGE =
  'The Digital Twin is not enabled for this site origin yet. You can still contact Kyle directly. <<ACTION:contact>>';

async function readError(response: Response): Promise<string | undefined> {
  const data = await response.json().catch(() => null);
  return typeof data?.error === 'string' ? data.error : undefined;
}

export async function* sendMessageStream(
  message: string,
  history: ChatHistory,
): AsyncGenerator<string> {
  let response: Response;

  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
  } catch (error) {
    console.warn('Digital Twin request failed before reaching /api/chat.', error);
    yield OFFLINE_MESSAGE;
    return;
  }

  if (response.status === 429) {
    yield RATE_LIMIT_MESSAGE;
    return;
  }

  if (response.status === 403) {
    console.warn('Digital Twin origin rejected by /api/chat. Check ALLOWED_CHAT_ORIGINS.');
    yield ORIGIN_MESSAGE;
    return;
  }

  if (response.status === 503) {
    console.warn('Digital Twin backend is missing required server configuration.');
    yield CONFIGURATION_MESSAGE;
    return;
  }

  if (response.status === 400) {
    const error = await readError(response);
    if (error && /too long/i.test(error)) {
      yield 'That message is too long for the portfolio assistant. Try a shorter question about Kyle’s experience, projects, resume, or role fit.';
      return;
    }
  }

  if (!response.ok || !response.body) {
    console.warn('Digital Twin request returned an unexpected response.', {
      status: response.status,
      statusText: response.statusText,
    });
    yield OFFLINE_MESSAGE;
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    if (text) yield text;
  }
}

// TTS is a server-side concern; stub returns undefined on the client
export const generateSpeech = async (_text: string): Promise<string | undefined> => {
  return undefined;
};
