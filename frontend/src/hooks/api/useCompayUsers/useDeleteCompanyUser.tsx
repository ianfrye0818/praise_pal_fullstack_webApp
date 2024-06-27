import { deleteSingleUser } from '@/api/api-handlers';
import { User } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseGetUserProps {
  userId: string;
  companyId: string;
}

export default function useDeleteCompanyUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ companyId, userId }: UseGetUserProps) =>
      await deleteSingleUser(companyId, userId),
    //optimistic update
    onMutate: async (newData: Partial<User>) => {
      await queryClient.cancelQueries({ queryKey: ['companyUsers'] });

      const previousData = queryClient.getQueryData(['companyUsers']);

      queryClient.setQueryData(['companyUsers'], (old: User[]) => {
        return old.filter((user: User) => {
          user.userId !== newData.userId;
        });
      });
      return { previousData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['companyUsers'], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['companyUsers'] });
    },
  });
  return mutation;
}
