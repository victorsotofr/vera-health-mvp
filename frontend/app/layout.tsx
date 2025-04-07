import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vera Health – E/M Classifier",
  description:
    "MVP for classifying emergency medicine clinical notes by billing level (E/M) based on AMA/ACEP guidelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-[#F9FAFB] border-r p-6 flex flex-col justify-between">
            <div className="space-y-8">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Image
                  src="/LogoVeraHealth.png"
                  alt="Vera Health"
                  width={150}
                  height={40}
                  priority
                />
              </Link>

              {/* New Analysis Section */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  New Analysis
                </p>
                <nav className="space-y-1 pl-2">
                  <Link
                    href="/"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    🚀 New
                  </Link>
                </nav>
              </div>

              {/* Documentation Section */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Documentation
                </p>
                <nav className="space-y-1 pl-2">
                  <Link
                    href="/templates"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    📄 Templates
                  </Link>
                  <Link
                    href="/references"
                    className="block px-3 py-2 rounded hover:bg-blue-100 text-sm font-medium"
                  >
                    📚 References
                  </Link>
                </nav>
              </div>
            </div>

            <div className="text-xs text-gray-400 text-center">
              Built for Vera Health
            </div>
          </aside>


          {/* Main content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
