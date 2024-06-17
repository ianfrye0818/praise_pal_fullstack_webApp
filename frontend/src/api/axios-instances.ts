import axios from 'axios';

import { getAuthTokens } from '@/lib/utils';
import { refreshTokens } from './auth-actions';
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

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401 && retries < MAX_REQUESTS) {
//       console.log('Refreshing tokens');
//       retries++;
//       await refreshTokens();

//       console.log('Retrying request');
//     }
//     return Promise.reject(error);
//   }
// );

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && retries < MAX_REQUESTS) {
      console.log('Refreshing tokens');
      retries++;

      // Explicitly wait for token refresh
      try {
        await refreshTokens();
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(error); // If refresh fails, propagate original error
      }

      // Now retry the original request
      console.log('Retrying request');
      const originalRequest = error.config;
      originalRequest.headers.Authorization = `Bearer ${getAuthTokens().accessToken}`;
      return apiClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { apiClient, authClient };
