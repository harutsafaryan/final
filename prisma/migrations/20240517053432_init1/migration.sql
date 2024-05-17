/*
  Warnings:

  - Added the required column `value` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check" ADD COLUMN     "text" TEXT,
DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;
