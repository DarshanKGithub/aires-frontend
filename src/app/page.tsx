// src/app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Upload, Brain, Shield, Zap, Sparkles, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">AI-Powered Resume Parsing • 10x Faster Hiring</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Resume Intelligence
              </span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Upload any resume. Extract name, skills, experience, contact — instantly.
              <br />
              Powered by advanced AI. Built for recruiters who value time.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="text-lg px-10 py-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-2xl hover:shadow-purple-500/50">
                  <Link href="/register">
                    Start Free Now
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
              </motion.div>
              <Button asChild size="lg" variant="outline" className="text-lg px-10 py-8 text-black border-white/30">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating Cards */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: "AI Extraction", desc: "Smart parsing of skills, experience, education" },
              { icon: Zap, title: "Instant Results", desc: "Process 100 resumes in under 60 seconds" },
              { icon: Shield, title: "100% Secure", desc: "Encrypted storage • GDPR compliant" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all">
                  <item.icon className="w-12 h-12 mb-4 text-blue-400" />
                  <h3 className="text-2xl text-white font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Ready to Transform Your Hiring?
          </h2>
          <Button asChild size="lg" className="text-2xl px-16 py-10 bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-2xl hover:shadow-pink-500/50">
            <Link href="/register">
              Get Started — It's Free
              <Sparkles className="ml-4 w-8 h-8" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}