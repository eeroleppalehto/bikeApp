import { PrismaClient, Prisma } from "@prisma/client";
import { stationInput, StationList } from "../models/station";

const prisma = new PrismaClient();

const getAll = async () => {
  const allStations = await prisma.station.findMany();
  return allStations;
};

const addNew = async (object: unknown) => {
  const data = stationInput.parse(object);
  const {
    stationNum,
    name,
    nameFi,
    nameSwe,
    address,
    addressSwe,
    city,
    citySwe,
    operator,
    capasity,
    x_cord,
    y_cord
  } = data;

  const newStation = await prisma.station.create({
    data: {
      stationNum,
      name,
      nameFi,
      nameSwe,
      address,
      addressSwe,
      city,
      citySwe,
      operator,
      capasity,
      x_cord: new Prisma.Decimal(x_cord),
      y_cord: new Prisma.Decimal(y_cord)
    }
  });

  return newStation;
};

const addMany = async (object: unknown | unknown[]) => {
  const data = StationList.parse(object);
  
  const stationList: Prisma.StationUncheckedCreateInput[] = data.map(item => {
    const station = {
      stationNum: item.stationNum,
      name: item.name,
      nameFi: item.nameFi,
      nameSwe: item.nameSwe,
      address: item.address,
      addressSwe: item.addressSwe,
      city: item.city,
      citySwe: item.citySwe,
      operator: item.operator,
      capasity: item.capasity,
      x_cord: new Prisma.Decimal(item.x_cord),
      y_cord: new Prisma.Decimal(item.y_cord)
    };
    return station;
  });

  const count = await prisma.station.createMany({
    data: stationList,
    skipDuplicates: true,
  });
  
  return count;
};


export default { getAll, addNew, addMany };