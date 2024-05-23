/*
  Warnings:

  - You are about to drop the column `day` on the `Check` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Check" DROP COLUMN "day",
ADD COLUMN     "date" INTEGER;
