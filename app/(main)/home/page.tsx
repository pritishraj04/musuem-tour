"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Map as MapIcon, 
  Headphones, 
  Calendar, 
  MessageSquare, 
  ScanLine, 
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mock Data
const upcomingEvents = [
  {
    id: 1,
    title: "Mughal Art Workshop",
    date: "Aug 12, 10:00 AM",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&q=80",
    tag: "Workshop"
  },
  {
    id: 2,
    title: "History of Pataliputra",
    date: "Aug 15, 02:00 PM",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80",
    tag: "Guided Tour"
  },
  {
    id: 3,
    title: "Terracotta Sculpture",
    date: "Aug 18, 11:30 AM",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=400&q=80",
    tag: "Exhibition"
  }
];

const curatorPick = {
  id: 1,
  title: "The Didarganj Yakshi",
  description: "Discover this breathtaking 3rd century BCE masterpiece carved from a single piece of sandstone.",
  image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80"
};

const actionChips = [
  { label: "Interactive Map", href: "/map", icon: MapIcon },
  { label: "Audio Tours", href: "/tours", icon: Headphones },
  { label: "Feedback", href: "/feedback", icon: MessageSquare },
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
      className="flex flex-col min-h-full pt-24 pb-12 overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* ── Hero headline ── */}
      <motion.section variants={itemVariants} className="px-6 pt-8 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bihar Museum
        </h1>
        <p className="mt-1 text-base text-muted-foreground font-medium">
          Welcome back, Guest Explorer
        </p>
      </motion.section>

      {/* ── Search bar ── */}
      <motion.div variants={itemVariants} className="px-6 pb-8">
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-5 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-sm text-muted-foreground font-medium">
            Search Exhibits or Galleries...
          </span>
        </div>
      </motion.div>

      {/* ── Scanner CTA ── */}
      <motion.div variants={itemVariants} className="px-6 pb-8">
        <Link href="/scan" className="block outline-none">
          <Card className="relative overflow-hidden bg-black border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group rounded-3xl">
            {/* Background Image Layer */}
            <div 
              className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500 bg-cover bg-center"
              style={{ backgroundImage: "url('/museum-sculpture-bg.png')" }}
            />
            {/* Radial Gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.9)_100%)]" />
            
            <CardContent className="flex flex-col items-center text-center p-8 relative z-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center relative w-20 h-20 rounded-full bg-gradient-to-br from-[#dcc27c] to-[#a68b4b] shadow-[0_0_32px_rgba(220,194,124,0.4)] mb-5"
              >
                <ScanLine className="h-8 w-8 text-black" strokeWidth={2.5} />
              </motion.div>
              
              <h2 className="text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                Tap to Recognize
              </h2>
              <p className="mt-2 text-sm text-white/80 max-w-[240px] font-medium leading-relaxed drop-shadow-sm">
                Point camera at any artifact to learn more and <span className="text-primary font-bold">earn 100 XP</span>
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* ── Compact Action Chips ── */}
      <motion.div variants={itemVariants} className="px-6 pb-10">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6">
          {actionChips.map((chip) => (
            <Link key={chip.label} href={chip.href} className="outline-none shrink-0">
              <motion.div 
                whileHover={{ scale: 0.97 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 transition-colors shadow-sm"
              >
                <chip.icon className="h-4 w-4 text-primary" strokeWidth={2.5} />
                <span className="text-[13px] font-semibold text-foreground tracking-wide">{chip.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Curator's Picks ── */}
      <motion.section variants={itemVariants} className="px-6 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Curator's Pick</h3>
          </div>
        </div>
        
        <Link href={`/artifact/${curatorPick.id}`} className="block outline-none group">
          <Card className="relative overflow-hidden bg-background/20 backdrop-blur-xl border-border/50 shadow-sm rounded-3xl h-[240px]">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${curatorPick.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <CardContent className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase mb-1 drop-shadow-md">
                Featured Exhibit
              </span>
              <h4 className="text-xl font-bold text-white mb-2 drop-shadow-md">{curatorPick.title}</h4>
              <p className="text-[13px] text-white/80 line-clamp-2 drop-shadow-sm font-medium">
                {curatorPick.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.section>

      {/* ── Events Carousel ── */}
      <motion.section variants={itemVariants} className="pb-10">
        <div className="flex items-center justify-between px-6 mb-5">
          <h3 className="text-lg font-bold text-foreground">Upcoming Events</h3>
          <Link href="/events" className="text-xs font-semibold text-primary flex items-center hover:underline">
            View All <ChevronRight className="h-3 w-3 ml-0.5" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pl-6 pr-6 pb-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="shrink-0 w-[240px] bg-white/5 backdrop-blur-lg border-border/50 shadow-sm overflow-hidden rounded-2xl group hover:bg-white/10 transition-colors">
              <div 
                className="h-[140px] bg-cover bg-center relative"
                style={{ backgroundImage: `url('${event.image}')` }}
              >
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md">
                  <span className="text-[9px] font-bold uppercase text-white tracking-wider">{event.tag}</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="text-sm font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{event.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* ── My Local Passport card ── */}
      <motion.div variants={itemVariants} className="px-6 pb-12">
        <Link href="/passport" className="block outline-none">
          <motion.div whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-background/40 backdrop-blur-xl border-border/50 shadow-[0_8px_24px_rgba(0,0,0,0.2)] relative overflow-hidden group rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-base font-bold text-foreground tracking-tight">
                      My Local Passport
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-1 bg-white/10 rounded-full text-muted-foreground">
                    OFFLINE
                  </span>
                </div>

                <div className="mb-2 flex justify-between items-end">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Level 1
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    150 / 500 XP
                  </span>
                </div>

                <Progress value={30} className="h-2 w-full bg-white/10" />

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    3 LABELS EARNED · <strong className="text-foreground font-semibold">Novice</strong>
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
