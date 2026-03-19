import { GameMode } from '@prisma/client';

export interface RuleSettings {
  gameMode?: GameMode;
  daysToExpire?: number | null;
  rerolls?: number | null;
  bountyQty?: number | null;
}
