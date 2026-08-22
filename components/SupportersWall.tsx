"use client";

import React, { useState } from "react";
import { 
  MessageCircle, 
  Heart, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  BadgeDollarSign,
  TrendingUp,
  Clock
} from "lucide-react";
import type { TrailNote } from "@/app/actions/submitNote";

interface SupportersWallProps {
  initialNotes: TrailNote[];
}

export default function SupportersWall({ initialNotes }: SupportersWallProps) {
  const [notes, setNotes] = useState<TrailNote[]>(initialNotes);
  const [activeFilter, setActiveFilter] = useState<"all" | "top" | "recent">("all");
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  // Sync state if parent app passes new notes
  React.useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleLike = (id: string, initialLikes: number) => {
    setLikesMap((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialLikes;
      return { ...prev, [id]: current + 1 };
    });
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    if (activeFilter === "top") return note.amount >= 35;
    return true;
  });

  return (
    <section id="supporters-wall" className="py-20 bg-asphalt-darker relative border-t border-asphalt-border/40">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-sunset/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header + Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
              <MessageCircle className="w-3.5 h-3.5" />
              Live Road Community Feed
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-parchment">
              SUPPORTERS & <span className="text-gradient-amber">TRAIL NOTES</span>
            </h2>
            <p className="text-base text-parchment-muted">
              Real encouragement and generous tips from everyday heroes across America backing Lee and Jake&apos;s 2,000-mile experiment.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-asphalt-card p-1.5 rounded-2xl border border-asphalt-border self-start md:self-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "all"
                  ? "bg-amber-desert text-asphalt-darker shadow-amber-glow"
                  : "text-parchment-muted hover:text-parchment"
              }`}
            >
              All Notes ({notes.length})
            </button>
            <button
              onClick={() => setActiveFilter("top")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === "top"
                  ? "bg-amber-desert text-asphalt-darker shadow-amber-glow"
                  : "text-parchment-muted hover:text-parchment"
              }`}
            >
              ⭐ Top Supporters
            </button>
          </div>
        </div>

        {/* Masonry / Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const currentLikes = likesMap[note.id] !== undefined ? likesMap[note.id] : note.likes;

            return (
              <div
                key={note.id}
                className="bg-asphalt-card/90 rounded-3xl p-6 border border-asphalt-border hover:border-amber-desert/40 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-lg"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: Name, Handle & Amount Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-base text-parchment truncate">
                          {note.name}
                        </span>
                        {note.verified && (
                          <span title="Verified Road Supporter"><CheckCircle2 className="w-4 h-4 text-sage shrink-0" /></span>
                        )}
                      </div>
                      {note.handle && (
                        <div className="text-xs font-mono text-amber-desert truncate">
                          {note.handle}
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 px-3 py-1 rounded-xl bg-amber-desert/15 border border-amber-desert/30 text-amber-desert font-mono text-xs font-black">
                      ${note.amount}
                    </div>
                  </div>

                  {/* Tier Subtitle & Location */}
                  <div className="flex items-center gap-2 text-xs font-mono text-parchment-muted">
                    <span className="text-sunset font-semibold">{note.tier}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-amber-desert" />
                      {note.city}
                    </span>
                  </div>

                  {/* Note Message Body */}
                  <p className="text-sm text-parchment/90 leading-relaxed bg-asphalt-darker/50 p-4 rounded-2xl border border-asphalt-border/50">
                    &quot;{note.message}&quot;
                  </p>
                </div>

                {/* Footer Bar: Timestamp & Cheer Button */}
                <div className="pt-3 border-t border-asphalt-border/40 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-parchment-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {note.timestamp}
                  </span>

                  <button
                    onClick={() => handleLike(note.id, note.likes)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-asphalt-darker border border-asphalt-border/60 text-xs font-semibold text-parchment-muted hover:text-amber-desert hover:border-amber-desert/40 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-amber-desert fill-amber-desert/20" />
                    <span>{currentLikes} Cheers</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 text-parchment-muted font-mono">
            No notes match this filter. Be the first to leave one!
          </div>
        )}

      </div>
    </section>
  );
}
