import { GameMode, Difficulty, Prisma } from '@prisma/client';

const sameRate = [
  "Ahrim's hood",
  "Ahrim's robetop",
  "Ahrim's robeskirt",
  "Ahrim's staff",

  "Dharok's helm",
  "Dharok's platebody",
  "Dharok's platelegs",
  "Dharok's greataxe",

  "Guthan's helm",
  "Guthan's platebody",
  "Guthan's chainskirt",
  "Guthan's warspear",

  "Karil's coif",
  "Karil's leathertop",
  "Karil's leatherskirt",
  "Karil's crossbow",

  "Torag's helm",
  "Torag's platebody",
  "Torag's platelegs",
  "Torag's hammers",

  "Verac's helm",
  "Verac's brassard",
  "Verac's plateskirt",
  "Verac's flail",
];

export const barrows: Prisma.BossCreateInput = {
  name: 'Barrows chest',
  gameMode: GameMode.OSRS,
  difficulty: Difficulty.EASY,
  drops: {
    create: sameRate.map((name) => ({
      name,
      points: 10,
      dropRate: '1/350',
      dupeProtection: false,
    })),
  },
};
