import prisma from '../../prisma/client';

export async function createClan(guildId: string, name: string) {
  return prisma.clan.upsert({
    where: { guildId },
    update: { name, isActive: true },
    create: { guildId, name, isActive: true },
  });
}

export async function inactivateClan(guildId: string) {
  return prisma.clan.updateMany({
    where: { guildId },
    data: { isActive: false },
  });
}
