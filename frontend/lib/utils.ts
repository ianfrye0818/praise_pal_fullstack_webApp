import { auth } from '@/auth/auth';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms ?? 500));
}

export function parseStringify(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
