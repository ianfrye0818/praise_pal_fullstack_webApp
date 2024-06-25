import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';

export function DeleteAccountConfirmation({
  email,
  setDeleting,
}: {
  email: string;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [verifyEmail, setVerifyEmail] = useState('');
  return (
    <>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogDescription>You will lose your account forever.</DialogDescription>
        <DialogDescription className='flex justify-center gap-1 py-3'>
          Type <span className='font-bold text-red-600'>{email}</span> to continue
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
            disabled={verifyEmail !== email}
            className='bg-red-500 hover:bg-red-600'
          >
            Delete Account
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
