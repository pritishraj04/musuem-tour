"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Ticket, Check, Filter, Sparkles, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const eventCategories = ["All", "Workshops", "Guided Tours", "Exhibitions", "Talks"];

const events = [
  {
    id: 1,
    title: "Mughal & Rajput Miniature Painting Workshop",
    category: "Workshops",
    date: "Aug 12, 2026",
    time: "10:00 AM – 01:00 PM",
    venue: "Children's Gallery Studio",
    price: "Free for Visitors",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80",
    description: "Hands-on masterclass learning natural pigment techniques inspired by Mughal court paintings."
  },
  {
    id: 2,
    title: "History of Pataliputra & Mauryan Empire",
    category: "Guided Tours",
    date: "Aug 15, 2026",
    time: "02:00 PM – 03:30 PM",
    venue: "Historical Art Gallery",
    price: "Included in Ticket",
    image: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=800&q=80",
    description: "Special Independence Day walkthrough showcasing 2,500 years of Bihar's administrative legacy."
  },
  {
    id: 3,
    title: "Terracotta Sculpture & Grassroots Craftsmanship",
    category: "Exhibitions",
    date: "Aug 18, 2026",
    time: "11:30 AM – 05:00 PM",
    venue: "Courtyard Pavilion",
    price: "Free Entry",
    image: "https://images.unsplash.com/photo-1618844876615-5c1cbcf3452f?w=800&q=80",
    description: "Live demonstration by master artisans from Darbhanga and Madhubani."
  },
  {
    id: 4,
    title: "Nalanda & Buddhist Monastic Art Symposium",
    category: "Talks",
    date: "Aug 22, 2026",
    time: "04:00 PM – 06:00 PM",
    venue: "Auditorium Hall B",
    price: "RSVP Required",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80",
    description: "Lecture by international scholars on ancient Buddhist bronze sculpture."
  }
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

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookedEvents, setBookedEvents] = useState<number[]>([]);

  const filteredEvents = events.filter(
    (e) => selectedCategory === "All" || e.category === selectedCategory
  );

  const toggleBook = (id: number) => {
    setBookedEvents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
          <Calendar className="w-3.5 h-3.5" />
          Museum Schedule
        </div>
        <h1 className="font-[family-name:var(--font-eb-garamond)] font-normal text-4xl text-foreground">
          Events & Workshops
        </h1>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Exhibitions, lectures, and live craft masterclasses at Bihar Museum.
        </p>
      </motion.div>

      {/* ── Category Filters ── */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {eventCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 text-xs font-semibold rounded-full border-2 transition-colors shrink-0",
                selectedCategory === category
                  ? "bg-primary text-primary-foreground border-border"
                  : "bg-card text-foreground border-border hover:bg-muted"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Events Cards List ── */}
      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        {filteredEvents.map((event) => {
          const isBooked = bookedEvents.includes(event.id);

          return (
            <Card key={event.id} className="bg-card border-2 border-border rounded-[32px] overflow-hidden shadow-none">
              <div 
                className="h-[160px] bg-cover bg-center relative border-b-2 border-border"
                style={{ backgroundImage: `url('${event.image}')` }}
              >
                <div className="absolute top-3 left-3 badge-teal">
                  {event.category}
                </div>
                <div className="absolute top-3 right-3 bg-card text-foreground text-xs font-bold px-3 py-1 rounded-full border border-border">
                  {event.price}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-normal text-foreground mb-2 leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-normal">
                  {event.description}
                </p>

                <div className="flex flex-col gap-2 mb-5 text-xs text-muted-foreground border-y-2 border-border py-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground" />
                    <span className="font-semibold text-foreground">{event.date}</span>
                    <span>·</span>
                    <Clock className="w-4 h-4 text-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-foreground" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <Button
                  onClick={() => toggleBook(event.id)}
                  className={cn(
                    "w-full h-12 rounded-xl text-sm font-semibold border-2 border-border transition-all",
                    isBooked
                      ? "bg-secondary text-secondary-foreground"
                      : "btn-primary bg-primary text-primary-foreground"
                  )}
                >
                  {isBooked ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" /> Spot Reserved (Added to Calendar)
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 mr-2" /> Reserve Free Spot / RSVP
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
