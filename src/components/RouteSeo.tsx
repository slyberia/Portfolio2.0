import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForPath, SITE_BASE_URL } from '../lib/seo';

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el?.setAttribute(k, v));
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
};

const RouteSeo: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    document.title = seo.title;
    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: `${SITE_BASE_URL}${seo.canonicalPath}`,
    });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: `${SITE_BASE_URL}/og-image.svg`,
    });
    upsertLink('canonical', `${SITE_BASE_URL}${seo.canonicalPath}`);
    upsertLink('alternate', '/llms.txt');
    upsertLink('bookmark', '/ai-index');
    if (seo.markdownPath) upsertLink('shortlink', seo.markdownPath);

    document.querySelectorAll('script[data-route-jsonld="true"]').forEach((n) => n.remove());
    seo.jsonLd.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.routeJsonld = 'true';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [location.pathname]);

  return null;
};

export default RouteSeo;
