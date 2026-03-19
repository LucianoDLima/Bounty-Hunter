import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  Colors,
} from 'discord.js';
import { GameMode } from '@prisma/client';
import { startUp } from '../service/startUp';

/**
 * Handle the setup process for adding a Bounty Hunter event to a server
 */
export async function handleStartUp(interaction: ChatInputCommandInteraction) {
  const selectedMode = interaction.options.getString('gamemode', true) as GameMode;

  const { guildId, guild } = interaction;
  if (!guildId || !guild) return;

  const response = await interaction.reply(getConfirmationUI(selectedMode));

  try {
    const confirmation = await response.awaitMessageComponent({
      filter: (i) => i.user.id === interaction.user.id,
      time: 180000,
      componentType: ComponentType.Button,
    });

    if (confirmation.customId === 'confirm_startup') {
      await confirmation.update({
        content: 'Processing...',
        embeds: [],
        components: [],
      });

      await startUp(guildId, guild.name, selectedMode);

      await confirmation.editReply(getSuccessUI(selectedMode));
    } else {
      await confirmation.update({
        content: 'Setup cancelled.',
        embeds: [],
        components: [],
      });
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'GAME_ALREADY_SET') {
      return await interaction.editReply(getAlreadySetUI());
    }

    await interaction.editReply({
      content: 'Confirmation timed out. Please run the command again.',
      components: [],
      embeds: [],
    });
    console.log(error);
  }
}

function getConfirmationUI(selectedMode: GameMode) {
  const description = [
    `You are about to start a Bounty Hunter for **${selectedMode}**.`,
    '',
    '**Warning:** This setting **cannot be changed** later.',
    'Are you sure you want to proceed?',
  ];

  const embed = new EmbedBuilder()
    .setTitle('Final Confirmation')
    .setDescription(description.join('\n'))
    .setColor(Colors.Yellow);

  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('confirm_startup')
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('cancel_startup')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Danger),
  );

  return { embeds: [embed], components: [buttons], ephemeral: true };
}

function getSuccessUI(selectedMode: GameMode) {
  const description = [
    `Bounty Hunter has been successfully set up for **${selectedMode}**!`,
    '',
    'You can now run `/rule` to set up your rules.',
    'You can also run `/help` to see all available commands and how to use them.',
  ];

  const embed = new EmbedBuilder()
    .setTitle('Bounty Hunter setup complete!')
    .setDescription(description.join('\n'))
    .setColor(Colors.Green);

  return { embeds: [embed], content: '' };
}

function getAlreadySetUI() {
  const description = [
    'This server already has a game mode set.',
    '',
    'You can run `/rule [gamemode]` to change the game mode, but only if no bounties have been created yet.',
  ];

  const embed = new EmbedBuilder()
    .setTitle('Server has already been set up!')
    .setDescription(description.join('\n'))
    .setColor(Colors.Yellow)
    .setFooter({
      text: 'If you still need to change the game mode, contact luccylima on Discord.',
    });

  return { embeds: [embed], content: '' };
}
