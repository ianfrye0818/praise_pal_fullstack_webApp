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
  KudosQueryParams,
} from '@/types';
import { ApiRoutes } from './api-routes';
import { deleter, fetcher, patcher, poster } from './axios';
import { createRefreshHeader } from '@/lib/utils';
import { CustomError } from '@/errors';

//auth actions
export const postLoginUser = async (payload: SignInFormProps) =>
  await poster<SignInFormProps, User & AuthTokens>({
    client: 'AUTH',
    url: ApiRoutes.auth.login,
    data: payload,
  });

export const postRegisterUser = async (payload: SignUpFormProps) =>
  await poster<SignUpFormProps, User & AuthTokens>({
    client: 'AUTH',
    url: ApiRoutes.auth.register,
    data: payload,
  });

export const postRefreshTokens = async (refreshToken: string) =>
  await poster<any, AuthTokens>({
    client: 'AUTH',
    url: ApiRoutes.auth.refresh,
    config: { headers: createRefreshHeader(refreshToken) },
  });

export const postLogout = async (refreshToken: string) =>
  await poster<any, void>({
    client: 'AUTH',
    url: ApiRoutes.auth.logout,
    config: { headers: createRefreshHeader(refreshToken) },
  });

//users actions
export const getCompanyUsers = async (companyId: string) =>
  fetcher<User[]>({ url: ApiRoutes.users.findAll(companyId) });

export const getSingleCompanyUser = async (companyId: string, userId: string) =>
  fetcher<User>({ url: ApiRoutes.users.findOneById(companyId, userId) });

export const patchUpdateUser = async (companyId: string, userId: string, payload: Partial<User>) =>
  await patcher<Partial<User>, User>({
    url: ApiRoutes.users.updateUserById(companyId, userId),
    data: payload,
  });

export const deleteSingleUser = async (companyId: string, userId: string) =>
  deleter<void>({ url: ApiRoutes.users.deleteUserById(companyId, userId) });

//kudos actions`
export const getCompanyKudos = async (queryPrams: KudosQueryParams) => {
  try {
    const kudos = await fetcher<TKudos[]>({ url: ApiRoutes.kudos.findAll(queryPrams) });
    console.log(kudos);
    return kudos;
  } catch (error) {
    console.log('getcomankudos error', error);
  }
};

export const getsingleKudo = async (companyId: string, kudoId: string) =>
  fetcher<TKudos>({ url: ApiRoutes.kudos.findOneById(companyId, kudoId) });

// export const getSentKudos = async (companyId: string, senderId: string) =>
//   await fetcher<TKudos[]>({ url: ApiRoutes.kudos.findAll(companyId, { senderId }) });

// export const getReceivedKudos = async (companyId: string, receiverId: string) =>
//   await fetcher<TKudos[]>({ url: ApiRoutes.kudos.findAll(companyId, { receiverId }) });

export const postCreateKudo = async (payload: CreateKudoFormProps) =>
  poster<CreateKudoFormProps, void>({
    url: ApiRoutes.kudos.createKudo(payload.companyId),
    data: payload,
  });

export const patchUpdateKudo = async (companyId: string, payload: UpdateKudoProps) =>
  await patcher<UpdateKudoProps, void>({
    url: ApiRoutes.kudos.updateKudoById(companyId, payload.id),
    data: payload,
  });

export const deleteSingleKudo = async (companyId: string, kudoId: string) =>
  await deleter<void>({ url: ApiRoutes.kudos.deleteKudoById(companyId, kudoId) });

//likes actions
export const postAddLikeKudo = async (kudoId: string) =>
  poster<void, void>({ url: ApiRoutes.userLikes.createLike(kudoId) });

export const deleteRemoveLikeKudo = async (kudoId: string) =>
  deleter<void>({ url: ApiRoutes.userLikes.deleteLike(kudoId) });

//company actions
export const getCompany = async (companyId: string) =>
  fetcher<Company>({ url: ApiRoutes.company.findOneById(companyId) });

export const patchUpdateCompany = async (companyId: string, payload: UpdateCompanyProps) =>
  patcher<UpdateCompanyProps, void>({
    url: ApiRoutes.company.updateCompanyById(companyId),
    data: payload,
  });

export async function getAdminDashBoardData(user: User) {
  try {
    const data = await Promise.all([
      getCompanyUsers(user.companyId),
      getCompanyKudos({ companyId: user.companyId }),
      getCompany(user.companyId),
    ]);

    if (!data[0] || !data[1] || !data[2]) {
      throw new CustomError('Error fetching dashboard data', 404);
    }

    return {
      users: data[0],
      kudos: data[1],
      company: data[2],
    };
  } catch (error) {
    console.error(error);
    throw new CustomError('Error fetching dashboard data', 404);
  }
}
