import axios from 'axios';
import { auth } from '@/auth/auth';

export const authClient = axios.create({
  baseURL: 'http://localhost:3001/auth',
});

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

apiClient.interceptors.request.use(async (config) => {
  const session = await auth();
  if (session) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }
  return config;
});
