import axios from 'axios';
import { errorLogout, refreshTokens } from './auth-actions';
import { CustomError, handleApiError, isError } from '@/errors';
import { APIProps } from '@/types';
import { BASE_API_URL, MAX_API_RETRY_REQUESTS } from '@/constants';
import { getAuthTokens } from '@/lib/localStorage';

let retries = 0;

export const authClient = axios.create({
  baseURL: `${BASE_API_URL}/auth`,
});
export const apiClient = axios.create({
  baseURL: BASE_API_URL,
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

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;
    if (!response || !response.status) {
      return Promise.reject(new CustomError('Cannot connect to server', 503));
    }

    if (
      error.response.status &&
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 500)
    ) {
      errorLogout(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && retries < MAX_API_RETRY_REQUESTS) {
      retries++;
      try {
        await refreshTokens();
        retries = 0;
      } catch (refreshError) {
        errorLogout();
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
        error.response.data.message || 'An Error Occured',
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

async function fetcher<T, D = any>({ client = 'API', url }: APIProps<D>) {
  console.log(url);
  console.log('fetching from fetcher');
  try {
    const response = await clients[client].get<T>(url);
    console.log(response);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

async function poster<D = any, T = any>({
  client = 'API',
  data,
  url,
  config,
}: APIProps<D>): Promise<T | undefined> {
  try {
    const response = await clients[client].post<T>(url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

async function patcher<D = any, T = any>({
  client = 'API',
  url,
  data,
  config,
}: APIProps<D>): Promise<T | undefined> {
  try {
    const response = await clients[client].patch<T>(url, data, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error);
  }
}

async function deleter<D = any, T = any>({
  client = 'API',
  url,
  config,
}: APIProps<D>): Promise<T | undefined> {
  try {
    const response = await clients[client].delete<T>(url, config);
    return response.data as T;
  } catch (error) {
    handleApiError(error);
  }
}

export { fetcher, poster, patcher, deleter };
