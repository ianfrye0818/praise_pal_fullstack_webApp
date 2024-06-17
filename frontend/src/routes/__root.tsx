import { AuthState } from '@/providers/AuthReducerProvider';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouterContext {
  state: AuthState;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='h-screen'>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
