/*
  Warnings:

  - You are about to drop the column `messagesId` on the `Communications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Communications" DROP CONSTRAINT "Communications_messagesId_fkey";

-- DropIndex
DROP INDEX "Communications_messagesId_key";

-- AlterTable
ALTER TABLE "Communications" DROP COLUMN "messagesId";
