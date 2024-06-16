import {
  loginWithEmailAndPassword,
  logoutUser,
  signUpWithEmailAndPassword,
} from '@/api/auth-actions';
import { AuthState, User, SignUpFormProps, SignInFormProps } from '../types';
import { createContext, useEffect, useRef, useState } from 'react';
import { getUserToken } from '@/lib/utils';

export const AuthProviderContext = createContext<AuthState>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  isAdmin: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoading = user === undefined;
  const authenticated = useRef<boolean>(false);
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isAuthenticated = authenticated.current;

  useEffect(() => {
    const storedUser = getUserToken();
    if (storedUser) {
      setUser(storedUser);
      authenticated.current = true;
    } else return;
  }, []);

  const login = async (formData: SignInFormProps) => {
    const user = await loginWithEmailAndPassword(formData);
    if (!user) return;
    setUser(user);
    authenticated.current = true;
  };

  const register = async (formData: SignUpFormProps) => {
    try {
      await signUpWithEmailAndPassword(formData);
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      console.error(['register error'], error);
    }
  };

  const logout = async () => {
    setUser(null);
    authenticated.current = false;
    await logoutUser();
  };

  return (
    <AuthProviderContext.Provider
      value={{ user, login, register, isAuthenticated, logout, isLoading, isAdmin }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;
