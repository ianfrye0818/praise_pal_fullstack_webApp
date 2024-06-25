import { User } from '@/types';
import * as z from 'zod';
import useCreateKudo from './api/useKudos/useCreateKudo';
import { addKudoFormSchema } from '@/zodSchemas';

export default function useSubmitAddKudosForm(user: User) {
  const { mutateAsync } = useCreateKudo();

  async function onSubmit(data: z.infer<typeof addKudoFormSchema>) {
    try {
      await mutateAsync({
        ...data,
        senderId: user.userId,
        companyId: user.companyId,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return onSubmit;
}
