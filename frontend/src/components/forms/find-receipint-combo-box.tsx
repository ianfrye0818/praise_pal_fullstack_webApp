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
import * as z from 'zod';

import useGetCompanyUsers from '@/hooks/api/useCompayUsers/useGetCompanyUsers';
import { useAuth } from '@/hooks/useAuth';
import { ControllerRenderProps, UseFormReturn, UseFormSetValue } from 'react-hook-form';
import { addKudoFormSchema } from '@/zodSchemas';

interface ComboBoxProps {
  field: ControllerRenderProps<z.infer<typeof addKudoFormSchema>, 'receiverId'>;
  form: UseFormReturn<z.infer<typeof addKudoFormSchema>>;
}

export default function ComboBox({ field, form }: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  // const [receiverId, setReceiverId] = useState<string | null>(null);
  const { user } = useAuth().state;

  const { data, isLoading, error } = useGetCompanyUsers(user?.companyId as string);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (!data) return <div>No Users</div>;

  const users = data.filter((u) => u.userId !== user?.userId);

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {field.value
            ? users.filter((r) => r.userId === field.value).map((r) => r.displayName)
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
                    onSelect={() => {
                      form.setValue('receiverId', r.userId);
                      setOpen(false);
                      field.onChange(r.userId);
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
