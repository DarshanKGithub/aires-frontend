"use client";

import AuthGuard from "@/components/AuthGuard";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </AuthGuard>
  );
}
