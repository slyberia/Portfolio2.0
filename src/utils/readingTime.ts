/**
 * Estimates reading time for a markdown string at 200 wpm.
 * Returns a formatted string, e.g. "4 min read".
 */
export function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
