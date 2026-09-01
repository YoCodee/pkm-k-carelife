import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { generateActivationCodesFile } from "@/lib/activation";

generateActivationCodesFile();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareLife - Platform Edukasi Anak Berkebutuhan Khusus",
  description:
    "Platform digital pendamping buku CareLife untuk anak berkebutuhan khusus dengan fitur aksesibilitas lengkap.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-carelife.png",
    shortcut: "/logo-carelife.png",
    apple: "/logo-carelife.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
