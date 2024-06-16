import {
  getAuthTokens,
  removeAuthTokens,
  removeUserToken,
  setAuthTokens,
  setUserToken,
} from '@/lib/utils';
import { getLogout, getRefreshTokens, getRegisterUser, getUser } from './api-handlers';
import { SignInFormProps, SignUpFormProps } from '@/types';

export async function loginWithEmailAndPassword({ email, password }: SignInFormProps) {
  try {
    const data = await getUser({ email, password });
    const { accessToken, refreshToken, ...user } = data;
    setAuthTokens({ accessToken, refreshToken });
    setUserToken(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function signUpWithEmailAndPassword(data: SignUpFormProps) {
  if (data.password !== data.confirmPassword) throw new Error('Passwords do not match');
  try {
    await getRegisterUser(data);
    return await loginWithEmailAndPassword({ email: data.email, password: data.password });
  } catch (error) {
    console.error(error);
  }
}

export async function refreshTokens() {
  const { refreshToken } = getAuthTokens();
  if (!refreshToken) return;
  try {
    setAuthTokens(await getRefreshTokens(refreshToken));
  } catch (error) {
    console.error(error);
  }
}

export async function logoutUser() {
  try {
    const { refreshToken } = getAuthTokens();
    await getLogout(refreshToken);
    removeAuthTokens();
    removeUserToken();
  } catch (error) {
    console.error(error);
  }
}
