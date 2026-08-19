"use client";

import React from "react";
import { 
  Compass, 
  Globe2, 
  Users, 
  ShieldAlert, 
  Quote, 
  Sparkles,
  Youtube,
  Instagram,
  Heart
} from "lucide-react";

export default function Mission() {
  const pillars = [
    {
      icon: Globe2,
      number: "01",
      title: "The Digital Disconnect",
      subtitle: "Beyond the doomscroll",
      description:
        "Every social media feed paints a picture of an America fractured, angry, and distrustful. But algorithm outrage isn't real life. We put our phones down and put our thumbs out to discover what people are actually like face-to-face.",
    },
    {
      icon: Users,
      number: "02",
      title: "The Brotherhood Bond",
      subtitle: "Lee (23) & Jake (20)",
      description:
        "Two brothers stepping into the unknown with nothing but backpacks, mutual trust, and an unwavering commitment to document every single encounter with complete authenticity.",
    },
    {
      icon: Heart,
      number: "03",
      title: "The Strangers Who Save The Day",
      subtitle: "Everyday American Heroes",
      description:
        "From long-haul truck drivers sharing hot coffee on cold desert dawns to suburban parents offering miles and wisdom, everyday Americans are far more generous than the internet lets on.",
    },
  ];

  return (
    <section id="the-mission" className="py-24 bg-asphalt-darker relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-desert/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
            <Compass className="w-3.5 h-3.5" />
            The Experiment & Thesis
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-parchment">
            THE MISSION & <span className="text-gradient-amber">&quot;THE WHY&quot;</span>
          </h2>
          <p className="text-base sm:text-xl text-parchment-muted leading-relaxed">
            Hitchhiking 2,000 miles across the heartland isn&apos;t just about saving money on bus tickets—it&apos;s a sociological experiment in vulnerability, faith in humanity, and brotherhood.
          </p>
        </div>

        {/* 3 Narrative Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass-card rounded-3xl p-8 space-y-5 relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-desert/15 border border-amber-desert/30 flex items-center justify-center text-amber-desert group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-asphalt-border group-hover:text-amber-desert/40 transition-colors">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-parchment group-hover:text-amber-desert transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono text-amber-desert mb-3">
                    {pillar.subtitle}
                  </div>

                  <p className="text-sm text-parchment-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-asphalt-border/40 flex items-center gap-2 text-xs font-mono text-parchment-muted group-hover:text-parchment">
                  <Sparkles className="w-3.5 h-3.5 text-sunset" />
                  <span>Real stories from the road</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Impact Quote Banner */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-asphalt-card via-asphalt-card/90 to-asphalt-card border border-amber-desert/30 shadow-2xl mb-20">
          
          <div className="absolute top-0 right-0 p-8 text-amber-desert/10 pointer-events-none">
            <Quote className="w-48 h-48 -rotate-12" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono text-amber-desert uppercase tracking-widest font-bold">
              ★ Core Creed & Manifesto ★
            </span>
            
            <blockquote className="font-display font-black text-2xl sm:text-4xl text-parchment leading-snug tracking-tight">
              &quot;We&apos;re not asking for rides; <br className="hidden sm:inline" />
              we&apos;re asking America who it still is.&quot;
            </blockquote>

            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-10 h-0.5 bg-amber-desert" />
              <span className="text-sm font-mono text-parchment-muted">Lee & Jake Parsons</span>
              <div className="w-10 h-0.5 bg-amber-desert" />
            </div>
          </div>
        </div>

        {/* Creator Profiles Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-parchment">
              MEET THE BROTHERS
            </h3>
            <p className="text-sm text-parchment-muted font-mono mt-1">
              Documenting the raw journey on YouTube, TikTok & IG
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Creator 1: Lee */}
            <div className="bg-asphalt-card p-6 sm:p-8 rounded-3xl border border-asphalt-border hover:border-amber-desert/40 transition-all flex flex-col sm:flex-row items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Lee Parsons"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-desert shadow-amber-glow shrink-0"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-display font-bold text-xl text-parchment">Lee Parsons</h4>
                    <span className="text-xs font-mono px-2 py-0.5 bg-amber-desert/20 text-amber-desert rounded-md font-bold">Age 23</span>
                  </div>
                  <div className="text-xs font-mono text-amber-desert">@theleeparsons</div>
                </div>
                <p className="text-xs text-parchment-muted leading-relaxed">
                  Lead storyteller, camera operator, and logistics wrangler. Passionate about human-centric storytelling and documentary film.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <a
                    href="https://youtube.com/@theleeparsons"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-asphalt-darker rounded-xl text-parchment-muted hover:text-amber-desert border border-asphalt-border transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/theleeparsons"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-asphalt-darker rounded-xl text-parchment-muted hover:text-amber-desert border border-asphalt-border transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Creator 2: Jake */}
            <div className="bg-asphalt-card p-6 sm:p-8 rounded-3xl border border-asphalt-border hover:border-amber-desert/40 transition-all flex flex-col sm:flex-row items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Jake Parsons"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-sunset shadow-lg shrink-0"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h4 className="font-display font-bold text-xl text-parchment">Jake Parsons</h4>
                    <span className="text-xs font-mono px-2 py-0.5 bg-sunset/20 text-sunset rounded-md font-bold">Age 20</span>
                  </div>
                  <div className="text-xs font-mono text-amber-desert">@Jake_thedrummer26</div>
                </div>
                <p className="text-xs text-parchment-muted leading-relaxed">
                  Musician, drummer, cardboard sign artist, and morale booster. Keeping rhythm and high energy through 10-hour highway stands.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <a
                    href="https://youtube.com/@Jake_thedrummer26"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-asphalt-darker rounded-xl text-parchment-muted hover:text-amber-desert border border-asphalt-border transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="https://instagram.com/Jake_thedrummer26"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-asphalt-darker rounded-xl text-parchment-muted hover:text-amber-desert border border-asphalt-border transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
