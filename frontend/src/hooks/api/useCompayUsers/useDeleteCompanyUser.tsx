import { deleteSingleUser } from '@/api/api-handlers';
import { USER_QUERY_OPTIONS } from '@/constants';
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
      await queryClient.cancelQueries(USER_QUERY_OPTIONS);

      const previousData = queryClient.getQueryData(['companyUsers']);

      queryClient.setQueriesData(USER_QUERY_OPTIONS, (old: any) => {
        return old.filter((user: User) => {
          user.userId !== newData.userId;
        });
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueriesData(USER_QUERY_OPTIONS, context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(USER_QUERY_OPTIONS);
    },
  });
  return mutation;
}
