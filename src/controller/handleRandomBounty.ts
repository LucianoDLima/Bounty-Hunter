import {
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  User,
} from 'discord.js';
import { verifyClanExist } from '../middleware/verifyClan';
import { generateRandomBounty } from '../service/randomBounty';
import { formatWikiLink } from '../util/wikiHyperlink';
import { Prisma } from '@prisma/client';

export async function handleRandomBounty(
  interaction: ChatInputCommandInteraction,
) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  try {
    const clan = await verifyClanExist(interaction);
    if (!clan) return;

    const result = await generateRandomBounty(interaction.user.id, clan.id);

    if ('error' in result) {
      const errorMessages: Record<string, string> = {
        MEMBER_NOT_FOUND:
          'You are not registered yet. Use `/join [your RSN]` to join the Bounty Hunter!',
        MAX_BOUNTIES_REACHED:
          'You have reached your maximum active bounties limit.',
        NO_RULES: 'Your clan has not set up the event yet.',
      };

      return interaction.editReply(errorMessages[result.error]);
    }

    if (interaction.channel) {
      await interaction.channel.send(
        getBountyAssignedUI(interaction.user, result.bounty),
      );
    }

    await interaction.editReply('Bounty successfully generated!');
  } catch (error) {
    console.error('Error getting bounty:', error);

    await interaction.editReply(
      'An unexpected error occurred while generating your bounty.',
    );
  }
}

type BountyWithRelations = Prisma.BountyGetPayload<{
  include: { boss: true; drop: true };
}>;

export function getBountyAssignedUI(user: User, bounty: BountyWithRelations) {
  const target = bounty.drop
    ? `${formatWikiLink(bounty.drop.name, bounty.boss.gameMode)} from ${formatWikiLink(bounty.boss.name, bounty.boss.gameMode)}`
    : `Any drop from ${formatWikiLink(bounty.boss.name, bounty.boss.gameMode)}`;

  const expirationValue = bounty.expiresAt
    ? `<t:${Math.floor(bounty.expiresAt.getTime() / 1000)}:R>`
    : 'Never';

  const embed = new EmbedBuilder()
    .setTitle('New Bounty')
    .setDescription(`<@${user.id}> has received a new target!`)
    .addFields(
      { name: 'Target', value: target, inline: false },
      { name: 'Points', value: `${bounty.reward}`, inline: true },
      { name: 'Rerolls', value: `${bounty.rerolls}`, inline: true },
      { name: 'Expires', value: expirationValue, inline: true },
    )
    .setColor(Colors.DarkRed);
  // .setThumbnail(''); TODO: I'll see how i can get boss icons without storing the images myself

  return { embeds: [embed] };
}
