import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';
import useLikeKudos from '@/hooks/api/useLikeKudos';
import { cn } from '@/lib/utils';

interface Props {
  liked: boolean;
  kudoId: string;
}

export default function KudoLikeButton({ liked, kudoId }: Props) {
  const { mutateAsync } = useLikeKudos({ isLiked: liked, kudoId });
  console.log('liked', liked);
  return (
    <Button
      variant='ghost'
      size='icon'
      className='text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'
      onClick={() => mutateAsync()}
    >
      <HeartIcon
        fill={liked ? 'red' : 'none'}
        className={cn('w-4 h-4', liked ? 'text-red-500' : 'text-gray-400')}
      />

      <span className='sr-only'>Like</span>
    </Button>
  );
}
