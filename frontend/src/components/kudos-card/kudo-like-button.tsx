import { HeartIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  liked: boolean;
}

export default function KudoLikeButton({ liked }: Props) {
  return (
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
  );
}
