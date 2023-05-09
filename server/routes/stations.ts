import express from 'express';
import stationService from '../services/stationService';
import { ZodError } from 'zod';

const stationRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stationRouter.get('/', async (_req, res) => {
  const stations = await stationService.getAll();
  res.json(stations);
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stationRouter.post('/', async (req, res) => {
  try {
    const newStation = await stationService.addNew(req.body);
    res.json(newStation);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if ( error instanceof ZodError) {
      errorMessage = error.message;
    }
    
    console.log(errorMessage);
    res.status(400).send(errorMessage);
  }
});


export default stationRouter;
