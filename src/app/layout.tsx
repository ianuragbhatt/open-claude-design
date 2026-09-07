import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Claude Design — Lean Agentic UI Designer",
  description: "The fast, clean, open-source Claude Design alternative with live canvas preview, DESIGN.md brand contracts, and unified BYOK LLM support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="h-full antialiased font-sans flex flex-col bg-[#0f0f11] text-[#e4e4e7]">
        {children}
      </body>
    </html>
  );
}
