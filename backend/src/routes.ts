import { Role } from '@prisma/client';

export function generateQueryString(query: any) {
  return Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
}

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
