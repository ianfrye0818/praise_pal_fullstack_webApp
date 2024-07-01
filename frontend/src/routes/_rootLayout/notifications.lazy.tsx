import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_rootLayout/notifications')({
  component: () => <div>Hello /_rootLayout/notifications!</div>,
});
