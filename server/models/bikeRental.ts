/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const bikeRentalInput = z.object({
  departureTime: z.string().datetime(),
  returnTime: z.string().datetime(),
  departureStationId: z.number().int().positive(),
  returnStationId: z.number().int().positive(),
  coveredDistance: z.number().int().positive(),
  duration: z.number().int().positive()
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