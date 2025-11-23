"use client";

import { useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: any) {
  const router = useRouter();

  useEffect(() => {
    api.get("/resumes").catch(() => router.replace("/login"));
  }, []);

  return <>{children}</>;
}
