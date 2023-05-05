/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const stationInput = z.object({
  name: z.string().max(255),
  address: z.string().max(255),
  city: z.string().max(255),
  operator: z.ostring(),
  capasity: z.number(),
  x_cord: z.string(),
  y_cord: z.string(),
  /* x_cord: z.instanceof(Prisma.Decimal),
  y_cord: z.instanceof(Prisma.Decimal) */
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