"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ReactQueryProvider({ children }: any) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
