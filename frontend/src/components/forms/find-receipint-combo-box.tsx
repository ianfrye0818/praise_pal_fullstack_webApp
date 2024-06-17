import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';

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

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

export default function ComboBox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  console.log(value);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button variant='outline'>
          {value
            ? frameworks
                .filter((framework) => framework.value === value)
                .map((framework) => framework.label)
            : 'Select a recipient'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='min-w-[300px] p-0'>
        <Command className='rounded-lg border shadow-md'>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => {
                return (
                  <CommandItem
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                    }}
                    value={framework.value}
                    key={framework.value}
                  >
                    {framework.value}
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
