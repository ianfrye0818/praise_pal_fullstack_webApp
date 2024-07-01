import { Role, TKudos, User } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isObjEmpty = (obj: object) => Object.keys(obj).length === 0;

export const createRefreshHeader = (refreshToken: string) => ({
  Authorization: `Bearer ${refreshToken}`,
});

export function generateQueryString(query?: any) {
  if (!query || isObjEmpty(query)) return '';
  return Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-based index
  const day = ('0' + date.getDate()).slice(-2);
  return `${month}-${day}-${year}`;
}

export function capitalizeString(str: string) {
  try {
    return str
      .trim()
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  } catch (e) {
    return str;
  }
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

export function getShownKudos(kudos: TKudos[], limited: boolean) {
  const kudosLength = kudos.length;

  const limitedKudos = kudosLength < 10 ? kudos : kudos.slice(0, 10);

  return limited ? limitedKudos : kudos;
}

export function getUserDisplayName(user: User) {
  return user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName[0]}.`
    : user.displayName;
}
