"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Navigation, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const floors = ["Ground Floor", "Floor 1", "Floor 2", "Terrace"];

export default function MapPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* ── Map area (Dark Mode SVG) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-1 items-center justify-center overflow-hidden pt-16"
        style={{
          background: "radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)",
          borderBottom: "1px solid var(--border)",
          minHeight: "50vh",
        }}
      >
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Placeholder floor plan SVG */}
        <svg className="relative z-10" width="300" height="300" viewBox="0 0 300 300" fill="none">
          {/* Gallery rooms */}
          <rect x="30" y="30" width="120" height="80" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx="4" />
          <text x="90" y="65" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="500">
            Children's Gallery
          </text>
          
          <rect x="170" y="130" width="100" height="70" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx="4" />
          <text x="220" y="165" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="12" fontWeight="500">
            Temporary Exh.
          </text>
          
          {/* Animated Path / Route visualization */}
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            d="M150 110 L150 165 L170 165" 
            stroke="var(--primary)" 
            strokeWidth="3" 
            strokeDasharray="6 4" 
            fill="none" 
            strokeLinecap="round" 
            opacity="0.8"
          />

          {/* Location dot with glow */}
          <motion.g 
            transform="translate(150, 110)"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          >
            <circle cx="0" cy="0" r="16" fill="var(--primary)" opacity="0.15" />
            <circle cx="0" cy="0" r="12" fill="var(--primary)" opacity="0.3" />
            <circle cx="0" cy="0" r="6" fill="var(--primary)" />
            <circle cx="0" cy="0" r="6" fill="none" stroke="white" strokeWidth="2" />
          </motion.g>
        </svg>
        
        {/* Layer fade at the bottom to merge with the panel */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
      </motion.div>

      {/* ── Bottom panel ── */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative z-30 flex-shrink-0 bg-background px-5 pt-2 pb-8"
      >
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Find an artifact, gallery, or restroom..." 
            className="pl-10 h-12 bg-background/50 backdrop-blur-md border-border/50 rounded-full font-medium"
          />
        </div>

        {/* Shadcn Tabs for Floors */}
        <Tabs defaultValue={floors[1]} className="w-full mb-6">
          <TabsList className="w-full h-12 bg-background/50 border border-border/50 rounded-full p-1 overflow-x-auto justify-start hide-scrollbar">
            {floors.map((floor) => (
              <TabsTrigger 
                key={floor} 
                value={floor}
                className="rounded-full px-5 font-semibold text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-none whitespace-nowrap"
              >
                {floor}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Quick nav items */}
        <div className="flex flex-col gap-1">
          {[
            { icon: Navigation, label: "Current Location", highlight: true },
            { icon: MapPin, label: "Children's Gallery" },
            { icon: Info, label: "Wheelchair & Stroller Route", sub: "Avoid stairs and steep inclines" },
          ].map((item, idx) => (
            <div
              key={item.label}
              className={`flex items-start p-4 ${idx !== 0 ? 'border-t border-border/40' : ''}`}
            >
              <item.icon 
                className={`w-6 h-6 shrink-0 mr-4 ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`} 
                strokeWidth={2}
              />
              <div>
                <p className={`text-base font-semibold ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {item.label}
                </p>
                {item.sub && (
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">
                    {item.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
