import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
  createBrowserHistory,
} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useAuth } from './hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './providers/AuthReducerProvider';
import AdminModeProvider from './providers/AdminModeProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const memoryHistory = createBrowserHistory({
  createHref: (path) => path,
});
const router = createRouter({ routeTree, context: { state: undefined! }, history: memoryHistory });
console.log('memory history: ', { memoryHistory });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30000,
    },
    mutations: {
      retry: 2,
    },
  },
});

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
        <AdminModeProvider>
          <InnerApp />
          <ReactQueryDevtools />
        </AdminModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
