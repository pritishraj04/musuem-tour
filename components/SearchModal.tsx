"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, Headphones, MapPin, Sparkles, Calendar, Landmark, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Artifact" | "Gallery" | "Audio Tour" | "Event";
  href: string;
  image?: string;
  badge?: string;
}

const searchDatabase: SearchItem[] = [
  {
    id: "didarganj-yakshi",
    title: "Didarganj Yakshi",
    subtitle: "3rd Century BCE Polished Chunar Sandstone",
    category: "Artifact",
    href: "/artifact/didarganj-yakshi",
    image: "/sculpture-hero.png",
    badge: "Masterpiece",
  },
  {
    id: "mauryan-pillar-capital",
    title: "Mauryan Lion Capital",
    subtitle: "250 BCE Monolith Sandstone from Ashokan Empire",
    category: "Artifact",
    href: "/artifact/mauryan-pillar-capital",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&q=80",
    badge: "Imperial Symbol",
  },
  {
    id: "pala-bronze-buddha",
    title: "Pala Sacred Bronze Buddha",
    subtitle: "9th Century CE Lost-Wax Bronze with Silver Inlay",
    category: "Artifact",
    href: "/artifact/pala-bronze-buddha",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=400&q=80",
    badge: "Nalanda Hoard",
  },
  {
    id: "terracotta-mother-goddess",
    title: "Terracotta Mother Goddess",
    subtitle: "2nd Century BCE Hand-Molded Clay Figurine",
    category: "Artifact",
    href: "/artifact/terracotta-mother-goddess",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80",
    badge: "Folk Craft",
  },
  {
    id: "bulandibagh-dancer",
    title: "Bulandibagh Dancing Girl",
    subtitle: "3rd Century BCE Pataliputra Terracotta",
    category: "Artifact",
    href: "/artifact/bulandibagh-dancer",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&q=80",
    badge: "Pataliputra",
  },
  {
    id: "sher-shah-coins",
    title: "Silver Rupee of Sher Shah Suri",
    subtitle: "c. 1540 CE High-Purity Medieval Currency",
    category: "Artifact",
    href: "/artifact/sher-shah-coins",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=400&q=80",
    badge: "Numismatics",
  },
  {
    id: "patna-school-painting",
    title: "Patna Kalam Miniature Painting",
    subtitle: "18th Century Silk & Paper Watercolor",
    category: "Artifact",
    href: "/artifact/patna-school-painting",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=400&q=80",
    badge: "Miniatures",
  },
  {
    id: "gallery-a",
    title: "History Gallery A",
    subtitle: "Pre-History to Mauryan Empire (Floor 1, East Wing)",
    category: "Gallery",
    href: "/map",
    badge: "Floor 1",
  },
  {
    id: "gallery-b",
    title: "History Gallery B",
    subtitle: "Gupta & Pala-Sena Bronzes (Floor 2, West Wing)",
    category: "Gallery",
    href: "/map",
    badge: "Floor 2",
  },
  {
    id: "childrens-gallery",
    title: "Children's Gallery & Excavation Pit",
    subtitle: "Interactive Discovery & Wildlife Lab (Floor 1)",
    category: "Gallery",
    href: "/map",
    badge: "Family",
  },
  {
    id: "masterpiece-trail",
    title: "The Masterpiece Trail Audio Walk",
    subtitle: "45 Mins · 8 Stops Narrated by Head Curator",
    category: "Audio Tour",
    href: "/tours",
    badge: "Featured Audio",
  },
  {
    id: "mauryan-walk",
    title: "Mauryan Dynasty & Imperial Art Walk",
    subtitle: "30 Mins · 6 Stops through Ashokan Legacy",
    category: "Audio Tour",
    href: "/tours",
    badge: "30 Mins",
  },
  {
    id: "mughal-workshop",
    title: "Mughal & Rajput Miniature Workshop",
    subtitle: "Aug 12 · Live pigment masterclass",
    category: "Event",
    href: "/events",
    badge: "Free RSVP",
  },
  {
    id: "pataliputra-tour",
    title: "History of Pataliputra Guided Walk",
    subtitle: "Aug 15 · Special Independence Day walkthrough",
    category: "Event",
    href: "/events",
    badge: "Guided Tour",
  },
];

const popularSearches = [
  "Didarganj Yakshi",
  "Mauryan Polish",
  "Nalanda Bronzes",
  "Children's Gallery",
  "Ticket Prices",
  "Audio Tour",
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return searchDatabase.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl transition-colors duration-300 overflow-hidden"
      >
        {/* ── Search Input Header Bar ── */}
        <div className="flex items-center gap-3 p-4 pt-safe border-b-2 border-border bg-card">
          <div className="flex-1 flex items-center gap-3 bg-background border-2 border-border rounded-full px-4 py-3 text-foreground">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Didarganj Yakshi, Bronzes, Galleries..."
              autoFocus
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm font-medium outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full bg-muted hover:bg-border text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-full transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* ── Suggestions Body ── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Default State: Popular Suggestions Chips */}
          {!query.trim() && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 text-xs font-semibold text-foreground bg-card hover:bg-primary border-2 border-border rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Search Results */}
          {query.trim() && (
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                <span>Search Results ({filteredResults.length})</span>
                <span className="text-secondary font-semibold">Live Filter</span>
              </div>

              {filteredResults.length === 0 ? (
                <Card className="bg-card border-2 border-border rounded-[28px] p-8 text-center shadow-none">
                  <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
                  <p className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-foreground">
                    No matching exhibits found
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try searching for &quot;Yakshi&quot;, &quot;Mauryan&quot;, &quot;Bronze&quot;, or &quot;Gallery&quot;.
                  </p>
                </Card>
              ) : (
                <div className="flex flex-col gap-3">
                  {filteredResults.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className="block outline-none group"
                    >
                      <Card className="bg-card border-2 border-border rounded-[24px] p-4 shadow-none hover:bg-muted transition-colors flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={cn(
                            "w-11 h-11 rounded-2xl border-2 border-border flex items-center justify-center shrink-0",
                            item.category === "Artifact" ? "bg-primary text-primary-foreground" : item.category === "Gallery" ? "bg-secondary text-secondary-foreground" : item.category === "Audio Tour" ? "bg-[#f3e3b3] text-[#1a1a1a]" : "bg-muted text-foreground"
                          )}>
                            {item.category === "Artifact" && <Landmark className="w-5 h-5" />}
                            {item.category === "Gallery" && <MapPin className="w-5 h-5" />}
                            {item.category === "Audio Tour" && <Headphones className="w-5 h-5" />}
                            {item.category === "Event" && <Calendar className="w-5 h-5" />}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {item.category}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-semibold text-foreground truncate mt-0.5">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
