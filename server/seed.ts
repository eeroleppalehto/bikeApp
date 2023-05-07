/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import csv from 'csv-parser';
import stationService from './services/stationService';

/* interface Line {
  name: string;
  address: string;
  city: string;
  operator: string;
  capasity: string;
  x_cord: string;
  y_cord: string;
} */

export function importStationsFromCsv(fileName: string) {
  const results: unknown[] = [];

  fs.createReadStream(fileName)
    .pipe(csv())
    .on('data', (data) => {
      // console.log(typeof data.Kaupunki);
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
        }
    })
    .on('end', () => {
      stationService
        .addMany(results)
        .then(count => console.log(count))
        .catch(() => console.log('err'));
      //const jsonData = JSON.stringify(results);
      //console.log(results);
    });
}


export function importBikeRentalsFromCsv(fileName: string) {
  console.log(fileName);
}

