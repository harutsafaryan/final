/*
  Warnings:

  - You are about to drop the column `comment` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `methodId` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Todo_reference_key";

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "comment",
ADD COLUMN     "record" TEXT;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "method",
DROP COLUMN "reference",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "methodId" INTEGER NOT NULL,
ADD COLUMN     "referenceId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Interval";

-- CreateTable
CREATE TABLE "Reference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Method" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "hours" INTEGER,
    "days" INTEGER,
    "week" INTEGER,
    "month" INTEGER,

    CONSTRAINT "Method_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "Reference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
