import { PrismaClient } from "@prisma/client";
import { StationValidation, stationInput } from "../models/station";

const prisma = new PrismaClient()
  .$extends(StationValidation);

const getAll = async () => {
  const allStations = await prisma.station.findMany();
  return allStations;
};

const addNew = async (object: unknown) => {
  try {
    const data = stationInput.parse(object);
    const { name, address, city, operator, capasity, x_cord, y_cord } = data;
    const newStation = await prisma.station.create({
      data: {
        name,
        address,
        city,
        operator,
        capasity,
        x_cord,
        y_cord
      }
    });

    return newStation;
  } catch (error: unknown) {
    console.log('asd');
  }
};


export default { getAll, addNew };