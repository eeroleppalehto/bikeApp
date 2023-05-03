import express from 'express';
import stationService from '../services/stationService';

const stationRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stationRouter.get('/', async (_req, res) => {
  const stations = await stationService.getAll();
  console.log(stations);
  res.json(stations);
});

/* stationRouter.post('/', async (req, res) => {
  const data = req.body;


}); */

export default stationRouter;
