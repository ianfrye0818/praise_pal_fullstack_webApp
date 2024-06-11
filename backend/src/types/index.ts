export interface JWTUser {
  email: string;
  userId: string;
  companyId: string;
  role: Role;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface JWTPayload extends JWTUser {
  iat: number;
  exp: number;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
