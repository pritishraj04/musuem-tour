"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Headphones, Box, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Share2, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScanResultPage() {
  const [liked, setLiked] = useState(false);
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      {/* ── Scanned Artifact Image Header ── */}
      <div className="relative h-[48dvh] w-full overflow-hidden border-b-2 border-border">
        <Image
          src="/sculpture-hero.png"
          alt="Didarganj Yakshi Scanned Result"
          fill
          priority
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Floating AI Match Badge */}
        <div className="absolute top-20 left-6 right-6 flex items-center justify-between z-20">
          <div className="badge-teal">
            <Sparkles className="w-3.5 h-3.5" />
            99.4% AI Match Confirmed
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md border-2 border-border flex items-center justify-center text-foreground hover:scale-105 transition-transform"
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Scanned Details Content ── */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 flex flex-col px-6 -mt-10"
      >
        {/* XP Earned Notification Banner */}
        <Card className="bg-[#f0d7ff] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-[24px] mb-6 p-4 shadow-none flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#034f46] text-[#ffffeb] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#034f46]">Scan Reward</p>
              <p className="text-sm font-semibold text-[#1a1a1a]"> earned +100 XP to Passport!</p>
            </div>
          </div>
          <Link href="/passport" className="text-xs font-bold underline text-[#1a1a1a]">
            View
          </Link>
        </Card>

        {/* Artifact Title */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-1">
            Mauryan Dynasty (c. 3rd Century BCE)
          </span>
          <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-5xl leading-[0.95] text-foreground mb-2">
            Didarganj Yakshi
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Found on Ganges Banks, Patna · Polished Chunar Sandstone
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8 w-full">
          <Link href="/artifact/didarganj-yakshi" className="flex-[3]">
            <Button className="btn-primary w-full h-14 rounded-xl text-base font-semibold border-2 border-border bg-primary text-primary-foreground">
              <Headphones className="w-4 h-4 mr-2" />
              Listen Guide (3:45)
            </Button>
          </Link>
          <Button 
            onClick={() => setShow3D(!show3D)}
            className="btn-secondary flex-[2] h-14 rounded-xl text-base font-semibold border-2 border-border bg-card text-foreground"
          >
            <Box className="w-4 h-4 mr-2" />
            {show3D ? "Photo View" : "3D Model"}
          </Button>
        </div>

        {/* 3D Model Interactive Frame */}
        {show3D && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
            <Card className="bg-card border-2 border-border rounded-[32px] p-6 text-center shadow-none">
              <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-border flex items-center justify-center mx-auto mb-3">
                <Box className="w-8 h-8 text-foreground animate-bounce" />
              </div>
              <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-foreground">
                3D Interactive Model Active
              </h3>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Drag to rotate 360° and pinch to inspect Chunar polish details.
              </p>
              <div className="h-40 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center text-xs font-semibold text-muted-foreground">
                [3D WebGL Canvas Render Engine]
              </div>
            </Card>
          </motion.div>
        )}

        {/* Quick Facts Card */}
        <Card className="bg-card border-2 border-border rounded-[32px] p-6 shadow-none mb-8">
          <h3 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-normal text-foreground mb-4">
            Exhibit Metadata
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs font-medium border-t-2 border-border pt-4">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Accession No.</span>
              <span className="text-foreground font-semibold">BM-1917-004</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Location</span>
              <span className="text-foreground font-semibold">Gallery 4, Floor 1</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Material</span>
              <span className="text-foreground font-semibold">Chunar Sandstone</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Condition</span>
              <span className="text-foreground font-semibold">Excellent Conservation</span>
            </div>
          </div>
        </Card>

        {/* Link to Full Artifact Page */}
        <Link href="/artifact/didarganj-yakshi" className="block w-full">
          <Button variant="outline" className="btn-secondary w-full h-14 rounded-xl text-base font-semibold border-2 border-border bg-card text-foreground">
            Explore Full Story & Audio <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
