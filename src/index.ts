import dotenv from 'dotenv';
import { createClient } from './lib/discord/config/client';
import { commandInteraction } from './lib/discord/connection/commandInteraction';
import { guildLifeCycle } from './lib/discord/connection/guildLifeCycle';

dotenv.config();

const client = createClient();

client.once('clientReady', () => {
  if (!client.user) {
    throw new Error('Client user is not defined');
  }

  console.log(`Disc bot online: ${client.user.tag}`);
});

commandInteraction(client);

guildLifeCycle(client);

client.login(process.env.DISCORD_TOKEN);
