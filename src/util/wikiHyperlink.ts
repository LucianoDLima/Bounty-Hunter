import { GameMode } from '@prisma/client';

export function formatWikiLink(name: string, gamemode: GameMode) {
  if (gamemode === GameMode.OSRS) {
    return `[**${name}**](https://oldschool.runescape.wiki/w/${name.replace(/\s+/g, '_')})`;
  }

  return `[**${name}**](https://runescape.wiki/w/${name.replace(/\s+/g, '_')})`;
}
