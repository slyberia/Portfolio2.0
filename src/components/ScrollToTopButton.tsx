import React from 'react';

const SCROLL_THRESHOLD = 600;

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY >= SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-28 md:bottom-24 right-4 md:right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-slate-300 bg-[#fcfaf7] px-3 py-2 text-xs font-semibold text-slate-700 shadow-md hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <span aria-hidden="true">↑</span>
      <span>Back to top</span>
    </button>
  );
};

export default ScrollToTopButton;
