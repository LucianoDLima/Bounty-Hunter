import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export function cmdCreateEvent() {
  return new SlashCommandBuilder()
    .setName('start')
    .setDescription('Bounty Hunter system')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('gamemode')
        .setDescription('Select your game mode')
        .setRequired(true)
        .addChoices(
          { name: 'Runescape 3', value: 'RS3' },
          { name: 'OSRS', value: 'OSRS' },
        ),
    );
}
