import { PrismaClient, Prisma } from "@prisma/client";
import { stationInput } from "../models/station";

const prisma = new PrismaClient();

const getAll = async () => {
  const allStations = await prisma.station.findMany();
  return allStations;
};

const addNew = async (object: unknown) => {
  const data = stationInput.parse(object);
  const { name, address, city, operator, capasity, x_cord, y_cord } = data;
  const newStation = await prisma.station.create({
    data: {
      name,
      address,
      city,
      operator,
      capasity,
      x_cord: new Prisma.Decimal(x_cord),
      y_cord: new Prisma.Decimal(y_cord)
    }
  });

  return newStation;
};



export default { getAll, addNew };