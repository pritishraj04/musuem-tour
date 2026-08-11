"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sun, 
  Moon, 
  Monitor, 
  Volume2, 
  Globe, 
  Database, 
  Smartphone, 
  Check, 
  Sparkles,
  Zap,
  Radio,
  Sliders,
  ShieldCheck,
  HardDrive,
  Activity,
  Trash2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 120 } }
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [haptics, setHaptics] = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [autoFlash, setAutoFlash] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState("1.0x");
  const [language, setLanguage] = useState("English");
  const [cacheCleared, setCacheCleared] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  if (!mounted) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-full px-6 pt-20 pb-24 bg-background text-foreground transition-colors duration-300"
    >
      {/* ── Page Header ── */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="badge-teal mb-3">
          <Sliders className="w-3.5 h-3.5" />
          System Preferences & Controls
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground leading-[0.95]">
          App Settings
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-2">
          Configure theme, high-fidelity audio, AI recognition, and offline storage.
        </p>
      </motion.div>

      {/* ── 1. Appearance & Theme (Dark / Light / System) ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Appearance & Theme
        </label>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Light Mode */}
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-[24px] border-2 transition-all cursor-pointer text-center",
              theme === "light"
                ? "bg-[#ffffeb] text-[#1a1a1a] border-[#1a1a1a] shadow-md ring-2 ring-[#1a1a1a]"
                : "bg-card text-foreground border-border opacity-75 hover:opacity-100"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#f0d7ff] border-2 border-[#1a1a1a] flex items-center justify-center mb-2">
              <Sun className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <span className="text-sm font-semibold">Light</span>
            <span className="text-[10px] font-normal opacity-70">Lumen Cream</span>
            {theme === "light" && <Check className="w-4 h-4 mt-1 text-[#034f46]" />}
          </button>

          {/* Dark Mode */}
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-[24px] border-2 transition-all cursor-pointer text-center",
              theme === "dark"
                ? "bg-[#1a1a1a] text-[#ffffeb] border-[#ffffeb] shadow-md ring-2 ring-[#f0d7ff]"
                : "bg-card text-foreground border-border opacity-75 hover:opacity-100"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#f0d7ff] border-2 border-[#ffffeb] flex items-center justify-center mb-2">
              <Moon className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <span className="text-sm font-semibold">Dark</span>
            <span className="text-[10px] font-normal opacity-70">Velvet Chamber</span>
            {theme === "dark" && <Check className="w-4 h-4 mt-1 text-[#f0d7ff]" />}
          </button>

          {/* System Default */}
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-[24px] border-2 transition-all cursor-pointer text-center",
              theme === "system"
                ? "bg-card text-foreground border-border ring-2 ring-primary"
                : "bg-card text-foreground border-border opacity-75 hover:opacity-100"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center mb-2">
              <Monitor className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-sm font-semibold">System</span>
            <span className="text-[10px] font-normal opacity-70">Automatic OS</span>
            {theme === "system" && <Check className="w-4 h-4 mt-1 text-secondary" />}
          </button>
        </div>
      </motion.div>

      {/* ── 2. Audio Tour & Narration Preferences ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Audio Tour & Narration
        </label>

        <Card className="bg-card border-2 border-border rounded-[32px] shadow-none overflow-hidden">
          <CardContent className="p-0 flex flex-col divide-y-2 divide-border">
            {/* Audio Quality Indicator */}
            <div className="p-4 flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Radio className="w-4 h-4 text-secondary animate-pulse" />
                <span>Audio Engine Quality</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
                324 kbps HD Audio
              </span>
            </div>

            {/* Narration Language */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Globe className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Narration Language</p>
                  <p className="text-xs text-muted-foreground">Select official museum guide voice</p>
                </div>
              </div>

              <div className="flex gap-1">
                {["English", "Hindi", "Maithili"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors",
                      language === lang
                        ? "bg-primary text-primary-foreground border-border"
                        : "bg-muted text-muted-foreground border-transparent"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Speed */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Volume2 className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Playback Speed</p>
                  <p className="text-xs text-muted-foreground">Narration speed multiplier</p>
                </div>
              </div>
              <div className="flex gap-1">
                {["1.0x", "1.25x", "1.5x"].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setAudioSpeed(speed)}
                    className={cn(
                      "px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors",
                      audioSpeed === speed
                        ? "bg-primary text-primary-foreground border-border"
                        : "bg-muted text-muted-foreground border-transparent"
                    )}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            {/* Proximity Auto-Play */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Proximity Audio Autoplay</p>
                  <p className="text-xs text-muted-foreground">Play exhibit guide when approaching sculpture</p>
                </div>
              </div>
              <Switch checked={autoPlayAudio} onCheckedChange={setAutoPlayAudio} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 3. Camera, AI & Sensors ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Camera, AI & Sensors
        </label>

        <Card className="bg-card border-2 border-border rounded-[32px] shadow-none overflow-hidden">
          <CardContent className="p-0 flex flex-col divide-y-2 divide-border">
            {/* Auto Exhibit Recognition */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Smartphone className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Instant AI Exhibit Recognition</p>
                  <p className="text-xs text-muted-foreground">Neural Vision v2.4 · 99.4% accuracy model</p>
                </div>
              </div>
              <Switch checked={autoScan} onCheckedChange={setAutoScan} />
            </div>

            {/* Haptic Feedback */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Zap className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Haptic Discovery Vibration</p>
                  <p className="text-xs text-muted-foreground">Vibrate on exhibit scan & XP unlock</p>
                </div>
              </div>
              <Switch checked={haptics} onCheckedChange={setHaptics} />
            </div>

            {/* Auto Flash */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 border border-border">
                  <Sun className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-base font-semibold">Low-Light Auto Flash</p>
                  <p className="text-xs text-muted-foreground">Assist camera in dark gallery chambers</p>
                </div>
              </div>
              <Switch checked={autoFlash} onCheckedChange={setAutoFlash} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 4. Storage, Offline Pack & System Diagnostics ── */}
      <motion.div variants={itemVariants} className="mb-10">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Offline Storage & Diagnostics
        </label>

        <Card className="bg-card border-2 border-border rounded-[32px] shadow-none p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-secondary text-secondary-foreground border border-border">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-semibold">Museum Offline Guide Pack</p>
                <p className="text-xs text-muted-foreground">42.8 MB stored locally on device</p>
              </div>
            </div>
            <span className="badge-teal">
              Downloaded
            </span>
          </div>

          <Button
            onClick={handleClearCache}
            variant="outline"
            className="w-full btn-secondary h-12 rounded-xl text-sm font-semibold border-2 border-border bg-card text-foreground hover:bg-muted mb-4"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {cacheCleared ? "✓ Offline Cache Cleared!" : "Clear Cached Gallery Data"}
          </Button>

          <div className="flex items-center justify-between pt-3 border-t-2 border-border text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-secondary" />
              <span>Network: Wi-Fi Connected (192.168.1.44)</span>
            </div>
            <span className="font-mono text-[10px]">v1.2.0-rel</span>
          </div>
        </Card>
      </motion.div>

      {/* ── 5. Refined Small Official Emblem & Footer Logo at the End ── */}
      <motion.div variants={itemVariants} className="pt-6 border-t-2 border-border flex flex-col items-center text-center">
        {/* Small Circular Logo Container */}
        <div className="w-10 h-10 rounded-full bg-card border-2 border-border p-1.5 flex items-center justify-center mb-3 shadow-none">
          <Image
            src="/favicon.svg"
            alt="Bihar Museum Emblem"
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Refined Official Sub-caption */}
        <p className="max-w-[340px] text-xs font-semibold leading-[1.15] text-foreground">
          Bihar Museum Official Digital Guide <span className="text-[#ffa946] font-bold">v1.2.0</span> • Department of Arts, Culture & Youth, Govt. of Bihar • Preserving 2,500 years of living history.
        </p>
      </motion.div>
    </motion.div>
  );
}
