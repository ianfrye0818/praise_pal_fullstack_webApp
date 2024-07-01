import { getUserNotifications } from '@/api/api-handlers';
import { CustomError } from '@/errors';
import { setErrorMessage } from '@/lib/localStorage';
import { UserNotificationQueryParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetUserNotifications(queryParams: UserNotificationQueryParams) {
  const query = useQuery({
    queryKey: ['userNotifications', queryParams],
    queryFn: async () => {
      try {
        await getUserNotifications(queryParams);
      } catch (error) {
        setErrorMessage((error as unknown as CustomError).message || 'Something went wrong');
      }
    },
  });
  return query;
}
