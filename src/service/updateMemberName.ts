import {
  findMemberByDiscordId,
  updateMemberIgn,
} from '../lib/queries/member/member';

/**
 * Update a member's in-game name
 * - Checks if the member exists before attempting to update
 * - Throws an error if the member is not found
 * - Update the member's in-game name
 * 
 * @param userId - Discord user ID of the member
 * @param clanId - ID of the clan they are in
 * @param newIgn - New in-game name to update to
 * @returns Updated member information
 */
export async function updateMemberName(
  userId: string,
  clanId: number,
  newIgn: string,
) {
  const existingMember = await findMemberByDiscordId(userId, clanId);

  if (!existingMember) {
    throw new Error('MEMBER_NOT_FOUND');
  }

  const member = await updateMemberIgn(existingMember.id, newIgn);
  return { member };
}
