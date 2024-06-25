import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DeleteAccountConfirmation } from './delete-account-confirmation';
import { UpdateAccountDialog } from './update-account-form';

export default function UpdateUserDialog() {
  const { user } = useAuth().state;
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => setOpen(open)}
    >
      <DialogTrigger>
        <Avatar>
          <AvatarFallback className='bg-blue-500 text-zinc-100'>
            {user?.displayName?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>

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
