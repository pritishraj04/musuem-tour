"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
 * Bihar Museum Logo 
 * ────────────────────────────────────────────────────────────────────────── */
function BiharMuseumLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Bihar Museum"
    >
      <path d="M97 120 C97 120 95 145 93 158 L107 158 C105 145 103 120 103 120Z" opacity="0.95" />
      <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M93 158 C88 166 78 173 72 176" />
        <path d="M93 158 C90 168 85 178 84 183" />
        <path d="M107 158 C112 166 122 173 128 176" />
        <path d="M107 158 C110 168 115 178 116 183" />
        <path d="M100 158 C100 170 100 180 100 186" />
      </g>
      <g opacity="0.95">
        <ellipse cx="100" cy="45" rx="7" ry="11" />
        <ellipse cx="100" cy="34" rx="5" ry="9" />
        <ellipse cx="100" cy="26" rx="3.5" ry="7" />
        <ellipse cx="82" cy="56" rx="9" ry="7" transform="rotate(-20 82 56)" />
        <ellipse cx="70" cy="63" rx="8" ry="6.5" transform="rotate(-35 70 63)" />
        <ellipse cx="60" cy="73" rx="7" ry="5.5" transform="rotate(-45 60 73)" />
        <ellipse cx="75" cy="47" rx="6" ry="9" transform="rotate(-15 75 47)" />
        <ellipse cx="65" cy="54" rx="5.5" ry="8" transform="rotate(-30 65 54)" />
        <ellipse cx="55" cy="66" rx="5.5" ry="7" transform="rotate(-40 55 66)" />
        <ellipse cx="88" cy="66" rx="7" ry="6" transform="rotate(-10 88 66)" />
        <ellipse cx="118" cy="56" rx="9" ry="7" transform="rotate(20 118 56)" />
        <ellipse cx="130" cy="63" rx="8" ry="6.5" transform="rotate(35 130 63)" />
        <ellipse cx="140" cy="73" rx="7" ry="5.5" transform="rotate(45 140 73)" />
        <ellipse cx="125" cy="47" rx="6" ry="9" transform="rotate(15 125 47)" />
        <ellipse cx="135" cy="54" rx="5.5" ry="8" transform="rotate(30 135 54)" />
        <ellipse cx="145" cy="66" rx="5.5" ry="7" transform="rotate(40 145 66)" />
        <ellipse cx="112" cy="66" rx="7" ry="6" transform="rotate(10 112 66)" />
        <ellipse cx="90" cy="40" rx="5.5" ry="8" transform="rotate(-10 90 40)" />
        <ellipse cx="110" cy="40" rx="5.5" ry="8" transform="rotate(10 110 40)" />
        <ellipse cx="78" cy="76" rx="6" ry="5" transform="rotate(-15 78 76)" />
        <ellipse cx="122" cy="76" rx="6" ry="5" transform="rotate(15 122 76)" />
        <ellipse cx="85" cy="82" rx="5.5" ry="4.5" />
        <ellipse cx="115" cy="82" rx="5.5" ry="4.5" />
        <ellipse cx="100" cy="80" rx="7" ry="5.5" />
        <ellipse cx="95" cy="90" rx="5.5" ry="4" />
        <ellipse cx="105" cy="90" rx="5.5" ry="4" />
      </g>
      <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.2">
        <path d="M100 120 C100 100 100 80 100 45" />
        <path d="M100 90 C90 76 75 62 60 55" />
        <path d="M100 90 C110 76 125 62 140 55" />
        <path d="M100 100 C92 86 80 74 68 70" />
        <path d="M100 100 C108 86 120 74 132 70" />
      </g>
      <line x1="52" y1="128" x2="148" y2="128" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <text x="70" y="140" fontSize="13" fontFamily="var(--font-sans), sans-serif" fontWeight="300" letterSpacing="0.5" textAnchor="end" fill="currentColor">bihar</text>
      <text x="130" y="140" fontSize="13" fontFamily="var(--font-sans), sans-serif" fontWeight="300" letterSpacing="0.5" textAnchor="start" fill="currentColor">museum</text>
      <text x="70" y="155" fontSize="12" fontFamily="var(--font-sans), sans-serif" fontWeight="400" textAnchor="end" fill="currentColor">बिहार</text>
      <text x="130" y="155" fontSize="12" fontFamily="var(--font-sans), sans-serif" fontWeight="400" textAnchor="start" fill="currentColor">संग्रहालय</text>
    </svg>
  );
}

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
    <div className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background">
      
      {/* ── Background Sculpture ── */}
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
          className="object-cover object-top opacity-60"
          sizes="100vw"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
      </motion.div>

      {/* ── Content Layer ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex min-h-[100dvh] flex-1 flex-col px-6"
      >
        {/* ── Logo ── */}
        <motion.header variants={itemVariants} className="flex w-full justify-center pt-12">
          <BiharMuseumLogo className="h-32 w-32 drop-shadow-2xl text-foreground" />
        </motion.header>

        <div className="flex-1" />

        {/* ── Typography Block ── */}
        <motion.section variants={itemVariants} className="max-w-md">
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl text-foreground">
            Tour Guide
          </h1>
          <h2 className="mt-2 text-2xl font-light tracking-wide text-muted-foreground">
            Bihar Museum
          </h2>
        </motion.section>

        {/* ── CTA Buttons ── */}
        <motion.section variants={itemVariants} className="mt-10 flex w-full max-w-sm flex-col gap-4">
          <Button 
            size="lg" 
            className="w-full rounded-full bg-gradient-to-r from-[#dcc27c] to-[#a68b4b] text-black hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(220,194,124,0.3)] h-14 text-base font-semibold"
          >
            Download App
          </Button>

          <Link 
            href="/home" 
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none w-full rounded-full bg-background/20 backdrop-blur-md border border-border/50 text-foreground hover:bg-background/40 hover:text-foreground h-14 text-base gap-2"
          >
            Stay on Web <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        {/* ── Footer ── */}
        <motion.footer variants={itemVariants} className="mt-auto py-8">
          <p className="mx-auto text-center max-w-[300px] text-[10px] leading-relaxed text-muted-foreground/60 font-medium">
            UMBRA is an incubator for Bihar&apos;s creative future. Founded on the visionary ethos of Upendra Maharathi—synthesizing Mughal/Rajput heritage, Buddhist minimalism, and grassroots craftsmanship into a contemporary global design language.
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}
