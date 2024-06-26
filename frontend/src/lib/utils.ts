import { Role, User } from '@/types';
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
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getRoleDropDownOptions() {
  return Object.values(Role)
    .filter((role) => role !== Role.SUPER_ADMIN)
    .map((role) => ({
      label: capitalizeString(role),
      value: role,
    }));
}

export function getShownUsers(users: User[], currentUser: User | null, limited: boolean) {
  const allowedUsers =
    currentUser?.role === Role.SUPER_ADMIN
      ? users
      : users.filter((user) => user.role !== Role.SUPER_ADMIN);

  const usersLength = allowedUsers.length;

  const limitedUsers = usersLength < 10 ? allowedUsers : allowedUsers.slice(0, 10);

  return limited ? limitedUsers : allowedUsers;
}
