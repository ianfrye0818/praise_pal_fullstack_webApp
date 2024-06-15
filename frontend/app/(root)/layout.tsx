import React, { PropsWithChildren } from 'react';
import Sidebar from './_components/sidebar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    // <main className='grid min-h-screen font-inter grid-cols-1 lg:grid-cols-[250px,1fr]'>
    <main className='flex h-screen font-inter'>
      <Sidebar />
      {children}
    </main>
  );
}
