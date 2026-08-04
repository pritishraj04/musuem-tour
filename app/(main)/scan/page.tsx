"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-black overflow-hidden">
      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex items-center justify-between p-6 pt-safe"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-base font-semibold text-white tracking-tight">
          Scan Artifact
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </motion.header>

      {/* ── Camera viewfinder area ── */}
      <div className="relative flex flex-1 items-center justify-center">
        {/* Placeholder camera feed bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />

        {/* Scan frame overlay */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
          className="relative z-10 w-[260px] h-[260px]"
        >
          {/* Corner brackets */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 260" fill="none">
            <path d="M2 40 V2 H40" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M220 2 H258 V40" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M2 220 V258 H40" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path d="M220 258 H258 V220" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="110" y1="130" x2="150" y2="130" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="130" y1="110" x2="130" y2="150" stroke="white" strokeWidth="1" opacity="0.3" />
            <rect x="100" y="100" width="60" height="60" stroke="white" strokeWidth="0.5" opacity="0.2" />
          </svg>
          
          {/* Scanning sweep animation */}
          <motion.div
            animate={{ y: [0, 256, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_12px_rgba(220,194,124,0.8)]"
          />
        </motion.div>
      </div>

      {/* ── Instruction text ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 text-center px-8 py-8"
      >
        <p className="text-[15px] font-medium text-white/80">
          Center the artifact within the frame
        </p>
      </motion.div>

      {/* ── Capture button ── */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex flex-col items-center pb-16 gap-8"
      >
        {/* Large capture circle */}
        <Link href="/scan/result" className="outline-none">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-20 h-20 rounded-full border-[3px] border-primary cursor-pointer shadow-[0_0_16px_rgba(220,194,124,0.2)]"
          >
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md" />
          </motion.div>
        </Link>

        {/* Manual search fallback */}
        <Button 
          variant="outline" 
          className="rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white font-semibold"
        >
          <Search className="w-4 h-4 mr-2" />
          Manual Search
        </Button>
      </motion.div>
    </div>
  );
}
