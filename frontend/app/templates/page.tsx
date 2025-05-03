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
    <main className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-2xl font-semibold">❏ E/M Classification Templates</h1>

          {mockTemplates.map((template) => {
            const isExpanded = expandedTemplateId === template.id;

            return (
              <div
                key={template.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow space-y-3"
              >
                <h2 className="font-semibold text-lg text-gray-800">{template.title}</h2>

                <div className="relative max-h-60 overflow-auto text-sm text-gray-700 bg-white border rounded p-4 whitespace-pre-wrap leading-snug">
                  {isExpanded
                    ? template.note
                    : template.note.slice(0, 600) + (template.note.length > 600 ? "..." : "")}
                </div>

                <div className="flex justify-between items-center">
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
      </div>
    </main>
  );
}
