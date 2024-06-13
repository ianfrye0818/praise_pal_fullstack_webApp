'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signUpFormSchema } from '@/zodSchemas';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signUpWithEmailAndPassword } from '@/auth/auth-actions';

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      companyCode: '',
    },
  });

  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    await signUpWithEmailAndPassword(data);
    router.push('/');
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Register</CardTitle>
        <CardDescription>Fill out the form to create your account.</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-5'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='m@example.com'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid gap-2'>
                      <FormLabel htmlFor='password'>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='companyCode'
              render={({ field }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <FormLabel>Company Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your company code'
                        maxLength={4}
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='displayName'
              render={({ field }) => (
                <FormItem>
                  <div className='grid gap-2'>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input
                        id='displayName'
                        placeholder='Enter your display name'
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <p className='italic text-lg text-red-500'>{form.formState.errors.root.message}</p>
            )}
            <Button className='w-full'>Register</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Already have an account?{' '}
          <Link
            href='/sign-in'
            className='text-blue-600'
          >
            {' '}
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
