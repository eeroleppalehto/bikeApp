import { PrismaClient, Prisma } from "@prisma/client";
import { StationWithOutId } from "../types";

const prisma = new PrismaClient();

const getAll = async () => {
  const allStations = await prisma.station.findMany();
  return allStations;
};

const addNew = async (object: unknown) => {
  const { name, address, city, operator, capasity, x_cord, y_cord } = object;
  const result = await prisma.station.create({
    data: {
      name,
      address,
      city,
      operator,
      capasity,
      x_cord,
      y_cord
    },
  });


  return result;
};

export default { getAll, addNew };