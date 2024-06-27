import { TKudos } from '@/types';

import KudoCardDropDownMenu from './kudo-card-dropdown-menu';
import KudoLikeButton from './kudo-like-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { capitalizeString, formatDate } from '@/lib/utils';

type Props = {
  kudo: TKudos;
};

export default function KudosCard({ kudo }: Props) {
  const { state } = useAuth();
  const user = state.user;
  const { sender, receiver } = kudo;
  const liked = kudo.userLikes.some((userLike) => userLike.userId === user?.userId);
  const usersKudo = kudo.senderId === user?.userId;
  const senderDisplayName = sender.firstName || sender.displayName;
  const receiverDisplayName = receiver.firstName || receiver.displayName;
  return (
    <div className='flex items-center p-4 bg-white shadow-md rounded-lg my-8 dark:bg-gray-800 dark:text-gray-200'>
      <Avatar>
        <AvatarImage />
        <AvatarFallback className='bg-blue-500 text-zinc-100'>
          {senderDisplayName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='ml-4 flex-1'>
        <div className='flex justify-between items-center'>
          <p className='font-bold'>
            {' '}
            {kudo.isAnonymous ? 'Someone Special' : capitalizeString(senderDisplayName)} sent kudos
            to {capitalizeString(receiverDisplayName)}
          </p>
          <p className='text-sm text-gray-500'>{formatDate(kudo.createdAt)}</p>
        </div>
        {kudo.title && <h3 className='font-bold text-lg my-2'>{capitalizeString(kudo.title)}</h3>}
        <p>{kudo.message}</p>
        <div className='mt-2 flex items-center justify-between'>
          <div className='flex m-0 items-center'>
            <KudoLikeButton
              liked={liked}
              kudoId={kudo.id}
              userId={user?.userId ?? ''}
            />
            <p className='text-sm text-gray-500'>{kudo.likes}</p>
          </div>
          {usersKudo && <KudoCardDropDownMenu kudo={kudo} />}
        </div>
      </div>
    </div>
  );
}
