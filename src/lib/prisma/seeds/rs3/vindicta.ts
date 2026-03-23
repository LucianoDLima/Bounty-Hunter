import { GameMode, Difficulty, Prisma } from '@prisma/client';

const dorment = [
  'Dormant anima core helm',
  'Dormant anima core body',
  'Dormant anima core legs',
];

const rare = ['Dragon Rider lance', 'Crest of Zaros'];

export const vindicta: Prisma.BossCreateInput = {
  name: 'Vindicta',
  gameMode: GameMode.RS3,
  difficulty: Difficulty.MEDIUM,
  drops: {
    create: [
      ...dorment.map((name) => ({
        name,
        points: 25,
        dropRate: '1/255',
        dupeProtection: false,
      })),
      ...rare.map((name) => ({
        name,
        points: 50,
        dropRate: '1/255',
        dupeProtection: true,
      })),
      {
        name: 'Zarosian essence',
        points: 25,
        dropRate: '1/64',
        dupeProtection: false,
      },
    ],
  },
};
