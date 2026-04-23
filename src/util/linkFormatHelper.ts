import { GameMode } from '@prisma/client';

/**
 * Create a hyperlink for the given boss and/or drop
 *
 * @param name - Name of the boss
 * @param gamemode - Game mode (OSRS or RS3)
 */
export function generateHyperlink(name: string, gamemode: GameMode) {
  if (gamemode === GameMode.OSRS) {
    return `[**${name}**](https://oldschool.runescape.wiki/w/${name.replace(/\s+/g, '_')})`;
  }

  return `[**${name}**](https://runescape.wiki/w/${name.replace(/\s+/g, '_')})`;
}

/**
 * Link to the thumbnail image for the given boss
 *
 * @param name - Name of the boss
 * @param gamemode - Game mode (OSRS or RS3)
 */
export function generateThumbnail(name: string, gamemode: GameMode) {
  const imageName = SPECIAL_THUMBNAILS[name] || name.replace(/\s+/g, '_');

  const baseUrl =
    gamemode === GameMode.OSRS
      ? 'https://oldschool.runescape.wiki/images'
      : 'https://runescape.wiki/images';

  return `${baseUrl}/${imageName}.png`;
}

// TODO: Find a better way of doing this, maybe by adding a "thumbnailName" field to the Boss model as handling special cases like this is not viable longterm
const SPECIAL_THUMBNAILS: Record<string, string> = {
  'Barrows chest': 'Dharok_the_Wretched',
  'Dagannoth Kings': 'Dagannoth_Rex',
};
