"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockTemplates } from "./index";

export default function TemplatesPage() {
  const router = useRouter();
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);

  const handleSelect = (note: string) => {
    localStorage.setItem("prefilled_note", note);
    router.push("/new");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">❏ E/M Classification Templates</h1>

      <div className="space-y-6">
        {mockTemplates.map((template) => {
          const isExpanded = expandedTemplateId === template.id;

          return (
            <div
              key={template.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <h2 className="font-semibold text-lg mb-2">{template.title}</h2>

              <div className="relative max-h-60 overflow-auto text-xs text-gray-700 bg-white border rounded p-3 whitespace-pre-wrap leading-snug">
                {isExpanded
                  ? template.note
                  : template.note.slice(0, 600) + (template.note.length > 600 ? "..." : "")}
              </div>

              <div className="flex justify-between items-center mt-3">
                <Button onClick={() => handleSelect(template.note)}>
                  Load into Classifier
                </Button>
                <button
                  className="text-blue-600 text-sm underline hover:text-blue-800"
                  onClick={() =>
                    setExpandedTemplateId(isExpanded ? null : template.id)
                  }
                >
                  {isExpanded ? "Reduce" : "Expand"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
