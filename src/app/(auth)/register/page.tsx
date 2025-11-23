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
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function RegisterPage() {
  const { register: registerUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 opacity-50 mix-blend-screen" />
        
        {/* Animated Floating Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-ping" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Your Original Form — Untouched */}
      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Join Aires
          </h1>
          <p className="text-gray-600 mt-2">Start parsing resumes with AI today</p>
        </div>

        <form
          onSubmit={handleSubmit((d) => registerUser(d.name, d.email, d.password))}
          className="space-y-6"
        >
          <div>
            <Label>Full Name</Label>
            <Input {...register("name")} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label>Email</Label>
            <Input {...register("email")} type="email" placeholder="john@company.com" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label>Password</Label>
            <Input {...register("password")} type="password" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-purple-600 hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}