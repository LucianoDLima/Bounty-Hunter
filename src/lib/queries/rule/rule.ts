import prisma from '../../prisma/client';
import { RuleSettings } from './rule.type';

export async function updateClanRules(guildId: string, settings: RuleSettings) {
  return await prisma.clan.update({
    where: { guildId },
    data: {
      rules: {
        update: settings,
      },
    },
    include: { rules: true },
  });
}
