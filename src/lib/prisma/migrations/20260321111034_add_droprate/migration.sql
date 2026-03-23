/*
  Warnings:

  - Added the required column `dropRate` to the `Drop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drop" ADD COLUMN     "dropRate" TEXT NOT NULL;
