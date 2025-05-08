"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!session && status !== "loading" && pathname !== "/") {
      router.push("/");
    }
  }, [session, status, pathname, router]);

  if (status === "loading") return null;
  if (!session && pathname !== "/") return null;

  return (
    <>
      <Navbar />
      {!session ? (
        children
      ) : (
        <div className="flex h-screen">
          <aside className="w-64 bg-[#F9FAFB] border-r p-6 flex flex-col justify-between">
            <div className="space-y-8">
              <Link href="/new" className="flex items-center space-x-2 mb-6">
                <Image
                  src="/LogoVeraHealth.png"
                  alt="Vera Health"
                  width={150}
                  height={40}
                  priority
                />
              </Link>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  New Analysis
                </p>
                <nav className="space-y-1 pl-2">
                  <Link
                    href="/new"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-bold"
                  >
                    〈...〉
                  </Link>
                </nav>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Useful
                </p>
                <nav className="space-y-1 pl-2">
                  <Link
                    href="/templates"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    ⌟ Templates
                  </Link>
                  <Link
                    href="/references"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    ⌟ References
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    Settings
                  </Link>
                </nav>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => signOut()}
                className="w-full px-3 py-2 rounded text-sm font-semibold text-red-600 bg-gray-100 hover:bg-red-100 hover:text-red-700 transition"
              >
                ⇥ Sign Out
              </button>
              <div className="text-xs text-gray-400 text-center">
                Built with 🩵 for Vera Health.
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      )}
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </SessionProvider>
  );
}
