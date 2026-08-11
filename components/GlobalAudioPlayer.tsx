"use client";

import { useAudio } from "@/context/AudioContext";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  X, 
  Headphones, 
  Zap,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function GlobalAudioPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    playbackSpeed, 
    togglePlay, 
    skipForward, 
    skipBackward, 
    changeSpeed, 
    closePlayer 
  } = useAudio();

  const router = useRouter();
  const pathname = usePathname();

  // Hide on camera scan view or splash page or when no active track
  if (!currentTrack || pathname === "/scan" || pathname === "/") {
    return null;
  }

  const progressPercent = currentTrack.durationSeconds > 0
    ? (currentTime / currentTrack.durationSeconds) * 100
    : 0;

  const handleCardClick = () => {
    if (currentTrack.href) {
      router.push(currentTrack.href);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="fixed bottom-[88px] left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 pointer-events-auto"
      >
        <Card className="relative overflow-hidden bg-[#1a1a1a] text-[#ffffeb] border-2 border-border rounded-[28px] shadow-2xl p-3.5">
          {/* Top Progress Track Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#ffffeb]/15">
            <motion.div 
              className="h-full bg-primary" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            {/* 1-Click Track Info (Navigates to exhibit page) */}
            <button
              onClick={handleCardClick}
              className="flex items-center gap-3 text-left min-w-0 flex-1 group outline-none"
              title="Click to view full exhibit audio page"
            >
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground border-2 border-border flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden relative">
                {currentTrack.image ? (
                  <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
                ) : (
                  <Headphones className="w-5 h-5 text-[#1a1a1a]" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f3e3b3]">
                    {formatSeconds(currentTime)} / {currentTrack.duration}
                  </span>
                  <ChevronRight className="w-3 h-3 text-[#f3e3b3] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-xs font-semibold text-[#ffffeb] truncate leading-tight group-hover:underline">
                  {currentTrack.title}
                </h4>
              </div>
            </button>

            {/* Controls Cluster */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Skip Backward 15s */}
              <button
                onClick={() => skipBackward(15)}
                className="p-1.5 rounded-full hover:bg-[#ffffeb]/15 text-[#ffffeb] transition-colors"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-primary text-[#1a1a1a] border-2 border-border flex items-center justify-center font-bold transition-transform hover:scale-105"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4.5 h-4.5 fill-current" /> : <Play className="w-4.5 h-4.5 fill-current ml-0.5" />}
              </button>

              {/* Skip Forward 15s */}
              <button
                onClick={() => skipForward(15)}
                className="p-1.5 rounded-full hover:bg-[#ffffeb]/15 text-[#ffffeb] transition-colors"
                title="Fast forward 15 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Speed Multiplier Button */}
              <button
                onClick={changeSpeed}
                className="px-2 py-1 rounded-lg bg-[#ffffeb]/15 hover:bg-[#ffffeb]/25 text-[#f3e3b3] text-[10px] font-bold border border-[#ffffeb]/20 transition-colors"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>

              {/* Close Button */}
              <button
                onClick={closePlayer}
                className="p-1.5 text-[#ffffeb]/60 hover:text-[#ffffeb] transition-colors"
                title="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
