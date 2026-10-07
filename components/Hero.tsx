"use client";

import React from "react";
import { 
  MapPin, 
  Sparkles,
  Flame,
  Calendar,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import CountdownTimer from "./CountdownTimer";

export interface MetricsData {
  milesTraveled: number;
  totalMilesGoal: number;
  peopleMet?: number;
  ridesTaken?: number;
  mealsShared?: number;
  placesStayed?: number;
  moneySpent?: number;
  ridesCaught?: number;
  daysOnHighway?: number;
  generosityCounter?: number;
}

interface HeroProps {
  metrics: MetricsData;
  launchDate?: string;
}

export default function Hero({ metrics, launchDate = "2027-05-01T00:00:00Z" }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-asphalt-darker">
      {/* Background Ambient Glows */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      
      {/* Radial Gradient Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-desert/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-sunset/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Official Logo Emblem & Tagline Pill */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-desert to-sunset p-3 shadow-amber-glow animate-float flex items-center justify-center text-asphalt-darker">
              <img
                src="/logo.svg"
                alt="Trust The Thumb Transparent Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-asphalt-card/90 border border-amber-desert/40 shadow-amber-glow backdrop-blur-md">
              <Flame className="w-4 h-4 text-amber-desert animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-desert uppercase font-mono">
                TRUST THE THUMB
              </span>
              <span className="text-parchment-muted">•</span>
              <span className="text-xs text-parchment-muted font-mono">
                LA ➔ OHIO • RETURNING 2027
              </span>
            </div>
          </div>

          {/* Main Cinematic Headline */}
          <h1 className="font-display font-black text-parchment tracking-tight leading-none text-center">
            <span className="block whitespace-nowrap text-[clamp(1.15rem,5.6vw,4.25rem)]">
              2 BROTHERS. 2,000 MILES.
            </span>
            <span className="block text-gradient-amber text-[clamp(1.25rem,6.2vw,4.75rem)] mt-2 sm:mt-3">
              RESTARTING IN 2027.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-2xl text-parchment-muted font-normal max-w-3xl mx-auto leading-relaxed">
            Testing American kindness from <span className="text-parchment font-semibold border-b border-amber-desert/50">Los Angeles to Ohio</span>. Our 2026 expedition concluded in Phoenix, AZ—now preparing to start over from scratch in 2027.
          </p>

          {/* Core Thesis Statement */}
          <div className="max-w-2xl mx-auto pt-1">
            <div className="px-5 py-3.5 rounded-2xl bg-asphalt-card/70 border border-asphalt-border/80 flex items-center justify-center gap-3 shadow-inner">
              <Sparkles className="w-5 h-5 text-sunset shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-parchment-muted italic">
                &quot;The algorithm says be afraid. We&apos;re going to find the truth.&quot;
              </p>
            </div>
          </div>

          {/* Official Journey Status Announcement Banner */}
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-asphalt-card/95 via-asphalt-card/85 to-asphalt-darker/95 border border-amber-desert/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md text-left space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-asphalt-border/60">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-desert/15 border border-amber-desert/40 text-amber-desert font-mono text-xs font-bold uppercase shadow-amber-glow">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-desert" />
                Official Expedition Update
              </div>
              <span className="text-xs font-mono text-parchment-muted">October 2026 • Phoenix, Arizona</span>
            </div>

            <h2 className="font-display font-black text-xl sm:text-2xl text-parchment leading-snug">
              Our Journey Concluded in Phoenix, AZ — <span className="text-gradient-amber">We Are Starting Over LA ➔ Ohio in 2027</span>
            </h2>

            <div className="space-y-3 text-sm text-parchment/90 leading-relaxed font-normal">
              <p>
                Unfortunately, we had to end our 2026 journey in <strong>Phoenix, Arizona</strong> due to a lack of preparation and unforeseen, unexpected circumstances on the road.
              </p>
              <p className="text-parchment-muted">
                Hitchhiking 2,000 miles across America with only thumbs and backpacks is an immense test of endurance and logistical planning. When unexpected challenges arose, safety and wisdom came first.
              </p>
              <p className="text-parchment font-medium">
                This is not the end of Trust The Thumb! We are taking every hard-earned lesson to heart, regrouping, and preparing to <strong>continue this journey and start completely over from Los Angeles to Ohio again in 2027</strong>. Thank you deeply to everyone who picked us up, supported us, and believed in this mission.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-asphalt-darker border border-amber-desert/30 text-xs font-mono text-amber-desert">
                <MapPin className="w-3.5 h-3.5 text-amber-desert" />
                <span>2026 Concluded Stop: Phoenix, AZ</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-asphalt-darker border border-sunset/30 text-xs font-mono text-sunset">
                <RotateCcw className="w-3.5 h-3.5 text-sunset" />
                <span>Starting Over: LA ➔ Ohio in 2027</span>
              </div>
            </div>
          </div>

          {/* Official Countdown Timer Section */}
          <div id="countdown" className="pt-4 pb-2">
            <CountdownTimer targetDate={launchDate} />
          </div>

          {/* Action CTA Button */}
          <div className="flex justify-center pt-2">
            <a
              href="#archive"
              className="inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-base shadow-amber-glow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <MapPin className="w-5 h-5 stroke-[2.5]" />
              <span>Explore the 2026 Archive</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
