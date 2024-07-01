import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { Company, User } from '@/types';
import { UpdateCompanyDialogForm } from '../forms/update-company-form';

export default function UpdateCompanyDialog({
  updatingCompany,
  children,
  currentUser,
  error,
  setError,
}: {
  updatingCompany: Company;
  children?: React.ReactNode;
  currentUser: User;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [open, setOpen] = useState(false);
  if (!currentUser) {
    setOpen(false);
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent onSubmit={() => setOpen(false)}>
        <UpdateCompanyDialogForm
          setOpen={setOpen}
          updatingCompany={updatingCompany}
          error={error}
          setError={setError}
        />
      </DialogContent>
    </Dialog>
  );
}
