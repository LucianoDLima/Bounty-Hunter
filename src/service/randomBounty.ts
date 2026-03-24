import { findBossesWithDrops } from '../lib/queries/boss/boss';
import {
  countActiveBounties,
  createBounty,
} from '../lib/queries/bounty/bounty';
import { findMemberWithRules } from '../lib/queries/member/member';
import { generateBountyKeyword } from '../util/bountyKeyword';

export async function generateRandomBounty(discordId: string, clanId: number) {
  const member = await findMemberWithRules(discordId, clanId);
  if (!member) {
    return { error: 'MEMBER_NOT_FOUND' as const };
  }

  const rules = member.clan.rules;
  if (!rules) {
    return { error: 'NO_RULES' as const };
  }

  const activeBountiesCount = await countActiveBounties(member.id);
  const maxBounties = rules.bountyQty;
  if (activeBountiesCount >= maxBounties) {
    return { error: 'MAX_BOUNTIES_REACHED' as const };
  }

  const bosses = await findBossesWithDrops(rules.gameMode);

  const randomBoss = bosses[Math.floor(Math.random() * bosses.length)];
  const randomDrop = randomBoss.drops.length
    ? randomBoss.drops[Math.floor(Math.random() * randomBoss.drops.length)]
    : null;

  const daysToExpire = rules.daysToExpire;
  let expiresAt = null;

  if (daysToExpire > 0) {
    expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + daysToExpire);
  }

  const keyword = generateBountyKeyword();

  const bounty = await createBounty({
    memberId: member.id,
    clanId: clanId,
    bossId: randomBoss.id,
    dropId: randomDrop?.id,
    reward: randomDrop?.points,
    rerolls: rules.rerolls,
    expiresAt,
    keyword,
  });

  return { bounty };
}
