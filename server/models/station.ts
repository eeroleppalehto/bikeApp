/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const stationInput = z.object({
  name: z.string().max(255),
  address: z.string().max(255),
  city: z.string().max(255),
  operator: z.ostring(),
  capasity: z.number(),
  x_cord: z.instanceof(Prisma.Decimal).refine((price) => price.gte("0.01") && price.lt("1000000.00")),
  y_cord: z.instanceof(Prisma.Decimal).refine((price) => price.gte("0.01") && price.lt("1000000.00"))
}) satisfies z.Schema<Prisma.StationUncheckedCreateInput>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const StationValidation = Prisma.defineExtension({
  query: {
    station: {
      create({ args, query }) {
        args.data = stationInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = stationInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = stationInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = stationInput.parse(args.create);
        args.update = stationInput.partial().parse(args.update);
        return query(args);
      },
    },
  },
});