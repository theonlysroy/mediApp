/*
  Warnings:

  - You are about to drop the column `isActice` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActice",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
