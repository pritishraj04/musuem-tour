"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Navigation, Info, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

import { SearchModal } from "@/components/SearchModal";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <div className="fixed inset-0 flex flex-col bg-[#ffffeb] text-[#1a1a1a] select-none overflow-hidden">
        
        {/* ── Spatial Map Canvas (Interactive SVG) ── */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          
          {/* Subtle dot grid background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* ── Floating Top Search Bar ── */}
          <div className="absolute top-[80px] left-6 right-24 z-30">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-full relative text-left outline-none"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1a1a]" />
              <Input 
                placeholder="Search galleries, artifacts..." 
                className="pl-12 h-13 bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-full font-medium text-[15px] text-[#1a1a1a] placeholder:text-[#8a8a80] shadow-none cursor-pointer"
                readOnly
              />
            </button>
          </div>

        {/* ── Vertical FAB Stack ── */}
        <div className="absolute right-6 top-[80px] flex flex-col gap-2.5 z-30">
          {floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloor(floor.id)}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 border-[#1a1a1a]",
                selectedFloor === floor.id 
                  ? "bg-[#f0d7ff] text-[#1a1a1a]" 
                  : "bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#e4e4d0]"
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
            {/* Base Building Outline */}
            <path 
              d="M20 20 H340 V150 H240 V420 H20 Z" 
              stroke="#1a1a1a" 
              strokeWidth="3" 
              fill="#ffffeb"
            />
            {/* Inner Corridors */}
            <path d="M120 20 V420" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            <path d="M20 150 H240" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            <path d="M20 280 H240" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />

            {/* ── Interactive Zones ── */}
            {/* Zone 1: Children's Gallery */}
            <g onClick={() => handleZoneClick("childrens")} className="cursor-pointer">
              <rect 
                x="25" y="25" width="90" height="120" 
                fill={selectedZone === "childrens" ? "#f0d7ff" : "#ffffeb"} 
                stroke="#1a1a1a" 
                strokeWidth="2" 
                rx="12" 
                className="transition-colors duration-300"
              />
              <rect x="35" y="65" width="70" height="36" fill="#1a1a1a" rx="8" />
              <text x="70" y="80" textAnchor="middle" fill="#ffffeb" fontSize="11" fontWeight="600">Children's</text>
              <text x="70" y="94" textAnchor="middle" fill="#ffffeb" fontSize="11" fontWeight="600">Gallery</text>
            </g>

            {/* Zone 2: Historical Art */}
            <g onClick={() => handleZoneClick("historical")} className="cursor-pointer">
              <rect 
                x="125" y="155" width="110" height="120" 
                fill={selectedZone === "historical" ? "#f0d7ff" : "#ffffeb"} 
                stroke="#1a1a1a" 
                strokeWidth="2" 
                rx="12" 
                className="transition-colors duration-300"
              />
              <rect x="135" y="195" width="90" height="36" fill="#1a1a1a" rx="8" />
              <text x="180" y="210" textAnchor="middle" fill="#ffffeb" fontSize="11" fontWeight="600">Historical</text>
              <text x="180" y="224" textAnchor="middle" fill="#ffffeb" fontSize="11" fontWeight="600">Art</text>
            </g>

            {/* Zone 3: Temporary Exh */}
            <g onClick={() => handleZoneClick("temp")} className="cursor-pointer">
              <rect 
                x="245" y="25" width="90" height="120" 
                fill={selectedZone === "temp" ? "#f0d7ff" : "#ffffeb"} 
                stroke="#1a1a1a" 
                strokeWidth="2" 
                rx="12" 
                className="transition-colors duration-300"
              />
              <rect x="255" y="65" width="70" height="36" fill="#1a1a1a" rx="8" />
              <text x="290" y="80" textAnchor="middle" fill="#ffffeb" fontSize="11" fontWeight="600">Temporary</text>
              <text x="290" y="94" textAnchor="middle" fill="#ffffeb" fontSize="11" fontWeight="600">Exhibit</text>
            </g>

            {/* ── Wayfinding Route ── */}
            <AnimatePresence>
              {isNavigating && selectedZone === "childrens" && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.path 
                    d="M180 350 Q180 200 70 120" 
                    stroke="#034f46" 
                    strokeWidth="4" 
                    strokeDasharray="8 8" 
                    fill="none" 
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: [32, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.g 
                    transform="translate(70, 120)"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.5 }}
                  >
                    <path d="M0 0 C -12 -15 -12 -25 0 -25 C 12 -25 12 -15 0 0" fill="#034f46" />
                    <circle cx="0" cy="-17" r="4" fill="#ffffeb" />
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
              <circle cx="0" cy="0" r="18" fill="#f0d7ff" opacity="0.5" />
              <circle cx="0" cy="0" r="10" fill="#034f46" />
              <circle cx="0" cy="0" r="5" fill="#ffffeb" />
              <circle cx="0" cy="0" r="5" fill="none" stroke="#1a1a1a" strokeWidth="2" />
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
              className="absolute bottom-[90px] left-6 right-6 z-30"
            >
              <Card className="bg-[#ffffeb] text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-[32px] p-6 shadow-none overflow-hidden">
                <button 
                  onClick={() => setSelectedZone(null)}
                  className="absolute top-4 right-4 p-1.5 bg-[#e4e4d0] hover:bg-[#1a1a1a] hover:text-[#ffffeb] rounded-full border border-[#1a1a1a] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-start justify-between mb-4 pr-8">
                  <div>
                    <h3 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-normal text-[#1a1a1a] mb-1">
                      {selectedZone === "childrens" && "Children's Gallery"}
                      {selectedZone === "historical" && "Historical Art"}
                      {selectedZone === "temp" && "Temporary Exhibit"}
                    </h3>
                    <p className="text-xs font-medium text-[#8a8a80]">Floor 1 • 2 mins away</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#f0d7ff] border-2 border-[#1a1a1a] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1a1a1a]" />
                  </div>
                </div>

                {!isNavigating ? (
                  <Button 
                    onClick={() => setIsNavigating(true)}
                    className="w-full btn-primary h-12 rounded-xl text-base font-semibold border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] hover:bg-[#e5c4fa]"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Start Navigation
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsNavigating(false)}
                    className="w-full btn-secondary h-12 rounded-xl text-base font-semibold border-2 border-[#1a1a1a] bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#e4e4d0]"
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
    </>
  );
}
