/*
  Warnings:

  - You are about to drop the `UserPeriods` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPeriods" DROP CONSTRAINT "UserPeriods_periodId_fkey";

-- DropForeignKey
ALTER TABLE "UserPeriods" DROP CONSTRAINT "UserPeriods_userId_fkey";

-- DropTable
DROP TABLE "UserPeriods";

-- CreateTable
CREATE TABLE "_UserPeriods" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserPeriods_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserPeriods_B_index" ON "_UserPeriods"("B");

-- AddForeignKey
ALTER TABLE "_UserPeriods" ADD CONSTRAINT "_UserPeriods_A_fkey" FOREIGN KEY ("A") REFERENCES "Period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPeriods" ADD CONSTRAINT "_UserPeriods_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
