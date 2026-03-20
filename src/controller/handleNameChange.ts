import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';
import { verifyClanExist } from '../middleware/verifyClan';
import { updateMemberName } from '../service/updateMemberName';

export async function handleNameChange(
  interaction: ChatInputCommandInteraction,
) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const newIgn = interaction.options.getString('ign', true);

  try {
    const clan = await verifyClanExist(interaction);
    if (!clan) return;

    await updateMemberName(interaction.user.id, clan.id, newIgn);

    await interaction.editReply(
      `Successfully updated your in-game name to **${newIgn}**!`,
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'MEMBER_NOT_FOUND') {
      return interaction.editReply(
        'You are not registered yet! Use `/join` join the Bounty Hunter event.',
      );
    }

    console.error('Error changing name:', error);

    await interaction.editReply(
      'An error occurred while trying to change your name.',
    );
  }
}
