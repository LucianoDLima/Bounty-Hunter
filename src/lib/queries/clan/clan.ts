import { GameMode } from '@prisma/client';
import prisma from '../../prisma/client';

export async function findClan(guildId: string) {
  return prisma.clan.findUnique({
    where: { guildId },
  });
}

export async function createClan(guildId: string, name: string) {
  return prisma.clan.upsert({
    where: { guildId },
    update: { name, isActive: true },
    create: { guildId, name, isActive: true },
  });
}

export async function checkIfRuleExist(guildId: string) {
  return prisma.clan.findUnique({
    where: { guildId },
    include: { rules: true },
  });
}

export async function startUpClan(
  guildId: string,
  name: string,
  mode: GameMode,
) {
  return prisma.clan.upsert({
    where: { guildId },
    update: {
      name,
      isActive: true,
      rules: {
        upsert: {
          update: { gameMode: mode },
          create: { gameMode: mode },
        },
      },
    },
    create: {
      guildId,
      name,
      isActive: true,
      rules: {
        create: { gameMode: mode },
      },
    },
    include: {
      rules: true,
    },
  });
}

export async function inactivateClan(guildId: string) {
  return prisma.clan.updateMany({
    where: { guildId },
    data: { isActive: false },
  });
}
