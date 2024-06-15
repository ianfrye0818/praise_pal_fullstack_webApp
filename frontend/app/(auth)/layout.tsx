import React, { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return <div className='h-screen w-full flex justify-center items-center'>{children}</div>;
}
