import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { useState } from 'react';

import useGetCompanyUsers from '@/hooks/api/useCompayUsers/useGetCompanyUsers';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';

export default function ComboBox() {
  const [open, setOpen] = useState(false);
  const [recepient, setRecepient] = useState<User | null>(null);
  const { user } = useAuth().state;
  console.log('recepient: ', recepient);

  const { data, isLoading, error } = useGetCompanyUsers(user?.companyId as string);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!data) return <div>No Users</div>;

  const users = data.filter((u) => u.userId !== user?.userId);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {recepient
            ? users.filter((r) => r.displayName === recepient.displayName).map((r) => r.displayName)
            : 'Select a recipient'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='min-w-[300px] p-0'>
        <Command className='rounded-lg border shadow-md'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {users.map((r) => {
                return (
                  <CommandItem
                    onSelect={(currentValue) => {
                      setRecepient(users.find((r) => r.displayName === currentValue) as User);
                      setOpen(false);
                    }}
                    value={r.displayName}
                    key={r.userId}
                  >
                    {r.displayName}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
