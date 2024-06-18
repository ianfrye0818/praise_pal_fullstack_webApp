import {
  SignInFormProps,
  User,
  AuthTokens,
  SignUpFormProps,
  TKudos,
  CreateKudoFormProps,
  Company,
} from '@/types';
import { ApiRoutes } from './api-routes';
import { authClient, deleter, fetcher, patcher, poster } from './axios-instances';
import { createRefreshHeader } from '@/lib/utils';
import { AxiosResponse } from 'axios';

export const postUser = async (data: SignInFormProps) =>
  await poster<SignInFormProps, User & AuthTokens>(ApiRoutes.login, data, {}, authClient);

// export const getUser = async (data: SignInFormProps): Promise<(User & AuthTokens) | undefined> => {
//   try {
//     const user = await authClient.post<User & AuthTokens>(ApiRoutes.login, data);
//     return user.data;
//   } catch (error) {
//     handleApiError(error, 'Error getting user');
//   }
// };

export const postRegisterUser = async (data: SignUpFormProps) =>
  await poster<SignUpFormProps, User & AuthTokens>(ApiRoutes.regsiter, data, {}, authClient);

// export const getRegisterUser = async (
//   data: SignUpFormProps
// ): Promise<(User & AuthTokens) | undefined> => {
//   try {
//     const user = await authClient.post<User & AuthTokens>(ApiRoutes.regsiter, data);
//     return user.data;
//   } catch (error) {
//     handleApiError(error, 'Error registering user');
//   }
// };

export const postRefreshTokens = async (refreshToken: string) =>
  await poster<any, AuthTokens>(
    ApiRoutes.refresh,
    {},
    { headers: createRefreshHeader(refreshToken) },
    authClient
  );

// export const getRefreshTokens = async (refreshToken: string): Promise<AuthTokens | undefined> => {
//   try {
//     const newTokens = await authClient.post<AuthTokens>(
//       ApiRoutes.refresh,
//       {},
//       createRefreshHeader(refreshToken)
//     );
//     return newTokens.data as AuthTokens;
//   } catch (error) {
//     handleApiError(error, 'Error refreshing tokens');
//   }
// };

export const postLogout = async (refreshToken: string) =>
  await poster<any, void>(
    ApiRoutes.logout,
    {},
    { headers: createRefreshHeader(refreshToken) },
    authClient
  );

// export const getLogout = async (refreshToken: string): Promise<void> => {
//   try {
//     await authClient.post(ApiRoutes.logout, {}, createRefreshHeader(refreshToken));
//   } catch (error) {
//     handleApiError(error, 'Error logging out');
//   }
// };

export const getCompanyKudos = async (companyId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.company(companyId));

// export const getCompanyKudos = async (companyId?: string): Promise<TKudos[]> => {
//   try {
//     if (!companyId) return [];
//     const kudos = await apiClient.get(ApiRoutes.kudos.company(companyId));
//     return kudos.data as TKudos[];
//   } catch (error) {
//     handleApiError(error, 'Error getting company kudos');
//     return [];
//   }
// };

export const getsingleKudo = async (
  companyId: string,
  kudoId: string
): Promise<TKudos | undefined> => fetcher<TKudos>(ApiRoutes.kudos.single(companyId, kudoId));

// export const getsingleKudo = async (
//   companyId: string,
//   kudoId: string
// ): Promise<TKudos | undefined> => {
//   try {
//     const kudo = await apiClient.get(ApiRoutes.kudos.single(companyId, kudoId));
//     return kudo.data as TKudos;
//   } catch (error) {
//     handleApiError(error, 'Error getting single kudo');
//   }
// };

export const getSentKudos = async (companyId: string, userId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.sent(companyId, userId));

// export const getSentKudos = async (companyId: string, userId: string): Promise<TKudos[]> => {
//   try {
//     const kudos = await apiClient.get(ApiRoutes.kudos.sent(companyId, userId));
//     return kudos.data as TKudos[];
//   } catch (error) {
//     handleApiError(error, 'Error getting sent kudos');
//     return [];
//   }
// };

export const getReceivedKudos = async (companyId: string, userId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.received(companyId, userId));

// export const getReceivedKudos = async (companyId: string, userId: string): Promise<TKudos[]> => {
//   try {
//     const kudos = await apiClient.get(ApiRoutes.kudos.received(companyId, userId));
//     return kudos.data as TKudos[];
//   } catch (error) {
//     handleApiError(error, 'Error getting received kudos');
//     return [];
//   }
// };

export const postCreateKudo = async (companyId: string, data: CreateKudoFormProps): Promise<void> =>
  poster<CreateKudoFormProps, void>(ApiRoutes.kudos.create(companyId), data);

// export const postCreateKudo = async (
//   companyId: string,
//   data: CreateKudoFormProps
// ): Promise<void> => {
//   try {
//     return await apiClient.post(ApiRoutes.kudos.create(companyId), data);
//   } catch (error) {
//     handleApiError(error, 'Error creating kudo');
//   }
// };

export const patchUpdateKudo = async (companyId: string, kudoId: string, data: Partial<TKudos>) =>
  await patcher<Partial<TKudos>, void>(ApiRoutes.kudos.update(companyId, kudoId), data);

// export const patchUpdateKudo = async (
//   companyId: string,
//   kudoId: string,
//   data: Partial<TKudos>
// ): Promise<void> => {
//   try {
//     return await apiClient.patch(ApiRoutes.kudos.update(companyId, kudoId), data);
//   } catch (error) {
//     handleApiError(error, 'Error updating kudo');
//   }
// };

export const deleteSingleKudo = async (
  companyId: string,
  kudoId: string
): Promise<AxiosResponse<void, any>> =>
  await deleter<void>(ApiRoutes.kudos.delete(companyId, kudoId));

// export const deleteSingleKudo = async (companyId: string, kudoId: string): Promise<void> => {
//   try {
//     return await apiClient.delete(ApiRoutes.kudos.delete(companyId, kudoId));
//   } catch (error) {
//     handleApiError(error, 'Error deleting kudo');
//   }
// };

export const postAddLikeKudo = async (kudoId: string): Promise<void> =>
  poster<void, void>(ApiRoutes.userLikes.add(kudoId));

// export const postAddLikeKudo = async (kudoId: string): Promise<void> => {
//   try {
//     return await apiClient.post(ApiRoutes.userLikes.add(kudoId));
//   } catch (error) {
//     handleApiError(error, 'Error adding like to kudo');
//   }
// };

export const deleteRemoveLikeKudo = async (kudoId: string): Promise<AxiosResponse<void, any>> =>
  deleter<void>(ApiRoutes.userLikes.remove(kudoId));

// export const deleteRemoveLikeKudo = async (kudoId: string): Promise<void> => {
//   try {
//     return await apiClient.delete(ApiRoutes.userLikes.remove(kudoId));
//   } catch (error) {
//     handleApiError(error, 'Error removing like from kudo');
//   }
// };

export const getCompany = async (companyId: string): Promise<Company> =>
  fetcher<Company>(ApiRoutes.company.single(companyId));
// export const getCompany = async (companyId: string): Promise<Company | undefined> => {
//   try {
//     const company = await apiClient.get<Company>(ApiRoutes.company.single(companyId));
//     return company.data;
//   } catch (error) {
//     handleApiError(error, 'Error getting company');
//   }
// };

export const patchUpdateCompany = async (
  companyId: string,
  data: { name: string }
): Promise<void> => patcher<{ name: string }, void>(ApiRoutes.company.update(companyId), data);

// export const patchUpdateCompany = async (
//   companyId: string,
//   data: { name: string }
// ): Promise<void> => {
//   try {
//     return await apiClient.patch(ApiRoutes.company.update(companyId), data);
//   } catch (error) {
//     handleApiError(error, 'Error updating company');
//   }
// };
