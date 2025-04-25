import axios from 'axios';
import client from './client';
import { AuthResponse, LoginData, RegisterData } from 'types/auth';
import { getToken } from 'utils/token';

const API_BASE_URL = 'https://api-medis.adsa.web.id/api/v1';

export const authService = {
  // login: (data: LoginData) => client.post('/login', data),
  login: async (data: LoginData) => {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email: data.username, password: data.password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response', response);

    return response.data;
  },
  register: (data: RegisterData) => client.post('/auth/register', data),
  // getUser: () => client.get('/auth/user'),
  getUser: async (token: string) => {
    console.log('token', token);

    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response user', response);
    return response;
  },
};

// export const loginApi = async (data: LoginData): Promise<AuthResponse> => {
//   const response = await axios.post(`${API_BASE_URL}/login`, data, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });
//   return response.data;
// };

// export const registerApi = async (data: RegisterData): Promise<AuthResponse> => {
//   const response = await axios.post(`${API_BASE_URL}/register`, data, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });
//   return response.data;
// };

// export const getUser = async () => {
//   const response = await axios.get(`${API_BASE_URL}/user`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   });
//   return response.data;
// };
