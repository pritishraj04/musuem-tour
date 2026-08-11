"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Play, Pause, Clock, MapPin, Sparkles, SkipForward, RotateCcw, Volume2, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tours = [
  {
    id: "masterpiece-trail",
    title: "The Masterpiece Trail",
    subtitle: "8 iconic highlights including Didarganj Yakshi & Mauryan Polish",
    duration: "45 mins",
    stops: "8 Stops",
    level: "All Visitors",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80",
    narrator: "Dr. A. K. Sharma (Head Curator)",
    featured: true
  },
  {
    id: "mauryan-glory",
    title: "Mauryan Dynasty & Imperial Art",
    subtitle: "Explore 3rd Century BCE sandstone masterpieces and royal seals",
    duration: "30 mins",
    stops: "6 Stops",
    level: "Historical Focus",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80",
    narrator: "Prof. R. N. Prasad",
    featured: false
  },
  {
    id: "pala-bronzes",
    title: "Pala-Sena Sacred Bronzes",
    subtitle: "Intricate Buddhist & Hindu bronze casting of ancient Nalanda",
    duration: "25 mins",
    stops: "5 Stops",
    level: "Artisan Technique",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=600&q=80",
    narrator: "Sunita Roy (Senior Conservator)",
    featured: false
  },
  {
    id: "kids-discovery",
    title: "Children's Heritage Trail",
    subtitle: "Fun riddles, interactive stories, and ancient secrets for young explorers",
    duration: "20 mins",
    stops: "5 Stops",
    level: "Family Friendly",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80",
    narrator: "Ananya Kumar",
    featured: false
  }
];

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

export default function AudioToursPage() {
  const [activeTour, setActiveTour] = useState<string | null>("masterpiece-trail");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);

  const currentTourData = tours.find((t) => t.id === activeTour);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-full px-6 pt-20 pb-32 bg-background text-foreground transition-colors duration-300"
    >
      {/* ── Page Header ── */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="badge-teal mb-3">
          <Headphones className="w-3.5 h-3.5" />
          Immersive Audio Experience
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground">
          Audio Tours & Walks
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Curated narrative journeys through 2,500 years of Bihar&apos;s heritage.
        </p>
      </motion.div>

      {/* ── Featured Audio Tour ── */}
      {tours.filter(t => t.featured).map((tour) => (
        <motion.div key={tour.id} variants={itemVariants} className="mb-8">
          <Card className="relative overflow-hidden bg-card border-2 border-border rounded-[36px] shadow-none group">
            <div 
              className="h-[200px] bg-cover bg-center relative"
              style={{ backgroundImage: `url('${tour.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 badge-teal">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Official Tour
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#f0d7ff]">
                  {tour.stops} · {tour.duration}
                </span>
                <h3 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-normal text-white leading-tight">
                  {tour.title}
                </h3>
              </div>
            </div>
            <CardContent className="p-6 bg-card text-foreground">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-medium">
                {tour.subtitle}
              </p>
              <div className="flex items-center justify-between pt-2 border-t-2 border-border">
                <span className="text-xs font-semibold text-muted-foreground">
                  Narrated by {tour.narrator}
                </span>
                <Button
                  onClick={() => {
                    setActiveTour(tour.id);
                    setIsPlaying(true);
                  }}
                  className="btn-primary h-11 px-5 rounded-xl text-sm font-semibold border-2 border-border bg-primary text-primary-foreground"
                >
                  {activeTour === tour.id && isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
                  {activeTour === tour.id && isPlaying ? "Pause Audio" : "Start Tour"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* ── All Guided Walks List ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-4">
          All Guided Audio Trails
        </h3>

        <div className="flex flex-col gap-4">
          {tours.filter(t => !t.featured).map((tour) => (
            <Card 
              key={tour.id} 
              className={cn(
                "bg-card border-2 border-border rounded-[28px] overflow-hidden shadow-none transition-colors",
                activeTour === tour.id && "ring-2 ring-primary"
              )}
            >
              <CardContent className="p-4 flex gap-4 items-center">
                <div 
                  className="w-20 h-20 rounded-2xl bg-cover bg-center shrink-0 border-2 border-border relative overflow-hidden"
                  style={{ backgroundImage: `url('${tour.image}')` }}
                >
                  <button 
                    onClick={() => {
                      setActiveTour(tour.id);
                      setIsPlaying(activeTour === tour.id ? !isPlaying : true);
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors text-white"
                  >
                    {activeTour === tour.id && isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {tour.duration} · {tour.stops}
                    </span>
                  </div>
                  <h4 className="font-semibold text-base text-foreground truncate">
                    {tour.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {tour.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* ── Active Audio Player Dock ── */}
      <AnimatePresence>
        {activeTour && currentTourData && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-[90px] left-6 right-6 z-40"
          >
            <Card className="bg-[#1a1a1a] text-[#ffffeb] border-2 border-[#1a1a1a] rounded-[28px] p-4 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#f0d7ff] text-[#1a1a1a] border-2 border-[#1a1a1a] flex items-center justify-center font-bold text-xs shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase text-[#f0d7ff] tracking-wider">Now Playing</p>
                  <p className="text-sm font-semibold text-[#ffffeb] truncate">{currentTourData.title}</p>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-[#f0d7ff] text-[#1a1a1a] border-2 border-[#1a1a1a] flex items-center justify-center shrink-0"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
              </div>

              {/* Progress track */}
              <div className="space-y-1">
                <div className="h-2 w-full bg-[#e4e4d0]/20 rounded-full overflow-hidden border border-[#ffffeb]/30">
                  <div className="h-full bg-[#f0d7ff] rounded-full" style={{ width: `${audioProgress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#e4e4d0]">
                  <span>14:20</span>
                  <span>{currentTourData.duration}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
