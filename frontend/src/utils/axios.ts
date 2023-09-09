import axios from "axios";

const PORT = 3001;

const api = axios.create({ baseURL: `http://localhost:${Number(import.meta.env.VITE_REACT_APP_BACKEND_PORT) || PORT}` });

export const postRequest = async <T>(endpoint: string, body: T) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const getRequest = async (endpoint: string) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const patchRequest = async <T>(endpoint: string, body: T) => {
  const { data } = await api.patch(endpoint, body);
  return data;
};

export default api;