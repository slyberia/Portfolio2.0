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
    (fetch as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useCaseStudyContent('prompter-hub'));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.content).toBe('');
    expect(result.current.error).toBeNull();
  });

  it('returns content on success', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      text: async () => '# Prompter Hub\nContent here',
    });
    const { result } = renderHook(() => useCaseStudyContent('prompter-hub'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.content).toBe('# Prompter Hub\nContent here');
    expect(result.current.error).toBeNull();
  });

  it('returns error state on HTTP failure', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 404,
    });
    const { result } = renderHook(() => useCaseStudyContent('missing-study'));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toMatch(/404/);
    expect(result.current.content).toBe('');
  });

  it('cache hit: fetch called only once for same id', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      text: async () => '# Content',
    });
    const { result, rerender } = renderHook((id: string) => useCaseStudyContent(id), {
      initialProps: 'prompter-hub',
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetch).toHaveBeenCalledTimes(1);

    // Re-render with the same ID — useEffect deps don't change, no second fetch
    rerender('prompter-hub');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
