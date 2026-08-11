"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Ticket, MapPin, Building2, Landmark, Sparkles, ArrowRight, ShieldCheck, Phone, Mail, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const galleries = [
  {
    name: "History Gallery A",
    period: "Pre-History to Mauryan Empire (3rd C. BCE)",
    highlights: "Didarganj Yakshi, Ashokan Capitals, Pataliputra Seals",
  },
  {
    name: "History Gallery B",
    period: "Gupta & Pala-Sena Dynasty (4th – 12th C. CE)",
    highlights: "Nalanda Sacred Bronzes, Bodhgaya Stone Relics",
  },
  {
    name: "History Gallery C",
    period: "Medieval to Independence (13th – 20th C. CE)",
    highlights: "Sher Shah Suri Coins, Colonial Bihar Freedom Struggle",
  },
  {
    name: "Regional & Folk Art Gallery",
    period: "Living Traditions",
    highlights: "Madhubani Paintings, Manjusha Art, Tikuli Craft",
  },
  {
    name: "Children's Gallery",
    period: "Interactive Learning",
    highlights: "Simulated Excavation Pit, Wildlife & Heritage Discovery",
  },
  {
    name: "Contemporary Art & Visible Storage",
    period: "Modern Expressions",
    highlights: "Rotational Sculptures & Coin Vault",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 120 } }
};

export default function AboutMuseumPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-full px-6 pt-20 pb-28 bg-background text-foreground transition-colors duration-300"
    >
      {/* ── Page Header ── */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="badge-teal mb-3">
          <Landmark className="w-3.5 h-3.5" />
          Official Museum Overview
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-5xl text-foreground leading-[0.95]">
          Bihar Museum
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-2">
          Bailey Road, Patna, Bihar · Department of Arts, Culture & Youth
        </p>
      </motion.div>

      {/* ── Architectural Hero Card ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <Card className="bg-card border-2 border-border rounded-[32px] overflow-hidden shadow-none">
          <div className="h-[200px] bg-cover bg-center relative border-b-2 border-border" style={{ backgroundImage: "url('/museum-sculpture-bg.png')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute top-4 left-4 badge-teal">
              <Building2 className="w-3.5 h-3.5" />
              Maki & Associates Design
            </div>
          </div>
          <CardContent className="p-6">
            <h3 className="font-[family-name:var(--font-eb-garamond)] text-3xl font-normal text-foreground mb-2">
              World-Class Corten Architecture
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Designed by Pritzker Prize-winning architect <strong>Fumihiko Maki (Maki and Associates, Tokyo)</strong> in collaboration with <strong>Opolis Architects</strong>. The campus features iconic weathering Corten steel facades, interconnected courtyards, and local Bihar sandstone.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Timings & Ticket Info Grid ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Visitor Info & Hours
        </label>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-card border-2 border-border rounded-[24px] p-4 shadow-none">
            <div className="flex items-center gap-2 mb-2 text-foreground font-semibold text-sm">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Timings</span>
            </div>
            <p className="text-xs text-foreground font-bold">10:00 AM – 5:00 PM</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Galleries Open</p>
            <p className="text-[11px] font-bold text-red-500 mt-2">Closed on Mondays</p>
          </Card>

          <Card className="bg-card border-2 border-border rounded-[24px] p-4 shadow-none">
            <div className="flex items-center gap-2 mb-2 text-foreground font-semibold text-sm">
              <Ticket className="w-4 h-4 text-secondary" />
              <span>Ticket Prices</span>
            </div>
            <p className="text-xs text-foreground font-bold">₹100 <span className="text-[10px] font-normal text-muted-foreground">(Indians)</span></p>
            <p className="text-xs text-foreground font-bold mt-0.5">₹500 <span className="text-[10px] font-normal text-muted-foreground">(Foreigners)</span></p>
            <p className="text-[11px] text-muted-foreground mt-1">Students / Children: ₹50</p>
          </Card>
        </div>
      </motion.div>

      {/* ── Galleries & Permanent Collections ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="font-[family-name:var(--font-eb-garamond)] font-normal text-3xl text-foreground mb-4">
          Permanent Galleries
        </h3>

        <div className="flex flex-col gap-3">
          {galleries.map((gallery) => (
            <Card key={gallery.name} className="bg-card border-2 border-border rounded-[24px] p-4 shadow-none">
              <h4 className="font-semibold text-base text-foreground">{gallery.name}</h4>
              <p className="text-xs text-secondary font-medium mt-0.5">{gallery.period}</p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                <strong className="text-foreground">Highlights:</strong> {gallery.highlights}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* ── Contact & Location ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-foreground uppercase tracking-widest mb-3 block">
          Address & Contact
        </label>
        <Card className="bg-card border-2 border-border rounded-[28px] p-5 shadow-none space-y-3">
          <div className="flex items-start gap-3 text-xs">
            <MapPin className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">Jawaharlal Nehru Marg (Bailey Road)</p>
              <p className="text-muted-foreground">Patna, Bihar – 800001, India</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs border-t-2 border-border pt-3">
            <Phone className="w-4 h-4 text-foreground shrink-0" />
            <span className="text-muted-foreground">+91 (0612) 2235555</span>
          </div>
          <div className="flex items-center gap-3 text-xs border-t-2 border-border pt-3">
            <Mail className="w-4 h-4 text-foreground shrink-0" />
            <span className="text-muted-foreground">info@biharmuseum.org</span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
