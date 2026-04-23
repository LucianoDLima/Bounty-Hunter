import { SlashCommandBuilder } from 'discord.js';

export function cmdBounty() {
  return new SlashCommandBuilder()
    .setName('bounty')
    .setDescription('Get or submit a bounty')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('random')
        .setDescription('Get a random bounty.'),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('submit')
        .setDescription('Submit proof for your active bounty')
        .addAttachmentOption((option) =>
          option
            .setName('proof')
            .setDescription('Screenshot of the drop or collection log')
            .setRequired(true),
        ),
    );
}
