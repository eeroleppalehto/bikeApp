import express from 'express';
import stationRouter from './routes/stations';
import bikeRentalRouter from './routes/bikeRentals';
import cors from 'cors';

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/stations', stationRouter);
app.use('/api/bikeRentals', bikeRentalRouter);

app.get('/ping', (_req, res) => {
  console.log('Ping pong!');
  res.send('Pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});