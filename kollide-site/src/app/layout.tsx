import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOLLIDE — Advanced 3D Design & Printing",
  description:
    "KOLLIDE unifies K3D (football helmet innovation) and MTL3D (on‑demand 3D printing in Montreal).",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LenisProvider>
          {children}
          <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/60">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p>© {new Date().getFullYear()} KOLLIDE</p>
              <div className="flex gap-4">
                <Link href="/k3d" className="hover:text-white">K3D</Link>
                <Link href="/mtl3d" className="hover:text-white">MTL3D</Link>
              </div>
            </div>
          </footer>
        </LenisProvider>
      </body>
    </html>
  );
}
