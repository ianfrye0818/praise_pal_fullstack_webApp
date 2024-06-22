import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { string } from 'zod';

export interface SignInFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps extends SignInFormProps {
  confirmPassword: string;
  displayName: string;
  companyCode: string;
}

export interface User {
  email: string;
  userId: string;
  companyId: string;
  role: Role;
  displayName: string;
  firstName?: string;
  lastName?: string;
}

export type UpdateUserProps = Partial<Omit<User, 'companyId' | 'userId'>>;

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPER_ADMIN = 'SUPER_ADMIN',
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
  receiverId?: string;
  companyId: string;
  message: string;
  title?: string;
  likes: number;
  isAnonymous: boolean;
  isHidden: boolean;
  sender: User;
  receiver?: User;
  userLikes: UserLike[];
  comments: Comment[];
};

export interface CreateKudoFormProps {
  senderId: string;
  receiverId?: string;
  companyId: string;
  message: string;
  title?: string;
  isAnonymous?: boolean;
}

export type UpdateKudoProps = Omit<CreateKudoFormProps, 'senderId' | 'companyId'>;

export interface UserLike {
  id: string;
  kudoId: string;
  userId: string;
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

interface Comment {
  id: string;
  content: string;
}

interface createContentProps {
  content: string;
}

export type HTTPClients = 'AUTH' | 'API';
