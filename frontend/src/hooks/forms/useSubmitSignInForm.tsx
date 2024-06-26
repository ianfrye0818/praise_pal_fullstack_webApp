import * as z from 'zod';
import { login } from '@/api/auth-actions';
import { signInFormSchema } from '@/zodSchemas';

import { useNavigate } from '@tanstack/react-router';
import { UseFormReturn } from 'react-hook-form';
import { CustomError } from '@/errors';
import { useAuth } from '../useAuth';

export default function useSubmitSignInForm(form: UseFormReturn<z.infer<typeof signInFormSchema>>) {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    try {
      await login(dispatch, data);
      await navigate({ to: '/' });
    } catch (error) {
      console.error(['signInFormError'], error);
      if (error instanceof CustomError || error instanceof Error) {
        form.setError('root', {
          message: error.message ?? 'An error occurred. Please try again.',
        });
      } else {
        form.setError('root', { message: 'An error occurred. Please try again....' });
      }
    }
  }
  return onSubmit;
}
