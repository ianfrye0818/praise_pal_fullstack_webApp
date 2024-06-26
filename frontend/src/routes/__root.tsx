import { AuthState } from '@/providers/AuthReducerProvider';
import GetLastPathName from '@/providers/GetLastPathname';
import ScrollToTop from '@/providers/ScrollToTop';
import SetPathLocaiton from '@/providers/SetPathLocation';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface RouterContext {
  state: AuthState;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className='h-screen'>
      <Outlet />
      <ScrollToTop />
      <GetLastPathName />
      <SetPathLocaiton />
      <TanStackRouterDevtools />
    </div>
  ),
});
