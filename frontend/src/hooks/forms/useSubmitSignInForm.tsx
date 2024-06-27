import * as z from 'zod';
import { login } from '@/api/auth-actions';
import { signInFormSchema } from '@/zodSchemas';

import { useNavigate } from '@tanstack/react-router';

import { CustomError } from '@/errors';
import { useAuth } from '../useAuth';
import { AxiosError } from 'axios';
import { setErrorMessage } from '@/lib/localStorage';

export default function useSubmitSignInForm() {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    try {
      await login(dispatch, data);
      await navigate({ to: '/' });
    } catch (error) {
      console.error(['signInFormError'], error);
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else if (error instanceof CustomError || error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      window.location.reload();
    }
  }
  return onSubmit;
}
