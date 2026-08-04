import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bihar Museum — Digital Guide",
  description:
    "Explore Bihar Museum's world-class collection of Mauryan, Gupta, and Pala-dynasty art with an interactive digital tour guide.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "h-full", "antialiased", inter.variable, "font-sans", geist.variable, "bg-black")}>
      <body className="min-h-full flex flex-col items-center justify-start bg-black overflow-x-hidden">
        <main className="w-full max-w-md bg-background min-h-screen relative shadow-2xl border-x border-border/10 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
