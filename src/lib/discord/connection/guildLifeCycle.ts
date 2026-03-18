import { Client, Events } from 'discord.js';
import { createClan, inactivateClan } from '../../queries/clan/clan';

/**
 * Create a row for the discord server as soon as the bot joins
 * If bot is kicked, server is marked as inactive but data is preserved in case of rejoining
 */
export function guildLifeCycle(client: Client) {
  client.on(Events.GuildCreate, async (guild) => {
    try {
      await createClan(guild.id, guild.name);

      console.log(`Registered/Reconnected Clan: ${guild.id}`);
    } catch (error) {
      console.error(`Error in GuildCreate for ${guild.id}:`, error);
    }
  });

  client.on(Events.GuildDelete, async (guild) => {
    console.log(`Bot removed from guild: ${guild.name}`);

    try {
      await inactivateClan(guild.id);

      console.log(`Inactivated Clan: ${guild.id}`);
    } catch (error) {
      console.error(`Error in GuildDelete for ${guild.id}:`, error);
    }
  });
}
