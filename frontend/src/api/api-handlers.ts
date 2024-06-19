import {
  SignInFormProps,
  User,
  AuthTokens,
  SignUpFormProps,
  TKudos,
  CreateKudoFormProps,
  Company,
  UpdateCompanyProps,
} from '@/types';
import { ApiRoutes } from './api-routes';
import { deleter, fetcher, patcher, poster } from './axios';
import { createRefreshHeader } from '@/lib/utils';
import { AxiosResponse } from 'axios';

//auth actions
export const postUser = async (data: SignInFormProps) =>
  await poster<SignInFormProps, User & AuthTokens>(ApiRoutes.login, data, {}, 'AUTH');

export const postRegisterUser = async (data: SignUpFormProps) =>
  await poster<SignUpFormProps, User & AuthTokens>(ApiRoutes.regsiter, data, {}, 'AUTH');

export const postRefreshTokens = async (refreshToken: string) =>
  await poster<any, AuthTokens>(
    ApiRoutes.refresh,
    {},
    { headers: createRefreshHeader(refreshToken) },
    'AUTH'
  );

export const postLogout = async (refreshToken: string) =>
  await poster<any, void>(
    ApiRoutes.logout,
    {},
    { headers: createRefreshHeader(refreshToken) },
    'AUTH'
  );

//kudos actions
export const getCompanyKudos = async (companyId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.company(companyId));

export const getsingleKudo = async (
  companyId: string,
  kudoId: string
): Promise<TKudos | undefined> => fetcher<TKudos>(ApiRoutes.kudos.single(companyId, kudoId));

export const getSentKudos = async (companyId: string, userId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.sent(companyId, userId));

export const getReceivedKudos = async (companyId: string, userId: string): Promise<TKudos[]> =>
  await fetcher<TKudos[]>(ApiRoutes.kudos.received(companyId, userId));

export const postCreateKudo = async (companyId: string, data: CreateKudoFormProps): Promise<void> =>
  poster<CreateKudoFormProps, void>(ApiRoutes.kudos.create(companyId), data);

export const patchUpdateKudo = async (companyId: string, kudoId: string, data: Partial<TKudos>) =>
  await patcher<Partial<TKudos>, void>(ApiRoutes.kudos.update(companyId, kudoId), data);

export const deleteSingleKudo = async (
  companyId: string,
  kudoId: string
): Promise<AxiosResponse<void, any>> =>
  await deleter<void>(ApiRoutes.kudos.delete(companyId, kudoId));

//likes actions
export const postAddLikeKudo = async (kudoId: string): Promise<void> =>
  poster<void, void>(ApiRoutes.userLikes.add(kudoId));

export const deleteRemoveLikeKudo = async (kudoId: string): Promise<AxiosResponse<void, any>> =>
  deleter<void>(ApiRoutes.userLikes.remove(kudoId));

//company actions
export const getCompany = async (companyId: string): Promise<Company> =>
  fetcher<Company>(ApiRoutes.company.single(companyId));

export const patchUpdateCompany = async (
  companyId: string,
  payload: UpdateCompanyProps
): Promise<void> => patcher<UpdateCompanyProps, void>(ApiRoutes.company.update(companyId), payload);

//users actions
export const getCompanyUsers = async (companyId: string): Promise<User[]> =>
  fetcher<User[]>(ApiRoutes.users.company(companyId));

export const getSingleCompanyUser = async (companyId: string, userId: string): Promise<User> =>
  fetcher<User>(ApiRoutes.users.single(companyId, userId));

export const patchUpdateUser = async (
  companyId: string,
  userId: string,
  data: Partial<User>
): Promise<void> => patcher<Partial<User>, void>(ApiRoutes.users.update(companyId, userId), data);

export const deleteSingleUser = async (
  companyId: string,
  userId: string
): Promise<AxiosResponse<void, any>> => deleter<void>(ApiRoutes.users.delete(companyId, userId));
