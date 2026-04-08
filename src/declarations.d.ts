/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
