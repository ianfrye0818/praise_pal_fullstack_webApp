import React, { createContext, useEffect, useState } from 'react';

export const AdminModeContext = createContext<{
  adminMode: boolean;
  setAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  adminMode: false,
  setAdminMode: () => {},
});

export default function AdminModeProvider({ children }: { children: React.ReactNode }) {
  const [adminMode, setAdminMode] = useState(sessionStorage.getItem('adminMode') === 'true');

  useEffect(() => {
    sessionStorage.setItem('adminMode', adminMode.toString());
  }, [adminMode]);

  return (
    <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
      {children}
    </AdminModeContext.Provider>
  );
}
