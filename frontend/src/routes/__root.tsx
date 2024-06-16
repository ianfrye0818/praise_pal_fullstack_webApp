import { AuthState } from '@/types';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouterContext {
  auth: AuthState;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='h-screen'>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
