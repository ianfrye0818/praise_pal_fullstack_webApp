import { getSessionUser } from '@/auth/auth-actions';
import SignInForm from '../_components/sign-in-form';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const user = await getSessionUser();
  if (user) redirect('/');
  return <SignInForm />;
}
