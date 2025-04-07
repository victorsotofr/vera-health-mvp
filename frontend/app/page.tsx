"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [view, setView] = useState<"results" | "document">("results");

  const [isExpanded, setIsExpanded] = useState(false);
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [apiKeyTemp, setApiKeyTemp] = useState("");
  const [apiKeySavedMessage, setApiKeySavedMessage] = useState(false);

  useEffect(() => {

    const key = sessionStorage.getItem("openai_api_key");
    if (!key) {
      setShowApiKeyWarning(true);
      setApiKeyModalOpen(true);
    }

    const prefilled = localStorage.getItem("prefilled_note");
    if (prefilled) {
      setNote(prefilled);
    }
  }, []);

  async function handleSubmit() {
    const apiKey = sessionStorage.getItem("openai_api_key");
    if (!apiKey) {
      setShowApiKeyWarning(true);
      setApiKeyModalOpen(true);
      return;
    }

    setLoading(true);
    setResult(null);
    setIsExpanded(false);
    setView("results");

    try {
      const res = await fetch("https://vera-health-mvp-production.up.railway.app/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ note }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      console.log("📦 Response from backend:", data);
      setResult(data);
    } catch (err) {
      alert("Error connecting to the classification service.");
    } finally {
      setLoading(false);
    }
  }

  function handleApiKeySave() {
    sessionStorage.setItem("openai_api_key", apiKeyTemp);
    setApiKeyModalOpen(false);
    setShowApiKeyWarning(false);
    setApiKeySavedMessage(true);
    setTimeout(() => setApiKeySavedMessage(false), 3000);
  }  

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 relative">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">E/M Level Analysis</h1>
          <div className="flex space-x-2">
            <Button
              onClick={handleSubmit}
              disabled={loading || !note.trim()}
              className="bg-[#1C65BD] hover:bg-[#0D2E57]"
            >
              {loading ? "Analyzing..." : "Analyze E/M Level"}
            </Button>
            {result && (
              <>
                <Button
                  variant={view === "results" ? "default" : "outline"}
                  onClick={() => setView("results")}
                >
                  Results
                </Button>
                <Button
                  variant={view === "document" ? "default" : "outline"}
                  onClick={() => setView("document")}
                >
                  Document
                </Button>
              </>
            )}
          </div>
        </div>

        {showApiKeyWarning && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <p className="font-semibold">OpenAI API Key not configured</p>
            <button
              className="mt-2 underline text-blue-700 hover:text-blue-900"
              onClick={() => setApiKeyModalOpen(true)}
            >
              Configure API Key
            </button>
          </div>
        )}

        {apiKeySavedMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
            ✅ Your API Key was saved successfully.
          </div>
        )}

        {apiKeyModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border">
              {/* Logo */}
              <Image
                src="/LogoVeraHealth.png"
                alt="Vera Health"
                width={150}
                height={40}
                priority
                className="mx-auto mb-6"
              />

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Enter your OpenAI API Key
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                This key is required to analyze your clinical note securely using GPT.
              </p>

              <input
                type="password"
                placeholder="sk-..."
                className="w-full border border-gray-300 p-3 rounded mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setApiKeyTemp(e.target.value)}
              />

              <Button
                onClick={handleApiKeySave}
                className="w-full bg-[#1C65BD] hover:bg-[#0D2E57]"
              >
                Save & Continue
              </Button>

              <p className="mt-4 text-xs text-gray-400">
                Your key is stored only for the current session.
              </p>
            </div>
          </div>
        )}


        {!result && (
          <Textarea
            placeholder="Paste the clinical note here..."
            className="min-h-[180px] mb-4 border-gray-300 shadow-sm"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        )}

        {result && view === "results" && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold text-[#1C65BD] mb-2">💡 Suggested E/M Level</h2>
              <p className="text-2xl font-bold text-gray-900">{result.suggested_em_level || "n.a."}</p>
            </div>

            {result.mdm && (
              <div className="bg-gray-50 border rounded-xl p-6 shadow space-y-4">
                <h2 className="text-lg font-semibold text-[#1C65BD]">🧠 Medical Decision Making</h2>
                <p><strong>Level:</strong> {result.mdm.level || "n.a."}</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.mdm.justification}</p>

                <div className="border-t pt-4 space-y-3 text-sm text-gray-800">
                  <div>
                    <strong>🩺 Problems (COPA):</strong> {result.mdm.copa.level} — {Math.round(result.mdm.copa.confidence * 100)}%
                    <p className="text-gray-600">{result.mdm.copa.explanation}</p>
                  </div>

                  <div>
                    <strong>📊 Data:</strong> {result.mdm.data.level} — {Math.round(result.mdm.data.confidence * 100)}%
                    <p className="text-gray-600">{result.mdm.data.explanation}</p>
                  </div>

                  <div>
                    <strong>⚠️ Risk:</strong> {result.mdm.risk.level} — {Math.round(result.mdm.risk.confidence * 100)}%
                    <p className="text-gray-600">{result.mdm.risk.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {result.cpt_codes?.length > 0 && (
              <div className="bg-white border rounded-xl p-6 shadow space-y-4">
                <h2 className="text-lg font-semibold text-[#1C65BD]">Additional CPT Codes</h2>
                <ul className="space-y-2 text-sm">
                  {result.cpt_codes.map((code: any, idx: number) => (
                    <li key={idx} className="border rounded p-3 bg-gray-50">
                      <p><strong>Code:</strong> {code.code}</p>
                      <p><strong>Confidence:</strong> {Math.round(code.confidence * 100)}%</p>
                      <p className="text-gray-600">{code.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.documentation_gaps && (
              <div className="bg-green-50 border rounded-xl p-6 shadow">
                <h2 className="text-lg font-semibold text-[#1C65BD]">Documentation Gaps</h2>
                {result.documentation_gaps.length === 0 ? (
                  <p className="text-sm text-green-700">
                    ✅ No documentation gaps detected. The note appears complete.
                  </p>
                ) : (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    {result.documentation_gaps.map((gap: string, idx: number) => (
                      <li key={idx}>{gap}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {result && view === "document" && (
          <div className="space-y-8">
            <div className="bg-gray-50 border p-4 rounded-md text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">📝 Clinical Note Preview</span>
                <button
                  className="text-blue-600 text-sm underline"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Collapse" : "Expand"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap overflow-x-auto max-h-60">
                {isExpanded ? note : note.slice(0, 600) + (note.length > 600 ? "..." : "")}
              </pre>
            </div>

            {result.retrieved_guidelines && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm shadow">
                <h2 className="text-md font-semibold text-[#1C65BD] mb-2">📚 Guideline Chunks Used for Reasoning</h2>
                <pre className="whitespace-pre-wrap text-gray-700">{result.retrieved_guidelines}</pre>
              </div>
            )}

            <div className="border rounded overflow-hidden">
              <h2 className="text-md font-semibold text-[#1C65BD] mb-2 px-2 pt-2">📄 Full AMA/ACEP Guidelines PDF</h2>
              <iframe
                src="/2023-e-m-descriptors-guidelines.pdf"
                className="w-full h-[700px] border-none"
                title="AMA ACEP Guidelines"
              />
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-xs text-gray-400">
          Built for Vera Health –{" "}
          <a href="https://www.vera-health.ai" target="_blank" className="underline">
            www.vera-health.ai
          </a>
        </footer>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-50">
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <div className="p-6 bg-white border rounded-xl shadow-xl text-center max-w-md w-full">
              <div className="flex justify-center mb-4">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-lg font-semibold mb-4">Analyzing Documentation</h2>
              <p className="text-sm text-gray-700 mb-2">
                Our AI is reviewing your documentation and generating coding recommendations. This may take a few moments...
              </p>
              <ul className="text-sm text-left text-gray-600 mt-4 space-y-1 list-disc list-inside">
                <li>Analyzing medical decision making</li>
                <li>Identifying procedures and services</li>
                <li>Evaluating documentation quality</li>
                <li>Generating recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
