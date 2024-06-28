import SignUpForm from '@/components/forms/sign-up-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/sign-up')({
  component: () => <SignUpPage />,
});

function SignUpPage() {
  return (
    <div className='h-[calc(100dvh-80px)]w-full flex flex-col justify-center items-center'>
      <SignUpForm />
    </div>
  );
}
