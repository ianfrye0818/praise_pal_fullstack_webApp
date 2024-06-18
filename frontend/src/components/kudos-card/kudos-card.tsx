'use client';
import { TKudos } from '@/types';

import KudoCardDropDownMenu from './kudo-card-dropdown-menu';
import KudoLikeButton from './kudo-like-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  kudo: TKudos;
};

export default function KudosCard({ kudo }: Props) {
  const { state } = useAuth();
  const user = state.user;
  const { sender, receiver } = kudo;
  const liked = kudo.userLikes.some((userLike) => userLike.userId === user?.userId);
  const usersKudo = kudo.senderId === user?.userId;

  return (
    <div className='flex items-center p-4 bg-white shadow-md rounded-lg my-8 dark:bg-gray-800 dark:text-gray-200'>
      <Avatar>
        <AvatarImage />
        <AvatarFallback className='bg-blue-500 text-zinc-100'>
          {sender.displayName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='ml-4 flex-1'>
        <p className='font-bold'>
          {' '}
          {sender.displayName} sent kudos to {receiver?.displayName ?? 'Someone Special'}
        </p>
        <p>{kudo.id}</p>
        {/* <p className='text-sm text-gray-500 dark:text-gray-400'>{kudo.createdAt.toISOString()}</p> */}
        <div className='mt-2 flex items-center justify-between'>
          <div className='flex m-0 items-center'>
            <KudoLikeButton
              liked={liked}
              kudoId={kudo.id}
              userId={user?.userId ?? ''}
            />
            <p className='text-sm text-gray-500'>{kudo.likes}</p>
          </div>
          {usersKudo && <KudoCardDropDownMenu kudoId={kudo.id} />}
        </div>
      </div>
    </div>
  );
}
