"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ScanLine, MapPin, Clock, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
  }
};

export default function ScanResultPage() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-black overflow-hidden selection:bg-primary/30">
      
      {/* ── Cinematic Hero Image ── */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-[60dvh] bg-cover bg-center"
        style={{ backgroundImage: "url('/museum-sculpture-bg.png')" }}
      >
        {/* Subtle glowing particle effect behind the artifact */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        
        {/* Seamless blend gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-full w-full" />
      </motion.div>

      {/* ── Content Container ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center flex-1 w-full px-6 pt-[45dvh] pb-32"
      >
        {/* ── Thematic Reveal Typography ── */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 mb-2"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-extrabold text-primary uppercase tracking-[0.3em] drop-shadow-[0_0_12px_rgba(220,194,124,0.6)]">
              History Unlocked
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
            Didarganj Yakshi
          </h1>
        </motion.div>

        {/* ── Condensed Gamification Pills ── */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 w-full mb-6">
          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <span className="text-sm font-black text-primary">+100</span>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">XP</span>
          </div>

          {/* Title Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 shadow-[0_0_12px_rgba(220,194,124,0.1)]">
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
            </div>
            <span className="text-xs font-bold text-primary tracking-wide">
              Mauryan Art Enthusiast
            </span>
          </div>
        </motion.div>

        {/* ── Metadata Row ── */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 text-[11px] font-semibold text-white/60 mb-5 tracking-wide">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary/80" />
            <span>Mauryan Gallery</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary/80" />
            <span>3rd Cent. BCE</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-primary/80" />
            <span>Sandstone</span>
          </div>
        </motion.div>

        {/* ── Teaser Synopsis ── */}
        <motion.p variants={itemVariants} className="text-center text-[15px] leading-relaxed text-white/70 mb-8 max-w-sm">
          Discover the breathtaking masterpiece carved from a single piece of Chunar sandstone, representing the pinnacle of ancient Indian sculptural art.
        </motion.p>

        {/* Spacer to push buttons to the bottom */}
        <div className="flex-1" />

        {/* ── Action Hierarchy ── */}
        <motion.div variants={itemVariants} className="flex w-full flex-col gap-4">
          <Link 
            href="/artifact/didarganj-yakshi"
            className="group relative inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none w-full rounded-full bg-primary text-black font-extrabold h-14 text-base shadow-[0_0_32px_rgba(220,194,124,0.3)] hover:shadow-[0_0_40px_rgba(220,194,124,0.5)] transition-all duration-300 hover:scale-[1.02]"
          >
            Explore Artifact
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/scan"
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none w-full rounded-full bg-transparent border border-white/20 text-white/80 hover:bg-white/5 hover:text-white font-semibold h-14 text-sm transition-colors"
          >
            <ScanLine className="w-4 h-4 mr-2 opacity-70" />
            Scan Another Artifact
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
