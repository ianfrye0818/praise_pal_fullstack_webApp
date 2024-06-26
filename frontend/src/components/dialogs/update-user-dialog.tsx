import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DeleteAccountConfirmation } from './delete-account-confirmation';
import { UpdateAccountDialog } from '../forms/update-account-form';
import { User } from '@/types';

export default function UpdateUserDialog({
  user,
  trigger,
}: {
  user: User;
  trigger?: React.ReactNode | string;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent>
        {deleting ? (
          <DeleteAccountConfirmation
            email={user!.email}
            setDeleting={setDeleting}
          />
        ) : (
          <UpdateAccountDialog
            user={user!}
            setOpen={setOpen}
            setDeleting={setDeleting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
