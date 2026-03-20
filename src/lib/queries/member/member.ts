import prisma from '../../prisma/client';

export async function findMemberByDiscordId(userId: string, clanId: number) {
  return await prisma.member.findFirst({
    where: { discordId: userId, clanId: clanId },
  });
}

export async function createMember(
  userId: string,
  ign: string,
  clanId: number,
) {
  return await prisma.member.create({
    data: {
      discordId: userId,
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
