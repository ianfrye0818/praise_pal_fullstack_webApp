import { FlipVerticalIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { TKudos } from '@/types';

import { useState } from 'react';
import EditKudosDialog from '../dialogs/edit-kudos-dialog';
import { CustomDialog } from '../dialogs/delete-kudo-dialog';

interface KudoCardDropDownMenuProps {
  kudo: TKudos;
}

export default function KudoCardDropDownMenu({ kudo }: KudoCardDropDownMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <DropdownMenu
      open={menuOpen}
      onOpenChange={(open) => setMenuOpen(open)}
    >
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
          <EditKudosDialog
            kudo={kudo}
            setMenuOpen={setMenuOpen}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <CustomDialog
            kudo={kudo}
            setMenuOpen={setMenuOpen}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
