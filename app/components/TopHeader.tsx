"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TopHeaderProps {
  /** Display title — defaults to "Bihar Museum" */
  title?: string;
  /** Show back arrow on the left */
  showBack?: boolean;
  /** Optional right-side action element */
  rightAction?: React.ReactNode;
}

export default function TopHeader({
  title = "Bihar Museum",
  showBack = false,
  rightAction,
}: TopHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/scan" || pathname === "/scan/result") return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-40 flex h-16 w-full max-w-md items-center justify-between px-6"
    >
      {/* Blurred background panel */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border/50" />

      {/* Left slot — back button or spacer */}
      <div className="relative flex w-10 items-center justify-start z-10">
        {showBack && (
          <button
            type="button"
            onClick={() => router.back()}
            className={cn(
              "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all",
              "hover:bg-accent hover:text-accent-foreground active:scale-95"
            )}
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Center — title / logo */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        {title === "Bihar Museum" ? (
          <img 
            src="/BiharMuseum.svg" 
            alt="Bihar Museum Logo" 
            className="h-12 w-auto object-contain invert opacity-90"
          />
        ) : (
          <h1 className="text-base font-semibold tracking-tight text-foreground text-center">
            {title}
          </h1>
        )}
      </div>

      {/* Right slot — action or spacer */}
      <div className="relative flex w-10 items-center justify-end z-10">
        {rightAction}
      </div>
    </motion.header>
  );
}
