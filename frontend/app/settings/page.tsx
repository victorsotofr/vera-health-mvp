'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const key = sessionStorage.getItem("openai_api_key");
    if (key) {
      setApiKey(key);
    }
  }, []);

  function handleSave() {
    sessionStorage.setItem("openai_api_key", apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-8">⌟ Settings</h1>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">OpenAI API Key</h2>
          <p className="text-sm text-gray-600 mb-4">
            Your OpenAI API key is required to analyze clinical notes. The key is stored only in your browser's session storage and is never sent to our servers.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={handleSave}>Save API Key</Button>
              {saved && (
                <span className="text-green-600 text-sm">API Key saved successfully ✓</span>
              )}
            </div>

            <div className="text-sm text-gray-500">
              <p>
                You can create or retrieve your API key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  OpenAI's API Key page
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 