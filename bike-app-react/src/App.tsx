import React, { useEffect, useState } from 'react';
import stationsService from './services/stationsService';
import { Station } from './types';

function App() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      const stationList = await stationsService.getAll();

      setStations(stationList);
    };

    fetchStations();
  },[])

  const StationComps = stations.map(station => <li key={station.id}>{station.name}</li>)

  return (
    <div>
      <p>Hello Woooorld</p>
      <ul>
        {StationComps}
      </ul>
    </div>
  );
}

export default App;
