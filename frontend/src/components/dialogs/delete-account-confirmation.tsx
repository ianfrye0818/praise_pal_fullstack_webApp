import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { User } from '@/types';
import useDeleteCompanyUser from '@/hooks/api/useCompayUsers/useDeleteCompanyUser';
import { errorLogout } from '@/api/auth-actions';

export function DeleteAccountConfirmation({
  setDeleting,
  user,
  currentUser,
  setOpen,
}: {
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  currentUser: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [verifyEmail, setVerifyEmail] = useState('');
  const { mutateAsync: deleteUser, isPending } = useDeleteCompanyUser();

  async function handelDelete() {
    try {
      await deleteUser({ companyId: currentUser.companyId as string, userId: user.userId });
      setDeleting(false);
      setOpen(false);
      checkAndRedirect();
    } catch (error) {
      console.error(error);
    }
  }

  function checkAndRedirect() {
    if (currentUser.userId === user.userId) {
      errorLogout('Your account has been deleted.');
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogDescription>You will lose your account forever.</DialogDescription>
        <DialogDescription className='flex justify-center gap-1 py-3'>
          Type <span className='font-bold text-red-600'>{user.email}</span> to continue
        </DialogDescription>
      </DialogHeader>
      <Input
        onChange={(e) => setVerifyEmail(e.target.value)}
        value={verifyEmail}
      />
      <DialogFooter>
        <div className='w-full flex justify-between'>
          <Button onClick={() => setDeleting(false)}>Cancel</Button>
          <Button
            onClick={handelDelete}
            disabled={verifyEmail !== user.email || isPending}
            className='bg-red-500 hover:bg-red-600'
          >
            Delete Account
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
