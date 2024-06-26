import React, { createContext, useState } from 'react';

export const AdminModeContext = createContext<{
  adminMode: boolean;
  setAdminMode: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  adminMode: false,
  setAdminMode: () => {},
});

export default function AdminModeProvider({ children }: { children: React.ReactNode }) {
  const [adminMode, setAdminMode] = useState(false);
  console.log(adminMode);
  return (
    <AdminModeContext.Provider value={{ adminMode, setAdminMode }}>
      {children}
    </AdminModeContext.Provider>
  );
}
