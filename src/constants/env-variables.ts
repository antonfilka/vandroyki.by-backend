import { LOG_LEVEL } from '.';

export interface EnvironmentVariables {
  APP_NAME: string;
  ENV: string;
  NODE_ENV: 'development' | 'production' | 'test';
  LOG_LEVEL: LOG_LEVEL;
}
