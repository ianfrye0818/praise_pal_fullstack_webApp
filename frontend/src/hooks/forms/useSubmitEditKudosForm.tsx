import * as z from 'zod';
import { editKudosFormSchema } from '@/zodSchemas';
import { User } from '@/types';
import useUpdateKudo from '../api/useKudos/useUpdateKudo';

export default function useSubmitEditKudosForm(user: User, kudoId: string) {
  const { mutateAsync } = useUpdateKudo();

  async function onSubmit(data: z.infer<typeof editKudosFormSchema>) {
    try {
      await mutateAsync({
        payload: { ...data, id: kudoId },
        companyId: user.companyId,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return onSubmit;
}
