"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Headphones, Box, Tag, ShieldCheck, ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

export default function ArtifactPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  return (
    <div className="flex flex-col min-h-screen bg-black pb-24">
      {/* ── Immersive Hero Image (Parallax) ── */}
      <div className="relative h-[55dvh] w-full overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <Image
            src="/sculpture-hero.png"
            alt="Didarganj Yakshi"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        </motion.div>
        {/* Sleek gradient mask to blend perfectly into the black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* ── Content Area ── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col px-6 -mt-20"
      >
        {/* Title & Subtitle */}
        <motion.div variants={itemVariants} className="mb-6 flex flex-col items-start">
          <h1 className="text-[2.5rem] font-extrabold tracking-tight text-white mb-2 leading-[1.1] drop-shadow-md">
            Didarganj Yakshi
          </h1>
          <p className="text-[15px] font-semibold text-white/70 mb-4 tracking-wide">
            c. 3rd Century BCE • Polished Chunar Sandstone
          </p>

          {/* De-cluttered Tags (Moved below subtitle) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-white/10 text-white/90 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
              Collection Highlight
            </span>
            <span className="flex items-center text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-primary/10 text-primary rounded-full backdrop-blur-md border border-primary/20 shadow-sm">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Level 2
            </span>
          </div>
        </motion.div>

        {/* Action Buttons (Clear Hierarchy) */}
        <motion.div variants={itemVariants} className="flex gap-3 mb-10 w-full">
          <Button className="flex-[3] rounded-full bg-primary text-black font-extrabold h-14 shadow-[0_0_24px_rgba(220,194,124,0.3)] hover:scale-[1.02] transition-transform text-[15px]">
            <Headphones className="w-4 h-4 mr-2" />
            Listen (3:45)
          </Button>
          <Button variant="outline" className="flex-[2] rounded-full bg-transparent border border-white/20 text-white/90 h-14 hover:bg-white/5 font-semibold text-[15px] transition-colors">
            <Box className="w-4 h-4 mr-2 opacity-70" />
            3D Model
          </Button>
        </motion.div>

        {/* Narrative Description (Broken up text wall) */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-xl font-extrabold text-white tracking-tight mb-4">
            The Masterpiece of Mauryan Polish
          </h3>
          
          {/* Stylized Blockquote for scannability */}
          <div className="relative pl-5 py-2 mb-5 border-l-2 border-primary/80 bg-gradient-to-r from-primary/10 to-transparent rounded-r-lg">
            <Quote className="absolute top-2 left-2 w-10 h-10 text-primary/10 -z-10" />
            <p className="text-[15px] italic text-white/90 font-medium leading-snug">
              "Globally renowned for its glass-like polish, capturing the idealized female form in ancient Indian aesthetics."
            </p>
          </div>

          <p className="text-[16px] leading-loose text-white/70 font-medium">
            Unearthed in 1917 on the banks of the Ganges, this life-size statue represents a <i>Chauri</i> (fly-whisk) bearer. Notice the intricate details of her jewelry, the heavy folds of her drapery, and the sheer perfection of the stone surface—an incredible technological feat achieved over two millennia ago.
          </p>
        </motion.div>

        {/* Location Card (Polished Glassmorphism) */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-lg font-bold text-white tracking-tight mb-3">
            Location in Museum
          </h3>
          <Link href="/map" className="block outline-none group">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="flex items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 shrink-0 mr-4 shadow-inner">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-white">
                    Historical Art Gallery
                  </p>
                  <p className="text-[13px] font-medium text-white/60 mt-0.5">
                    Floor 1, East Wing
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Tags (Softened Interactive Filter Look) */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-lg font-bold text-white tracking-tight mb-4">
            Themes & Tags
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {["Mauryan Empire", "Sculpture", "Feminine Divine", "Ancient Techniques"].map((tag) => (
              <span 
                key={tag}
                className="flex items-center px-4 py-2 text-[13px] font-semibold text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full cursor-pointer transition-colors"
              >
                <Tag className="w-3.5 h-3.5 mr-2 opacity-50" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
