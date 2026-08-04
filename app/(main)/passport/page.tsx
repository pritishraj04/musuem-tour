"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, ChevronRight, ScanLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const recentDiscoveries = [
  { name: "Didarganj Yakshi", time: "Found Today", xp: "+100 XP" },
  { name: "Mauryan Pillar Capital", time: "Found Yesterday", xp: "+100 XP" },
  { name: "Scan New Artifact", time: "Earn XP & unlock titles", xp: "", isAction: true },
];

const unlockedTitles = [
  { name: "Terracotta Novice", icon: "🏺" },
  { name: "Coin Collector", icon: "🪙" },
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
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function PassportPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-full px-6 pt-24 pb-16"
    >
      {/* ── Profile header ── */}
      <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-background/20 backdrop-blur-md border border-border/50 mb-4 shadow-lg">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
          <User className="relative z-10 w-10 h-10 text-foreground" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Guest Explorer
        </h2>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Member since Today
        </p>
      </motion.div>

      {/* ── Level card ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <Card className="relative overflow-hidden bg-background/30 backdrop-blur-xl border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] group">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-bold text-foreground tracking-tight">
                Level 3: Magadha Scholar
              </span>
              <span className="text-[13px] font-bold text-primary">
                350 / 500 XP
              </span>
            </div>
            
            <Progress value={progress} className="h-2 mb-2 bg-white/10" />
            
            <p className="text-[13px] font-medium text-muted-foreground">
              150 XP to Level 4
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
        {[
          { value: "1", label: "Visits" },
          { value: "8", label: "Artifacts\nScanned" },
          { value: "2", label: "Titles\nUnlocked" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-background/20 backdrop-blur-md border-border/50 hover:bg-background/30 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <span className="text-3xl font-extrabold text-foreground mb-1 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground whitespace-pre-line leading-tight">
                {stat.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* ── Unlocked titles ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground tracking-tight">
            Unlocked Titles
          </h3>
          <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
            View All
          </span>
        </div>
        <div className="flex overflow-x-auto snap-x hide-scrollbar gap-4 -mx-6 px-6 pb-4">
          {unlockedTitles.map((title) => (
            <Card key={title.name} className="flex-shrink-0 snap-start w-[130px] h-[130px] bg-background/20 backdrop-blur-md border-border/50 flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl mb-3 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
                {title.icon}
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight">
                {title.name}
              </span>
            </Card>
          ))}
          {/* Find more placeholder */}
          <Card className="flex-shrink-0 snap-start w-[130px] h-[130px] border-dashed border-white/20 bg-transparent flex flex-col items-center justify-center text-center p-4">
            <span className="text-xs font-medium text-muted-foreground leading-relaxed">
              Find 5 more artifacts
            </span>
          </Card>
        </div>
      </motion.div>

      {/* ── Recent discoveries ── */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-bold text-foreground tracking-tight mb-4">
          Recent Discoveries
        </h3>
        <Card className="bg-background/20 backdrop-blur-md border-border/50 overflow-hidden">
          <div className="flex flex-col">
            {recentDiscoveries.map((item, idx) => (
              <Link
                key={item.name}
                href={item.isAction ? "/scan" : `/artifact/${item.name.toLowerCase().replace(/ /g, "-")}`}
                className={`flex items-center p-4 outline-none hover:bg-white/5 transition-colors ${
                  idx < recentDiscoveries.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                {/* Thumbnail circle */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 mr-4 ${
                  item.isAction ? "bg-primary/15 border border-primary/30" : "bg-white/5 border border-white/10"
                }`}>
                  {item.isAction ? (
                    <ScanLine className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-white/60 rounded-[4px] opacity-80" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-foreground leading-snug">
                    {item.name}
                  </p>
                  <p className="text-[13px] font-medium text-muted-foreground mt-0.5">
                    {item.time}
                    {item.xp && <span className="text-primary ml-1">· {item.xp}</span>}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50" />
              </Link>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
