import SignUpForm from '@/components/forms/sign-up-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authLayout/sign-up')({
  component: () => <SignUpPage />,
});

function SignUpPage() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <SignUpForm />;
    </div>
  );
}
