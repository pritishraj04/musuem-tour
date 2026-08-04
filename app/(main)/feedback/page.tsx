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
      className="flex flex-col min-h-full px-5 pt-24 pb-12"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Report an Issue
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-2">
          Help us maintain the museum experience.
        </p>
      </motion.div>

      {/* ── Issue category ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">
          Select Issue Type
        </label>
        <Select>
          <SelectTrigger className="h-14 bg-background/50 backdrop-blur-md border-border/50 rounded-xl text-base font-medium">
            <SelectValue placeholder="Select an issue category..." />
          </SelectTrigger>
          <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
            {issueCategories.map((cat) => (
              <SelectItem key={cat} value={cat} className="font-medium text-base py-3">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* ── Where is this? ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">
          Where is this?
        </label>
        <Card className="bg-background/20 backdrop-blur-md border-border/50">
          <CardContent className="flex items-center gap-4 p-4">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <span className="text-base font-bold text-foreground">
              Gallery 4 – Mauryan Art
            </span>
          </CardContent>
        </Card>
        <p className="text-xs font-medium text-muted-foreground mt-2 ml-1">
          ⟳ Auto-detected based on last scan
        </p>
      </motion.div>

      {/* ── Evidence upload ── */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">
          Evidence (Optional)
        </label>
        <Card className="bg-background/10 backdrop-blur-md border-border/50 border-dashed hover:bg-background/20 transition-colors cursor-pointer group">
          <CardContent className="flex flex-col items-center justify-center h-32 gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              Tap to Add Photo
            </span>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Description ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">
          Description
        </label>
        <Textarea
          placeholder="Please describe the issue in detail..."
          rows={4}
          className="resize-none bg-background/50 backdrop-blur-md border-border/50 rounded-xl text-base font-medium p-4 focus-visible:ring-primary"
        />
      </motion.div>

      {/* ── Anonymous toggle ── */}
      <motion.div variants={itemVariants} className="flex items-center justify-between py-6 border-y border-border/40 mb-8">
        <div>
          <p className="text-base font-bold text-foreground">
            Submit Anonymously
          </p>
          <p className="text-[13px] font-medium text-muted-foreground mt-1 max-w-[220px]">
            Your local profile data will not be attached to this ticket.
          </p>
        </div>
        <Switch 
          checked={anonymous} 
          onCheckedChange={setAnonymous} 
          className="data-[state=checked]:bg-primary"
        />
      </motion.div>

      {/* ── Submit button ── */}
      <motion.div variants={itemVariants}>
        <Button 
          size="lg" 
          onClick={() => setSubmitted(true)}
          className="w-full h-14 rounded-full bg-primary text-black hover:bg-primary/90 font-bold text-base shadow-[0_4px_14px_rgba(220,194,124,0.3)] hover:scale-[1.02] transition-transform"
        >
          Submit Report
        </Button>
        <p className="text-center text-xs font-medium text-muted-foreground mt-4">
          ⚡ Offline mode active: Report will auto-send when connection is restored.
        </p>
      </motion.div>
    </motion.div>
  );
}
