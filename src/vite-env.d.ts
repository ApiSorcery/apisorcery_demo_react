/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_GLOB_PUBLIC_PATH: string;
  readonly VITE_GLOB_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
