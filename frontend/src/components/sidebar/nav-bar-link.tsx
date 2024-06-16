'use client';
import { SidebarLink } from '@/types';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  link: SidebarLink;
};

export default function NavBarLink({ link }: Props) {
  const [isActive, setIsActive] = useState(false);
  return (
    <Link
      activeProps={{ onClick: () => setIsActive(true) }}
      className={cn('flex gap-3 items-center p-3 rounded-md', { 'bg-blue-500': isActive })}
      key={link.label}
      to={link.route as string}
    >
      <div className='relative size-6'>
        <img
          src={link.icon}
          alt={link.label}
          className={cn('object-contain', {
            'brightness-[0.5] invert': isActive,
          })}
        />
      </div>
      <p className={cn({ '!text-white': isActive })}>{link.label}</p>
    </Link>
  );
}
