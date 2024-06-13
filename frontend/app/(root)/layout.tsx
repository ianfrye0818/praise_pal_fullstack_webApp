import React, { PropsWithChildren } from 'react';
import Sidebar from './_components/sidebar';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className='grid h-screen w-full font-inter grid-cols-[250px,1fr]'>
      <div>
        <Sidebar />
      </div>
      <div>{children}</div>
    </main>
  );
}
