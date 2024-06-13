import { redirect } from 'next/navigation';
import SignUpForm from '../_components/sign-up-form';
import { auth } from '@/auth/auth';

export default async function SignUp() {
  const session = await auth();
  const user = session?.user;
  if (user) redirect('/');
  return <SignUpForm />;
}
