"use client";

import React, { useState } from "react";
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  MapPin, 
  Trophy,
  CheckCircle2
} from "lucide-react";

export default function BucketList() {
  const initialItems = [
    { id: 1, title: "Ride in the open bed of a pickup truck", location: "High Desert / Texas", emoji: "🤠", completed: false },
    { id: 2, title: "Share 5:00 AM diner coffee with a 30-year veteran trucker", location: "I-40 Truck Stop", emoji: "☕", completed: false },
    { id: 3, title: "Camp under the Flagstaff pine stars", location: "Flagstaff, AZ", emoji: "🌲", completed: false },
    { id: 4, title: "Play a roadside drum & cardboard sign jam on Route 66", location: "Route 66, NM", emoji: "🎸", completed: false },
    { id: 5, title: "Eat a world-famous Missouri diner burger & pie", location: "St. Louis, MO", emoji: "🥪", completed: false },
    { id: 6, title: "Stand beneath the Gateway Arch after crossing the Mississippi", location: "St. Louis, MO", emoji: "🏛️", completed: false },
    { id: 7, title: "Get a ride from someone who hitchhiked across America in the 70s", location: "Anywhere on Highway", emoji: "🤝", completed: false },
    { id: 8, title: "Collect 50 photos with everyday highway heroes", location: "LA ➔ Ohio Route", emoji: "📸", completed: false },
    { id: 9, title: "Watch a desert golden hour sunrise on Interstate 40", location: "High Desert, CA/AZ", emoji: "🌅", completed: false },
  ];

  const [items, setItems] = useState(initialItems);

  const toggleCheck = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <section id="bucket-list" className="py-24 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-desert/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-bold uppercase">
              <Trophy className="w-4 h-4 text-sunset" />
              Cross-Country Challenges
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment">
              OUR <span className="text-gradient-amber">BUCKET LIST</span>
            </h2>
            <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
              The roadside experiences, truck stop conversations, and landmark goals Lee and Jake are aiming to check off across the 2,000 miles.
            </p>
          </div>

          {/* Counter Badge */}
          <div className="bg-asphalt-card/90 px-5 py-3 rounded-2xl border border-amber-desert/30 shadow-amber-glow flex items-center gap-3 self-start md:self-auto">
            <Sparkles className="w-5 h-5 text-sunset" />
            <div>
              <div className="text-xs font-mono text-parchment-muted">Bucket List Progress</div>
              <div className="font-display font-black text-xl text-amber-desert">
                {completedCount} / {items.length} Checked Off
              </div>
            </div>
          </div>
        </div>

        {/* Bucket List Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${
                item.completed
                  ? "bg-amber-desert/15 border-amber-desert shadow-amber-glow"
                  : "bg-asphalt-card/80 border-asphalt-border hover:border-amber-desert/40"
              }`}
            >
              <div className="mt-0.5 text-amber-desert shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-amber-desert" />
                ) : (
                  <Square className="w-6 h-6 text-asphalt-border hover:text-amber-desert" />
                )}
              </div>

              <div className="space-y-1">
                <div className={`font-display font-bold text-base transition-colors ${item.completed ? "text-amber-desert line-through opacity-80" : "text-parchment"}`}>
                  {item.emoji} {item.title}
                </div>
                <div className="text-xs font-mono text-parchment-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-desert" />
                  <span>{item.location}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
