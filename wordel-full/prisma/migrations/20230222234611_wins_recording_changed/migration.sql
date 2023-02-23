/*
  Warnings:

  - You are about to drop the column `winsOnTry1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `winsOnTry2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `winsOnTry3` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `winsOnTry4` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `winsOnTry5` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `winsOnTry6` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "winsOnTry1",
DROP COLUMN "winsOnTry2",
DROP COLUMN "winsOnTry3",
DROP COLUMN "winsOnTry4",
DROP COLUMN "winsOnTry5",
DROP COLUMN "winsOnTry6",
ADD COLUMN     "winsDistribution" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0]::INTEGER[];
