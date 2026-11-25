"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Map as MapIcon, 
  Headphones, 
  Calendar, 
  MessageSquare, 
  ScanLine, 
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  BookOpen,
  X,
  Share2,
  Bookmark
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge } from "@/components/ui/Gauge";
import { SearchModal } from "@/components/SearchModal";
import { useAudio } from "@/context/AudioContext";
import { cn } from "@/lib/utils";

// ── Official Bihar Museum Art & Craft Articles Data (biharmuseum.org) ──
interface Article {
  id: string;
  title: string;
  region: string;
  readTime: string;
  image: string;
  summary: string;
  body: string;
}

const artArticles: Article[] = [
  {
    id: "madhubani-painting",
    title: "Mithila & Madhubani Sacred Folk Painting",
    region: "Mithila Region, North Bihar",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80",
    summary: "Centuries-old ritual art created by women using natural pigments, bamboo twigs, and geometric motifs.",
    body: "Madhubani painting (or Mithila art) is practiced in the Mithila region of Bihar. Characterized by eye-catching line drawings, vibrant natural dyes derived from plants and minerals, and complex geometric patterns, this ancient art form traditionally adorned freshly plastered mud walls of village homes during festivals, marriages, and birth ceremonies. In Bihar Museum's Regional Art Gallery, rare heritage canvases celebrate the dual themes of divine harmony and Gangetic flora.",
  },
  {
    id: "pataliputra-terracotta",
    title: "Terracotta Traditions of Ancient Pataliputra",
    region: "Bulandibagh & Kumhrar Excavations",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80",
    summary: "Intricate Gangetic clay figurines reflecting urban fashion, dancing attire, and village deities from 3rd Century BCE.",
    body: "The clay art of ancient Bihar provides a vivid window into everyday social life two millennia ago. Unlike courtly stone monuments, terracotta figurines excavated at Bulandibagh and Patna reveal exquisite details of headgear, jewelry, and flowing garments worn by ancient dancers and merchants. The Bihar Museum collection highlights the famous 'Dancing Girl' figurine, renowned for its delicate contours and animated posture.",
  },
  {
    id: "manjusha-art",
    title: "Manjusha Scroll Art & Bihula Legend",
    region: "Anga Region, Bhagalpur",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=600&q=80",
    summary: "Sequential narrative painting on jute boxes celebrating the legendary folklore of Bihula and Mansa Devi.",
    body: "Manjusha Art is a traditional folk art form originating from the Anga region (modern Bhagalpur) of Bihar. Characterized by a distinctive three-color palette—Pink, Green, and Yellow—this line art tells stories through sequential panels painted on paper and jute boxes (Manjushas). It remains an integral part of the Bishahari festival, preserving ancient Gangetic mythology through strong geometric borders.",
  },
  {
    id: "tikuli-craft",
    title: "Tikuli Craft & Enamelled Glass Artistry",
    region: "Patna City",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&q=80",
    summary: "Rare 800-year-old technique of melting enamel glass and gilding intricate bindi motifs with gold foil.",
    body: "Tikuli is a rare traditional craft native to Patna, dating back over 800 years. Derived from the word 'Tikli' (ornamental bindi), craftsmen melt glass, apply gold leaf foil, and paint delicate narrative scenes of Indian mythology using ultra-fine brushes. Today, Bihar Museum preserves masterworks that bridge historic courtly luxury with modern wooden canvas adaptations.",
  },
  {
    id: "nalanda-bronzes",
    title: "Lost-Wax Bronze Casting of Nalanda Monasteries",
    region: "Nalanda & Kurkihar Hoards",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80",
    summary: "Masterful 9th-century metallurgic bronzes inlaid with silver and copper, exported along Buddhist Silk Routes.",
    body: "During the Pala Dynasty (8th-12th Century CE), the monastic workshops of Nalanda and Kurkihar became global centers for bronze sculpture. Using the cire-perdue (lost wax) casting process, artisans created sublime figures of Buddha and Bodhisattvas featuring delicate silver inlay in the eyes and crown. These portable icons traveled with pilgrims across Nepal, Tibet, and Southeast Asia.",
  },
];

const featuredExhibits = [
  {
    id: "didarganj-yakshi",
    title: "Didarganj Yakshi",
    subtitle: "c. 3rd C. BCE · Chunar Sandstone",
    image: "/sculpture-hero.png",
    badge: "Masterpiece",
  },
  {
    id: "mauryan-pillar-capital",
    title: "Mauryan Lion Capital",
    subtitle: "c. 250 BCE · Sandstone Monolith",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80",
    badge: "Imperial Symbol",
  },
  {
    id: "pala-bronze-buddha",
    title: "Pala Sacred Bronze Buddha",
    subtitle: "c. 9th C. CE · Lost-Wax Bronze",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=600&q=80",
    badge: "Nalanda Hoard",
  },
  {
    id: "terracotta-mother-goddess",
    title: "Terracotta Mother Goddess",
    subtitle: "c. 2nd C. BCE · Gangetic Clay",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&q=80",
    badge: "Folk Figurine",
  },
];

const guidedJourneys = [
  {
    id: "masterpiece-trail",
    title: "The Masterpiece Trail",
    duration: "45 mins · 8 Stops",
    narrator: "Dr. A. K. Sharma",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=600&q=80",
  },
  {
    id: "mauryan-glory",
    title: "Mauryan Dynasty Walk",
    duration: "30 mins · 6 Stops",
    narrator: "Prof. R. N. Prasad",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80",
  },
  {
    id: "pala-bronzes",
    title: "Pala-Sena Sacred Bronzes",
    duration: "25 mins · 5 Stops",
    narrator: "Sunita Roy",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=600&q=80",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Mughal Art Workshop",
    date: "Aug 12 · 10:00 AM",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&q=80",
    tag: "Workshop",
  },
  {
    id: 2,
    title: "History of Pataliputra Walk",
    date: "Aug 15 · 02:00 PM",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=400&q=80",
    tag: "Guided Tour",
  },
  {
    id: 3,
    title: "Terracotta Craft Demonstration",
    date: "Aug 18 · 11:30 AM",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=400&q=80",
    tag: "Exhibition",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring" as const, stiffness: 120, damping: 20 } 
  }
};

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { playTrack, currentTrack, isPlaying } = useAudio();

  const handlePlayHeroAudio = () => {
    playTrack({
      id: "didarganj-yakshi",
      title: "Didarganj Yakshi Guide",
      subtitle: "3rd Century BCE · Polished Sandstone",
      duration: "3:45",
      durationSeconds: 225,
      href: "/artifact/didarganj-yakshi",
      image: "/sculpture-hero.png",
    });
  };

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ── Article Reader Modal Drawer ── */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-background text-foreground overflow-y-auto"
          >
            <div className="relative h-[300px] w-full shrink-0">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card/80 backdrop-blur-md border-2 border-border flex items-center justify-center text-foreground hover:scale-105 transition-transform z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="badge-teal mb-2 inline-flex">
                  biharmuseum.org · {selectedArticle.readTime}
                </span>
                <h2 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-normal text-foreground leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 flex-1 max-w-xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b-2 border-border pb-4 font-semibold">
                <span>Region: {selectedArticle.region}</span>
                <span className="text-secondary">Official Publication</span>
              </div>

              <div className="p-4 rounded-2xl bg-muted/50 border-2 border-border">
                <p className="text-sm font-medium text-foreground leading-relaxed italic">
                  &quot;{selectedArticle.summary}&quot;
                </p>
              </div>

              <div className="space-y-4 text-base font-normal text-foreground leading-relaxed">
                <p>{selectedArticle.body}</p>
                <p>
                  Curated directly from the official archives of Bihar Museum, Patna. Visitors can observe living demonstrations of these traditional mastercrafts in the Regional Art Pavilion.
                </p>
              </div>

              <div className="pt-6 border-t-2 border-border flex gap-3">
                <Button 
                  onClick={() => setSelectedArticle(null)}
                  className="btn-primary flex-1 h-12 rounded-xl text-sm font-semibold border-2 border-border bg-primary text-primary-foreground"
                >
                  Done Reading
                </Button>
                <Link href="/events" className="flex-1">
                  <Button 
                    variant="outline"
                    className="btn-secondary w-full h-12 rounded-xl text-sm font-semibold border-2 border-border bg-card text-foreground"
                  >
                    View Workshops
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="flex flex-col min-h-full pt-18 pb-24 overflow-x-hidden bg-background text-foreground transition-colors duration-300"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ── Top Header & Greeting Bar ── */}
        <motion.section variants={itemVariants} className="px-6 pt-4 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="badge-teal">
              <span className="w-2 h-2 rounded-full bg-[#ffa946] animate-pulse" />
              Official Guide · Museum Open
            </div>
            <Link href="/about" className="text-xs font-bold text-secondary hover:underline">
              10 AM – 5 PM Info →
            </Link>
          </div>
          
          <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl tracking-tight leading-[0.95] text-foreground">
            Bihar Museum
          </h1>
          <p className="mt-1 text-sm text-muted-foreground font-medium">
            Welcome, Guest Explorer
          </p>
        </motion.section>

        {/* ── Search Bar Trigger ── */}
        <motion.div variants={itemVariants} className="px-6 pb-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-3 bg-card hover:bg-muted/80 border-2 border-border rounded-full px-5 py-3.5 shadow-none transition-colors text-left text-foreground"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm text-muted-foreground font-medium font-[family-name:var(--font-figtree)] truncate">
              Search Didarganj Yakshi, Bronzes, or History...
            </span>
          </button>
        </motion.div>

        {/* ── NETFLIX-STYLE HERO BILLBOARD CARD ── */}
        <motion.div variants={itemVariants} className="px-6 pb-8">
          <Card className="relative overflow-hidden bg-[#1a1a1a] text-[#ffffeb] border-2 border-border rounded-[36px] shadow-xl group">
            {/* Parallax Hero Backdrop */}
            <div 
              className="h-[260px] bg-cover bg-center relative transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/sculpture-hero.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
              <div className="absolute top-4 left-4 badge-teal">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Masterpiece Spotlight
              </div>

              <div className="absolute bottom-4 left-6 right-6 z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#f3e3b3]">
                  c. 3rd Century BCE · Polished Chunar Sandstone
                </span>
                <h2 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-normal text-[#ffffeb] leading-tight mt-0.5">
                  Didarganj Yakshi
                </h2>
              </div>
            </div>

            <CardContent className="p-6 bg-[#1a1a1a] text-[#ffffeb] border-t-2 border-[#ffffeb]/20 flex items-center justify-between gap-3">
              <Button 
                onClick={handlePlayHeroAudio}
                className="btn-primary flex-1 h-12 rounded-xl text-sm font-semibold border-2 border-[#ffffeb] bg-[#f3e3b3] text-[#1a1a1a] hover:bg-[#ebd79c]"
              >
                {currentTrack?.id === "didarganj-yakshi" && isPlaying ? (
                  <>Pause Audio</>
                ) : (
                  <><Play className="w-4 h-4 mr-2 fill-current" /> Play Audio (3:45)</>
                )}
              </Button>
              <Link href="/scan" className="flex-1">
                <Button className="btn-secondary w-full h-12 rounded-xl text-sm font-semibold border-2 border-[#ffffeb] bg-[#ffffeb] text-[#1a1a1a] hover:bg-[#e4e4d0]">
                  <ScanLine className="w-4 h-4 mr-2" /> AI Camera
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── ROW 1: NETFLIX-STYLE CAROUSEL: ART & CRAFT ARTICLES (biharmuseum.org) ── */}
        <motion.section variants={itemVariants} className="pb-8">
          <div className="flex items-center justify-between px-6 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground">
                  Art & Craft Heritage
                </h3>
              </div>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">
                Official articles from biharmuseum.org
              </p>
            </div>
            <span className="text-xs font-bold text-muted-foreground">Swipe →</span>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pl-6 pr-6 pb-2">
            {artArticles.map((article) => (
              <Card
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="shrink-0 w-[220px] bg-card border-2 border-border shadow-none overflow-hidden rounded-[28px] group hover:bg-muted transition-all cursor-pointer"
              >
                <div 
                  className="h-[140px] bg-cover bg-center relative border-b-2 border-border"
                  style={{ backgroundImage: `url('${article.image}')` }}
                >
                  <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full border border-border">
                    {article.readTime}
                  </div>
                </div>

                <CardContent className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    {article.region}
                  </span>
                  <h4 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 font-normal">
                    {article.summary}
                  </p>

                  <div className="mt-3 flex items-center text-xs font-bold text-secondary group-hover:underline">
                    Read Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* ── ROW 2: NETFLIX-STYLE CAROUSEL: FEATURED MASTERPIECE EXHIBITS ── */}
        <motion.section variants={itemVariants} className="pb-8">
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground">
              Masterpiece Sculptures
            </h3>
            <Link href="/map" className="text-xs font-semibold text-foreground flex items-center hover:underline">
              Gallery Map <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pl-6 pr-6 pb-2">
            {featuredExhibits.map((exhibit) => (
              <Link key={exhibit.id} href={`/artifact/${exhibit.id}`} className="shrink-0 outline-none">
                <Card className="w-[180px] bg-card border-2 border-border shadow-none overflow-hidden rounded-[28px] group hover:scale-[1.02] transition-transform">
                  <div 
                    className="h-[220px] bg-cover bg-center relative border-b-2 border-border"
                    style={{ backgroundImage: `url('${exhibit.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-3 left-3 bg-card text-foreground border border-border text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {exhibit.badge}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h4 className="font-[family-name:var(--font-eb-garamond)] text-xl font-normal text-foreground leading-tight">
                        {exhibit.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground font-medium mt-0.5 truncate">
                        {exhibit.subtitle}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── ROW 3: GUIDED AUDIO JOURNEYS CAROUSEL ── */}
        <motion.section variants={itemVariants} className="pb-8">
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground">
              Audio Guided Trails
            </h3>
            <Link href="/tours" className="text-xs font-semibold text-foreground flex items-center hover:underline">
              All Audio <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pl-6 pr-6 pb-2">
            {guidedJourneys.map((tour) => (
              <Link key={tour.id} href="/tours" className="shrink-0 outline-none">
                <Card className="w-[230px] bg-card border-2 border-border shadow-none overflow-hidden rounded-[28px] p-4 group hover:bg-muted transition-colors">
                  <div className="flex gap-3 items-center">
                    <div 
                      className="w-16 h-16 rounded-2xl bg-cover bg-center shrink-0 border-2 border-border relative overflow-hidden"
                      style={{ backgroundImage: `url('${tour.image}')` }}
                    >
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                        {tour.duration}
                      </span>
                      <h4 className="font-semibold text-sm text-foreground truncate mt-0.5">
                        {tour.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        Narrated by {tour.narrator}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── ROW 4: UPCOMING EVENTS & WORKSHOPS CAROUSEL ── */}
        <motion.section variants={itemVariants} className="pb-8">
          <div className="flex items-center justify-between px-6 mb-4">
            <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground">
              Upcoming Events
            </h3>
            <Link href="/events" className="text-xs font-semibold text-foreground flex items-center hover:underline">
              View Schedule <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar pl-6 pr-6 pb-2">
            {upcomingEvents.map((event) => (
              <Link key={event.id} href="/events" className="shrink-0 outline-none">
                <Card className="w-[230px] bg-card border-2 border-border shadow-none overflow-hidden rounded-[24px] group hover:bg-muted transition-colors">
                  <div 
                    className="h-[120px] bg-cover bg-center relative border-b-2 border-border"
                    style={{ backgroundImage: `url('${event.image}')` }}
                  >
                    <div className="absolute top-2 left-2 bg-card text-foreground px-2.5 py-1 rounded-full border border-border text-[10px] font-bold">
                      {event.tag}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
                      <Clock className="h-3.5 w-3.5 text-foreground" />
                      <span>{event.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── MY LOCAL PASSPORT LEVEL CARD WITH NOTCHED GAUGE ── */}
        <motion.div variants={itemVariants} className="px-6 pb-8">
          <Link href="/passport" className="block outline-none">
            <Card className="relative overflow-hidden bg-card border-2 border-border rounded-[36px] shadow-xl p-6 group hover:scale-[1.01] transition-transform">
              {/* Background Vignette & Shimmer Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

              <CardContent className="p-0 relative z-10">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary border-2 border-border flex items-center justify-center text-primary-foreground shadow-none">
                      <ShieldCheck className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-foreground">
                          Local Explorer Passport
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Level 1 Novice · 8 Artifacts Discovered
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold tracking-wider px-3 py-1 bg-secondary text-secondary-foreground rounded-full border border-border">
                    OFFLINE PACK
                  </span>
                </div>

                {/* Notched Linear Gauge for XP Progression */}
                <div className="my-5 p-4 rounded-2xl bg-muted/40 border-2 border-border">
                  <div className="flex justify-between items-center mb-2 text-xs font-bold text-foreground">
                    <span className="text-secondary uppercase tracking-widest">Level Progress</span>
                    <span>150 / 500 XP (30%)</span>
                  </div>

                  <Gauge
                    orientation="linear"
                    value={30}
                    centerValue="150 XP"
                    defaultLabel="Level 1 Novice"
                    totalNotches={24}
                    spacing={14}
                    linearHeight={16}
                    notchCornerRadius={2}
                    activeFill="var(--primary)"
                    inactiveFill="var(--border)"
                    activeFillOpacity={1}
                    inactiveFillOpacity={0.25}
                  />
                </div>

                {/* Unlocked Badges Preview Row */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      Badges:
                    </span>
                    <div className="flex gap-1.5">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-card border-2 border-border rounded-full text-foreground">
                        🏺 Terracotta
                      </span>
                      <span className="px-2.5 py-1 text-xs font-semibold bg-card border-2 border-border rounded-full text-foreground">
                        🪙 Coins
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold bg-muted border border-dashed border-border rounded-full text-muted-foreground">
                        +1 Locked
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-foreground group-hover:translate-x-1 transition-transform">
                    <span>View Passport</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
