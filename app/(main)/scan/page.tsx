"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Zap, ZapOff, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ScanPage() {
  const router = useRouter();
  
  // Simulated interactive states
  const [isDetected, setIsDetected] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [flashOn, setFlashOn] = useState(false);

  // Simulate object detection sequence
  useEffect(() => {
    // 1. Wait for 2.5s simulating searching
    const detectionTimer = setTimeout(() => {
      setIsDetected(true);
      // Trigger haptic if available
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }, 2500);

    return () => clearTimeout(detectionTimer);
  }, []);

  // Simulate scanning progress after detection
  useEffect(() => {
    if (isDetected) {
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);
        }
        setScanProgress(currentProgress);
      }, 50);
      return () => clearInterval(progressInterval);
    }
  }, [isDetected]);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-black overflow-hidden select-none">
      
      {/* ── Simulated Camera Feed (Background) ── */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/museum-sculpture-bg.png')" }}
      />

      {/* ── Cinematic Peripheral Blur (Depth of Field) ── */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-2xl pointer-events-none transition-all duration-700"
        style={{
          // Creates a sharp hole in the center (no blur) and heavily blurred edges
          WebkitMaskImage: "radial-gradient(circle at 50% 45%, transparent 110px, black 220px)",
          maskImage: "radial-gradient(circle at 50% 45%, transparent 110px, black 220px)"
        }}
      />

      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 flex items-center justify-between p-6 pt-safe"
      >
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 border border-white/10"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <div className="flex gap-3">
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 border border-white/10"
            onClick={() => setFlashOn(!flashOn)}
          >
            {flashOn ? <Zap className="h-5 w-5 text-primary" /> : <ZapOff className="h-5 w-5 text-white" />}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 active:scale-95 border border-white/10">
            <SlidersHorizontal className="h-5 w-5 text-white" />
          </button>
        </div>
      </motion.header>

      {/* ── Organic Viewfinder / Reticle ── */}
      <div className="relative flex flex-1 items-center justify-center -mt-10 pointer-events-none">
        
        {/* Floating Particle Dots (Searching Mode) */}
        <AnimatePresence>
          {!isDetected && (
            <motion.div 
              key="particles"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    x: [Math.random() * 40 - 20, Math.random() * -40 + 20, Math.random() * 40 - 20],
                    y: [Math.random() * 40 - 20, Math.random() * -40 + 20, Math.random() * 40 - 20],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px]"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-90px)`
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Central Reactive Reticle */}
        <motion.div
          animate={isDetected ? {
            width: 260,
            height: 260,
            borderColor: "rgba(220,194,124,0.8)", // Primary gold
            boxShadow: "0 0 40px rgba(220,194,124,0.3), inset 0 0 20px rgba(220,194,124,0.2)",
            borderWidth: 2,
            opacity: 1
          } : {
            width: 220,
            height: 220,
            borderColor: "rgba(255,255,255,0.4)",
            boxShadow: "0 0 0px rgba(255,255,255,0)",
            borderWidth: 1,
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={isDetected 
            ? { type: "spring", stiffness: 200, damping: 20 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute z-10 rounded-full border-dashed"
          style={{ borderStyle: isDetected ? "solid" : "dashed" }}
        />

        {/* Object Tracking Mesh / Overlay (Detected Mode) */}
        <AnimatePresence>
          {isDetected && (
            <motion.div
              key="mesh"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="absolute z-0 w-[240px] h-[240px] rounded-full border border-primary/30 bg-primary/5"
            >
              {/* Corner snap points simulating object bounding */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(220,194,124,1)]" />
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(220,194,124,1)]" />
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(220,194,124,1)]" />
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(220,194,124,1)]" />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ── Instruction text ── */}
      <motion.div 
        animate={{ y: isDetected ? -10 : 0 }}
        className="relative z-10 text-center px-8 pb-12"
      >
        <p className={cn(
          "text-[15px] font-medium transition-colors duration-500 tracking-wide drop-shadow-md",
          isDetected ? "text-primary font-bold" : "text-white/90"
        )}>
          {isDetected ? "Artifact Locked. Scanning..." : "Looking for artifacts..."}
        </p>
      </motion.div>

      {/* ── Capture Controls ── */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex flex-col items-center pb-12"
      >
        {/* Dynamic Capture Button with SVG Progress Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth="4" 
            />
            {/* Animated Progress */}
            <motion.circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round"
              className={isDetected ? "text-primary" : "text-transparent"}
              initial={{ strokeDasharray: "289", strokeDashoffset: "289" }}
              animate={{ strokeDashoffset: 289 - (289 * scanProgress) / 100 }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </svg>

          {/* Actual Button */}
          <Link href="/scan/result" className="outline-none z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center justify-center w-[72px] h-[72px] rounded-full transition-all duration-300",
                isDetected 
                  ? "bg-white/10 backdrop-blur-md shadow-[0_0_32px_rgba(220,194,124,0.3)]" 
                  : "bg-white/20 backdrop-blur-md hover:bg-white/30"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-full transition-colors duration-500",
                isDetected ? "bg-primary" : "bg-white"
              )} />
            </motion.div>
          </Link>
        </div>

        {/* Manual search fallback */}
        <Button 
          variant="outline" 
          className="rounded-full bg-white/5 backdrop-blur-xl border-white/10 text-white/80 hover:bg-white/10 hover:text-white font-medium"
        >
          <Search className="w-4 h-4 mr-2 opacity-70" />
          Search Manually
        </Button>
      </motion.div>
    </div>
  );
}
