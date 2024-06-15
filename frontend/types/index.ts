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

export type SenderReceiverUser = Omit<User, 'accessToken' | 'refreshToken' | 'userId'> & {
  id: string;
};

export interface User {
  id?: string;
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

export type TKudos = {
  id: string;
  senderId: string;
  recipientId: string;
  companyId: string;
  message: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  likes: number;
  isAnonymous: boolean;
  isHidden: boolean;
  sender: Omit<User, 'accessToken' | 'refreshToken' | 'userId'> & {
    id: string;
  };
  receiver: Partial<User>;
  User_Like: TUserLike[];
};

export type TUserLike = {
  id: string;
  kudoId: string;
  userId: string;
  createdAt: string;
};
