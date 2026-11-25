"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, ChevronRight, ScanLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gauge } from "@/components/ui/Gauge";

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
      className="flex flex-col min-h-full px-6 pt-20 pb-16 bg-background text-foreground transition-colors duration-300"
    >
      {/* ── Profile header ── */}
      <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-card border-2 border-border mb-3 shadow-none text-foreground">
          <User className="w-10 h-10" strokeWidth={2} />
        </div>
        <h2 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground">
          Guest Explorer
        </h2>
        <div className="badge-teal mt-2">
          Member since Today
        </div>
      </motion.div>

      {/* ── Level card (Radial Arc Notched Gauge) ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <Card className="relative overflow-hidden bg-card text-foreground border-2 border-border rounded-[40px] shadow-none p-6">
          <CardContent className="p-2 relative z-10 flex flex-col items-center">
            {/* Notch-based Radial Gauge */}
            <Gauge
              orientation="arc"
              value={70}
              centerValue="Level 3"
              defaultLabel="1,450 / 2,000 XP"
              totalNotches={36}
              spacing={25}
              notchCornerRadius={3}
              activeFill="var(--primary)"
              inactiveFill="var(--border)"
              activeFillOpacity={1}
              inactiveFillOpacity={0.3}
            />

            {/* Linear Notch Track for Mauryan Mastery */}
            <div className="w-full mt-6 pt-4 border-t-2 border-border">
              <Gauge
                orientation="linear"
                value={75}
                centerValue="75%"
                defaultLabel="Mauryan Gallery Mastery"
                totalNotches={24}
                spacing={15}
                linearHeight={16}
                notchCornerRadius={2}
                activeFill="var(--secondary)"
                inactiveFill="var(--border)"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Stats row ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3.5 mb-8">
        {[
          { value: "1", label: "Visits" },
          { value: "8", label: "Artifacts\nScanned" },
          { value: "2", label: "Titles\nUnlocked" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card border-2 border-border rounded-[24px] shadow-none">
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <span className="font-[family-name:var(--font-eb-garamond)] text-4xl font-normal text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground whitespace-pre-line leading-tight">
                {stat.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* ── Unlocked titles ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-4">
          Unlocked Titles
        </h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scroll-smooth snap-x hide-scrollbar">
          {unlockedTitles.map((title) => (
            <Card key={title.name} className="flex-shrink-0 snap-start w-[130px] h-[130px] bg-card border-2 border-border rounded-[28px] shadow-none flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl mb-2">
                {title.icon}
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight">
                {title.name}
              </span>
            </Card>
          ))}
          <Card className="flex-shrink-0 snap-start w-[130px] h-[130px] border-2 border-dashed border-border bg-transparent rounded-[28px] flex flex-col items-center justify-center text-center p-4">
            <span className="text-xs font-medium text-muted-foreground leading-relaxed">
              Find 5 more artifacts
            </span>
          </Card>
        </div>
      </motion.div>

      {/* ── Recent discoveries ── */}
      <motion.div variants={itemVariants}>
        <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-4">
          Recent Discoveries
        </h3>
        <Card className="bg-card border-2 border-border rounded-[32px] overflow-hidden shadow-none">
          <div className="flex flex-col">
            {recentDiscoveries.map((item, idx) => (
              <Link
                key={item.name}
                href={item.isAction ? "/scan" : `/artifact/${item.name.toLowerCase().replace(/ /g, "-")}`}
                className={`flex items-center p-4 outline-none hover:bg-muted/50 transition-colors ${
                  idx < recentDiscoveries.length - 1 ? "border-b-2 border-border" : ""
                }`}
              >
                {/* Thumbnail circle */}
                <div className={`flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 mr-4 border-2 border-border ${
                  item.isAction ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                }`}>
                  {item.isAction ? (
                    <ScanLine className="w-5 h-5" strokeWidth={2.5} />
                  ) : (
                    <div className="w-5 h-5 border-2 border-border rounded-[4px]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold text-foreground leading-snug">
                    {item.name}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    {item.time}
                    {item.xp && <span className="text-secondary font-semibold ml-1">· {item.xp}</span>}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground" />
              </Link>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
