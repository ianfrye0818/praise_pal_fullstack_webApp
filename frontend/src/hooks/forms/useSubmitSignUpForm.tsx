import * as z from 'zod';
import { register } from '@/api/auth-actions';
import { signUpFormSchema } from '@/zodSchemas';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { isCustomError, isError } from '@/errors';
import { useAuth } from '../useAuth';
import { isAxiosError } from 'axios';
import { setErrorMessage } from '@/lib/localStorage';

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
      console.error(['signInFormError'], error);
      if (isAxiosError(error)) setErrorMessage(error.response?.data.message);
      else if (isError(error) || isCustomError(error)) setErrorMessage(error.message);
      else setErrorMessage('An error occurred. Please try again.');
      window.location.reload();
    }
  }

  return onSubmit;
}
