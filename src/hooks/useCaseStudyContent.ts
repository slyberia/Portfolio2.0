import { useState, useEffect } from 'react';

interface CaseStudyContentState {
  content: string;
  isLoading: boolean;
  error: string | null;
}

const APP_SHELL_MARKERS = ['<div id="root"', '/src/main.tsx', '<script type="module"'];

const looksLikeAppShellHtml = (contentType: string | null, text: string) => {
  const normalizedText = text.trim().toLowerCase();
  const isHtmlByType = (contentType ?? '').toLowerCase().includes('text/html');
  const startsAsHtml =
    normalizedText.startsWith('<!doctype html') ||
    normalizedText.startsWith('<html') ||
    normalizedText.startsWith('<div');
  const containsAppShellMarker = APP_SHELL_MARKERS.some((marker) =>
    normalizedText.includes(marker.toLowerCase()),
  );

  return isHtmlByType || startsAsHtml || containsAppShellMarker;
};

export function useCaseStudyContent(studyId: string): CaseStudyContentState {
  const [state, setState] = useState<CaseStudyContentState>({
    content: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!studyId) return;

    setState({ content: '', isLoading: true, error: null });

    const fetchPath =
      studyId === 'guynode' || studyId === 'digital-twin'
        ? `/markdown/projects/${studyId}.md`
        : `/case-studies/${studyId}.md`;

    fetch(fetchPath)
      .then(async (res) => {
        if (!res.ok) {
          setState({ content: '', isLoading: false, error: null });
          return;
        }

        const contentType = res.headers?.get?.('content-type') ?? null;
        const text = await res.text();

        if (looksLikeAppShellHtml(contentType, text)) {
          setState({ content: '', isLoading: false, error: null });
          return;
        }

        setState({ content: text, isLoading: false, error: null });
      })
      .catch(() => {
        setState({ content: '', isLoading: false, error: null });
      });
  }, [studyId]);

  return state;
}
