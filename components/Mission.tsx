"use client";

import React from "react";
import { 
  Compass, 
  Sparkles,
  Youtube,
  Instagram,
  Heart,
  Globe,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export default function Mission() {
  return (
    <section id="the-mission" className="py-24 bg-asphalt-darker relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-desert/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tagline */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
            <Compass className="w-3.5 h-3.5" />
            The Experiment & Core Thesis
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment tracking-tight">
            THE MISSION STATEMENT
          </h2>
        </div>

        {/* Deep Narrative Mission Banner */}
        <div className="max-w-4xl mx-auto space-y-8 mb-24">
          
          {/* Main Core Thesis Callout Card */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-desert/30 shadow-2xl relative overflow-hidden text-center space-y-6">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-desert/15 border border-amber-desert/30 flex items-center justify-center text-amber-desert mx-auto shadow-amber-glow p-2.5">
              <img
                src="/logo.svg"
                alt="Trust The Thumb Transparent Emblem"
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>

            <blockquote className="font-display font-black text-2xl sm:text-4xl text-gradient-amber leading-snug tracking-tight">
              &quot;THE ALGORITHM SAYS BE AFRAID. <br />
              WE&apos;RE GOING TO FIND THE TRUTH.&quot;
            </blockquote>

            <div className="w-24 h-1 bg-gradient-to-r from-amber-desert to-sunset mx-auto rounded-full" />

            {/* Deep Narrative Essay */}
            <div className="text-base sm:text-xl text-parchment/90 font-normal leading-relaxed space-y-6 text-left max-w-3xl mx-auto pt-2">
              <p>
                Every social media feed paints a picture of an America fractured, hostile, and afraid of one another. We are constantly conditioned by outrage algorithms to believe that strangers at the next exit are enemies.
              </p>
              <p>
                <strong className="text-parchment font-semibold">We refuse to accept that story.</strong>
              </p>
              <p>
                Starting October 1st, 2026, two brothers—Lee (23) and Jake (20)—are stepping into the unknown with only backpacks, thumbs out, and open minds. 2,000 miles from Los Angeles, California to Columbus, Ohio with zero booked rides, zero hotel reservations, and zero safety net.
              </p>
              <p>
                This isn&apos;t just a road trip—it&apos;s a live sociological experiment in real-world human kindness. We are testing whether everyday Americans across truck stops, desert highways, and heartland towns are as divided as the internet makes them seem, or whether generosity, warmth, and brotherhood still thrive in the heart of our country.
              </p>
            </div>

            {/* Key Pillars Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-asphalt-border/60 text-left">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60">
                <Globe className="w-5 h-5 text-amber-desert shrink-0" />
                <div>
                  <div className="text-xs font-bold text-parchment">Real-World Truth</div>
                  <div className="text-[11px] text-parchment-muted">Bypassing digital outrage feeds</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60">
                <Heart className="w-5 h-5 text-sunset shrink-0" />
                <div>
                  <div className="text-xs font-bold text-parchment">Human Kindness</div>
                  <div className="text-[11px] text-parchment-muted">Celebrating everyday heroes</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60">
                <ShieldCheck className="w-5 h-5 text-sage shrink-0" />
                <div>
                  <div className="text-xs font-bold text-parchment">100% Unfiltered</div>
                  <div className="text-[11px] text-parchment-muted">Documented daily on video</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Creator Profiles Section */}
        <div id="creators" className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
              <UserCheck className="w-3.5 h-3.5" />
              The Brotherhood
            </div>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-parchment">
              MEET LEE & JAKE
            </h3>
            <p className="text-sm text-parchment-muted font-mono">
              Documenting every mile on YouTube, TikTok & Instagram
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Creator 1: Lee */}
            <div className="bg-asphalt-card p-6 sm:p-8 rounded-3xl border border-asphalt-border hover:border-amber-desert/40 transition-all flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <img
                src="/lee.jpg"
                alt="Lee Parsons"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-desert shadow-amber-glow shrink-0"
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
                  Filmmaker, music producer, and nature lover who likes to push his life to the limits. Documenting the human story from behind the lens across every highway mile.
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
            <div className="bg-asphalt-card p-6 sm:p-8 rounded-3xl border border-asphalt-border hover:border-amber-desert/40 transition-all flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <img
                src="/jake.jpg"
                alt="Jake Parsons"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-sunset shadow-lg shrink-0"
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
                  Drummer, adventurer, cardboard sign artist, and photographer. Never afraid to try new things, step into the unknown, and capture raw roadside moments.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  <a
                    href="https://youtube.com/@theleeparsons"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-asphalt-darker rounded-xl text-parchment-muted hover:text-amber-desert border border-asphalt-border transition-colors"
                    title="YouTube Channel"
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
