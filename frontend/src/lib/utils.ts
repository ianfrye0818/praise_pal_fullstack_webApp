import { AuthTokens, User } from '@/types';
import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthTokens() {
  const authTokens = JSON.parse(localStorage.getItem('auth') || '{}');

  if (isObjEmpty(authTokens)) {
    return null;
  }
  return authTokens;
}

export function setAuthTokens(tokens?: AuthTokens) {
  localStorage.setItem('auth', JSON.stringify(tokens));
}

export const removeAuthTokens = () => {
  localStorage.removeItem('auth');
};

export const setUserToken = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserToken = () => {
  localStorage.removeItem('user');
};

export const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (isObjEmpty(user)) {
    return null;
  }
  return user;
};

function isObjEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export const createRefreshHeader = (refreshToken: string) => ({
  Authorization: `Bearer ${refreshToken}`,
});

export const handleApiError = (error: unknown, customMessage: string): never => {
  console.error(customMessage, error);

  if (error instanceof AxiosError) {
    const errorMessage = error.response?.data?.message || error.message || customMessage;
    throw new Error(errorMessage);
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error(customMessage);
};
