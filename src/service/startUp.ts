import { GameMode } from '@prisma/client';
import { checkIfRuleExist, startUpClan } from '../lib/queries/clan/clan';

/**
 * Set up the Bounty Hunter event for a server by selecting a gamemode.
 * This gamemode cannot be changed through the setting-up command again
 *
 * @param guildId - Discord server ID
 * @param name - Discord server name
 * @param mode - Gamemode to be selected
 */
export async function startUp(guildId: string, name: string, mode: GameMode) {
  const hasGameMode = await checkIfRuleExist(guildId);
  if (hasGameMode?.rules?.gameMode) {
    throw new Error('GAME_ALREADY_SET');
  }

  const clan = await startUpClan(guildId, name, mode);

  return clan;
}
