import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description:
    "A modern, elegant Todo application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen selection:bg-blue-500/30 font-sans">
        <main className="max-w-4xl mx-auto p-4 sm:p-8">{children}</main>
      </body>
    </html>
  );
}
