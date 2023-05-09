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
  console.log('zodparsing...');
  const data = BikeRentalList.parse(object);
  const MAX_INPUT_SIZE = 10000;

  console.log('Complete!');

  console.log('generate list for createMany...');
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


  console.log('Complete!');

  console.log('Add many to db...');

  const totalCount: { count: number } = {
    count: 0
  };

  if (bikeRentalList.length > MAX_INPUT_SIZE) {
    console.log('Array size too large, splitting into smaller batches...');
    let currentLength = bikeRentalList.length;
    let i = 0;
    while (currentLength>0) {
      console.log(`Batch ${i+1}...`);
      const count = await prisma.bikeRental.createMany({
        data:bikeRentalList.slice(i*MAX_INPUT_SIZE,(i+1)*MAX_INPUT_SIZE),
        skipDuplicates: true,
      });
      currentLength -= MAX_INPUT_SIZE;
      totalCount.count += count.count;
      i += 1;
      console.log(`Batch ${i+1} done!`);
    }
  } else {
    const count = await prisma.bikeRental.createMany({
      data:bikeRentalList,
      skipDuplicates: true,
    });
    totalCount.count += count.count;
  }



  console.log('Transfer complete!');

  return totalCount;
};

const getPage = async (itemNumber: number, skipNumber: number) => {
  const bikeRentals = await prisma.bikeRental.findMany({
    skip: skipNumber,
    take: itemNumber,
  });

  return bikeRentals;
};

export default { getAll, getPage, addNew, addMany };