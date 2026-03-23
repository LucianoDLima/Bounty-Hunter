import { GameMode, Difficulty, Prisma } from '@prisma/client';

export const brutus: Prisma.BossCreateInput = {
  name: 'Brutus',
  gameMode: GameMode.OSRS,
  difficulty: Difficulty.EASY,
  drops: {
    create: [
      { name: 'Mooleta', points: 5, dropRate: '1/30', dupeProtection: false },
      {
        name: 'Bottomless milk bucket (empty)',
        points: 5,
        dropRate: '1/37.5',
        dupeProtection: false,
      },
      {
        name: 'Cow slippers',
        points: 10,
        dropRate: '1/150',
        dupeProtection: false,
      },
    ],
  },
};
