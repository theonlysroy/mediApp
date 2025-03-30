-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('APP', 'WEBSITE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "dob" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT NOT NULL,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "isActice" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "refreshToken" TEXT NOT NULL,
    "referrer" "DeviceType" NOT NULL,
    "ip" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineUsage" (
    "id" TEXT NOT NULL,
    "drug" TEXT NOT NULL,
    "targetIllness" TEXT NOT NULL,
    "dosagePerDay" INTEGER NOT NULL,
    "durationInDays" INTEGER NOT NULL,
    "supportingDocs" TEXT[],

    CONSTRAINT "MedicineUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastSurgeries" (
    "id" TEXT NOT NULL,
    "surgery" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doctor" TEXT,
    "hospital" TEXT,
    "supportingDocs" TEXT[],

    CONSTRAINT "PastSurgeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergies" (
    "id" TEXT NOT NULL,
    "allergy" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "medicines" TEXT[],
    "supportingDocs" TEXT[],

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
