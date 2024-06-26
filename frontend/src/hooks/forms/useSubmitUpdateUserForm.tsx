import { User } from '@/types';
import { updateUserFormSchema } from '@/zodSchemas';
import * as z from 'zod';
import useUpdateCompanyUser from '../api/useCompayUsers/useUpdateCompanyUser';

export default function useSubmitUpdateUserForm(currentUser: User | null, user: User) {
  const { mutateAsync: updateUser } = useUpdateCompanyUser();
  const onSubmit = async (data: z.infer<typeof updateUserFormSchema>) => {
    try {
      await updateUser({
        companyId: currentUser?.companyId as string,
        userId: user.userId,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return onSubmit;
}
