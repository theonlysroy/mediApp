/*
  Warnings:

  - The `targetIllness` column on the `MedicineUsage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MedicineUsage" DROP COLUMN "targetIllness",
ADD COLUMN     "targetIllness" TEXT[];
