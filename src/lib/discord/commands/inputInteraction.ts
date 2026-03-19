import { ChatInputCommandInteraction } from 'discord.js';
import { handleStartUp } from '../../../controller/handleStartUp';
import { handleSetRules } from '../../../controller/handleSetRules';

export async function handleChatInputCommand(
  interaction: ChatInputCommandInteraction,
) {
  if (interaction.commandName === 'create') {
    await handleStartUp(interaction);
  }

  if (interaction.commandName === 'rules') {
    await handleSetRules(interaction);
  }
}
