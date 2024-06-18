import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getAuthTokens, handleApiError } from '@/lib/utils';
import { refreshTokens } from './auth-actions';
const MAX_REQUESTS = 3;
let retries = 0;

const BASE_URL = 'http://localhost:3001';

const authClient = axios.create({
  baseURL: `${BASE_URL}/auth`,
  // withCredentials: true,
  // headers: localStorage.getItem('auth')
  //   ? { Authorization: `Bearer ${getAuthTokens().accessToken}` }
  //   : {},
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

async function fetcher<T>(url: string): Promise<T> {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching data');
    throw new Error('Error fetching data');
  }
}

async function poster<D = any, T = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  client: AxiosInstance = apiClient
): Promise<T> {
  try {
    const response = await client.post<T>(url, data, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error, 'Error posting data');
    throw new Error('Error posting data');
  }
}

async function patcher<D = any, T = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<T> {
  try {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error, 'Error patching data');
    throw new Error('Error patching data');
  }
}

async function deleter<D = any, T = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
  try {
    const response = await apiClient.delete<T>(url, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error, 'Error deleting data');
    throw new Error('Error deleting data');
  }
}

export { apiClient, authClient, fetcher, poster, patcher, deleter };
