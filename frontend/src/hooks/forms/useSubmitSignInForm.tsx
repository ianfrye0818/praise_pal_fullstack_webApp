import * as z from 'zod';
import { login } from '@/api/auth-actions';
import { signInFormSchema } from '@/zodSchemas';
import { useNavigate } from '@tanstack/react-router';
import { isCustomError, isError } from '@/errors';
import { useAuth } from '../useAuth';
import { isAxiosError } from 'axios';
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
      if (isAxiosError(error)) setErrorMessage(error.response?.data.message);
      else if (isError(error) || isCustomError(error)) setErrorMessage(error.message);
      else setErrorMessage('An error occurred. Please try again.');
      window.location.reload();
    }
  }
  return onSubmit;
}
