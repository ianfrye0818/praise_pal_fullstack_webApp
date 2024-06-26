import * as z from 'zod';
import { register } from '@/api/auth-actions';
import { signUpFormSchema } from '@/zodSchemas';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { CustomError } from '@/errors';
import { useAuth } from '../useAuth';

export default function useSubmitSignUpForm(form: UseFormReturn<z.infer<typeof signUpFormSchema>>) {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    if (data.password !== data.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    try {
      await register(dispatch, data);
      await navigate({ to: '/' });
    } catch (error) {
      if (error instanceof CustomError || error instanceof Error) {
        form.setError('root', {
          message: error.message ?? 'An error occurred. Please try again.',
        });
      } else {
        form.setError('root', { message: 'An error occurred. Please try again.' });
      }
    }
  }

  return onSubmit;
}
