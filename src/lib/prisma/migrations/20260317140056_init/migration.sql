-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('OSRS', 'RS3');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD', 'ELITE');

-- CreateTable
CREATE TABLE "Clan" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "gameMode" "GameMode" NOT NULL,
    "daysToExpire" INTEGER NOT NULL,
    "rerolls" INTEGER NOT NULL,
    "clanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "ign" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "bountiesFailed" INTEGER NOT NULL DEFAULT 0,
    "clanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bounty" (
    "id" SERIAL NOT NULL,
    "targetName" TEXT NOT NULL,
    "targetDrop" TEXT NOT NULL,
    "reward" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "rerolls" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BountyHistory" (
    "id" SERIAL NOT NULL,
    "targetName" TEXT NOT NULL,
    "targetDrop" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "clanId" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BountyHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clan_guildId_key" ON "Clan"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Rule_clanId_key" ON "Rule"("clanId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_discordId_clanId_key" ON "Member"("discordId", "clanId");

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyHistory" ADD CONSTRAINT "BountyHistory_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BountyHistory" ADD CONSTRAINT "BountyHistory_clanId_fkey" FOREIGN KEY ("clanId") REFERENCES "Clan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
