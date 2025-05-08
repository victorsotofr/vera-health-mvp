"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;
  if (session) {
    router.push("/new");
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative isolate h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Image
              src="/LogoVeraHealth.png"
              alt="Vera Health"
              width={200}
              height={60}
              className="mx-auto mb-8"
            />
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-gray-900 leading-tight mb-6">
              <span className="block">
                Autonomous
                </span>
              <span className="bg-gradient-to-br font-bold from-[#49c3ff] to-[#0077ff] text-transparent bg-clip-text text-4xl sm:text-5xl">
                E/M Classification Assistant
              </span>              
            </h1>

            {/* Animated Scroll Arrow */}
            <div className="mt-16 flex justify-center">
              <a href="#features" aria-label="Scroll down" className="hover:opacity-80 transition-opacity">
                <svg
                  className="w-8 h-8 text-gray-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Quick and Accurate E/M Classification.
              </p>
              <p className="mt-2 text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">
                Get your E/M level in seconds.
              </p>
            </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-2xl">➤</span>
                  Instant Analysis
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Get immediate E/M level recommendations with detailed breakdowns of medical decision making, problems, data, and risk.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-2xl">➤</span>
                  Comprehensive Guidelines
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Access the latest AMA/ACEP guidelines and documentation requirements at your fingertips.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-2xl">➤</span>
                  Secure & Private
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Your data is processed securely and never stored. All analysis happens in real-time with your OpenAI API key.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>


    {/* Footer */}
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="https://www.vera-health.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Vera Health</span>
            <span className="text-sm text-gray-500">
              Built with 🩵 for <span className="underline">Vera Health</span>.
            </span>
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2025 Victor Soto.
          </p>
        </div>
      </div>
    </footer>

    </div>
  );
}
