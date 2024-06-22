import { Role } from '@prisma/client';

export interface ClientUser {
  email: string;
  userId: string;
  companyId: string;
  role?: Role;
  displayName: string;
  firstName?: string;
  lastName?: string;
}

export type HTTPClients = 'AUTH' | 'API';

export interface JWTPayload extends ClientUser {
  iat: number;
  exp: number;
}
