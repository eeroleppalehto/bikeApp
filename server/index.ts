import express from 'express';
import stationRouter from './routes/stations';

const app = express();

const PORT = 3001;

app.use(express.json());
app.use('/api/stations', stationRouter);

app.get('/ping', (_req, res) => {
  console.log('Ping pong!');
  res.send('Pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});