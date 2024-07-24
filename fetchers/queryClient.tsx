import { QueryClient, QueryClientProvider as QCP } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: false,
    },
  },
});

export function QueryClientProvider({ children }) {
  return <QCP client={queryClient}>{children}</QCP>;
}
