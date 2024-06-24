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
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { postCreateKudo } from '@/api/api-handlers';
import { useAuth } from '@/hooks/useAuth';
import useCreateKudo from '@/hooks/api/useKudos/useCreateKudo';
interface AddKudoDialogProps {
  editing?: boolean;
  kudo?: TKudos;
}

export const addKudoFormSchema = z
  .object({
    title: z.string().optional(),
    message: z.string().min(2, 'Please provide a valid message.'),
    receiverId: z.string().nullable(),
    isAnonymous: z.boolean(),
  })
  .transform((data) => {
    return !data.isAnonymous ? data : { ...data, receiverId: null };
  });

export default function AddKudosDialog(props: AddKudoDialogProps) {
  const [open, setOpen] = useState(false);

  const { user } = useAuth().state;

  const { mutateAsync } = useCreateKudo();

  const form = useForm<z.infer<typeof addKudoFormSchema>>({
    resolver: zodResolver(addKudoFormSchema),
    defaultValues: {
      title: props.kudo?.title || '',
      message: props.kudo?.message || '',
      receiverId: props.kudo?.receiverId || null,
      isAnonymous: !props.kudo?.receiver || false,
    },
  });

  async function onSubmit(data: z.infer<typeof addKudoFormSchema>) {
    if (!user) return;
    const { companyId, userId } = user;
    try {
      mutateAsync({ ...data, companyId, senderId: userId, receiverId: data.receiverId ? data.receiverId : undefined, isAnonymous: });
    } catch (error) {
      console.error(error);
    }
  }

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
      <Form {...form}>
        <form>
          <DialogContent className='sm:max-w-[500px]'>
            <DialogHeader>
              <DialogTitle>Add a Kudo</DialogTitle>
              <DialogDescription>Recognize your teammates for their great work.</DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          id='title'
                          placeholder='Great job on that project!'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          id='message'
                          placeholder='Let them know what they did well!'
                          className='min-h-[100px]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='recipient'>Recipient</Label>
                <div className='relative'>
                  <FormField
                    control={form.control}
                    name='receiverId'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ComboBox
                            receiverId={field.value}
                            setValue={form.setValue}
                            isAnonymous={form.watch('isAnonymous')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <FormField
                  control={form.control}
                  name='isAnonymous'
                  render={({ field }) => (
                    <FormItem className='flex gap-2 items-center'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Send Anonymous</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Checkbox id='no-recipient' />
                <Label htmlFor='no-recipient'>No recipient</Label> */}
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
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type='submit'
                disabled={form.formState.isSubmitting || !form.formState.isValid}
              >
                {form.formState.isSubmitting ? 'Sending...' : props.editing ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
