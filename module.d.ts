declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BACKEND_URL: string;
    FRONTEND_URL: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_TOKEN_KEY: string;

    YANDEX_KEY_ID: string;
    YANDEX_SECRET_KEY: string;
    YANDEX_BUCKET: string;
    YANDEX_REGION: string;
  }
}
