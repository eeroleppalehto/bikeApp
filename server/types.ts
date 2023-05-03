import { Station } from "@prisma/client";

export type StationWithOutId = Omit<Station, "id">;





