import { patchMarkNotificationAsRead } from '@/api/api-handlers';
import { USER_NOTIFICATION_QUERY_OPTIONS } from '@/constants';
import { UserNotification } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function usePatchMarkAsRead() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (notificationId: string) => {
      await patchMarkNotificationAsRead(notificationId);
    },
    onMutate: async (notificationId) => {
      const previousData = queryClient.getQueriesData(USER_NOTIFICATION_QUERY_OPTIONS);

      queryClient.setQueriesData(USER_NOTIFICATION_QUERY_OPTIONS, (old: any) => {
        return old.map((notification: UserNotification) => {
          if (notification.id === notificationId) {
            return { ...notification, isRead: true };
          }
          return notification;
        });
      });

      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueriesData(USER_NOTIFICATION_QUERY_OPTIONS, context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(USER_NOTIFICATION_QUERY_OPTIONS);
    },
  });

  return mutation;
}
