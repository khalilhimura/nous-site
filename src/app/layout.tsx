import type { Metadata } from "next";
import localFont from "next/font/local";

const GeistSans = localFont({ src: [
  { path: "../../public/fonts/geist-sans/Geist-Variable.woff2", weight: "100 900", style: "normal" },
  { path: "../../public/fonts/geist-sans/Geist-Italic[wght].woff2", weight: "100 900", style: "italic" },
], variable: "--font-geist-sans", display: "swap" });
const GeistMono = localFont({ src: [
  { path: "../../public/fonts/geist-mono/GeistMono-Variable.woff2", weight: "100 900", style: "normal" },
  { path: "../../public/fonts/geist-mono/GeistMono-Italic[wght].woff2", weight: "100 900", style: "italic" },
], variable: "--font-geist-mono", display: "swap" });
import "./globals.css";

export const metadata: Metadata = {
  title: "Nous: mind, intellect, and insight",
  description: "Explore the meaning of nous through seven entries spanning Greek philosophy, Christian theology, and contemporary usage.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
