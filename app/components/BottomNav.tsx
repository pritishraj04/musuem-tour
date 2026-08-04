"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ScanLine, Map as MapIcon, Headphones, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Explore", href: "/home", icon: Home },
  { label: "Scanner", href: "/scan", icon: ScanLine },
  { label: "Map", href: "/map", icon: MapIcon },
  { label: "Tours", href: "/tours", icon: Headphones },
  { label: "Menu", href: "/menu", icon: Menu },
];

export default function BottomNav() {
  const pathname = usePathname();
  
  // Do not show bottom nav on splash page or full screen camera view
  if (pathname === "/" || pathname === "/scan") return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pb-[env(safe-area-inset-bottom)] w-full max-w-md">
      {/* Sleek blurred container */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border" />
      
      <div className="relative flex h-16 w-full items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex h-full flex-1 flex-col items-center justify-center gap-1 outline-none transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 transition-all duration-300", 
                  isActive ? "scale-110" : "scale-100"
                )} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <span className="text-[10px] font-medium tracking-wide">
                {tab.label}
              </span>

              {/* Active Tab Indicator (Framer Motion) */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-[1px] h-[3px] w-12 rounded-full bg-primary shadow-[0_0_8px_rgba(220,194,124,0.5)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
