import { GameMode } from '@prisma/client';
import prisma from '../../prisma/client';

export async function findBossesWithDrops(gameMode: GameMode) {
  return await prisma.boss.findMany({
    where: { gameMode },
    include: { drops: true },
  });
}
