// Manifest for the Northern Grind AI-built asset gallery.
//
// Images are hosted in a Google Cloud Storage bucket so the library can grow
// without redeploying the app. Set `VITE_NG_GALLERY_BASE` at build time to the
// bucket's public base URL (e.g. https://storage.googleapis.com/<bucket>), then
// reference each asset by its object path below. Entries may also use an
// absolute URL or a `/`-relative path served from `public/` for core stills.
//
// See docs/northern-grind-gallery-setup.md for the bucket setup steps.

export type GalleryCategory = 'Brand' | 'Menu' | 'Social';

export type GalleryImage = {
  id: string;
  /** Object path within the bucket, an absolute URL, or a /public path. */
  src: string;
  /** Accessible alt text describing the image. */
  alt: string;
  /** Short caption shown under the image. */
  caption: string;
  category: GalleryCategory;
  /** Optional provenance, e.g. 'AI-generated' or 'AI-assisted + Adobe'. */
  tool?: string;
};

// Bucket base URL injected at build time; empty string keeps relative/public
// and absolute-URL entries working without it.
export const NG_GALLERY_BASE = import.meta.env.VITE_NG_GALLERY_BASE ?? '';

/** Resolve a manifest `src` to a full URL. */
export const resolveGallerySrc = (src: string): string =>
  /^https?:\/\//.test(src) || src.startsWith('/') ? src : `${NG_GALLERY_BASE}/${src}`;

// Add entries as assets are produced and uploaded to the bucket. Example:
//   { id: 'logo-brown-gold', src: 'brand/logo-brown-gold.png',
//     alt: 'Northern Grind Brown + Gold badge logo',
//     caption: 'Primary mark — Brown + Gold badge', category: 'Brand',
//     tool: 'AI-assisted + Adobe' },
export const northernGrindGallery: GalleryImage[] = [];
