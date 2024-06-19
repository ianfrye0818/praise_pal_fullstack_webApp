import axios, { AxiosRequestConfig } from 'axios';
import { getAuthTokens, handleApiError } from '@/lib/utils';
import { refreshTokens } from './auth-actions';
import { CustomError } from '@/errors';
import { HTTPClients } from '@/types';
import { env } from '@/env';

const MAX_REQUESTS = 3;
let retries = 0;

// const BASE_URL = 'http://localhost:3001';
const BASE_URL = env.VITE_API_BASE_URL;

const authClient = axios.create({
  baseURL: `${BASE_URL}/auth`,
});
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const clients = {
  AUTH: authClient,
  API: apiClient,
};

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
      try {
        await refreshTokens();
        retries = 0;
      } catch (refreshError) {
        const customError = new CustomError(
          'Token Refresh Failed',
          (refreshError as any).response.status || 500
        );
        return Promise.reject(customError);
      }
      const originalRequest = error.config;
      originalRequest.headers.Authorization = `Bearer ${getAuthTokens().accessToken}`;
      return apiClient(originalRequest);
    } else if (error.response) {
      const customError = new CustomError(
        error.response.message || 'An Error Occured',
        error.response.status
      );
      return Promise.reject(customError);
    } else if (error.request) {
      const customError = new CustomError('No response from server', 500);
      return Promise.reject(customError);
    } else {
      const customError = new CustomError('An error occured', 500);
      return Promise.reject(customError);
    }
  }
);

async function fetcher<T>(url: string, client: HTTPClients = 'API'): Promise<T> {
  try {
    const response = await clients[client].get<T>(url);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching data');
    throw error;
  }
}

async function poster<D = any, T = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  client: HTTPClients = 'API'
): Promise<T> {
  try {
    const response = await clients[client].post<T>(url, data, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error, 'Error posting data');
    throw error;
  }
}

async function patcher<D = any, T = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  client: HTTPClients = 'API'
): Promise<T> {
  try {
    const response = await clients[client].patch<T>(url, data, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error, 'Error patching data');
    throw error;
  }
}

async function deleter<D = any, T = any>(
  url: string,
  config?: AxiosRequestConfig<D>,
  client: HTTPClients = 'API'
): Promise<T> {
  try {
    const response = await clients[client].delete<T>(url, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error, 'Error deleting data');
    throw error;
  }
}

export { fetcher, poster, patcher, deleter };
