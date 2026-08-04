"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Map as MapIcon, Headphones, Calendar, MessageSquare, ScanLine, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const quickLinks = [
  { label: "Interactive\nFloor Map", href: "/map", icon: MapIcon },
  { label: "Guided\nAudio Tours", href: "/tours", icon: Headphones },
  { label: "Events &\nWorkshops", href: "/home", icon: Calendar },
  { label: "Submit\nFeedback", href: "/feedback", icon: MessageSquare },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring" as const, stiffness: 120, damping: 20 } 
  }
};

export default function HomePage() {
  return (
    <motion.div 
      className="flex flex-col min-h-full px-6 pt-24 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ── Hero headline ── */}
      <motion.section variants={itemVariants} className="pt-8 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Bihar Museum:
          <br />
          <span className="text-primary font-semibold">Your Digital Guide</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome, Guest Explorer
        </p>
      </motion.section>

      {/* ── Search bar ── */}
      <motion.div variants={itemVariants} className="pb-8">
        <div className="flex items-center gap-4 bg-background/40 backdrop-blur-md border border-border/50 rounded-full px-5 py-4 shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-sm text-muted-foreground font-medium">
            Search Exhibits or Galleries
          </span>
        </div>
      </motion.div>

      {/* ── Scanner CTA (Bento Box Hero) ── */}
      <motion.div variants={itemVariants} className="pb-8">
        <Link href="/scan" className="block outline-none">
          <Card className="relative overflow-hidden bg-background/20 backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-colors shadow-lg group">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <CardContent className="flex flex-col items-center text-center p-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center relative w-20 h-20 rounded-full bg-gradient-to-br from-[#dcc27c] to-[#a68b4b] shadow-[0_0_24px_rgba(220,194,124,0.3)] mb-5"
              >
                <ScanLine className="h-8 w-8 text-black" strokeWidth={2.5} />
              </motion.div>
              
              <h2 className="text-xl font-bold text-foreground tracking-tight">
                Tap to Recognize History
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-[240px]">
                Point camera at any artifact to learn more and <span className="text-primary font-medium">earn 100 XP</span>
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* ── Quick-links grid (Bento Grid) ── */}
      <motion.section variants={itemVariants} className="pb-8">
        <div className="grid grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="outline-none">
              <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.96 }}>
                <Card className="bg-background/20 backdrop-blur-md border-border/50 shadow-sm hover:bg-background/30 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-4 text-center">
                    <link.icon className="h-6 w-6 text-primary" strokeWidth={2} />
                    <span className="text-[13px] font-medium leading-tight whitespace-pre-line text-foreground">
                      {link.label}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── My Local Passport card ── */}
      <motion.div variants={itemVariants} className="pb-12">
        <Link href="/passport" className="block outline-none">
          <motion.div whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-background/20 backdrop-blur-md border-border/50 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="text-base font-semibold text-foreground tracking-tight">
                      My Local Passport
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-white/10 rounded-full text-muted-foreground">
                    OFFLINE
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Level 1
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Progress value={30} className="h-2 flex-1 bg-white/10" />
                  <span className="text-sm font-bold text-foreground">
                    150 / 500
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    3 LABELS EARNED · <strong className="text-foreground font-semibold">Novice</strong>
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
