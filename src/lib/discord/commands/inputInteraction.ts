import { ChatInputCommandInteraction } from 'discord.js';

export async function handleChatInputCommand(
  interaction: ChatInputCommandInteraction,
) {
  if (interaction.commandName === 'create') {
    await interaction.reply('create command - placeholder');
  }
}
