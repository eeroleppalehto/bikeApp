import express from 'express';
import bikeRentalService from '../services/bikeRentalService';
import { ZodError } from 'zod';
// import { ZodError } from 'zod';

const bikeRentalRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
bikeRentalRouter.get('/', async (_req, res) => {
  const bikeRentals = await bikeRentalService.getAll();
  res.json(bikeRentals);
});


// eslint-disable-next-line @typescript-eslint/no-misused-promises
bikeRentalRouter.post('/', async (req, res) => {
  try {
    const newBikeRental = await bikeRentalService.addNew(req.body);
    res.json(newBikeRental);
  } catch (error) {
    let errorMessage = 'Something went wrong: ';

    if ( error instanceof ZodError )  {
      errorMessage += error.flatten();
    }
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
});


export default bikeRentalRouter;
