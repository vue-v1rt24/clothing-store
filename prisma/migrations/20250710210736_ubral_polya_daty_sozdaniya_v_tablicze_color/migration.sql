/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Color` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Color" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
