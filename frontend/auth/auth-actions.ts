'use server';

import { AuthTokens, SignInFormProps, SignUpFormProps, User } from '@/types';
import { AxiosError } from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { auth, signIn, signOut } from './auth';
import { authClient } from '@/axios-api/axios-clients';

export async function signInWithEmailAndPassword(formdata: SignInFormProps) {
  await signIn('credentials', formdata);
}

export async function signUpWithEmailAndPassword(formdata: SignUpFormProps) {
  try {
    const newUser = await authClient.post('/auth/register', formdata);
    if (newUser.data) {
      await signIn('credentials', { email: formdata.email, password: formdata.password });
    }
  } catch (error) {
    console.error(['signUpWithEmailAndPassword'], error);
  }
}

export async function refreshAccessToken(token: any) {
  try {
    const response = await authClient.post<AuthTokens>(
      '/refresh',
      {},
      { headers: { Authorization: `Bearer ${token.refreshToken}` } }
    );

    const accessTokenExpirationTime =
      (jwt.decode(response.data.accessToken) as JwtPayload)?.exp! * 1000 || 0;

    Object.assign(token, {
      expiresIn: accessTokenExpirationTime,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });

    return token;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error refreshing token:', error.response?.data);
    }
    return token;
  }
}

export async function logout(refreshToken?: string) {
  if (refreshToken) {
    await authClient.post('/logout', {}, { headers: { Authorization: `Bearer ${refreshToken}` } });
  }
  await signOut({ redirectTo: '/sign-in' });
}

export async function getSessionUser() {
  const session = await auth();
  if (session && session.user) {
    return session.user as User;
  }
  return null;
}
