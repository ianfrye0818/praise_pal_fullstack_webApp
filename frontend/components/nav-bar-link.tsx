'use client';
import { SidebarLink } from '@/types';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type Props = {
  link: SidebarLink;
};

export default function NavBarLink({ link }: Props) {
  const pathName = usePathname();
  const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
  return (
    <Link
      className={cn('flex gap-3 items-center p-3 rounded-md', { 'bg-blue-500': isActive })}
      key={link.label}
      href={link.route as string}
    >
      <div className='relative size-6'>
        <Image
          src={link.icon}
          alt={link.label}
          fill
          className={cn({
            'brightness-[0.5] invert': isActive,
          })}
        />
      </div>
      <p className={cn({ '!text-white': isActive })}>{link.label}</p>
    </Link>
  );
}
