import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  // Ensure api_key is present in query params as a plain object
  const currentParams = config.params ?? {};
  if (API_KEY && !('api_key' in currentParams)) {
    config.params = { ...currentParams, api_key: API_KEY };
  }

  return config;
});

export default api;
