/*
  Warnings:

  - You are about to drop the column `messageId` on the `Communications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[message_id]` on the table `Communications` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Communications" DROP CONSTRAINT "Communications_messageId_fkey";

-- DropIndex
DROP INDEX "Communications_messageId_key";

-- AlterTable
ALTER TABLE "Communications" DROP COLUMN "messageId",
ADD COLUMN     "message_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Communications_message_id_key" ON "Communications"("message_id");

-- AddForeignKey
ALTER TABLE "Communications" ADD CONSTRAINT "Communications_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
