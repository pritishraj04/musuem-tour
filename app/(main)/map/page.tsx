"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Navigation, Info, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const floors = [
  { id: "T", label: "Terrace" },
  { id: "2", label: "Floor 2" },
  { id: "1", label: "Floor 1" },
  { id: "G", label: "Ground" },
];

export default function MapPage() {
  const [selectedFloor, setSelectedFloor] = useState("1");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Toggle zone selection
  const handleZoneClick = (zone: string) => {
    if (selectedZone === zone) {
      setSelectedZone(null);
      setIsNavigating(false);
    } else {
      setSelectedZone(zone);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0a0a0a] select-none overflow-hidden">
      
      {/* ── Spatial Map Canvas (Interactive SVG) ── */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        
        {/* Subtle dot grid background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ── Floating Top Search Bar (Shifted down to clear TopHeader) ── */}
        <div className="absolute top-[88px] left-6 right-24 z-30">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            <Input 
              placeholder="Search galleries, artifacts..." 
              className="pl-12 h-14 bg-white/10 backdrop-blur-2xl border-white/10 rounded-full font-medium text-[15px] placeholder:text-white/40 focus-visible:ring-primary/50 shadow-2xl"
              readOnly
            />
          </div>
        </div>

        {/* ── Vertical FAB Stack (Floor Selection - Shifted down) ── */}
        <div className="absolute right-6 top-[88px] flex flex-col gap-3 z-30">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloor(floor.id)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xl backdrop-blur-2xl",
                selectedFloor === floor.id 
                  ? "bg-primary text-black border-2 border-primary/50 shadow-[0_0_15px_rgba(220,194,124,0.4)]" 
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              )}
            >
              {floor.id}
            </button>
          ))}
        </div>

        {/* ── Floor Plan SVG ── */}
        <svg 
          className="relative z-10 w-full max-w-[400px] h-[500px]" 
          viewBox="0 0 400 500" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(20, 20)">
            {/* Base Building Outline (Structural Boundaries) */}
            <path 
              d="M20 20 H340 V150 H240 V420 H20 Z" 
              stroke="rgba(255,255,255,0.15)" 
              strokeWidth="3" 
              fill="rgba(255,255,255,0.02)"
            />
            {/* Inner Corridors */}
            <path d="M120 20 V420" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M20 150 H240" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M20 280 H240" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="4 4" />

            {/* ── Interactive Zones ── */}
            {/* Zone 1: Children's Gallery */}
            <g onClick={() => handleZoneClick("childrens")} className="cursor-pointer">
              <rect 
                x="25" y="25" width="90" height="120" 
                fill={selectedZone === "childrens" ? "rgba(220,194,124,0.1)" : "rgba(255,255,255,0.04)"} 
                stroke={selectedZone === "childrens" ? "#dcc27c" : "transparent"} 
                strokeWidth="2" 
                rx="6" 
                className="transition-colors duration-300"
              />
              {selectedZone === "childrens" && (
                <rect x="25" y="25" width="90" height="120" fill="none" stroke="#dcc27c" strokeWidth="4" rx="6" opacity="0.3" filter="blur(4px)" />
              )}
              {/* Text Label with backdrop */}
              <rect x="35" y="65" width="70" height="36" fill="rgba(0,0,0,0.6)" rx="4" />
              <text x="70" y="80" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600">Children's</text>
              <text x="70" y="94" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600">Gallery</text>
            </g>

            {/* Zone 2: Historical Art */}
            <g onClick={() => handleZoneClick("historical")} className="cursor-pointer">
              <rect 
                x="125" y="155" width="110" height="120" 
                fill={selectedZone === "historical" ? "rgba(220,194,124,0.1)" : "rgba(255,255,255,0.04)"} 
                stroke={selectedZone === "historical" ? "#dcc27c" : "transparent"} 
                strokeWidth="2" 
                rx="6" 
                className="transition-colors duration-300"
              />
              {selectedZone === "historical" && (
                <rect x="125" y="155" width="110" height="120" fill="none" stroke="#dcc27c" strokeWidth="4" rx="6" opacity="0.3" filter="blur(4px)" />
              )}
              <rect x="135" y="195" width="90" height="36" fill="rgba(0,0,0,0.6)" rx="4" />
              <text x="180" y="210" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600">Historical</text>
              <text x="180" y="224" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600">Art</text>
            </g>

            {/* Zone 3: Temporary Exh (Right Wing) */}
            <g onClick={() => handleZoneClick("temp")} className="cursor-pointer">
              <rect 
                x="245" y="25" width="90" height="120" 
                fill={selectedZone === "temp" ? "rgba(220,194,124,0.1)" : "rgba(255,255,255,0.04)"} 
                stroke={selectedZone === "temp" ? "#dcc27c" : "transparent"} 
                strokeWidth="2" 
                rx="6" 
                className="transition-colors duration-300"
              />
              {selectedZone === "temp" && (
                <rect x="245" y="25" width="90" height="120" fill="none" stroke="#dcc27c" strokeWidth="4" rx="6" opacity="0.3" filter="blur(4px)" />
              )}
              <rect x="255" y="65" width="70" height="36" fill="rgba(0,0,0,0.6)" rx="4" />
              <text x="290" y="80" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600">Temporary</text>
              <text x="290" y="94" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="600">Exhibit</text>
            </g>

            {/* ── Wayfinding Route (Animated) ── */}
            <AnimatePresence>
              {isNavigating && selectedZone === "childrens" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* The walking path */}
                  <motion.path 
                    d="M180 350 Q180 200 70 120" 
                    stroke="#dcc27c" 
                    strokeWidth="4" 
                    strokeDasharray="8 8" 
                    fill="none" 
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: [32, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Destination Pin */}
                  <motion.g 
                    transform="translate(70, 120)"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                  >
                    <path d="M0 0 C -12 -15 -12 -25 0 -25 C 12 -25 12 -15 0 0" fill="#dcc27c" />
                    <circle cx="0" cy="-17" r="4" fill="#000" />
                  </motion.g>
                </motion.g>
              )}
            </AnimatePresence>

            {/* Current Location Dot */}
            <motion.g 
              transform="translate(180, 350)"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            >
              <circle cx="0" cy="0" r="20" fill="#4f46e5" opacity="0.15" />
              <circle cx="0" cy="0" r="10" fill="#4f46e5" opacity="0.3" />
              <circle cx="0" cy="0" r="5" fill="#818cf8" />
              <circle cx="0" cy="0" r="5" fill="none" stroke="#fff" strokeWidth="2" />
            </motion.g>
          </g>
        </svg>

        {/* ── Floating Location Details Card ── */}
        <AnimatePresence>
          {selectedZone && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-[100px] left-6 right-6 z-30" // bottom-100px perfectly clears the BottomNav pill
            >
              <Card className="bg-[#1a1a1a]/90 backdrop-blur-3xl border border-white/10 rounded-3xl p-5 shadow-2xl overflow-hidden">
                <button 
                  onClick={() => setSelectedZone(null)}
                  className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
                
                <div className="flex items-start justify-between mb-5 pr-8">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                      {selectedZone === "childrens" && "Children's Gallery"}
                      {selectedZone === "historical" && "Historical Art"}
                      {selectedZone === "temp" && "Temporary Exhibit"}
                    </h3>
                    <p className="text-sm font-medium text-white/50">Floor 1 • 2 mins away</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {!isNavigating ? (
                  <Button 
                    onClick={() => setIsNavigating(true)}
                    className="w-full rounded-full h-12 bg-primary text-black font-bold text-[15px] hover:bg-primary/90 shadow-[0_0_20px_rgba(220,194,124,0.3)] transition-transform hover:scale-[1.02]"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Start Navigation
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setIsNavigating(false)}
                    className="w-full rounded-full h-12 bg-transparent border-white/20 text-white hover:bg-white/10 font-bold text-[15px] transition-colors"
                  >
                    End Navigation
                  </Button>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
