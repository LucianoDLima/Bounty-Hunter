import { Client } from 'discord.js';
import { handleChatInputCommand } from '../commands/inputInteraction';

/**
 * Set up listener for command interactions in discord
 */
export function commandInteraction(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
      await handleChatInputCommand(interaction);
    }
  });
}
