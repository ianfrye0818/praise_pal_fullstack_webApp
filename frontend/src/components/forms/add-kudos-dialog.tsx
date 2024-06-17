import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import ComboBox from './find-receipint-combo-box';
import { TKudos } from '@/types';
import { useState } from 'react';

interface AddKudoDialogProps {
  editing?: boolean;
  kudo?: TKudos;
}

export default function AddKudosDialog(props: AddKudoDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          className='ml-auto'
          variant='default'
        >
          Add Kudo
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add a Kudo</DialogTitle>
          <DialogDescription>Recognize your teammates for their great work.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              placeholder='Great job on that project!'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='message'>Message</Label>
            <Textarea
              id='message'
              placeholder='Let them know what they did well!'
              className='min-h-[100px]'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='recipient'>Recipient</Label>
            <div className='relative'>
              <ComboBox />
              {/* <div className='absolute inset-y-0 right-2 flex items-center'>
                <SearchIcon className='h-4 w-4 text-gray-400' />
              </div> */}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Checkbox id='no-recipient' />
            <Label htmlFor='no-recipient'>No recipient</Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            className='mr-auto'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type='submit'>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SearchIconProps {
  className?: string;
}

function SearchIcon(props: SearchIconProps) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle
        cx='11'
        cy='11'
        r='8'
      />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
