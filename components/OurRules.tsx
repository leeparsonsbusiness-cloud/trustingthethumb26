"use client";

import React from "react";
import { 
  Compass, 
  Map, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Gift,
  ShieldCheck,
  Flame
} from "lucide-react";

export default function OurRules() {
  const rules = [
    {
      number: "01",
      title: "Say yes to the unknown",
      icon: Compass,
      desc: "Step past hesitation. When an unexpected turn or ride opens up, embrace the adventure with an open heart.",
    },
    {
      number: "02",
      title: "No plan is set in stone",
      icon: Map,
      desc: "Flexibility is our roadmap. Weather changes, detours happen, and the best moments are never scheduled.",
    },
    {
      number: "03",
      title: "Connection > comfort",
      icon: Heart,
      desc: "Prioritize genuine human conversation over plush motel beds or convenient shortcuts.",
    },
    {
      number: "04",
      title: "Leave the place better than when you found it",
      icon: Sparkles,
      desc: "Pack out litter, offer help at rest stops, and leave every diner table and campsite cleaner than before.",
    },
    {
      number: "05",
      title: "Go towards the story",
      icon: BookOpen,
      desc: "When faced with two paths, choose the one that yields real human truth and unforgettable memories.",
    },
    {
      number: "06",
      title: "Give back",
      icon: Gift,
      desc: "Never just take. Share music, lend a helping hand, buy coffee when we can, and pay every kindness forward.",
    },
  ];

  return (
    <section id="our-rules" className="py-24 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-sunset/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-bold uppercase">
            <Flame className="w-4 h-4 text-amber-desert" />
            Code of the Highway
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment">
            OUR <span className="text-gradient-amber">RULES OF THE ROAD</span>
          </h2>
          <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
            Six non-negotiable principles that guide Lee and Jake across every mile, highway ramp, and stranger encounter.
          </p>
        </div>

        {/* 6 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.number}
                className="bg-asphalt-card/90 rounded-3xl p-8 border border-asphalt-border hover:border-amber-desert/40 transition-all duration-300 flex flex-col justify-between space-y-4 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-desert/15 border border-amber-desert/30 flex items-center justify-center text-amber-desert group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-black text-asphalt-border group-hover:text-amber-desert/40 transition-colors">
                      {rule.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-parchment group-hover:text-amber-desert transition-colors leading-snug mb-3">
                    {rule.title}
                  </h3>

                  <p className="text-sm text-parchment-muted leading-relaxed">
                    {rule.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-asphalt-border/40 flex items-center gap-2 text-xs font-mono text-amber-desert">
                  <ShieldCheck className="w-4 h-4 text-amber-desert" />
                  <span>Road Creed Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
