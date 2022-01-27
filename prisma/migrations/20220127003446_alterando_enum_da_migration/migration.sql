/*
  Warnings:

  - The values [email,sms,push,whatsapp] on the enum `communicationTypes` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `Communications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "communicationTypes_new" AS ENUM ('EMAIL', 'SMS', 'PUSH', 'WHATSAP');
ALTER TABLE "Messages" ALTER COLUMN "type" TYPE "communicationTypes_new" USING ("type"::text::"communicationTypes_new");
ALTER TYPE "communicationTypes" RENAME TO "communicationTypes_old";
ALTER TYPE "communicationTypes_new" RENAME TO "communicationTypes";
DROP TYPE "communicationTypes_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Communications_messageId_key" ON "Communications"("messageId");
