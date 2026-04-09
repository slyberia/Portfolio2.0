import { useState, useEffect } from 'react';

interface CaseStudyContentState {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export function useCaseStudyContent(studyId: string): CaseStudyContentState {
  const [state, setState] = useState<CaseStudyContentState>({
    content: '',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!studyId) return;

    setState({ content: '', isLoading: true, error: null });

    fetch(`/case-studies/${studyId}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => setState({ content: text, isLoading: false, error: null }))
      .catch((err: Error) => {
        setState({ content: '', isLoading: false, error: err.message });
      });
  }, [studyId]);

  return state;
}
