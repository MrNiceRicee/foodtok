interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_DB_USER: string;
  readonly VITE_DB_PASSWORD: string;
  readonly VITE_DB_DATABASE: string;
  readonly VITE_DB_PORT: number;
  readonly VITE_PORT: number;
  readonly VITE_SUPABASE_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly ENV: string;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
