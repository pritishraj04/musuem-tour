"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LogOut 
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Do not show bottom nav on splash page or full screen camera view
  if (pathname === "/" || pathname === "/scan") return null;

  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none pb-[env(safe-area-inset-bottom)] w-full max-w-md flex justify-center px-4",
      isMenuOpen ? "bottom-4 top-16" : "bottom-6"
    )}>
      <motion.nav 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "pointer-events-auto flex bg-background/70 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden",
          isMenuOpen 
            ? "w-full h-full flex-col rounded-3xl p-6" 
            : "w-max h-auto items-center gap-1 p-2 rounded-full"
        )}
      >
        <AnimatePresence mode="popLayout">
          {!isMenuOpen ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
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
                        "relative flex items-center justify-center gap-2 px-3 py-2.5 rounded-full transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <motion.div layout>
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
                            className="overflow-hidden whitespace-nowrap text-[13px] font-bold tracking-wide"
                          >
                            {tab.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute inset-0 rounded-full bg-white/10 border border-primary/20 shadow-[inset_0_0_12px_rgba(220,194,124,0.1)] pointer-events-none"
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Menu</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col gap-2 pb-8">
                <MenuItem icon={User} label="My Passport & Profile" />
                <MenuItem icon={Bell} label="Notifications" />
                <MenuItem icon={Headphones} label="Accessibility Settings" />
                <div className="h-px w-full bg-border/50 my-2" />
                <MenuItem icon={Settings} label="App Settings" />
                <MenuItem icon={Shield} label="Privacy & Terms" />
                <MenuItem icon={Info} label="About Bihar Museum" />
                
                <div className="mt-auto pt-8">
                  <MenuItem icon={LogOut} label="Log Out" danger />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

function MenuItem({ icon: Icon, label, danger }: { icon: any, label: string, danger?: boolean }) {
  return (
    <button className={cn(
      "flex items-center gap-4 w-full p-4 rounded-2xl transition-colors text-left group",
      danger 
        ? "hover:bg-red-500/10 text-red-400" 
        : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
    )}>
      <div className={cn(
        "p-2 rounded-xl transition-colors",
        danger ? "bg-red-500/10 group-hover:bg-red-500/20" : "bg-white/5 group-hover:bg-white/10 text-foreground"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="font-medium text-[15px]">{label}</span>
    </button>
  );
}
