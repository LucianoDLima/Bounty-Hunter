import { GameMode, Difficulty, Prisma } from '@prisma/client';

const sameRate = [
  'Shadow spike',
  'Greater Ricochet ability codex',
  'Greater Chain ability codex',
  'Divert ability codex',
];

export const raksha: Prisma.BossCreateInput = {
  name: 'Raksha, the Shadow Colossus',
  gameMode: GameMode.RS3,
  difficulty: Difficulty.HARD,
  drops: {
    create: [
      ...sameRate.map((name) => ({
        name,
        points: 100,
        dropRate: '1/325',
        dupeProtection: false,
      })),
      {
        name: 'Fleeting boots',
        points: 50,
        dropRate: '1/130',
        dupeProtection: false,
      },
    ],
  },
};
