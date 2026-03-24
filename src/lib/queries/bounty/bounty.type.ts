import { Prisma } from '@prisma/client';

export type TCreateBounty = Omit<
  Prisma.BountyUncheckedCreateInput,
  'id' | 'status' | 'createdAt' | 'updatedAt' | 'discordLink' | 'completedAt'
>;
