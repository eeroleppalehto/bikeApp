/* import { Decimal } from "@prisma/client/runtime";
import { StationWithOutId } from "../types";

const toStationWiothOutId = (object: unknown): StationWithOutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ( 'name' in object
    && 'address' in object
    && 'city' in object
    && 'operator' in object
    && 'capasity' in object
    && 'x_cord' in object
    && 'y_cord' in object
  ) {
    const stationWithOutId: StationWithOutId = {
      name: parseText(object.name),
      address: parseText(object.address),
      city: parseText(object.city),
      operator: parseText(object.operator),
      capasity: 12,
      x_cord: 1.000 as Decimal,
      y_cord: 
    };
  }
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing field');
  }

  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}; */