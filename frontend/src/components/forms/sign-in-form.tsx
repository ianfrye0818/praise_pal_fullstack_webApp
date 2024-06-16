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
import { signInFormSchema } from '@/zodSchemas';

import { Link } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AxiosError } from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

export default function SignInForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // const navigate = useNavigate();
  const { login } = useAuth();
  const isSubmitting = form.formState.isSubmitting;
  const globalError = form.formState.errors.root;

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    try {
      await login(data);
      await navigate({ to: '/' });
    } catch (error) {
      console.error(['signInFormError'], error);
      if (error instanceof AxiosError) {
        form.setError('root', {
          message: error.response?.data.message ?? 'An error occurred. Please try again.',
        });
      } else {
        form.setError('root', { message: 'An error occurred. Please try again.' });
      }
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Fill out the form to login to your account.</CardDescription>
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

            {globalError && <p className='italic text-lg text-red-500'>{globalError.message}</p>}
            <Button
              disabled={isSubmitting}
              className='w-full'
            >
              {isSubmitting ? 'Submitting... ' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          {"Don't have an account? "}
          <Link
            to='/sign-up'
            className='text-blue-600'
          >
            {' '}
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
