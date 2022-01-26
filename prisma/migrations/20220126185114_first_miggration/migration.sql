-- CreateEnum
CREATE TYPE "communicationTypes" AS ENUM ('email', 'sms', 'push', 'whatsapp');

-- CreateTable
CREATE TABLE "Communication" (
    "id" TEXT NOT NULL,
    "shipping_date" TIMESTAMP(3) NOT NULL,
    "recipient" TEXT NOT NULL,
    "already_delivered" BOOLEAN NOT NULL DEFAULT false,
    "messageId" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "type" "communicationTypes" NOT NULL,
    "content" TEXT,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Communication_messageId_key" ON "Communication"("messageId");

-- AddForeignKey
ALTER TABLE "Communication" ADD CONSTRAINT "Communication_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
