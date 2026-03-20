import { SlashCommandBuilder } from 'discord.js';

export function cmdNameChange() {
  return new SlashCommandBuilder()
    .setName('namechange')
    .setDescription('Change your in-game name')
    .addStringOption((option) =>
      option
        .setName('ign')
        .setDescription('Enter your new in-game name')
        .setRequired(true),
    );
}
