"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  show: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
  }
};

export default function ScanResultPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center min-h-full px-6 pt-24 pb-8 overflow-hidden"
    >
      {/* ── Background glow effect ── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary rounded-full blur-[100px] pointer-events-none" 
      />

      {/* ── Success checkmark (Animated Path) ── */}
      <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#dcc27c] to-[#a68b4b] shadow-[0_0_32px_rgba(201,168,94,0.4)] mb-3"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Check className="w-8 h-8 text-black" strokeWidth={3} />
          </motion.div>
        </motion.div>
        <p className="text-[15px] font-bold text-primary uppercase tracking-widest">
          Scan Successful
        </p>
      </motion.div>

      {/* ── Artifact thumbnail ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <Card className="relative overflow-hidden w-[180px] h-[240px] border-primary/30 shadow-2xl">
          <Image
            src="/museum-sculpture-bg.png"
            alt="Identified Artifact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </Card>
      </motion.div>

      {/* ── Artifact name ── */}
      <motion.h2 
        variants={itemVariants}
        className="text-center text-3xl font-extrabold tracking-tight text-foreground mb-8"
      >
        Didarganj Yakshi
      </motion.h2>

      {/* ── XP + Level row ── */}
      <motion.div variants={itemVariants} className="w-full mb-6">
        <Card className="bg-background/40 backdrop-blur-xl border-border/50">
          <CardContent className="flex w-full items-center justify-center gap-6 p-5">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", delay: 0.8, stiffness: 200 }}
                className="text-4xl font-extrabold tracking-tight text-primary"
              >
                +100
              </motion.div>
              <div className="text-xs font-bold text-foreground mt-1 uppercase tracking-wider">
                XP EARNED
              </div>
            </div>

            <div className="w-[1px] h-12 bg-border" />

            <div className="flex flex-col">
              <span className="text-base font-bold text-foreground">
                Level 2
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                400 / 500
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Title unlocked badge ── */}
      <motion.div variants={itemVariants} className="w-full mb-10">
        <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/30 shadow-[0_0_15px_rgba(220,194,124,0.1)]">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                New Title Unlocked
              </p>
              <p className="text-lg font-bold text-primary tracking-tight">
                Mauryan Art Enthusiast
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── CTAs ── */}
      <motion.div variants={itemVariants} className="flex w-full flex-col gap-3">
        <Link 
          href="/artifact/didarganj-yakshi"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none w-full rounded-full bg-primary text-black hover:bg-primary/90 font-bold h-14"
        >
          Explore Artifact
        </Link>
        <Link 
          href="/scan"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none w-full rounded-full bg-background/20 backdrop-blur-md border border-border/50 text-foreground hover:bg-background/40 font-semibold h-14"
        >
          ✦ Scan Another
        </Link>
      </motion.div>
    </motion.div>
  );
}
