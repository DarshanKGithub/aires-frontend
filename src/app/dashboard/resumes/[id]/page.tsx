"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function ResumeDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // ✅ unwrap params Promise

  const { data, isLoading } = useQuery({
    queryKey: ["resumes", id],
    queryFn: async () => {
      const all = (await api.get("/resumes")).data;
      return all.find((r: any) => String(r.id) === String(id));
    },
    refetchInterval: 3000,
  });

  if (isLoading || !data) return <div className="p-8">Loading…</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{data.fileName}</h1>

      <div className="space-y-6">
        <section className="p-4 bg-white/5 rounded">
          <h2 className="font-semibold mb-2">Candidate</h2>
          <p><strong>Name:</strong> {data.candidateName}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone ?? "—"}</p>
        </section>

        <section className="p-4 bg-white/5 rounded">
          <h2 className="font-semibold mb-2">Extracted Text</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-300">
            {data.extractedText || "No extracted text"}
          </pre>
        </section>

        <section className="p-4 bg-white/5 rounded">
          <h2 className="font-semibold mb-2">Parsed JSON</h2>
          <pre className="whitespace-pre-wrap text-sm text-green-300">
            {data.parsedData
              ? JSON.stringify(JSON.parse(data.parsedData), null, 2)
              : "Parsing in progress…"}
          </pre>
        </section>
      </div>
    </div>
  );
}
