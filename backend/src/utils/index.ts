import { User } from '@prisma/client';

export function capitalizeWords(str: string) {
  const words = str.split(' ');
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

//genearte random 4 digit company code
export function generateCompanyCode() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function generateClientSideUserProperties(user: User) {
  const { password, createdAt, deletedAt, updatedAt, ...rest } = user;
  return rest;
}
