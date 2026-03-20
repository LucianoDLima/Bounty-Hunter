import {
  ChatInputCommandInteraction,
  Colors,
  EmbedBuilder,
  MessageFlags,
  User,
} from 'discord.js';
import { verifyClanExist } from '../middleware/verifyClan';
import { registerNewMember } from '../service/registerNewMember';

/**
 * Handle the /join [name] command
 * - Verifies the clan exists
 * - Registers the user as a new member with their in-game name
 */
export async function handleJoinEvent(
  interaction: ChatInputCommandInteraction,
) {
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const ign = interaction.options.getString('ign', true);

  try {
    const clan = await verifyClanExist(interaction);
    if (!clan) return;

    const { user } = interaction;

    await registerNewMember(user.id, ign, clan.id);

    const successEmbed = getSuccessUI(ign, user);

    if (interaction.channel) {
      await interaction.channel.send(successEmbed);
    }

    await interaction.editReply('You successfully joined the Bounty Hunter leaderboard!');
  } catch (error) {
    if (error instanceof Error && error.message === 'MEMBER_EXISTS') {
      return interaction.editReply(
        'You are already registered! Use `/namechange` if you need to update your in-game name.',
      );
    }

    console.error('Error joining event:', error);
    await interaction.editReply('An error occurred while trying to join.');
  }
}

function getSuccessUI(ign: string, user: User) {
  const description = [
    `Welcome, **${ign}**! You have been registered for the Bounty Hunter.`,
    '',
    'You can get started by checking the rules with `/view rules.`',
    '',
    '- To get a bounty, use `/bounty get`.',
    '- To view your active bounties, use `/view bounties`',
    '- To submit your bounty, TODO: I first need to implement that to see how it will be done',
    '',
    '',
    'For more information, use `/help`.',
  ];

  const embed = new EmbedBuilder()
    .setTitle('New Bounty Hunter!')
    .setDescription(description.join('\n'))
    .setColor(Colors.Green)
    .setFooter({ text: 'Happy hunting!' })
    .setThumbnail(user.displayAvatarURL());

  return { embeds: [embed], content: '' };
}
