'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <h1 className="text-2xl font-semibold">⌟ Settings</h1>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src="/openai-logo.png"
                  alt="OpenAI"
                  width={20}
                  height={20}
                />
                <h2 className="text-lg font-semibold">OpenAI API Key</h2>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Your OpenAI API key is required to analyze clinical notes. It is stored only in your browser session and never sent to our servers.
              </p>

              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={handleSave}>Save API Key</Button>
              {saved && (
                <span className="text-green-600 text-sm">✓ API Key saved</span>
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
                  OpenAI’s API Key page
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
