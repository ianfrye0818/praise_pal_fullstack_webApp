import axios from 'axios';
import { refreshTokens } from './auth-actions';
import { getAuthTokens } from '@/lib/utils';
const MAX_REQUESTS = 3;
let retries = 0;

const BASE_URL = 'http://localhost:3001';

const authClient = axios.create({
  baseURL: `${BASE_URL}/auth`,
});
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const authTokens = getAuthTokens();
  config.headers.Authorization = `Bearer ${authTokens.accessToken}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && retries < MAX_REQUESTS) {
      retries++;
      await refreshTokens();
    }
    return Promise.reject(error);
  }
);

export { apiClient, authClient };
