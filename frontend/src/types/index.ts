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
  comments: Omit<Comment, 'userId' | 'parentId' | 'kudoId'>[];
};

export interface CreateKudoFormProps {
  senderId: string;
  receiverId?: string | null;
  companyId: string;
  message: string;
  title?: string | null;
  isAnonymous: boolean;
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
  parentId?: string | null;
  userId: string;
  kudosId: string;
}

interface createContentProps {
  content: string;
}

export type HTTPClients = 'AUTH' | 'API';

export interface UserQueryParams {
  userId?: string;
  displayName?: string;
  email?: string;
  companyId?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KudosQueryParams {
  kudosId?: string;
  senderId?: string;
  receiverId?: string;
  message?: string;
  title?: string;
  companyId?: string;
  id?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentQueryParams {
  commentId?: string;
  kudosId?: string;
  parentId?: string;
  userId?: string;
  content?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CompanyQueryParams {
  companyId?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  companyCode?: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserNotificationQueryParams {
  id?: string;
  userId?: string;
  read?: boolean;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
