/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_ENABLED: string;
  // Base URL for the Google Cloud Storage bucket hosting the Northern Grind
  // AI-built image gallery (e.g. https://storage.googleapis.com/<bucket>).
  // Optional — gallery entries may also use absolute URLs or /public paths.
  readonly VITE_NG_GALLERY_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
