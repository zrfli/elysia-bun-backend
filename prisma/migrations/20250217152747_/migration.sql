/*
  Warnings:

  - You are about to drop the column `createdAt` on the `UserDetails` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `UserDetails` table. All the data in the column will be lost.
  - Made the column `address` on table `UserDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `UserDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;

-- CreateIndex
CREATE INDEX "IbanInformation_id_userId_idx" ON "IbanInformation"("id", "userId");

-- CreateIndex
CREATE INDEX "TwoFactorAuthentication_id_userId_idx" ON "TwoFactorAuthentication"("id", "userId");

-- CreateIndex
CREATE INDEX "Verification_id_userId_idx" ON "Verification"("id", "userId");
