import { PrismaClient } from "@prisma/client";
import { bikeRentalInput } from "../models/bikeRental";

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

export default { getAll, addNew };