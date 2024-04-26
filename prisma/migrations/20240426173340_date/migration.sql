/*
  Warnings:

  - Added the required column `date` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time1` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time2` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time3` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time4` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekday` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Check" ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "time1" TIME NOT NULL,
ADD COLUMN     "time2" TIMESTAMP NOT NULL,
ADD COLUMN     "time3" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "time4" TIMETZ NOT NULL,
ADD COLUMN     "weekday" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
