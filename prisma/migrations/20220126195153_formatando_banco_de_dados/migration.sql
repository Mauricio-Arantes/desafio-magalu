/*
  Warnings:

  - You are about to drop the `Communication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Communication" DROP CONSTRAINT "Communication_messageId_fkey";

-- DropTable
DROP TABLE "Communication";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "Communications" (
    "id" TEXT NOT NULL,
    "shipping_date" TIMESTAMP(3) NOT NULL,
    "recipient" TEXT NOT NULL,
    "already_delivered" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messagesId" TEXT,

    CONSTRAINT "Communications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "type" "communicationTypes" NOT NULL,
    "content" TEXT,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Communications_messagesId_key" ON "Communications"("messagesId");

-- AddForeignKey
ALTER TABLE "Communications" ADD CONSTRAINT "Communications_messagesId_fkey" FOREIGN KEY ("messagesId") REFERENCES "Messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
