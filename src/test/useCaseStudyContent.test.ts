import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCaseStudyContent } from '../hooks/useCaseStudyContent';

describe('useCaseStudyContent', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts in loading state', () => {
    (fetch as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useCaseStudyContent('prompter-hub'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.content).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('returns content on success', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/markdown' },
      text: async () => '# Prompter Hub\nContent here',
    });
    const { result } = renderHook(() => useCaseStudyContent('prompter-hub'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.content).toBe('# Prompter Hub\nContent here');
    expect(result.current.error).toBeNull();
  });

  it('returns empty content on HTTP failure', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({ ok: false, status: 404 });
    const { result } = renderHook(() => useCaseStudyContent('missing-study'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.content).toBe('');
  });

  it('returns empty content when response content-type is html', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/html; charset=utf-8' },
      text: async () => '<html><body>App Shell</body></html>',
    });
    const { result } = renderHook(() => useCaseStudyContent('prompter-hub'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.content).toBe('');
  });

  it('returns empty content when html app shell markers are returned', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      headers: { get: () => 'text/plain' },
      text: async () =>
        '<!doctype html><div id="root"></div><script type="module" src="/src/main.tsx"></script>',
    });
    const { result } = renderHook(() => useCaseStudyContent('prompter-hub'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.content).toBe('');
  });
});
