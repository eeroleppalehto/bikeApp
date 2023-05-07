/*
  Warnings:

  - A unique constraint covering the columns `[stationNum]` on the table `Station` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressSwe` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFi` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameSwe` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stationNum` to the `Station` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "addressSwe" VARCHAR(255) NOT NULL,
ADD COLUMN     "citySwe" VARCHAR(255),
ADD COLUMN     "nameFi" VARCHAR(255) NOT NULL,
ADD COLUMN     "nameSwe" VARCHAR(255) NOT NULL,
ADD COLUMN     "stationNum" VARCHAR(4) NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Station_stationNum_key" ON "Station"("stationNum");
