import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface SignInFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps extends SignInFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  companyCode: string;
}

export interface User {
  id?: string;
  email: string;
  userId: string;
  companyId: string;
  role: Role;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserProps {
  email?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
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
  displayName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type SidebarLink = {
  label: string;
  route: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};

export type TKudos = {
  id: string;
  senderId: string;
  recipientId?: string;
  companyId: string;
  message: string;
  title?: string;
  createdAt?: EpochTimeStamp;
  updatedAt?: EpochTimeStamp;
  deletedAt?: EpochTimeStamp | null;
  likes: number;
  isAnonymous: boolean;
  isHidden: boolean;
  sender: SenderReceiverUser;
  receiver?: SenderReceiverUser;
  userLikes: UserLike[];
};

export type SenderReceiverUser = Omit<User, 'accessToken' | 'refreshToken' | 'userId'> & {
  id: string;
};

export interface CreateKudoFormProps {
  senderId: string;
  recipientId?: string;
  companyId: string;
  message: string;
  title?: string;
  isAnonymous?: boolean;
}

export interface UserLike {
  id: string;
  kudoId: string;
  userId: string;
  createdAt?: EpochTimeStamp;
}

export interface Company {
  id: string;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  companyCode: string;
  users: User[];
  kudos: TKudos[];
  createdAt?: EpochTimeStamp;
  updatedAt?: EpochTimeStamp;
  deletedAt?: EpochTimeStamp | null;
}

export interface UpdateCompanyProps {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
}

export type HTTPClients = 'AUTH' | 'API';
