import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useAuth } from './hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/AuthReducerProvider';

const router = createRouter({ routeTree, context: { state: undefined! } });
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const { state } = useAuth();
  return (
    <RouterProvider
      router={router}
      context={{ state }}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
