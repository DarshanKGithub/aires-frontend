// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ParticlesBackground from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aires - AI Resume Intelligence Platform",
  description: "The smartest way to parse and manage resumes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        <ParticlesBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}