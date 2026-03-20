/*
  Warnings:

  - Added the required column `discordLink` to the `BountyHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BountyHistory" ADD COLUMN     "discordLink" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rule" ALTER COLUMN "daysToExpire" SET DEFAULT 0,
ALTER COLUMN "rerolls" SET DEFAULT 3;
