"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
  show: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
  }
};

export default function SplashPage() {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#ffffeb] text-[#1a1a1a]">
      
      {/* ── Background Sculpture & Vignette ── */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/museum-sculpture-bg.png"
          alt="Ancient sculpture from Bihar Museum collection"
          fill
          priority
          className="object-cover object-top opacity-30 mix-blend-multiply"
          sizes="100vw"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffffeb] via-[#ffffeb]/60 to-transparent" />
      </motion.div>

      {/* ── Content Layer ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-[100dvh] flex-1 flex-col px-6 py-8"
      >
        {/* ── Header Badge & Logo ── */}
        <motion.header variants={itemVariants} className="flex flex-col w-full items-start pt-6 pb-4 gap-4">
          <div className="badge-teal">
            <span className="w-2 h-2 rounded-full bg-[#ffa946] animate-pulse" />
            Digital Tour Guide
          </div>
          <img 
            src="/BiharMuseum.svg" 
            alt="Bihar Museum Logo" 
            className="h-12 w-auto object-contain" 
          />
        </motion.header>

        <div className="flex-1" />

        {/* ── Typography Block (Eb Garamond 400 Display) ── */}
        <motion.section variants={itemVariants} className="max-w-md my-6">
          <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-6xl leading-[0.9] tracking-[-1.92px] text-[#1a1a1a]">
            Discover Bihar&apos;s Masterpieces
          </h1>
          <p className="mt-4 text-xl font-normal text-[#8a8a80] leading-snug font-[family-name:var(--font-figtree)]">
            An editorial journey through Mauryan bronze, Didarganj Yakshi, and 2,500 years of living art.
          </p>
        </motion.section>

        {/* ── CTA Buttons (Wispr Flow Signature) ── */}
        <motion.section variants={itemVariants} className="mt-6 flex w-full flex-col gap-3.5">
          <Button 
            size="lg" 
            className="btn-primary w-full h-14 text-base font-semibold shadow-none border-2 border-[#1a1a1a] rounded-xl bg-[#f0d7ff] text-[#1a1a1a] hover:bg-[#e5c4fa]"
          >
            Download Guide App
          </Button>

          <Link 
            href="/home" 
            className="btn-secondary w-full h-14 text-base font-semibold border-2 border-[#1a1a1a] rounded-xl bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#e4e4d0] gap-2"
          >
            Explore Web Guide <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        {/* ── Footer ── */}
        <motion.footer variants={itemVariants} className="mt-8 pt-3 border-t-2 border-[#1a1a1a]">
          <p className="mx-auto text-center max-w-[340px] text-xs font-semibold leading-[1.15] text-[#111111]">
            Bihar Museum Official Digital Guide <span className="text-[#ffa946] font-bold">v1.2.0</span> • Department of Arts, Culture & Youth, Govt. of Bihar • Preserving 2,500 years of living history.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
