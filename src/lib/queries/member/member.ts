import prisma from '../../prisma/client';

export async function findMemberByDiscordId(discordId: string, clanId: number) {
  return await prisma.member.findFirst({
    where: { discordId, clanId },
  });
}

export async function findMemberWithRules(discordId: string, clanId: number) {
  return await prisma.member.findUnique({
    where: { discordId_clanId: { discordId, clanId } },
    include: { clan: { include: { rules: true } } },
  });
}

export async function createMember(
  discordId: string,
  ign: string,
  clanId: number,
) {
  return await prisma.member.create({
    data: {
      discordId,
      ign,
      clan: { connect: { id: clanId } },
    },
  });
}

export async function updateMemberIgn(memberId: number, newIgn: string) {
  return await prisma.member.update({
    where: { id: memberId },
    data: { ign: newIgn },
  });
}
