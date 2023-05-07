import { Prisma, PrismaClient } from "@prisma/client";
import { BikeRentalList, bikeRentalInput } from "../models/bikeRental";

const prisma = new PrismaClient();

const getAll = async () => {
  const allBikeRentals = await prisma.bikeRental.findMany();
  return allBikeRentals;
};

const addNew = async (object: unknown) => {
  const data = bikeRentalInput.parse(object);
  const { departureTime, returnTime, departureStationId, returnStationId, coveredDistance, duration} = data;
  const newBikeRental = await prisma.bikeRental.create({
    data: {
      departureTime,
      returnTime,
      departureStationId,
      returnStationId,
      coveredDistance,
      duration
    }
  });

  return newBikeRental;
};

const addMany = async (object: unknown | unknown[]) => {
  const data = BikeRentalList.parse(object);

  const bikeRentalList: Prisma.BikeRentalUncheckedCreateInput[] = data.map(item => {
    const bikeRental = {
      departureTime: item.departureTime,
      returnTime: item.returnTime,
      departureStationId: item.departureStationId,
      returnStationId: item.returnStationId,
      coveredDistance: item.coveredDistance,
      duration: item.duration,
    };

    return bikeRental;
  });

  const count = await prisma.bikeRental.createMany({
    data:bikeRentalList,
    skipDuplicates: true,
  });

  return count;
};

export default { getAll, addNew, addMany };