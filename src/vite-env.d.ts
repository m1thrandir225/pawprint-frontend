/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENVIROMENT: 'development' | 'production'
  readonly VITE_GOOGLE_MAPS_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
