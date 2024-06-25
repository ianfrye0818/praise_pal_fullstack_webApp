import useUpdateKudo from './api/useKudos/useUpdateKudo';
import * as z from 'zod';
import { editKudosFormSchema } from '@/zodSchemas';
import { User } from '@/types';

export default function useSubmitEditKudosForm(
  user: User,
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  kudoId: string
) {
  const { mutateAsync } = useUpdateKudo();

  async function onSubmit(data: z.infer<typeof editKudosFormSchema>) {
    console.log(data);
    try {
      await mutateAsync({
        payload: { ...data, id: kudoId },
        companyId: user.companyId,
      });
      // setOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  return onSubmit;
}
