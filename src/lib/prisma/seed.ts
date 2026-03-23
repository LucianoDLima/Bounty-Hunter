import { allBosses } from './seeds';
import prisma from './client';

async function main() {
  for (const bossData of allBosses) {
    const boss = await prisma.boss.upsert({
      where: {
        name_gameMode: { name: bossData.name, gameMode: bossData.gameMode },
      },
      update: {
        difficulty: bossData.difficulty,
      },
      create: {
        name: bossData.name,
        gameMode: bossData.gameMode,
        difficulty: bossData.difficulty,
      },
    });

    if (bossData.drops && Array.isArray(bossData.drops.create)) {
      for (const drop of bossData.drops.create) {
        await prisma.drop.upsert({
          where: {
            name_bossId: { name: drop.name, bossId: boss.id },
          },
          update: {
            name: drop.name,
            points: drop.points,
            dropRate: drop.dropRate,
            dupeProtection: drop.dupeProtection,
          },
          create: {
            name: drop.name,
            points: drop.points,
            dropRate: drop.dropRate,
            bossId: boss.id,
            dupeProtection: drop.dupeProtection,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
