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

// Add entries as assets are produced and uploaded to the bucket. The `src` is
// the object path within the bucket (NG_GALLERY_BASE is prepended at runtime).
export const northernGrindGallery: GalleryImage[] = [
  {
    id: 'current-script-logo',
    src: 'brand/current-script-logo.png',
    alt: 'Northern Grind script logo with pine trees and sunrise coffee bean icon',
    caption: 'Original script-style logo direction',
    category: 'Brand',
    tool: 'Existing asset',
  },
  {
    id: 'logo-brown-circle',
    src: 'brand/logo-brown-circle.png',
    alt: 'Northern Grind brown circular badge logo with NG coffee cup mark',
    caption: 'Brown one-color badge logo',
    category: 'Brand',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'logo-brown-gold-transparent',
    src: 'brand/logo-brown-gold-transparent.png',
    alt: 'Northern Grind brown and gold circular badge logo on transparent background',
    caption: 'Brown + Gold badge logo refinement',
    category: 'Brand',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'logo-emu-green-michigan-cup',
    src: 'brand/logo-emu-green-michigan-cup.png',
    alt: 'Northern Grind green and gold badge logo with coffee cup, coffee bean, and Michigan icon',
    caption: 'EMU green-inspired Michigan cup concept',
    category: 'Brand',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'logo-navy-gold-alternate',
    src: 'brand/logo-navy-gold-alternate.png',
    alt: 'Northern Grind navy and gold circular badge logo with sunrise and coffee cup',
    caption: 'Navy + Gold alternate badge concept',
    category: 'Brand',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'menu-board-redesign-drinks-overview',
    src: 'menu/menu-board-redesign-drinks-overview.png',
    alt: 'Northern Grind redesigned coffee menu board with drink list and illustrated hot and iced coffee',
    caption: 'Redesigned drinks board overview',
    category: 'Menu',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'menu-board-redesign-coffee',
    src: 'menu/menu-board-redesign-coffee.png',
    alt: 'Northern Grind redesigned coffee menu board showing latte, cappuccino, flat white, cortado, and cold brew options',
    caption: 'Coffee menu board redesign',
    category: 'Menu',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'menu-board-redesign-tea-specialties',
    src: 'menu/menu-board-redesign-tea-specialties.png',
    alt: 'Northern Grind redesigned tea and specialties menu board with chai, matcha, hot chocolate, lemonade, and smoothies',
    caption: 'Tea and specialties board redesign',
    category: 'Menu',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'menu-board-redesign-sandwiches',
    src: 'menu/menu-board-redesign-sandwiches.png',
    alt: 'Northern Grind redesigned sandwiches menu board with bagel sandwich options and illustrated bagel plate',
    caption: 'Sandwiches board redesign',
    category: 'Menu',
    tool: 'AI-assisted + Adobe',
  },
  {
    id: 'menu-board-original-drinks-closeup',
    src: 'menu/menu-board-original-drinks-closeup.png',
    alt: 'Original Northern Grind digital drink menu board shown on an in-store display',
    caption: 'Original drink menu board close-up',
    category: 'Menu',
    tool: 'Reference photo',
  },
  {
    id: 'menu-board-original-full-display',
    src: 'menu/menu-board-original-full-display.jpg',
    alt: 'Original Northern Grind in-store digital menu display across three screens',
    caption: 'Original three-screen menu display',
    category: 'Menu',
    tool: 'Reference photo',
  },
];
