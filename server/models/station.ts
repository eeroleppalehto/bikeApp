/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Prisma } from "@prisma/client";
import { z } from "zod";

const validateDecimal = (value: string) => {
  try {
    new Prisma.Decimal(value);
    return true;
  } catch {
    return false;
  }
};

const validateNumber = (value: string) => {
  try {
    Number(value);
    return true;
  } catch {
    return false;
  }
};

export const stationInput = z.object({
  stationNum: z.string().refine(validateNumber),
  name: z.string().max(255),
  nameFi: z.string().max(255),
  nameSwe: z.string().max(255),
  address: z.string().max(255),
  addressSwe: z.string().max(255),
  city: z.ostring(),
  citySwe: z.ostring(),
  operator: z.ostring(),
  capasity: z.number(),
  x_cord: z.string().refine(validateDecimal),
  y_cord: z.string().refine(validateDecimal),
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


export const StationList = z.array(stationInput);