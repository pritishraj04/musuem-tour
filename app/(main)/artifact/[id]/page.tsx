"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Headphones, Box, Tag, ShieldCheck, ChevronRight, Quote, Play, Pause, ArrowLeft, Share2, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArtifactData {
  title: string;
  subtitle: string;
  era: string;
  material: string;
  image: string;
  audioDuration: string;
  highlightBadge: string;
  quote: string;
  description: string;
  gallery: string;
  floor: string;
  tags: string[];
}

const artifactDatabase: Record<string, ArtifactData> = {
  "didarganj-yakshi": {
    title: "Didarganj Yakshi",
    subtitle: "c. 3rd Century BCE • Polished Chunar Sandstone",
    era: "Mauryan Empire",
    material: "Chunar Sandstone",
    image: "/sculpture-hero.png",
    audioDuration: "3:45",
    highlightBadge: "Masterpiece Highlight · Level 2",
    quote: "Globally renowned for its glass-like mirror polish, capturing the idealized female form in ancient Indian aesthetics.",
    description: "Unearthed in 1917 on the banks of the Ganges, this life-size statue represents a Chauri (fly-whisk) bearer. Notice the intricate details of her jewelry, the heavy folds of her drapery, and the sheer perfection of the stone surface—an incredible technological feat achieved over two millennia ago.",
    gallery: "Historical Art Gallery",
    floor: "Floor 1, East Wing",
    tags: ["Mauryan Empire", "Sculpture", "Feminine Divine", "Ancient Techniques"],
  },
  "mauryan-pillar-capital": {
    title: "Mauryan Lion Capital",
    subtitle: "c. 250 BCE • Sandstone Monolith",
    era: "Mauryan Dynasty",
    material: "Polished Sandstone",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80",
    audioDuration: "2:50",
    highlightBadge: "Imperial Symbol · Level 3",
    quote: "Embodying royal authority and Dharma, carved out of a single continuous block of stone with legendary mirror polish.",
    description: "Discovered during excavations near ancient Pataliputra, this capital reflects the diplomatic and spiritual influence of Emperor Ashoka. The four roaring lions symbolize sovereignty, while the wheel (Chakra) represents universal law.",
    gallery: "Mauryan Empire Court",
    floor: "Ground Floor, Central Atrium",
    tags: ["Ashoka", "Monolith", "Royal Symbols", "Pataliputra"],
  },
  "pala-bronze-buddha": {
    title: "Pala Sacred Bronze Buddha",
    subtitle: "c. 9th Century CE • Lost-Wax Bronze Alloy",
    era: "Pala Empire",
    material: "Bronze with Inlaid Silver",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=800&q=80",
    audioDuration: "4:10",
    highlightBadge: "Sacred Art · Level 2",
    quote: "Representing Nalanda's golden age of metal casting, exported across Ancient Asia along monastic pilgrimage routes.",
    description: "Cast using the intricate cire-perdue (lost wax) method at the monastic university of Nalanda. The fine silver inlay in the eyes and urna illuminates the serene meditative posture of the Buddha.",
    gallery: "Buddhist Monastic Art Gallery",
    floor: "Floor 2, West Wing",
    tags: ["Nalanda", "Pala Dynasty", "Bronze Casting", "Buddhist Art"],
  },
  "terracotta-mother-goddess": {
    title: "Terracotta Mother Goddess",
    subtitle: "c. 2nd Century BCE • Hand-Molded Terracotta",
    era: "Shunga Period",
    material: "Fired Clay & Natural Pigments",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80",
    audioDuration: "3:15",
    highlightBadge: "Folk Traditions · Level 1",
    quote: "Vibrant clay figurine celebrating fertility and village spiritual traditions along the Fertile Gangetic Plain.",
    description: "Molded by ancient village artisans of Bihar, this figurine displays elaborate fan-shaped headgear and layered disc jewelry. It provides rare insight into non-courtly everyday religious practices of antiquity.",
    gallery: "Terracotta & Folk Traditions",
    floor: "Floor 1, North Corridor",
    tags: ["Terracotta", "Mother Goddess", "Village Folk Craft", "Gangetic Plain"],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

export default function ArtifactPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const artifactId = resolvedParams?.id || "didarganj-yakshi";
  const artifact = artifactDatabase[artifactId] || artifactDatabase["didarganj-yakshi"];

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-24 transition-colors duration-300">
      {/* ── Immersive Hero Image Header ── */}
      <div className="relative h-[50dvh] w-full overflow-hidden border-b-2 border-border">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <Image
            src={artifact.image}
            alt={artifact.title}
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Floating Controls */}
        <div className="absolute top-20 left-6 right-6 flex items-center justify-between z-20">
          <Link href="/home" className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md border-2 border-border flex items-center justify-center text-foreground hover:scale-105 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-md border-2 border-border flex items-center justify-center text-foreground hover:scale-105 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Content Area ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col px-6 -mt-12"
      >
        {/* Title & Subtitle */}
        <motion.div variants={itemVariants} className="mb-6 flex flex-col items-start">
          <div className="badge-teal mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {artifact.highlightBadge}
          </div>
          <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-5xl leading-[0.95] tracking-tight text-foreground mb-2">
            {artifact.title}
          </h1>
          <p className="text-sm font-medium text-muted-foreground tracking-wide">
            {artifact.subtitle}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex gap-3 mb-8 w-full">
          <Button 
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className={cn(
              "btn-primary flex-[3] h-14 rounded-xl text-base font-semibold border-2 border-border transition-colors",
              isPlayingAudio ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
            )}
          >
            {isPlayingAudio ? <Pause className="w-4 h-4 mr-2 fill-current" /> : <Headphones className="w-4 h-4 mr-2" />}
            {isPlayingAudio ? "Pause Audio" : `Listen (${artifact.audioDuration})`}
          </Button>
          <Button 
            onClick={() => setShow3D(!show3D)}
            className="btn-secondary flex-[2] h-14 rounded-xl text-base font-semibold border-2 border-border bg-card text-foreground"
          >
            <Box className="w-4 h-4 mr-2" />
            {show3D ? "Photo" : "3D Model"}
          </Button>
        </motion.div>

        {/* Audio Player Active Card */}
        {isPlayingAudio && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6">
            <Card className="bg-[#1a1a1a] text-[#ffffeb] border-2 border-[#1a1a1a] rounded-[24px] p-4 shadow-none">
              <div className="flex items-center justify-between mb-2 text-xs font-semibold text-[#f0d7ff]">
                <span>Now Playing: {artifact.title} Audio Guide</span>
                <span>{artifact.audioDuration}</span>
              </div>
              <div className="h-2 w-full bg-[#ffffeb]/20 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#f0d7ff] w-1/3 rounded-full animate-pulse" />
              </div>
              <p className="text-[11px] text-[#e4e4d0]">Narrated by Bihar Museum Senior Curator</p>
            </Card>
          </motion.div>
        )}

        {/* 3D Model Render Frame */}
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
                Drag with finger to rotate 360° and inspect surface details.
              </p>
              <div className="h-44 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center text-xs font-semibold text-muted-foreground">
                [3D WebGL Canvas Render Engine]
              </div>
            </Card>
          </motion.div>
        )}

        {/* Narrative Description */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-3">
            Historical Story & Significance
          </h3>
          
          <div className="relative pl-5 py-3 mb-5 border-l-4 border-secondary bg-muted/30 border-2 border-border rounded-r-2xl">
            <Quote className="absolute top-2 left-2 w-8 h-8 text-secondary/20 -z-10" />
            <p className="text-base italic text-foreground font-medium leading-relaxed">
              &quot;{artifact.quote}&quot;
            </p>
          </div>

          <p className="text-base leading-relaxed text-foreground font-normal">
            {artifact.description}
          </p>
        </motion.div>

        {/* Location Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-3">
            Location in Museum
          </h3>
          <Link href="/map" className="block outline-none group">
            <Card className="bg-card border-2 border-border rounded-[28px] hover:bg-muted/40 transition-colors shadow-none overflow-hidden">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary border-2 border-border shrink-0 mr-4 text-primary-foreground">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-foreground">
                    {artifact.gallery}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    {artifact.floor}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Themes & Tags */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-3">
            Themes & Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {artifact.tags.map((tag) => (
              <span 
                key={tag}
                className="flex items-center px-4 py-2 text-xs font-medium text-foreground bg-card border-2 border-border rounded-full cursor-pointer hover:bg-primary transition-colors"
              >
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
