/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Kudos` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Kudos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kudos" DROP CONSTRAINT "Kudos_receiverId_fkey";

-- AlterTable
ALTER TABLE "Kudos" DROP COLUMN "receiverId",
ADD COLUMN     "receiverId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Kudos" ADD CONSTRAINT "Kudos_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
