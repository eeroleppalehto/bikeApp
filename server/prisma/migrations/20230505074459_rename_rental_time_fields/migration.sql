/*
  Warnings:

  - You are about to drop the column `departure` on the `BikeRental` table. All the data in the column will be lost.
  - You are about to drop the column `return` on the `BikeRental` table. All the data in the column will be lost.
  - Added the required column `departureTime` to the `BikeRental` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnTime` to the `BikeRental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BikeRental" DROP COLUMN "departure",
DROP COLUMN "return",
ADD COLUMN     "departureTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returnTime" TIMESTAMP(3) NOT NULL;
