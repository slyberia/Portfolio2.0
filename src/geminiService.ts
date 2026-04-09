export type ChatHistoryEntry = {
  role: 'user' | 'model';
  parts: [{ text: string }];
};
export type ChatHistory = ChatHistoryEntry[];

const RATE_LIMIT_MESSAGE =
  "I've reached my daily chat limit. Let's connect directly! <<ACTION:contact>>";

const OFFLINE_MESSAGE = "I'm currently unavailable. Please reach Kyle directly! <<ACTION:contact>>";

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
