import {
  SignInFormProps,
  User,
  AuthTokens,
  SignUpFormProps,
  TKudos,
  CreateKudoFormProps,
  Company,
  UpdateCompanyProps,
  UpdateKudoProps,
} from '@/types';
import { ApiRoutes } from './api-routes';
import { authClient, deleter, fetcher, patcher, poster } from './axios';
import { createRefreshHeader } from '@/lib/utils';
import axios, { AxiosError, AxiosResponse } from 'axios';

//auth actions
export const postUser = async (data: SignInFormProps) =>
  await poster<SignInFormProps, User & AuthTokens>(ApiRoutes.auth.login, data, {}, 'AUTH');

// export const postUser = async (data: SignInFormProps) => {
//   try {
//     const response = await authClient.post<User & AuthTokens>(ApiRoutes.auth.login, data);
//     console.log('response', response);
//   } catch (error) {
//     console.log('postuser', error);
//   }
// };

export const postRegisterUser = async (data: SignUpFormProps) =>
  await poster<SignUpFormProps, User & AuthTokens>(ApiRoutes.auth.register, data, {}, 'AUTH');

export const postRefreshTokens = async (refreshToken: string) =>
  await poster<any, AuthTokens>(
    ApiRoutes.auth.refresh,
    {},
    { headers: createRefreshHeader(refreshToken) },
    'AUTH'
  );

export const postLogout = async (refreshToken: string) =>
  await poster<any, void>(
    ApiRoutes.auth.logout,
    {},
    { headers: createRefreshHeader(refreshToken) },
    'AUTH'
  );

//kudos actions
export const getCompanyKudos = async (companyId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.findAll(companyId, {}));

export const getsingleKudo = async (
  companyId: string,
  kudoId: string
): Promise<TKudos | undefined> => fetcher<TKudos>(ApiRoutes.kudos.findOneById(companyId, kudoId));

export const getSentKudos = async (companyId: string, senderId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.findAll(companyId, { senderId }));

export const getReceivedKudos = async (companyId: string, receiverId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.findAll(companyId, { receiverId }));

export const postCreateKudo = async (payload: CreateKudoFormProps): Promise<void> =>
  poster<CreateKudoFormProps, void>(ApiRoutes.kudos.createKudo(payload.companyId), payload);

export const patchUpdateKudo = async (companyId: string, payload: UpdateKudoProps) =>
  await patcher<UpdateKudoProps, void>(
    ApiRoutes.kudos.updateKudoById(companyId, payload.id!),
    payload
  );

export const deleteSingleKudo = async (
  companyId: string,
  kudoId: string
): Promise<AxiosResponse<void, any>> =>
  await deleter<void>(ApiRoutes.kudos.deleteKudoById(companyId, kudoId));

//likes actions
export const postAddLikeKudo = async (kudoId: string): Promise<void> =>
  poster<void, void>(ApiRoutes.userLikes.createLike(kudoId));

export const deleteRemoveLikeKudo = async (kudoId: string): Promise<AxiosResponse<void, any>> =>
  deleter<void>(ApiRoutes.userLikes.deleteLike(kudoId));

//company actions
export const getCompany = async (companyId: string): Promise<Company> =>
  fetcher<Company>(ApiRoutes.company.findOneById(companyId));

export const patchUpdateCompany = async (
  companyId: string,
  payload: UpdateCompanyProps
): Promise<void> =>
  patcher<UpdateCompanyProps, void>(ApiRoutes.company.updateCompanyById(companyId), payload);

//users actions
export const getCompanyUsers = async (companyId: string): Promise<User[]> =>
  fetcher<User[]>(ApiRoutes.users.findAll(companyId, {}));

export const getSingleCompanyUser = async (companyId: string, userId: string): Promise<User> =>
  fetcher<User>(ApiRoutes.users.findOneById(companyId, userId));

export const patchUpdateUser = async (
  companyId: string,
  userId: string,
  data: Partial<User>
): Promise<void> =>
  patcher<Partial<User>, void>(ApiRoutes.users.updateUserById(companyId, userId), data);

export const deleteSingleUser = async (
  companyId: string,
  userId: string
): Promise<AxiosResponse<void, any>> =>
  deleter<void>(ApiRoutes.users.deleteUserById(companyId, userId));
