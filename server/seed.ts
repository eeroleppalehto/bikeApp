/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import csv from 'csv-parser';
import stationService from './services/stationService';
import bikeRentalService from './services/bikeRentalService';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function importStationsFromCsv(fileName: string) {
  console.log(`Reading data from ${fileName}...`);
  const results: unknown[] = [];
  let i = 0;
  let rejectCount = 0;

  fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (data) => {
      if ('ID' in data
        && 'Nimi' in data
        && 'Namn' in data
        && 'Name' in data
        && 'Osoite' in data
        && 'Adress' in data
        && 'Kaupunki' in data
        && 'Stad' in data
        && 'Operaattor' in data
        && 'Kapasiteet' in data
        && 'x' in data
        && 'y' in data
        ) {
          const stationObject = {
            stationNum: data.ID,
            name: data.Name,
            nameFi: data.Nimi,
            nameSwe: data.Namn,
            address: data.Osoite,
            addressSwe: data.Adress,
            city: data.Kaupunki === ' ' ? undefined : data.Kaupunki,
            citySwe: data.Stad === ' ' ? undefined : data.Stad,
            operator: data.Operaattor === ' ' ? undefined : data.Operaattor,
            capasity: Number(data.Kapasiteet),
            x_cord: data.x,
            y_cord: data.y
          };
          results.push(stationObject);
        } else {
          rejectCount += 1;
          console.log(`...item at row ${i} rejected...`);
        }
        i += 0;
    })
    .on('end', () => {
      console.log('...finished reading data');
      console.log(`${rejectCount} number of items were rejected`);
      console.log(`proceeding with ${i} number of items`);
      console.log('start transfering items to database...');
      stationService
        .addMany(results)
        .then(result => console.log(`Added ${result.count} number of items to database`))
        .catch(() => console.log('err'));
    });
}


export function importBikeRentalsFromCsv(fileName: string) {
  console.log(`Reading data from ${fileName}...`);
  const results: unknown[] = [];
  let i = 0;
  let j = 0;
  let filterCounter = 0;
  fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (data) => {
      if (j === 0) console.log(data);
      if ( 'Departure' in data
        && 'Return' in data
        && 'Departure station id' in data
        && 'Return station id' in data
        && 'Covered distance (m)' in data
        && 'Duration (sec.)' in data
        ) {
          try {
            const rentalObject = {
              departureTime: new Date(data['Departure']).toJSON(),
              returnTime: new Date(data['Return']).toJSON(),
              departureStationId: data['Departure station id'],
              returnStationId: data['Return station id'],
              coveredDistance: Number(data['Covered distance (m)']),
              duration: Number(data['Duration (sec.)'])
            };
            if (rentalObject.coveredDistance > 9 && rentalObject.duration > 9) {
              results.push(rentalObject);
        
              i += 1;
            } else {
              filterCounter += 1;
            }
          } catch {
            console.log(`err at ${j}`);
            filterCounter += 1;
          }
        }
        j += 1;
    })
    .on('end', () => {
      console.log('...finished reading data');
      // console.log(j);
      console.log(`${filterCounter} number of items were rejected`);
      console.log(`proceeding with ${i} number of items`);
      console.log('start transfering items to database...');
      bikeRentalService
        .addMany(results)
        .then(result => console.log(`Added ${result.count} number of items to database`))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .catch(e => console.log(errorHandler(e)));
    });
}


export const errorHandler = (err: object) => {
  if (err instanceof ZodError) {
    return err.message;
  } else if ( err instanceof PrismaClientKnownRequestError) {
    return err.message;
  }
  return err;
};

// importStationsFromCsv('data/stations.csv');

importBikeRentalsFromCsv('data/rentals3.csv');
