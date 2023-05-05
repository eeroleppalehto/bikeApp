import axios from "axios";
import { BikeRenatal } from "../types";

const apiBaseUrl = 'http://localhost:3001/api';

const getAll = async () => {
  const { data } = await axios.get<BikeRenatal[]>(`${apiBaseUrl}/bikeRentals`)
  return data;
};

export default { getAll };