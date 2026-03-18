import dotenv from 'dotenv';
import { REST, Routes } from 'discord.js';
import { commandList } from '../commands/commands';

dotenv.config();

const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

if (!clientId || !token) {
  throw new Error(
    'Missing environment variables: CLIENT_ID and/or DISCORD_TOKEN',
  );
}

commandList.map((item) => item.commandList.toJSON());
commandList.map(({ commandList }) => commandList.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commandList.length} application (/) commands.`,
    );

    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commandList.map(({ commandList }) => commandList.toJSON()),
    });

    if (Array.isArray(data)) {
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`,
      );
    }
  } catch (error) {
    console.error(error);
  }
})();
