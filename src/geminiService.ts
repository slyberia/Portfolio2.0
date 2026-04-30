export type ChatHistoryEntry = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};
export type ChatHistory = ChatHistoryEntry[];

const RATE_LIMIT_MESSAGE =
  'I’ve reached today’s chat limit. You can still review Kyle’s projects, resume, or contact him directly. <<ACTION:contact>>';

const OFFLINE_MESSAGE =
  'I’m temporarily unavailable. You can still contact Kyle directly or use the site navigation to review his projects. <<ACTION:contact>>';

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
  } catch {
    yield OFFLINE_MESSAGE;
    return;
  }

  if (response.status === 429) {
    yield RATE_LIMIT_MESSAGE;
    return;
  }

  if (response.status === 400) {
    const data = await response.json().catch(() => null);
    if (data?.error && /too long/i.test(String(data.error))) {
      yield 'That message is too long for the portfolio assistant. Try a shorter question about Kyle’s experience, projects, resume, or role fit.';
      return;
    }
  }

  if (!response.ok || !response.body) {
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
