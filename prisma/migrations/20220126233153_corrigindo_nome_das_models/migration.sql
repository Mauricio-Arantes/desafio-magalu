-- AlterTable
ALTER TABLE "Communications" ADD COLUMN     "messageId" TEXT;

-- AddForeignKey
ALTER TABLE "Communications" ADD CONSTRAINT "Communications_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
