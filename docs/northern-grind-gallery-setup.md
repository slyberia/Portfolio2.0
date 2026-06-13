# Northern Grind Asset Gallery — GCS Bucket Setup

The Northern Grind deep dive renders an AI-built asset gallery (logos, menu
mockups, social mockups) from a Google Cloud Storage bucket so the image
library can grow **without redeploying** the Cloud Run app.

- **Component:** `src/components/northern-grind/BrandGallery.tsx`
- **Manifest:** `src/data/northernGrindGallery.ts`
- **Bucket base URL env:** `VITE_NG_GALLERY_BASE`

Until the manifest has entries, the gallery shows a graceful "coming soon"
empty state — it never renders broken images.

---

## 1. Create a public, read-only bucket

```bash
# Pick a globally-unique name; keep it in the same region as the Cloud Run app.
export BUCKET=northern-grind-gallery
export REGION=us-central1   # match your Cloud Run region

gcloud storage buckets create gs://$BUCKET \
  --location=$REGION \
  --uniform-bucket-level-access

# Make objects publicly readable (gallery images are non-sensitive).
gcloud storage buckets add-iam-policy-binding gs://$BUCKET \
  --member=allUsers \
  --role=roles/storage.objectViewer
```

> Prefer not to make the bucket public? Serve it behind Cloud CDN with a
> backend bucket, or generate signed URLs. For a public portfolio gallery,
> public objects are the simplest correct choice.

## 2. (Optional) CORS — only needed if images are `fetch()`ed

Plain `<img>` tags (what the gallery uses) do **not** require CORS, so you can
usually skip this. If you later load images via `fetch`/canvas, apply:

```bash
cat > cors.json <<'EOF'
[{ "origin": ["*"], "method": ["GET"], "responseHeader": ["Content-Type"], "maxAgeSeconds": 3600 }]
EOF
gcloud storage buckets update gs://$BUCKET --cors-file=cors.json
```

## 3. Upload assets (organized by category)

```bash
gcloud storage cp ./logos/*.png        gs://$BUCKET/brand/
gcloud storage cp ./menu/*.png         gs://$BUCKET/menu/
gcloud storage cp ./social/*.png       gs://$BUCKET/social/

# Recommended: optimize first (WebP, ~1600px max) to keep the gallery fast.
```

Public object URL pattern:

```
https://storage.googleapis.com/<BUCKET>/<path>
# e.g. https://storage.googleapis.com/northern-grind-gallery/brand/logo-brown-gold.png
```

## 4. Point the app at the bucket

Set the base URL at build time (Cloud Run env var / `.env`):

```
VITE_NG_GALLERY_BASE=https://storage.googleapis.com/northern-grind-gallery
```

## 5. Register each image in the manifest

Edit `src/data/northernGrindGallery.ts`. The `src` is the object path **within**
the bucket (the base URL is prepended automatically):

```ts
export const northernGrindGallery: GalleryImage[] = [
  {
    id: 'logo-brown-gold',
    src: 'brand/logo-brown-gold.png',
    alt: 'Northern Grind Brown + Gold badge logo',
    caption: 'Primary mark — Brown + Gold badge',
    category: 'Brand',
    tool: 'AI-assisted + Adobe',
  },
  // …menu and social entries
];
```

`src` also accepts an absolute `https://…` URL or a `/`-relative path served
from `public/` — handy for a couple of core stills you'd rather keep versioned
in the repo.

## 6. Verify

```bash
npm run dev          # gallery renders the new entries on the Northern Grind deep dive
npm run build        # confirms the manifest typechecks and bundles
```

---

### Why a bucket (not just `public/`)

`public/` images ship inside the Cloud Run container image — fine for a few
stable stills, but every change needs a redeploy and bloats the repo. A bucket
decouples a **growing** AI-art library from deploys: upload, add a manifest
entry, done. Core brand stills can still live in `public/case-studies/` and be
referenced with a `/`-relative `src`.
