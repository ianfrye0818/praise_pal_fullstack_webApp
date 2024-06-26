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

export function generateQueryString(query: any) {
  if (isObjEmpty(query)) return '';
  return Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
}

export function formatDate(isoDate: string) {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDate);

  // Extract year, month, and day from the Date object
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-based index
  const day = ('0' + date.getDate()).slice(-2);

  // Return the formatted date as MM-DD-YYYY
  return `${month}-${day}-${year}`;
}

export function capitalizeString(str: string) {
  return str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}
