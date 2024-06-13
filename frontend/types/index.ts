declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
      role: Role;
      accessToken: string;
      refreshToken: string;
      companyId: string;
    };
  }
}

export interface User {
  email: string;
  userId: string;
  companyId: string;
  role: Role;
  displayName: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface SignInFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  companyCode: string;
  displayName?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SidebarLink {
  label: string;
  route: string;
  icon: string;
}

export interface Kudo {
  id: string;
  recipientId?: string;
  senderId: string;
  receiver: User;
  sender: User;
  message: string;
  title?: string;
  likes: number;
  companyId: string;
  createdAt: Date;
  User_Like: {
    kudoId: string;
    userId: string;
  }[];
}
