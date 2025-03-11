-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('ELECTIVE', 'COMPULSORY');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('SPRING', 'FALL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ACADEMICIAN', 'PERSONAL', 'MANAGER', 'DEVELOPER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "DepartmentLanguage" AS ENUM ('TR', 'EN', 'TR_EN');

-- CreateTable
CREATE TABLE "Nationality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nationality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "departmentName" TEXT NOT NULL,
    "academicianId" TEXT,
    "language" "DepartmentLanguage" NOT NULL DEFAULT 'TR',
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "year" INTEGER,
    "isDepartment" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "period" JSONB NOT NULL DEFAULT '[{"S": 0, "SM": 0, "YE": null, "YS": null}]',

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicInfo" (
    "id" TEXT NOT NULL,
    "degree" INTEGER NOT NULL DEFAULT 0,
    "arrivalType" TEXT,
    "grants" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "semester" "Semester" NOT NULL,
    "departmentId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,

    CONSTRAINT "AcademicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IbanInformation" (
    "id" TEXT NOT NULL,
    "fullName" TEXT,
    "iban" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IbanInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorAuthentication" (
    "id" TEXT NOT NULL,
    "secretKey" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identity" INTEGER NOT NULL DEFAULT 0,
    "info" INTEGER NOT NULL DEFAULT 0,
    "privacy" INTEGER NOT NULL DEFAULT 0,
    "contracts" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "phoneNumber" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT DEFAULT '/profile/avatar/default.webp',
    "birthday" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "identityNumber" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "nationalityId" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "lessonCode" TEXT NOT NULL,
    "lessonName" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "letterRange" JSONB NOT NULL DEFAULT '{"AA": {"end": 100, "start": 90}, "BA": {"end": 90, "start": 80}, "BB": {"end": 80, "start": 75}, "CB": {"end": 75, "start": 65}, "CC": {"end": 65, "start": 60}, "DC": {"end": 60, "start": 55}, "DD": {"end": 55, "start": 50}, "FD": {"end": 50, "start": 0}, "FF": {"end": 49, "start": 0}}',
    "semester" "Semester" NOT NULL,
    "degree" INTEGER NOT NULL,
    "attendance" BOOLEAN NOT NULL,
    "instructorId" TEXT NOT NULL,
    "type" JSONB NOT NULL DEFAULT '{"online": 0, "rector": 0, "optional": 0, "compulsory": 0}',
    "creditSystem" JSONB NOT NULL DEFAULT '{"ects": 6, "credit": 3}',
    "gradeWeight" JSONB NOT NULL DEFAULT '{"visa": 40, "final": 60}',

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "repeatData" TEXT,
    "exempted" BOOLEAN NOT NULL DEFAULT false,
    "isConcluded" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "notes" JSONB NOT NULL DEFAULT '{"visa": [{"M": 0, "O": null, "P": 0, "S": 0, "U": null, "MP": 0, "PD": null, "MPD": null}], "final": [{"M": null, "O": null, "P": 0, "S": null, "U": null, "MP": 0, "PD": null, "MPD": null}], "result": [{"N": null, "LG": null}], "remedial": [{"P": 0, "S": null, "PD": null}]}',

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_name_key" ON "Nationality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_abbreviation_key" ON "Nationality"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_code_key" ON "Nationality"("code");

-- CreateIndex
CREATE INDEX "Nationality_id_idx" ON "Nationality"("id");

-- CreateIndex
CREATE INDEX "Department_unitId_idx" ON "Department"("unitId");

-- CreateIndex
CREATE INDEX "Unit_id_idx" ON "Unit"("id");

-- CreateIndex
CREATE INDEX "Period_id_idx" ON "Period"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInfo_userId_key" ON "AcademicInfo"("userId");

-- CreateIndex
CREATE INDEX "AcademicInfo_id_idx" ON "AcademicInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "IbanInformation_userId_key" ON "IbanInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorAuthentication_userId_key" ON "TwoFactorAuthentication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_userId_key" ON "Verification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_phoneNumber_key" ON "UserDetails"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- CreateIndex
CREATE INDEX "UserDetails_id_userId_idx" ON "UserDetails"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_identityNumber_idx" ON "User"("identityNumber");

-- CreateIndex
CREATE INDEX "User_firstname_lastname_idx" ON "User"("firstname", "lastname");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_sessionToken_userId_idx" ON "Session"("sessionToken", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_lessonCode_key" ON "Lesson"("lessonCode");

-- CreateIndex
CREATE INDEX "Lesson_instructorId_semester_degree_idx" ON "Lesson"("instructorId", "semester", "degree");

-- CreateIndex
CREATE INDEX "Lesson_id_idx" ON "Lesson"("id");

-- CreateIndex
CREATE INDEX "Notes_id_userId_idx" ON "Notes"("id", "userId");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicInfo" ADD CONSTRAINT "AcademicInfo_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicInfo" ADD CONSTRAINT "AcademicInfo_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicInfo" ADD CONSTRAINT "AcademicInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IbanInformation" ADD CONSTRAINT "IbanInformation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorAuthentication" ADD CONSTRAINT "TwoFactorAuthentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Nationality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
