import prisma from '../../prisma/client';
import { TCreateBounty } from './bounty.type';

export async function createBounty(data: TCreateBounty) {
  return await prisma.bounty.create({
    data: {
      status: 'ACTIVE',
      ...data,
    },
    include: { boss: true, drop: true },
  });
}

export async function countActiveBounties(memberId: number) {
  return await prisma.bounty.count({
    where: { memberId, status: 'ACTIVE' },
  });
}
