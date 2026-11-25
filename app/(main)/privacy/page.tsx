"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Camera, MapPin, HardDrive, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

export default function PrivacyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5" />
          Visitor Privacy Standard
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground">
          Privacy & Terms
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Your privacy is protected by default. Zero tracking, offline-first.
        </p>
      </motion.div>

      {/* ── Privacy Guarantees ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col gap-4">
          <Card className="bg-card border-2 border-border rounded-[28px] p-5 shadow-none">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground shrink-0 border border-border">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground mb-1">Local Data Ownership</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your Passport progress, level XP, and scanned history stay 100% on your device. We do not transmit or sell visitor data.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-2 border-border rounded-[28px] p-5 shadow-none">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground shrink-0 border border-border">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground mb-1">Camera Permission Policy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Camera access is used solely in real-time to recognize gallery sculptures. No video or photos are saved to cloud servers.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-2 border-border rounded-[28px] p-5 shadow-none">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground shrink-0 border border-border">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-foreground mb-1">Indoor Wayfinding Privacy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Indoor location beacons are processed locally within the museum layout canvas to guide your tour walk.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* ── Official Museum Compliance Footer ── */}
      <motion.div variants={itemVariants} className="pt-4 border-t-2 border-border text-center">
        <p className="mx-auto max-w-[340px] text-xs font-semibold leading-[1.15] text-foreground">
          Bihar Museum Official Digital Guide <span className="text-[#ffa946] font-bold">v1.2.0</span> • Department of Arts, Culture & Youth, Govt. of Bihar • Preserving 2,500 years of living history.
        </p>
      </motion.div>
    </motion.div>
  );
}
