/*
  Warnings:

  - You are about to drop the column `description` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Check` table. All the data in the column will be lost.
  - You are about to drop the `ToDo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `todoId` to the `Check` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_checkId_fkey";

-- AlterTable
ALTER TABLE "Check" DROP COLUMN "description",
DROP COLUMN "interval",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "todoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ToDo";

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "method" "Interval" NOT NULL DEFAULT 'DAILY',
    "location" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Todo_reference_key" ON "Todo"("reference");

-- AddForeignKey
ALTER TABLE "Check" ADD CONSTRAINT "Check_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
