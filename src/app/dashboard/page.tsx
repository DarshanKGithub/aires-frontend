"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const queryClient = useQueryClient();

  const { data: resumes = [], isLoading } = useQuery({
    queryKey: ["resumes"],
    queryFn: async () => (await api.get("/resumes")).data,
    refetchInterval: 4000, // auto refresh
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      await api.post("/resumes/upload", form);
    },
    onSuccess: () => {
      toast.success("Resume uploaded! AI parsing…");
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });

  return (
    <div className="p-10 text-white">
      <h1 className="text-5xl font-bold mb-10">Your Resumes</h1>

      {/* Upload Card */}
      <Card
        className="p-10 border-2 border-dashed border-white/30 hover:border-white cursor-pointer text-center"
        onClick={() => document.getElementById("upload")?.click()}
      >
        {uploadMutation.isPending ? (
          <Loader2 className="w-16 h-16 animate-spin mx-auto" />
        ) : (
          <Upload className="w-16 h-16 mx-auto text-purple-400" />
        )}

        <p className="text-xl mt-4">Upload Resume (PDF)</p>

        <input
          id="upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) uploadMutation.mutate(e.target.files[0]);
          }}
        />
      </Card>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {isLoading &&
          [...Array(6)].map((_, i) => (
            <Card key={i} className="p-8 animate-pulse bg-white/5" />
          ))}

        {resumes.map((r: any, i: number) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/resumes/${r.id}`}>
              <Card className="p-8 bg-white/10 hover:bg-white/20 backdrop-blur-xl">
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold">{r.fileName}</h3>
                  <FileText className="w-10 h-10 text-purple-400" />
                </div>

                {r.candidateName === "Pending Parsing" ? (
                  <Badge className="mt-4 bg-yellow-500/20 text-yellow-300 animate-pulse">
                    AI Parsing…
                  </Badge>
                ) : (
                  <p className="mt-4 text-blue-400 text-lg font-bold">
                    {r.candidateName}
                  </p>
                )}
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
