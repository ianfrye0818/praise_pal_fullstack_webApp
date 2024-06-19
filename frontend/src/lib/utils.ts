import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0;

export const isAxiosError = (error: any): error is AxiosError => {
  return (error as AxiosError).isAxiosError;
};

export const createRefreshHeader = (refreshToken: string) => ({
  Authorization: `Bearer ${refreshToken}`,
});
