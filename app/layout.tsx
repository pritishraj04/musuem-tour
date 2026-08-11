import type { Metadata, Viewport } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bihar Museum — Digital Guide",
  description:
    "Explore Bihar Museum's world-class collection of Mauryan, Gupta, and Pala-dynasty art with an interactive digital tour guide.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bihar Museum",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { AudioProvider } from "@/context/AudioContext";
import { GlobalAudioPlayer } from "@/components/GlobalAudioPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("h-full", "antialiased", ebGaramond.variable, figtree.variable)}>
      <body className="min-h-full flex flex-col items-center justify-start bg-black text-foreground font-sans overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AudioProvider>
            <main className="w-full max-w-md bg-background text-foreground min-h-screen relative border-x-2 border-border flex flex-col transition-colors duration-300">
              {children}
              <GlobalAudioPlayer />
            </main>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
