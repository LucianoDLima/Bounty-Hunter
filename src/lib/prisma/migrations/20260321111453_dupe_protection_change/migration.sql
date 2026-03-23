/*
  Warnings:

  - You are about to drop the column `dupeProtection` on the `Boss` table. All the data in the column will be lost.
  - Added the required column `dupeProtection` to the `Drop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boss" DROP COLUMN "dupeProtection";

-- AlterTable
ALTER TABLE "Drop" ADD COLUMN     "dupeProtection" BOOLEAN NOT NULL;
