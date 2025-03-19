/*
  Warnings:

  - You are about to drop the `_PeriodToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PeriodToUser" DROP CONSTRAINT "_PeriodToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PeriodToUser" DROP CONSTRAINT "_PeriodToUser_B_fkey";

-- DropTable
DROP TABLE "_PeriodToUser";

-- CreateTable
CREATE TABLE "UserPeriods" (
    "userId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,

    CONSTRAINT "UserPeriods_pkey" PRIMARY KEY ("userId","periodId")
);

-- CreateIndex
CREATE INDEX "UserPeriods_userId_periodId_idx" ON "UserPeriods"("userId", "periodId");

-- AddForeignKey
ALTER TABLE "UserPeriods" ADD CONSTRAINT "UserPeriods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPeriods" ADD CONSTRAINT "UserPeriods_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
