/*
  Warnings:

  - Added the required column `companyId` to the `Kudos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kudos" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Kudos" ADD CONSTRAINT "Kudos_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
