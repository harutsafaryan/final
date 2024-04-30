/*
  Warnings:

  - You are about to drop the column `date` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `time1` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `time2` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `time3` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `time4` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `weekday` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Check` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Check" DROP COLUMN "date",
DROP COLUMN "day",
DROP COLUMN "month",
DROP COLUMN "time1",
DROP COLUMN "time2",
DROP COLUMN "time3",
DROP COLUMN "time4",
DROP COLUMN "weekday",
DROP COLUMN "year";
