import { User } from '@/types';
import * as z from 'zod';
import useCreateKudo from './api/useKudos/useCreateKudo';
import { addKudoFormSchema } from '@/zodSchemas';

export default function useSubmitAddKudosForm(
  user: User,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { mutateAsync } = useCreateKudo();

  async function onSubmit(data: z.infer<typeof addKudoFormSchema>) {
    console.log(data);
    try {
      await mutateAsync({
        ...data,
        senderId: user.userId,
        companyId: user.companyId,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  return onSubmit;
}
