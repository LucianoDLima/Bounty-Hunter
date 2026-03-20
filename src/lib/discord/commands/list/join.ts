import {  SlashCommandBuilder } from 'discord.js';

export function cmdJoinEvent() {
  return new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the Bounty Hunter leaderboard')
    .addStringOption((option) =>
      option
        .setName('ign')
        .setDescription('Enter your in-game name')
        .setRequired(true),
    );
}
