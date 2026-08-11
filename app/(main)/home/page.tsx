"use client";

import { useState } from "react";
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
import { Gauge } from "@/components/ui/Gauge";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/SearchModal";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <motion.div 
        className="flex flex-col min-h-full pt-20 pb-16 overflow-x-hidden bg-[#ffffeb] text-[#1a1a1a]"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ── Hero headline ── */}
        <motion.section variants={itemVariants} className="px-6 pt-6 pb-6">
          <div className="badge-teal mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ffa946] animate-pulse" />
            Museum Exploration Mode
          </div>
          <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-5xl tracking-tight leading-[0.95] text-[#1a1a1a]">
            Bihar Museum
          </h1>
          <p className="mt-2 text-lg text-[#8a8a80] font-normal">
            Welcome, Guest Explorer
          </p>
        </motion.section>

        {/* ── Search bar ── */}
        <motion.div variants={itemVariants} className="px-6 pb-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-3 bg-[#ffffeb] hover:bg-[#e4e4d0]/60 border-2 border-[#1a1a1a] rounded-full px-5 py-3.5 shadow-none transition-colors text-left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm text-[#8a8a80] font-medium font-[family-name:var(--font-figtree)]">
              Search Didarganj Yakshi, Bronzes, or History...
            </span>
          </button>
        </motion.div>

      {/* ── Official Museum Timings & Ticket Info Chip ── */}
      <motion.div variants={itemVariants} className="px-6 pb-6">
        <Link href="/about" className="block outline-none">
          <div className="flex items-center justify-between bg-[#e4e4d0]/60 hover:bg-[#e4e4d0] border-2 border-[#1a1a1a] rounded-2xl px-4 py-2.5 transition-colors">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1a1a1a]">
              <span className="w-2 h-2 rounded-full bg-[#034f46]" />
              <span>Open Today · 10:00 AM – 5:00 PM</span>
            </div>
            <span className="text-[11px] font-bold text-[#034f46] hover:underline">
              Tickets ₹100 / ₹500 →
            </span>
          </div>
        </Link>
      </motion.div>

      {/* ── Scanner CTA (Dark Chamber #1a1a1a) ── */}
      <motion.div variants={itemVariants} className="px-6 pb-8">
        <Link href="/scan" className="block outline-none">
          <Card className="relative overflow-hidden bg-[#1a1a1a] text-[#ffffeb] border-2 border-[#1a1a1a] rounded-[40px] shadow-none group">
            {/* Background Image Layer */}
            <div 
              className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-500 bg-cover bg-center mix-blend-luminosity"
              style={{ backgroundImage: "url('/museum-sculpture-bg.png')" }}
            />
            
            <CardContent className="flex flex-col items-center text-center p-7 relative z-10">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center relative w-16 h-16 rounded-full bg-[#f0d7ff] text-[#1a1a1a] border-2 border-[#1a1a1a] mb-4"
              >
                <ScanLine className="h-7 w-7 text-[#1a1a1a]" strokeWidth={2.5} />
              </motion.div>
              
              <h2 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-[#ffffeb] tracking-tight">
                Scan Artifact
              </h2>
              <p className="mt-2 text-sm text-[#e4e4d0] max-w-[250px] font-normal leading-snug">
                Point your lens at any gallery exhibit to unlock history & <span className="font-semibold text-[#f0d7ff] underline decoration-2">earn 100 XP</span>
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* ── Action Chips ── */}
      <motion.div variants={itemVariants} className="px-6 pb-8">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-6 px-6">
          {actionChips.map((chip) => (
            <Link key={chip.label} href={chip.href} className="outline-none shrink-0">
              <motion.div 
                whileHover={{ scale: 0.97 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#ffffeb] hover:bg-[#e4e4d0] border-2 border-[#1a1a1a] rounded-full px-4 py-2.5 transition-colors"
              >
                <chip.icon className="h-4 w-4 text-[#1a1a1a]" strokeWidth={2} />
                <span className="text-[13px] font-medium text-[#1a1a1a] tracking-wide">{chip.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Curator's Picks (Cream Card #ffffeb) ── */}
      <motion.section variants={itemVariants} className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#034f46]" />
            <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-[#1a1a1a]">Curator&apos;s Choice</h3>
          </div>
        </div>
        
        <Link href="/artifact/didarganj-yakshi" className="block outline-none group">
          <Card className="relative overflow-hidden bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-[32px] h-[250px] shadow-none">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url('${curatorPick.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
            
            <CardContent className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
              <div className="badge-teal w-fit mb-2">
                Featured Exhibit
              </div>
              <h4 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-[#ffffeb] mb-1">{curatorPick.title}</h4>
              <p className="text-xs text-[#e4e4d0] line-clamp-2 font-normal leading-relaxed">
                {curatorPick.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.section>

      {/* ── Events Carousel ── */}
      <motion.section variants={itemVariants} className="pb-8">
        <div className="flex items-center justify-between px-6 mb-4">
          <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-[#1a1a1a]">Upcoming Events</h3>
          <Link href="/events" className="text-xs font-semibold text-[#1a1a1a] flex items-center hover:underline">
            View All <ChevronRight className="h-3 w-3 ml-0.5" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pl-6 pr-6 pb-2">
          {upcomingEvents.map((event) => (
            <Link key={event.id} href="/events" className="block shrink-0 outline-none">
              <Card className="w-[240px] bg-[#ffffeb] border-2 border-[#1a1a1a] shadow-none overflow-hidden rounded-[24px] group hover:bg-[#e4e4d0] transition-colors">
                <div 
                  className="h-[130px] bg-cover bg-center relative border-b-2 border-[#1a1a1a]"
                  style={{ backgroundImage: `url('${event.image}')` }}
                >
                  <div className="absolute top-2 left-2 bg-[#1a1a1a] text-[#ffffeb] px-2.5 py-1 rounded-full border border-[#ffffeb]">
                    <span className="text-[10px] font-medium tracking-wider">{event.tag}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="text-sm font-semibold text-[#1a1a1a] mb-1.5 line-clamp-1">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[#8a8a80]">
                    <Clock className="h-3.5 w-3.5 text-[#1a1a1a]" />
                    <span className="text-xs font-medium text-[#1a1a1a]">{event.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── My Local Passport card ── */}
      <motion.div variants={itemVariants} className="px-6 pb-8">
        <Link href="/passport" className="block outline-none">
          <motion.div whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-[32px] shadow-none p-6 relative overflow-hidden group">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#f0d7ff] border-2 border-[#1a1a1a] rounded-xl">
                      <ShieldCheck className="h-5 w-5 text-[#1a1a1a]" />
                    </div>
                    <span className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-[#1a1a1a]">
                      Local Passport
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-[#1a1a1a] text-[#ffffeb] rounded-full">
                    OFFLINE
                  </span>
                </div>

                {/* Linear Notched Gauge */}
                <Gauge
                  orientation="linear"
                  value={30}
                  centerValue="150 / 500 XP"
                  defaultLabel="Level 1 Novice"
                  totalNotches={20}
                  spacing={20}
                  linearHeight={14}
                  notchCornerRadius={2}
                  activeFill="var(--primary)"
                  inactiveFill="var(--border)"
                  activeFillOpacity={1}
                  inactiveFillOpacity={0.3}
                />

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#8a8a80]">
                    3 LABELS EARNED · <strong className="text-[#1a1a1a] font-semibold">Novice</strong>
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#1a1a1a] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
    </>
  );
}
