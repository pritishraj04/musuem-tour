"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Headphones, ExternalLink, Box, Tag, ShieldCheck, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

export default function ArtifactPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* ── Immersive Hero Image (Parallax) ── */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <Image
            src="/sculpture-hero.png"
            alt="Didarganj Yakshi"
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>
        {/* Sleek gradient mask to blend into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* ── Content Area ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col px-5 -mt-32"
      >
        {/* Title & Collection */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-white/10 text-white rounded-full backdrop-blur-md">
              Collection Highlights
            </span>
            <span className="flex items-center text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-primary/20 text-primary rounded-full backdrop-blur-md">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Level 2 Required
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Didarganj Yakshi
          </h1>
          <p className="text-sm font-medium text-muted-foreground/80">
            c. 3rd Century BCE • Polished Chunar Sandstone
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex gap-3 mb-8">
          <Button className="flex-1 rounded-full bg-primary text-black font-bold h-12 shadow-[0_0_15px_rgba(220,194,124,0.3)] hover:scale-[1.02] transition-transform">
            <Headphones className="w-4 h-4 mr-2" />
            Listen (3:45)
          </Button>
          <Button variant="outline" className="flex-1 rounded-full bg-background/20 backdrop-blur-md border-border/50 text-foreground h-12 hover:bg-background/40">
            <Box className="w-4 h-4 mr-2" />
            View 3D Model
          </Button>
        </motion.div>

        {/* Narrative Description */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-lg font-bold text-foreground tracking-tight mb-3">
            The Masterpiece of Mauryan Polish
          </h3>
          <p className="text-[15px] leading-relaxed text-muted-foreground/90 font-medium">
            Unearthed in 1917 on the banks of the Ganges, this life-size statue is globally renowned for its glass-like "Mauryan polish." It represents a <i>Chauri</i> (fly-whisk) bearer, capturing the idealized female form in ancient Indian aesthetics. Notice the intricate details of her jewelry and the sheer perfection of the stone surface, achieved over two millennia ago.
          </p>
        </motion.div>

        {/* Location Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-lg font-bold text-foreground tracking-tight mb-3">
            Location in Museum
          </h3>
          <Link href="/map" className="block outline-none group">
            <Card className="bg-background/20 backdrop-blur-md border-border/50 hover:bg-background/30 transition-colors">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 shrink-0 mr-4">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-foreground">
                    Historical Art Gallery
                  </p>
                  <p className="text-[13px] font-medium text-muted-foreground">
                    Floor 1, East Wing
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Tags */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-lg font-bold text-foreground tracking-tight mb-3">
            Themes & Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Mauryan Empire", "Sculpture", "Feminine Divine", "Ancient Techniques"].map((tag) => (
              <span 
                key={tag}
                className="flex items-center px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full"
              >
                <Tag className="w-3 h-3 mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
