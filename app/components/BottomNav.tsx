"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  ScanLine, 
  Map as MapIcon, 
  Headphones, 
  Menu, 
  X, 
  User, 
  Bell, 
  Settings, 
  Shield, 
  Info, 
  LogOut,
  Calendar,
  Sun,
  Moon,
  Sparkles,
  ChevronRight,
  Accessibility,
  MessageSquare
} from "lucide-react";
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
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Do not show bottom nav on splash page or full screen camera view
  if (pathname === "/" || pathname === "/scan") return null;

  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none pb-[env(safe-area-inset-bottom)] w-full max-w-md flex justify-center px-4",
      isMenuOpen ? "bottom-4 top-14" : "bottom-6"
    )}>
      <motion.nav 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "pointer-events-auto flex border-2 border-border overflow-hidden shadow-xl",
          isMenuOpen 
            ? "w-full h-full flex-col rounded-[36px] p-6 bg-card text-card-foreground" 
            : "w-max h-auto items-center gap-1 p-1.5 rounded-full bg-card text-card-foreground"
        )}
      >
        <AnimatePresence mode="popLayout">
          {!isMenuOpen ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex items-center gap-1 w-full"
            >
              {tabs.map((tab) => {
                const isMenuTab = tab.label === "Menu";
                const isActive = pathname.startsWith(tab.href) && !isMenuTab;
                const Icon = tab.icon;

                return (
                  <Link
                    key={tab.href}
                    href={isMenuTab ? "#" : tab.href}
                    onClick={(e) => {
                      if (isMenuTab) {
                        e.preventDefault();
                        setIsMenuOpen(true);
                      }
                    }}
                    className="outline-none"
                  >
                    <motion.div
                      layout
                      className={cn(
                        "relative flex items-center justify-center gap-2 px-3.5 py-2 rounded-full transition-colors",
                        isActive ? "text-[#1a1a1a]" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <motion.div layout className="relative z-10">
                        <Icon 
                          className="h-5 w-5" 
                          strokeWidth={isActive ? 2.5 : 2} 
                        />
                      </motion.div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layout
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="relative z-10 overflow-hidden whitespace-nowrap text-[13px] font-semibold tracking-wide font-[family-name:var(--font-figtree)]"
                          >
                            {tab.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute inset-0 rounded-full bg-primary border-2 border-border pointer-events-none"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              className="flex flex-col h-full w-full min-w-[300px]"
            >
              {/* ── Menu Header ── */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-border">
                <div>
                  <h2 className="text-3xl font-normal font-[family-name:var(--font-eb-garamond)] text-foreground">
                    Bihar Museum
                  </h2>
                  <p className="text-xs font-semibold text-secondary">Digital Guide Directory</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Theme Quick Switcher Pill inside Hamburger Menu */}
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2.5 rounded-full bg-muted border-2 border-border text-foreground hover:scale-105 transition-all"
                    title="Toggle Light/Dark Theme"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4 text-[#ffa946]" /> : <Moon className="w-4 h-4 text-[#1a1a1a]" />}
                  </button>

                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2.5 rounded-full bg-muted border-2 border-border text-foreground hover:bg-border transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-6 pb-6">
                {/* ── User Profile Card ── */}
                <Link href="/passport" onClick={() => setIsMenuOpen(false)}>
                  <div className="p-3.5 rounded-[24px] bg-muted/60 border-2 border-border flex items-center justify-between hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary border-2 border-border flex items-center justify-center text-primary-foreground font-bold">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Guest Explorer</p>
                        <p className="text-xs text-muted-foreground">Level 3 · Magadha Scholar</p>
                      </div>
                    </div>
                    <span className="badge-teal text-[10px]">
                      150 XP
                    </span>
                  </div>
                </Link>

                {/* ── Quick Action Grid (2x2) ── */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Quick Access
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link href="/tours" onClick={() => setIsMenuOpen(false)}>
                      <div className="p-3 rounded-2xl bg-primary text-primary-foreground border-2 border-border flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                        <Headphones className="w-4 h-4" />
                        <span className="text-xs font-semibold">Audio Tours</span>
                      </div>
                    </Link>
                    <Link href="/events" onClick={() => setIsMenuOpen(false)}>
                      <div className="p-3 rounded-2xl bg-secondary text-secondary-foreground border-2 border-border flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-semibold">Events / RSVP</span>
                      </div>
                    </Link>
                    <Link href="/map" onClick={() => setIsMenuOpen(false)}>
                      <div className="p-3 rounded-2xl bg-card text-foreground border-2 border-border flex items-center gap-2.5 hover:bg-muted transition-colors">
                        <MapIcon className="w-4 h-4" />
                        <span className="text-xs font-semibold">Museum Map</span>
                      </div>
                    </Link>
                    <Link href="/scan" onClick={() => setIsMenuOpen(false)}>
                      <div className="p-3 rounded-2xl bg-card text-foreground border-2 border-border flex items-center gap-2.5 hover:bg-muted transition-colors">
                        <ScanLine className="w-4 h-4" />
                        <span className="text-xs font-semibold">AI Scanner</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* ── Categorized Menu Links ── */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                    System & Preferences
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <MenuItem icon={Settings} label="App Settings (Themes & Audio)" href="/settings" onClick={() => setIsMenuOpen(false)} />
                    <MenuItem icon={Accessibility} label="Accessibility Options" href="/accessibility" onClick={() => setIsMenuOpen(false)} />
                    <MenuItem icon={Bell} label="Notification Center" href="/notifications" badge="New" onClick={() => setIsMenuOpen(false)} />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                    Information & Support
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <MenuItem icon={Info} label="About Bihar Museum" href="/about" onClick={() => setIsMenuOpen(false)} />
                    <MenuItem icon={MessageSquare} label="Report an Issue" href="/feedback" onClick={() => setIsMenuOpen(false)} />
                    <MenuItem icon={Shield} label="Privacy & Data Terms" href="/privacy" onClick={() => setIsMenuOpen(false)} />
                  </div>
                </div>

                {/* ── Drawer Footer with Logo ── */}
                <div className="mt-auto pt-4 border-t-2 border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center p-1">
                      <Image src="/favicon.svg" alt="Emblem" width={16} height={16} className="object-contain" />
                    </div>
                    <span className="text-xs font-bold text-foreground">Bihar Museum Guide</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#ffa946]">v1.2.0</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

function MenuItem({ 
  icon: Icon, 
  label, 
  href, 
  badge,
  danger, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  href?: string, 
  badge?: string,
  danger?: boolean, 
  onClick?: () => void 
}) {
  const content = (
    <div className={cn(
      "flex items-center justify-between w-full p-3 rounded-2xl transition-colors text-left group border border-transparent cursor-pointer",
      danger 
        ? "hover:bg-red-500/20 text-red-400" 
        : "hover:bg-muted text-foreground hover:border-border"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-xl border-2 border-border shrink-0 transition-colors",
          danger ? "bg-red-500/20 text-red-400" : "bg-card text-foreground"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-semibold text-xs font-[family-name:var(--font-figtree)]">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-primary-foreground rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );

  if (href && href !== "#") {
    return (
      <Link href={href} onClick={onClick} className="outline-none block w-full">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="w-full text-left outline-none">
      {content}
    </button>
  );
}
