import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nous Account",
  description: "Your account across Nous and participating TFIS apps.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
    <body className="min-h-dvh">{children}</body>
  </html>;
}
