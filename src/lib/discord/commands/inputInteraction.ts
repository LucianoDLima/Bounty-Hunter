import { ChatInputCommandInteraction } from 'discord.js';
import { handleStartUp } from '../../../controller/handleStartUp';

export async function handleChatInputCommand(
  interaction: ChatInputCommandInteraction,
) {
  if (interaction.commandName === 'create') {
    await handleStartUp(interaction);
  }

  if (interaction.commandName === 'rules') {
    await interaction.reply('rules command - placeholder');
  }
}
