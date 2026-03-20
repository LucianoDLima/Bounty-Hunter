import { GameMode } from '@prisma/client';
import { ChatInputCommandInteraction, Colors, EmbedBuilder } from 'discord.js';
import { updateClanRules } from '../lib/queries/rule/rule';
import { RuleSettings } from '../lib/queries/rule/rule.type';
import { verifyClanExist } from '../middleware/verifyClan';

/**
 * Handle the '/rules' command to update clan rules.
 *
 * TODO: Make gamemode unchangable after a bounty has been created.
 */
export async function handleSetRules(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const clan = await verifyClanExist(interaction);
  if (!clan) return;

  const updateData = buildRuleUpdateData(
    interaction.options.getString('gamemode') as GameMode | null,
    interaction.options.getInteger('rerolls'),
    interaction.options.getInteger('bounties'),
    interaction.options.getInteger('days'),
  );

  if (!updateData) {
    return interaction.editReply({
      content: 'You must provide at least one rule to update.',
    });
  }

  try {
    await updateClanRules(clan.guildId, updateData);

    await interaction.editReply(getRulesUpdatedUI(updateData));
  } catch (error) {
    console.error('Error updating rules:', error);
    await interaction.editReply({
      content:
        'Failed to update rules. Make sure the clan is setup with `/create` first.',
    });
  }
}

export function buildRuleUpdateData(
  gamemode: GameMode | null,
  rerolls: number | null,
  maxBounties: number | null,
  expirationDays: number | null,
): RuleSettings | null {
  if (
    !gamemode &&
    rerolls === null &&
    maxBounties === null &&
    expirationDays === null
  ) {
    return null;
  }

  const updateData: RuleSettings = {};
  if (gamemode) updateData.gameMode = gamemode;
  if (rerolls !== null) updateData.rerolls = rerolls;
  if (maxBounties !== null) updateData.bountyQty = maxBounties;
  if (expirationDays !== null) updateData.daysToExpire = expirationDays;

  return updateData;
}

function getRulesUpdatedUI(data: RuleSettings) {
  const description = [
    'The Bounty Hunter rules have been updated:',
    data.gameMode ? `- **Game Mode:** ${data.gameMode}` : null,
    data.rerolls !== undefined ? `- **Max Rerolls:** ${data.rerolls}` : null,
    data.bountyQty !== undefined
      ? `- **Max Bounties:** ${data.bountyQty}`
      : null,
    data.daysToExpire !== undefined
      ? `- **Expiration:** ${data.daysToExpire === 0 ? 'Never' : `${data.daysToExpire} day(s)`}`
      : null,
  ].filter(Boolean) as string[];

  const embed = new EmbedBuilder()
    .setTitle('Rules Updated')
    .setDescription(description.join('\n'))
    .setColor(Colors.Blue);

  return { embeds: [embed], content: '' };
}
