import { GameMode, Difficulty, Prisma } from '@prisma/client';

const sameRate = [
  'Berserker ring',
  'Warrior ring',
  'Seers ring',
  'Archers ring',
  'Dragon axe',
  'Mud Battlestaff',
  'Seercull',
];

export const dagannothKings: Prisma.BossCreateInput = {
  name: 'Dagannoth Kings',
  gameMode: GameMode.OSRS,
  difficulty: Difficulty.MEDIUM,
  drops: {
    create: sameRate.map((name) => ({
      name,
      points: 25,
      dropRate: '1/128',
      dupeProtection: false,
    })),
  },
};
