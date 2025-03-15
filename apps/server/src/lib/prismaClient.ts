import { PrismaClient } from '../../../../packages/database/prisma/prisma-client';

import type { PrismaClient as PrismaClientType } from '../../../../packages/database/prisma/prisma-client';

export const client: PrismaClientType = new PrismaClient();
