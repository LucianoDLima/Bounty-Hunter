/*
  Warnings:

  - You are about to drop the column `targetDrop` on the `Bounty` table. All the data in the column will be lost.
  - You are about to drop the column `targetName` on the `Bounty` table. All the data in the column will be lost.
  - You are about to drop the column `bountiesFailed` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the `BountyHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bossId` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clanId` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BountyStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "BountyHistory" DROP CONSTRAINT "BountyHistory_clanId_fkey";

-- DropForeignKey
ALTER TABLE "BountyHistory" DROP CONSTRAINT "BountyHistory_memberId_fkey";

-- AlterTable
ALTER TABLE "Bounty" DROP COLUMN "targetDrop",
DROP COLUMN "targetName",
ADD COLUMN     "bossId" INTEGER NOT NULL,
ADD COLUMN     "clanId" INTEGER NOT NULL,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "discordLink" TEXT,
ADD COLUMN     "dropId" INTEGER,
ADD COLUMN     "status" "BountyStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "bountiesFailed";

-- DropTable
DROP TABLE "BountyHistory";

-- CreateTable
CREATE TABLE "Boss" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gameMode" "GameMode" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "dupeProtection" BOOLEAN NOT NULL,

    CONSTRAINT "Boss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "bossId" INTEGER NOT NULL,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boss_name_gameMode_key" ON "Boss"("name", "gameMode");

-- CreateIndex
CREATE UNIQUE INDEX "Drop_name_bossId_key" ON "Drop"("name", "bossId");

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "Boss"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_dropId_fkey" FOREIGN KEY ("dropId") REFERENCES "Drop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drop" ADD CONSTRAINT "Drop_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "Boss"("id") ON DELETE CASCADE ON UPDATE CASCADE;
