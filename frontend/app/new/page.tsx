'use client';

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewAnalysis() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    const storedNote = localStorage.getItem("prefilled_note");
    if (storedNote) {
      setNote(storedNote);
      localStorage.removeItem("prefilled_note");
    }
    const key = sessionStorage.getItem("openai_api_key");
    if (!key) setShowApiKeyWarning(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  useEffect(() => {
    if (result && textareaRef.current) {
      textareaRef.current.style.height = "140px";
    }
  }, [result]);

  async function handleSubmit() {
    const apiKey = sessionStorage.getItem("openai_api_key");
    if (!apiKey) {
      router.push("/settings");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ note }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error connecting to the classification service.");
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-2xl font-semibold mb-2">〈...〉E/M Classification Assistant</h1>

          {showApiKeyWarning && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded w-full">
              <p className="font-semibold">Your OpenAI API Key is not configured.</p>
              <button
                className="mt-2 underline text-red-700 hover:text-blue-900"
                onClick={() => router.push("/settings")}
              >
                Configure my API Key
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow">
                <h2 className="text-lg font-semibold text-[#1C65BD] mb-2">💡 Suggested E/M Level</h2>
                <p className="text-2xl font-bold text-gray-900">{result.suggested_em_level || "n.a."}</p>
              </div>

              {result.mdm && (
                <div className="bg-gray-50 border rounded-xl p-6 shadow space-y-4">
                  <h2 className="text-lg font-semibold text-[#1C65BD]">🧠 Medical Decision Making</h2>
                  <p><strong>Level:</strong> {result.mdm.level || "n.a."}</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.mdm.justification}</p>
                </div>
              )}
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="fixed bottom-0 left-64 right-0 px-6 py-4 bg-white z-10 flex justify-center"
      >
        <div className="relative w-full max-w-4xl">
          <Textarea
            ref={textareaRef}
            placeholder="Paste your clinical note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full min-h-[140px] max-h-[50vh] rounded-2xl pr-20 pl-4 py-3 border border-gray-300 shadow-md resize-y text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={loading || !note.trim()}
            className="absolute bottom-3 right-3 px-4 py-2 bg-[#1C65BD] hover:bg-[#0D2E57] text-white text-sm rounded-lg"
          >
            {loading ? "..." : "Send"}
          </Button>
        </div>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Analyzing your documentation...</p>
          </div>
        </div>
      )}
    </main>
  );
}
