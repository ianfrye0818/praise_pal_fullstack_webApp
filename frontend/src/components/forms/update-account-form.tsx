import { updateUserFormSchema } from '@/zodSchemas';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form } from '../ui/form';
import { FormInputItem } from './form-input-item';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types';

export function UpdateAccountDialog({
  user,
  setOpen,
  setDeleting,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}) {
  const form = useForm<z.infer<typeof updateUserFormSchema>>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      email: user!.email,
      firstName: user!.firstName,
      lastName: user!.lastName,
    },
  });

  const onSubmit = (data: z.infer<typeof updateUserFormSchema>) => {
    setOpen(false);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Update User Info</DialogTitle>
        <DialogDescription>Update your user information.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className='grid gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <FormInputItem<typeof updateUserFormSchema>
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='John'
              />
            </div>
            <div className='space-y-2'>
              <FormInputItem<typeof updateUserFormSchema>
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='Doe'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <FormInputItem<typeof updateUserFormSchema>
              control={form.control}
              name='displayName'
              label='Display Name'
              placeholder='John Doe'
            />
          </div>
          <div className='space-y-2'>
            <FormInputItem<typeof updateUserFormSchema>
              control={form.control}
              name='email'
              label='Email'
              placeholder='john@example.com'
            />
          </div>
          <DialogFooter>
            <div className='w-full flex justify-between'>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleting(true);
                }}
                className='bg-red-500 hover:bg-red-600'
              >
                Delete Account
              </Button>
              <div className='flex items-center gap-2'>
                <Button variant={'outline'}>Cancel</Button>
                <Button
                  type='submit'
                  className='ml-auto'
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
