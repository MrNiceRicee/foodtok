interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_DB_USER: string;
  readonly VITE_DB_PASSWORD: string;
  readonly VITE_DB_DATABASE: string;
  readonly VITE_PORT: number;
  readonly ENV: string;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
