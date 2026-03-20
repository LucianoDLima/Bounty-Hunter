import {
  createMember,
  findMemberByDiscordId,
} from '../lib/queries/member/member';

/**
 * Register a new member for the Bounty Hunter event
 * 
 * @param userId - Discord user ID of the member
 * @param ign - In-game name
 * @param clanId - ID of the clan they are joining
 */
export async function registerNewMember(
  userId: string,
  ign: string,
  clanId: number,
) {
  const existingMember = await findMemberByDiscordId(userId, clanId);

  if (existingMember) {
    throw new Error('MEMBER_EXISTS');
  }

  return await createMember(userId, ign, clanId);
}
