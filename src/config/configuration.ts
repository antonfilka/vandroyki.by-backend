export default () => ({
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  ENV: process.env.ENV,

  LOG_LEVEL: process.env.LOG_LEVEL,

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,

  BACKEND_URL: process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,

  DATABASE_URL: process.env.DATABASE_URL,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});
