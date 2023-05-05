import axios from "axios";
import { Station } from "../types";

const apiBaseUrl = 'http://localhost:3001/api';

const getAll = async () => {
  const { data } = await axios.get<Station[]>(`${apiBaseUrl}/stations`);
  return data;
};

export default { getAll };