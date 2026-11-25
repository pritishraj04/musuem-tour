"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const issueCategories = [
  "Broken exhibit display",
  "Accessibility concern",
  "Cleanliness issue",
  "Wrong information displayed",
  "Staff behavior",
  "Other",
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

export default function FeedbackPage() {
  const [anonymous, setAnonymous] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">
          Report Submitted
        </h2>
        <p className="text-muted-foreground font-medium mb-8 max-w-[280px]">
          Thank you. Our museum staff has been notified and will review this shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full w-full max-w-[200px] font-semibold h-12">
          Submit Another
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col min-h-full px-6 pt-20 pb-16 bg-[#ffffeb] text-[#1a1a1a]"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-[#1a1a1a]">
          Report an Issue
        </h1>
        <p className="text-sm font-medium text-[#8a8a80] mt-2">
          Help us maintain the Bihar Museum visitor experience.
        </p>
      </motion.div>

      {/* ── Issue category ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-2 block">
          Select Issue Type
        </label>
        <Select>
          <SelectTrigger className="h-14 bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-xl text-base font-medium text-[#1a1a1a]">
            <SelectValue placeholder="Select an issue category..." />
          </SelectTrigger>
          <SelectContent className="bg-[#ffffeb] border-2 border-[#1a1a1a] text-[#1a1a1a]">
            {issueCategories.map((cat) => (
              <SelectItem key={cat} value={cat} className="font-medium text-base py-3 focus:bg-[#f0d7ff]">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* ── Where is this? ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-2 block">
          Where is this?
        </label>
        <Card className="bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-xl shadow-none">
          <CardContent className="flex items-center gap-3.5 p-4">
            <MapPin className="w-5 h-5 text-[#034f46] shrink-0" />
            <span className="text-base font-semibold text-[#1a1a1a]">
              Gallery 4 – Mauryan Art
            </span>
          </CardContent>
        </Card>
        <p className="text-xs font-medium text-[#8a8a80] mt-1.5 ml-1">
          ⟳ Auto-detected based on last gallery scan
        </p>
      </motion.div>

      {/* ── Evidence upload ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-2 block">
          Evidence (Optional)
        </label>
        <Card className="bg-[#ffffeb] border-2 border-dashed border-[#1a1a1a] rounded-xl hover:bg-[#e4e4d0]/40 transition-colors cursor-pointer group shadow-none">
          <CardContent className="flex flex-col items-center justify-center h-32 gap-2">
            <div className="w-12 h-12 rounded-full bg-[#f0d7ff] border-2 border-[#1a1a1a] flex items-center justify-center">
              <Camera className="w-6 h-6 text-[#1a1a1a]" />
            </div>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              Tap to Add Photo
            </span>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Description ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-[#1a1a1a] uppercase tracking-widest mb-2 block">
          Description
        </label>
        <Textarea
          placeholder="Please describe the issue in detail..."
          rows={4}
          className="resize-none bg-[#ffffeb] border-2 border-[#1a1a1a] rounded-xl text-base font-medium p-4 text-[#1a1a1a] placeholder:text-[#8a8a80] focus-visible:ring-[#1a1a1a]"
        />
      </motion.div>

      {/* ── Anonymous toggle ── */}
      <motion.div variants={itemVariants} className="flex items-center justify-between py-5 border-y-2 border-[#1a1a1a] mb-8">
        <div>
          <p className="text-base font-semibold text-[#1a1a1a]">
            Submit Anonymously
          </p>
          <p className="text-xs font-medium text-[#8a8a80] mt-0.5 max-w-[220px]">
            Your local profile data will not be attached to this ticket.
          </p>
        </div>
        <Switch 
          checked={anonymous} 
          onCheckedChange={setAnonymous} 
          className="data-[state=checked]:bg-[#034f46]"
        />
      </motion.div>

      {/* ── Submit button ── */}
      <motion.div variants={itemVariants}>
        <Button 
          size="lg" 
          onClick={() => setSubmitted(true)}
          className="btn-primary w-full h-14 text-base font-semibold rounded-xl border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] hover:bg-[#e5c4fa]"
        >
          Submit Report
        </Button>
        <p className="text-center text-xs font-medium text-[#8a8a80] mt-3">
          ⚡ Offline mode active: Report will auto-send when connection is restored.
        </p>
      </motion.div>
    </motion.div>
  );
}
