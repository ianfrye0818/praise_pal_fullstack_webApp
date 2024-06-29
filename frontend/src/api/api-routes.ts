import { generateQueryString } from '@/lib/utils';
import { CommentQueryParams, CompanyQueryParams, KudosQueryParams, UserQueryParams } from '@/types';

export const ApiRoutes = {
  auth: {
    baseUrl: '/auth',
    login: '/login',
    register: '/register',
    refresh: '/refresh',
    logout: '/logout',
    // forgotPassword: '/forgot-password',
    // resetPassword: '/reset-password',
    // changePassword: '/change-password',
  },
  users: {
    baseUrl: '/user',
    findAll: (companyId: string, query?: UserQueryParams) =>
      `/user?${generateQueryString(query)}&companyId=${companyId}`,
    findOneById: (companyId: string, userId: string) => `/users/${userId}?companyId=${companyId}`,
    updateUserById: (companyId: string, userId: string) => `/user/${userId}?companyId=${companyId}`,
    deleteUserById: (companyId: string, userId: string) => `/user/${userId}?companyId=${companyId}`,
  },
  userLikes: {
    baseUrl: '/likes',
    createLike: (kudosId: string) => `/likes/${kudosId}`,
    deleteLike: (kudosId: string) => `/likes/${kudosId}`,
  },
  kudos: {
    baseUrl: '/kudos',
    findAll: (query: KudosQueryParams) => `/kudos?${generateQueryString(query)}`,
    findOneById: (companyId: string, kudosId: string) => `/kudos/${kudosId}?companyId=${companyId}`,
    createKudo: (companyId: string) => `/kudos?companyId=${companyId}`,
    updateKudoById: (companyId: string, kudosId: string) =>
      `/kudos/${kudosId}?companyId=${companyId}`,
    deleteKudoById: (companyId: string, kudosId: string) =>
      `/kudos/${kudosId}?companyId=${companyId}`,
  },
  comments: {
    baseUrl: '/comments',
    findAll: (companyId: string, query?: CommentQueryParams) =>
      `/comments?${generateQueryString(query)}&companyId=${companyId}`,
    findOneById: (companyId: string, commentId: string) =>
      `/comments/${commentId}?companyId=${companyId}`,
    createComment: (companyId: string) => `/comments?companyId=${companyId}`,
    updateCommentById: (companyId: string, commentId: string) =>
      `/comments/${commentId}?companyId=${companyId}`,
    deleteCommentById: (companyId: string, commentId: string) =>
      `/comments/${commentId}?companyId=${companyId}`,
  },
  company: {
    baseUrl: '/company',
    findAll: (query?: CompanyQueryParams) => `/company?${generateQueryString(query)}`,
    findOneById: (companyId: string) => `/company/${companyId}`,
    createCompany: () => '/company',
    updateCompanyById: (companyId: string) => `/company/${companyId}`,
    deleteCompanyById: (companyId: string) => `/company/${companyId}`,
  },
};
