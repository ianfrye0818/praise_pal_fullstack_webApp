import { FlipVerticalIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Props {
  kudoId: string;
}

export default function KudoCardDropDownMenu({ kudoId }: Props) {
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
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
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
