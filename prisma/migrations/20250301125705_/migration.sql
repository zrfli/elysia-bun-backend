/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TwoFactorAuthentication` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TwoFactorAuthentication` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TwoFactorAuthentication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secretKey]` on the table `TwoFactorAuthentication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicKey]` on the table `TwoFactorAuthentication` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identityNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicKey` to the `TwoFactorAuthentication` table without a default value. This is not possible if the table is not empty.
  - Made the column `secretKey` on table `TwoFactorAuthentication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TwoFactorAuthentication" DROP COLUMN "createdAt",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "publicKey" TEXT NOT NULL,
ADD COLUMN     "service" TEXT,
ALTER COLUMN "secretKey" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuthentication_secretKey_key" ON "TwoFactorAuthentication"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuthentication_publicKey_key" ON "TwoFactorAuthentication"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_identityNumber_key" ON "User"("identityNumber");
