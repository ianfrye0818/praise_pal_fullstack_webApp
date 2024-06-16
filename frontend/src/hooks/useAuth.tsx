import { useContext } from 'react';
import { AuthProviderContext } from '../providers/AuthProvider';

export function useAuth() {
  const authContext = useContext(AuthProviderContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
}
