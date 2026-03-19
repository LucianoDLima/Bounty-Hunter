import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { findClan } from '../lib/queries/clan/clan';

/**
 * Returns an error message if someone runs a command without the server have been set up
 */
export async function verifyClanExist(
  interaction: ChatInputCommandInteraction,
) {
  const clan = await findClan(interaction.guildId);

  if (!clan) {
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Bot is not set up for this server')
          .setDescription(
            `Make sure an admin runs the \`/create\` command to set it up!`,
          ),
      ],
    });

    return null;
  }

  return clan;
}
