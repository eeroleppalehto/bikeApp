/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from "@prisma/client";
import { z } from "zod";

const validateNumber = (value: string) => {
  try {
    Number(value);
    return true;
  } catch {
    return false;
  }
};

export const bikeRentalInput = z.object({
  departureTime: z.string().datetime({ offset: true}),
  returnTime: z.string().datetime({ offset: true}),
  departureStationId: z.string().refine(validateNumber),
  returnStationId: z.string().refine(validateNumber),
  coveredDistance: z.number().positive(),
  duration: z.number().positive()
}) satisfies z.Schema<Prisma.BikeRentalUncheckedCreateInput>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const BikeRentalValidation = Prisma.defineExtension({
  query: {
    bikeRental: {
      create({ args, query }) {
        args.data = bikeRentalInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = bikeRentalInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = bikeRentalInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = bikeRentalInput.parse(args.create);
        args.update = bikeRentalInput.partial().parse(args.update);
        return query(args);
      },
    },
  },
});

export const BikeRentalList = z.array(bikeRentalInput);