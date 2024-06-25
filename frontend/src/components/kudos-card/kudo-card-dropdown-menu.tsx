import { FlipVerticalIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { TKudos } from '@/types';
import EditKudosDialog from '../forms/edit-kudos-dialog';

interface KudoCardDropDownMenuProps {
  kudo: TKudos;
}

export default function KudoCardDropDownMenu({ kudo }: KudoCardDropDownMenuProps) {
  //DODO: Implement edit and delete functionality

  const handleDelete = () => {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
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
        <DropdownMenuItem asChild>
          <EditKudosDialog kudo={kudo} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
