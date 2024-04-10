import { PROVIDERS } from '../../../constants/providers';
import { DatabaseService } from './database.service';

export const DatabaseConnectProvider = {
  provide: PROVIDERS.DATABASE_CONNECT,
  useFactory: async (databaseService: DatabaseService) => {
    await databaseService.connect();
  },
  inject: [DatabaseService],
};
