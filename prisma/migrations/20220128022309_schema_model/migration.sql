-- CreateEnum
CREATE TYPE "CommunicationTypes" AS ENUM ('EMAIL', 'SMS', 'PUSH', 'WHATSAP');

-- CreateEnum
CREATE TYPE "CommunicationStatus" AS ENUM ('PENDING', 'SENT', 'CANCELLED');

-- CreateTable
CREATE TABLE "Communications" (
    "id" TEXT NOT NULL,
    "shipping_date" TIMESTAMP(3) NOT NULL,
    "recipient" TEXT NOT NULL,
    "status" "CommunicationStatus" NOT NULL DEFAULT E'PENDING',
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_id" TEXT NOT NULL,

    CONSTRAINT "Communications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "type" "CommunicationTypes" NOT NULL,
    "content" TEXT,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Communications_message_id_key" ON "Communications"("message_id");

-- AddForeignKey
ALTER TABLE "Communications" ADD CONSTRAINT "Communications_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
