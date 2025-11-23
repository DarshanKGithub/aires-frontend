"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Login failed", {
        description: err.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Registration failed", {
        description: err.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.info("Logged out");
  };

  return { login, register, logout, loading };
};
