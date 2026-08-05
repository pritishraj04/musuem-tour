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
        <motion.header variants={itemVariants} className="flex w-full justify-center pt-12 pb-4">
          <img 
            src="/BiharMuseum.svg" 
            alt="Bihar Museum Logo" 
            className="h-28 w-auto object-contain invert drop-shadow-2xl" 
          />
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
