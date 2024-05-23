/*
  Warnings:

  - You are about to drop the column `date` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Check` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Check" DROP COLUMN "date",
DROP COLUMN "month",
DROP COLUMN "year";
