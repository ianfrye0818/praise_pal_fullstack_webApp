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

export interface ClientComment {
  id: string;
  content: string;
  kudosId: string;
  parentId: string;
  user: ClientUser;
}

export interface JWTPayload extends ClientUser {
  iat: number;
  exp: number;
}
