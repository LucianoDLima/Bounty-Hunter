import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export function cmdSetRules() {
  return new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Set the rules for the Bounty Hunter')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('gamemode')
        .setDescription('The gamemode for the rules you are setting up')
        .addChoices(
          { name: 'Runescape 3', value: 'RS3' },
          { name: 'OSRS', value: 'OSRS' },
        ),
    )
    .addIntegerOption((option) =>
      option
        .setName('rerolls')
        .setDescription('How many rerolls per bounty can a player have?')
        .setMinValue(0)
        .setMaxValue(10),
    )
    .addIntegerOption((option) =>
      option
        .setName('bounties')
        .setDescription('How many bounties can a player have at a time?')
        .setMinValue(1)
        .setMaxValue(10),
    )
    .addIntegerOption((option) =>
      option
        .setName('days')
        .setDescription(
          'How many days until a bounty expires? (0 for no expiration)',
        )
        .setMinValue(0),
    );
}
