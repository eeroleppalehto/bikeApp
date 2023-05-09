-- DropForeignKey
ALTER TABLE "BikeRental" DROP CONSTRAINT "BikeRental_departureStationId_fkey";

-- DropForeignKey
ALTER TABLE "BikeRental" DROP CONSTRAINT "BikeRental_returnStationId_fkey";

-- AlterTable
ALTER TABLE "BikeRental" ALTER COLUMN "departureStationId" SET DATA TYPE TEXT,
ALTER COLUMN "returnStationId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "BikeRental" ADD CONSTRAINT "BikeRental_departureStationId_fkey" FOREIGN KEY ("departureStationId") REFERENCES "Station"("stationNum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRental" ADD CONSTRAINT "BikeRental_returnStationId_fkey" FOREIGN KEY ("returnStationId") REFERENCES "Station"("stationNum") ON DELETE RESTRICT ON UPDATE CASCADE;
