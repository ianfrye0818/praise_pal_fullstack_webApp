'use client';
import { Kudo, User } from '@/types';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { HeartIcon, FlipVerticalIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useGetUser } from '@/hooks/getUser';

type Props = {
  kudo: Kudo;
};

export default function KudosCard({ kudo }: Props) {
  const { user, status } = useGetUser();

  if (status === 'loading') return <div>Loading...</div>;
  const { sender, receiver } = kudo;

  console.log({ userid: user?.userId });
  if (kudo.User_Like.length !== 0) console.log(kudo.User_Like[0].userId);
  const liked = kudo.User_Like.some((userLike) => userLike.userId === user?.userId);
  console.log(liked);
  const usersKudo = kudo.senderId !== user?.id;

  return (
    <div className='flex items-center p-4 bg-white shadow-md rounded-lg my-8 dark:bg-gray-800 dark:text-gray-200'>
      <Avatar>
        <AvatarFallback color='blue'>{sender.displayName[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='ml-4 flex-1'>
        <p className='font-bold'>
          {' '}
          {sender.displayName} sent kudos to {receiver.displayName ?? 'Someone Special'}
        </p>
        {/* <p className='text-sm text-gray-500 dark:text-gray-400'>{kudo.createdAt.toISOString()}</p> */}
        <div className='mt-2 flex items-center justify-between'>
          <Button
            variant='ghost'
            size='icon'
            className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
          >
            <HeartIcon
              className='h-4 w-4'
              fill={liked ? 'red' : 'none'}
            />
            <span className='sr-only'>Like</span>
          </Button>
          {usersKudo && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
                >
                  <FlipVerticalIcon className='h-4 w-4' />
                  <span className='sr-only'>More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='bg-white p-3 cursor-pointer'
                align='end'
              >
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
}
