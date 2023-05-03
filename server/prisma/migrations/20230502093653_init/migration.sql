-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "operator" VARCHAR(255),
    "capasity" INTEGER NOT NULL,
    "x_cord" DECIMAL(65,30) NOT NULL,
    "y_cord" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikeRental" (
    "id" SERIAL NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "return" TIMESTAMP(3) NOT NULL,
    "departureStationId" INTEGER NOT NULL,
    "returnStationId" INTEGER NOT NULL,
    "coveredDistance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "BikeRental_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- AddForeignKey
ALTER TABLE "BikeRental" ADD CONSTRAINT "BikeRental_departureStationId_fkey" FOREIGN KEY ("departureStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRental" ADD CONSTRAINT "BikeRental_returnStationId_fkey" FOREIGN KEY ("returnStationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
