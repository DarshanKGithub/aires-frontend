"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const { login, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Deep Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-90" />
        
        {/* Soft Overlay Blend */}
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400 via-transparent to-purple-600 opacity-40 mix-blend-overlay" />
        
        {/* Floating Glowing Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-ping" />
        
        {/* Subtle Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Your Original Clean Form — Untouched */}
      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Aires
          </h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit((d) => login(d.email, d.password))} className="space-y-6">
          <div>
            <Label>Email</Label>
            <Input {...register("email")} type="email" placeholder="hr@company.com" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label>Password</Label>
            <Input {...register("password")} type="password" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </Card>

      {/* Optional: Add subtle CSS animation for grid */}
      <style jsx>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
      `}</style>
    </div>
  );
}