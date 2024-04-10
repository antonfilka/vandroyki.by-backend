import { PROVIDERS } from '../../../constants/providers';
import { DatabaseService } from './database.service';

export type PrismaInstance = ReturnType<DatabaseService['getPrisma']>;

export const PrismaProvider = {
  provide: PROVIDERS.PRISMA,
  useFactory: (databaseService: DatabaseService) => {
    return databaseService.getPrisma();
  },
  inject: [DatabaseService],
};
