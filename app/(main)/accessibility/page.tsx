"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Eye, Type, Volume2, ShieldCheck, Sparkles, Check, Accessibility } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 120 } }
};

export default function AccessibilityPage() {
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(true);
  const [audioDesc, setAudioDesc] = useState(true);
  const [textSize, setTextSize] = useState("100%");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-full px-6 pt-20 pb-28 bg-background text-foreground transition-colors duration-300"
    >
      {/* ── Page Header ── */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="badge-teal mb-3">
          <Accessibility className="w-3.5 h-3.5" />
          Inclusive Museum Experience
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground">
          Accessibility Settings
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Designed for visitors of all abilities, vision, and hearing needs.
        </p>
      </motion.div>

      {/* ── 1. Text & Display Scaling ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Typography & Text Scale
        </label>
        <Card className="bg-card border-2 border-border rounded-[28px] p-5 shadow-none">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                <Type className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-base font-semibold">Text Size</p>
                <p className="text-xs text-muted-foreground">Adjust font size across all guide pages</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["100%", "125%", "150%"].map((size) => (
              <button
                key={size}
                onClick={() => setTextSize(size)}
                className={cn(
                  "py-3 text-xs font-bold rounded-xl border-2 transition-colors",
                  textSize === size
                    ? "bg-primary text-primary-foreground border-border"
                    : "bg-muted text-muted-foreground border-transparent"
                )}
              >
                {size} {size === "100%" ? "(Normal)" : size === "125%" ? "(Large)" : "(XL)"}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── 2. Vision & Contrast ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Vision & Contrast
        </label>

        <Card className="bg-card border-2 border-border rounded-[28px] shadow-none overflow-hidden">
          <CardContent className="p-0 flex flex-col divide-y-2 divide-border">
            {/* High Contrast */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Eye className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">High Contrast Borders</p>
                  <p className="text-xs text-muted-foreground">Thicker 3px outlines for maximum legibility</p>
                </div>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            {/* Audio Descriptions */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Volume2 className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Audio Exhibit Descriptions</p>
                  <p className="text-xs text-muted-foreground">Descriptive narration for visually impaired visitors</p>
                </div>
              </div>
              <Switch checked={audioDesc} onCheckedChange={setAudioDesc} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 3. Screen Reader & Hearing ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Hearing & Voice Assistance
        </label>

        <Card className="bg-card border-2 border-border rounded-[28px] shadow-none overflow-hidden">
          <CardContent className="p-0 flex flex-col divide-y-2 divide-border">
            {/* Screen Reader */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Headphones className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">VoiceOver & TalkBack Support</p>
                  <p className="text-xs text-muted-foreground">Optimized ARIA landmarks & screen reader prompts</p>
                </div>
              </div>
              <Switch checked={screenReader} onCheckedChange={setScreenReader} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
