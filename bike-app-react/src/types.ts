import { z } from "zod";

export const stationSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255),
  address: z.string().max(255),
  city: z.string().max(255),
  operator: z.ostring(),
  capasity: z.number(),
  x_cord: z.string(),
  y_cord: z.string()
});

export type Station = z.infer<typeof stationSchema>;

export const bikeRentalInput = z.object({
  id: z.number().int(),
  departureTime: z.string().datetime(),
  returnTime: z.string().datetime(),
  departureStationId: z.number().int().positive(),
  returnStationId: z.number().int().positive(),
  coveredDistance: z.number().int().positive(),
  duration: z.number().int().positive()
});

export type BikeRenatal = z.infer<typeof bikeRentalInput>;