import axios from 'axios';
import { getToken } from '../utils/token';

const API_BASE_URL = 'https://api-medis.adsa.web.id/api/v1'; // Ganti dengan URL production

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke header
client.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor untuk handle error global
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expired
    }
    return Promise.reject(error);
  }
);

export default client;
