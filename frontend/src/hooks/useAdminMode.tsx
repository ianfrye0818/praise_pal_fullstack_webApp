import { AdminModeContext } from '@/providers/AdminModeProvider';
import { useContext } from 'react';

export default function useAdminMode() {
  const context = useContext(AdminModeContext);
  console.log(context);
  if (!context) throw new Error('useAdminMode must be used within a AdminModeProvider');

  return context;
}
