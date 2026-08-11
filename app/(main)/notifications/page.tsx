"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Sparkles, Calendar, ShieldCheck, Check, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialNotifications = [
  {
    id: 1,
    title: "New Exhibition Announced!",
    message: "Mughal & Rajput Miniature Painting workshop opens this Saturday at 10 AM.",
    time: "2 hours ago",
    type: "event",
    read: false,
  },
  {
    id: 2,
    title: "Daily Artifact Quiz Available",
    message: "Test your knowledge on Mauryan Polish and earn +50 bonus Passport XP.",
    time: "5 hours ago",
    type: "trivia",
    read: false,
  },
  {
    id: 3,
    title: "Level Up: Magadha Scholar",
    message: "Congratulations! You reached Level 3 in your Bihar Museum Local Passport.",
    time: "Yesterday",
    type: "achievement",
    read: true,
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

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

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
          <Bell className="w-3.5 h-3.5" />
          Museum Updates
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground">
          Notifications
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Stay informed about workshops, exhibition alerts, and achievements.
        </p>
      </motion.div>

      {/* ── Controls Row ── */}
      {notifications.length > 0 && (
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-4">
          <button onClick={markAllRead} className="text-xs font-semibold text-foreground hover:underline flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
          <button onClick={clearAll} className="text-xs font-semibold text-muted-foreground hover:text-red-400 flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </motion.div>
      )}

      {/* ── Notifications List ── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <Card className="bg-card border-2 border-border rounded-[32px] p-8 text-center shadow-none">
            <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-foreground">
              No New Notifications
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              You are all caught up with Bihar Museum news!
            </p>
          </Card>
        ) : (
          notifications.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "bg-card border-2 border-border rounded-[28px] p-5 shadow-none transition-colors",
                !item.read && "border-primary"
              )}
            >
              <div className="flex gap-4 items-start">
                <div className={cn(
                  "p-3 rounded-2xl border-2 border-border shrink-0",
                  item.type === "event" ? "bg-primary text-primary-foreground" : item.type === "achievement" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {item.type === "event" ? <Calendar className="w-5 h-5" /> : item.type === "achievement" ? <ShieldCheck className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-base text-foreground leading-snug">{item.title}</h4>
                    {!item.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2 font-normal">{item.message}</p>
                  <span className="text-[10px] font-semibold text-muted-foreground">{item.time}</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
