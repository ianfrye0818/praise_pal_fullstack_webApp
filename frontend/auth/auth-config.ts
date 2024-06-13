import jwt, { JwtPayload } from 'jsonwebtoken';
import { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthConfig } from 'next-auth';
import { Role, User } from '@/types';
import { withTokenLock } from '@/lib/tokenQueue';
import { refreshAccessToken } from './auth-actions';
import { apiClient } from '@/axios-api/axios-clients';

const callbacks = {
  async jwt({ token, user }: any) {
    if (user) {
      const decoded = jwt.decode((user as User).accessToken) as JwtPayload;
      const expTime = decoded?.exp ? decoded.exp * 1000 : 0;

      Object.assign(token, {
        userId: (user as User).userId,
        firstName: (user as User).firstName,
        lastName: (user as User).lastName,
        displayName: (user as User).displayName,
        email: (user as User).email,
        role: (user as User).role,
        accessToken: (user as User).accessToken,
        refreshToken: (user as User).refreshToken,
        companyId: (user as User).companyId,
        expiresIn: expTime,
      });
    }

    if (Date.now() < (token.expiresIn as number)) {
      return token;
    } else {
      return await withTokenLock(async () => {
        return await refreshAccessToken(token);
      });
    }
  },

  async session({ session, token }: any) {
    session.user = {
      userId: token.userId as string,
      firstName: token.firstName as string,
      lastName: token.lastName as string,
      displayName: token.displayName as string,
      email: token.email as string,
      role: token.role as Role,
      accessToken: token.accessToken as string,
      refreshToken: token.refreshToken as string,
      companyId: token.companyId as string,
    };

    return session;
  },
};

const sessionConfig = {
  strategy: 'jwt' as const,
};

const credentialsProviderOptions = {
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text', name: 'email' },
    password: { label: 'Password', type: 'password', name: 'password' },
  },
  async authorize(credentials: Partial<Record<'email' | 'password', unknown>>) {
    const { email, password } = credentials as { email: string; password: string };
    const response = await apiClient.post<User>('/auth/login', {
      email,
      password,
    });
    return response.data || null;
  },
};

const providers: Provider[] = [Credentials(credentialsProviderOptions)];

export const config: NextAuthConfig = {
  providers,
  callbacks,
  session: sessionConfig,
  secret: process.env.AUTH_SECRET!,
};
