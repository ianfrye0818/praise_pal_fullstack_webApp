import { SignInFormProps, SignUpFormProps } from '@/types';
import { Dispatch } from 'react';

import {
  getAuthTokens,
  removeAuthTokens,
  removeUserToken,
  setAuthTokens,
  setUserToken,
} from '@/lib/utils';
import { ActionType, AuthAction } from '@/providers/AuthReducerProvider';
import { postLogout, postRefreshTokens, postRegisterUser, postUser } from './api-handlers';

// Simulate an API call for authentication
const AuthActions = {
  login: async (signInPayload: SignInFormProps) => {
    return await postUser(signInPayload);
  },
  register: async (signUpPaylaod: SignUpFormProps) => {
    return await postRegisterUser(signUpPaylaod);
  },
  logout: async () => {
    const { refreshToken } = getAuthTokens();
    if (!refreshToken) throw new Error('No refresh token found');
    await postLogout(refreshToken);
  },
  refreshTokens: async () => {
    const { refreshToken } = getAuthTokens();
    if (!refreshToken) throw new Error('No refresh token found');
    setAuthTokens(await postRefreshTokens(refreshToken));
  },
};

export const login = async (dispatch: Dispatch<AuthAction>, signInPayload: SignInFormProps) => {
  dispatch({ type: ActionType.LOGIN_REQUEST });
  try {
    const data = await AuthActions.login(signInPayload);
    if (!data) throw new Error('Invalid credentials');
    const { accessToken, refreshToken, ...user } = data;
    setAuthTokens({ accessToken, refreshToken });
    setUserToken(user);
    dispatch({
      type: ActionType.LOGIN_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    dispatch({ type: ActionType.LOGIN_FAILURE });
  }
};

export const register = async (dispatch: Dispatch<AuthAction>, signUpPayload: SignUpFormProps) => {
  dispatch({ type: ActionType.REGISTER_REQUEST });
  try {
    const data = await AuthActions.register(signUpPayload);
    if (!data) throw new Error('Error registering user');
    const { accessToken, refreshToken, ...user } = data;
    setAuthTokens({ accessToken, refreshToken });
    setUserToken(user);
    dispatch({
      type: ActionType.REGISTER_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    dispatch({ type: ActionType.REGISTER_FAILURE });
  }
};

export const logout = async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: ActionType.LOGOUT_REQUEST });
  try {
    await AuthActions.logout();
    removeAuthTokens();
    removeUserToken();
    dispatch({ type: ActionType.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: ActionType.LOGOUT_FAILURE });
  }
};

export async function refreshTokens() {
  try {
    await AuthActions.refreshTokens();
  } catch (error) {
    console.error('Error refreshing tokens', error);
  }
}
