'use client';
import { TKudos } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import KudoCardDropDownMenu from './kudo-card-dropdown-menu';
import KudoLikeButton from './kudo-like-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
  kudo: TKudos;
};

export default function KudosCard({ kudo }: Props) {
  const { user } = useAuth();
  const { sender, receiver } = kudo;
  const liked = kudo.User_Like.some((userLike) => userLike.userId === user?.userId);
  const usersKudo = kudo.senderId !== user?.userId;

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
          {sender.displayName} sent kudos to {receiver.displayName ?? 'Someone Special'}
        </p>
        {/* <p className='text-sm text-gray-500 dark:text-gray-400'>{kudo.createdAt.toISOString()}</p> */}
        <div className='mt-2 flex items-center justify-between'>
          <KudoLikeButton liked={liked} />
          {usersKudo && <KudoCardDropDownMenu kudoId={kudo.id} />}
        </div>
      </div>
    </div>
  );
}
