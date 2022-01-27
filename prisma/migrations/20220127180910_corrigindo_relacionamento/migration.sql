/*
  Warnings:

  - Made the column `message_id` on table `Communications` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Communications" DROP CONSTRAINT "Communications_message_id_fkey";

-- AlterTable
ALTER TABLE "Communications" ALTER COLUMN "message_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Communications" ADD CONSTRAINT "Communications_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
