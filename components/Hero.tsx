"use client";

import React from "react";
import { 
  MapPin, 
  HeartHandshake, 
  Car, 
  Calendar, 
  Coffee, 
  Route, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Sparkles
} from "lucide-react";

interface MetricsData {
  milesTraveled: number;
  totalMilesGoal: number;
  ridesCaught: number;
  daysOnHighway: number;
  generosityCounter: number;
}

interface HeroProps {
  metrics: MetricsData;
}

export default function Hero({ metrics }: HeroProps) {
  const milesProgress = Math.min(
    Math.round((metrics.milesTraveled / metrics.totalMilesGoal) * 100),
    100
  );

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-asphalt-darker">
      {/* Background Image / Ambient Glows */}
      <div 
        className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80')`,
        }}
      />
      
      {/* Radial Gradient Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-desert/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-sunset/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-asphalt-card/90 border border-amber-desert/40 shadow-amber-glow backdrop-blur-md">
            <Flame className="w-4 h-4 text-amber-desert animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-desert uppercase font-mono">
              Live Cross-Country Experiment
            </span>
            <span className="hidden sm:inline text-parchment-muted">•</span>
            <span className="hidden sm:inline text-xs text-parchment-muted font-mono">
              LA ➔ Ohio
            </span>
          </div>

          {/* Main Cinematic Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-parchment tracking-tight leading-[1.08]">
            2 BROTHERS. 2,000 MILES. <br className="hidden sm:inline" />
            <span className="text-gradient-amber">0 RIDES BOOKED.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-2xl text-parchment-muted font-normal max-w-3xl mx-auto leading-relaxed">
            Testing American kindness from <span className="text-parchment font-semibold border-b border-amber-desert/50">Los Angeles to Ohio</span> with only backpacks, thumbs out, and an open mind.
          </p>

          {/* Core Thesis Highlight Banner */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="px-5 py-3 rounded-2xl bg-asphalt-card/70 border border-asphalt-border/80 flex items-center justify-center gap-3 shadow-inner">
              <Sparkles className="w-5 h-5 text-sunset shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-parchment-muted italic">
                &quot;The algorithm says be afraid. We&apos;re going to find the truth.&quot;
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#live-tracker"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-base shadow-amber-glow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <MapPin className="w-5 h-5 stroke-[2.5]" />
              <span>Track Live Location</span>
            </a>

            <a
              href="#tip-jar"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-asphalt-card/90 border border-asphalt-border text-parchment font-display font-bold text-base hover:bg-asphalt-border/60 hover:border-amber-desert/40 hover:text-amber-desert hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <HeartHandshake className="w-5 h-5 text-amber-desert" />
              <span>Buy The Brothers A Meal</span>
            </a>
          </div>

        </div>

        {/* Dynamic Key Metrics Bar */}
        <div className="mt-14 lg:mt-20">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-asphalt-border shadow-2xl relative overflow-hidden">
            
            {/* Top Progress Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-asphalt-border/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-desert/10 border border-amber-desert/30 text-amber-desert">
                  <Route className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-parchment">
                    Route Progress Tracker
                  </h3>
                  <p className="text-xs text-parchment-muted font-mono">
                    I-40 East ➔ I-44 ➔ I-70 Corridor
                  </p>
                </div>
              </div>

              {/* Progress Bar Label */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-amber-desert">
                  {milesProgress}% Completed
                </span>
                <div className="w-36 h-3 bg-asphalt-darker rounded-full overflow-hidden border border-asphalt-border p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-desert to-sunset rounded-full transition-all duration-1000 shadow-amber-glow"
                    style={{ width: `${milesProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 4 Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Metric 1: Miles Traveled */}
              <div className="bg-asphalt-card/80 p-5 rounded-2xl border border-asphalt-border/70 hover:border-amber-desert/40 transition-colors group">
                <div className="flex items-center justify-between text-parchment-muted mb-3">
                  <span className="text-xs font-mono font-medium uppercase tracking-wider">Miles Traveled</span>
                  <MapPin className="w-4 h-4 text-amber-desert group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-display font-black text-2xl sm:text-4xl text-parchment">
                  {metrics.milesTraveled.toLocaleString()}
                  <span className="text-sm sm:text-base font-normal text-parchment-muted font-mono ml-1.5">
                    / {metrics.totalMilesGoal.toLocaleString()} mi
                  </span>
                </div>
                <p className="text-[11px] text-sage mt-2 font-mono flex items-center gap-1">
                  <span>🟢 Currently in Barstow, CA</span>
                </p>
              </div>

              {/* Metric 2: Rides Caught */}
              <div className="bg-asphalt-card/80 p-5 rounded-2xl border border-asphalt-border/70 hover:border-amber-desert/40 transition-colors group">
                <div className="flex items-center justify-between text-parchment-muted mb-3">
                  <span className="text-xs font-mono font-medium uppercase tracking-wider">Rides Caught</span>
                  <Car className="w-4 h-4 text-sunset group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-display font-black text-2xl sm:text-4xl text-parchment">
                  {metrics.ridesCaught}
                  <span className="text-sm sm:text-base font-normal text-parchment-muted font-mono ml-1.5">
                    drivers
                  </span>
                </div>
                <p className="text-[11px] text-parchment-muted mt-2 font-mono">
                  Avg ride: ~68 miles
                </p>
              </div>

              {/* Metric 3: Days on Highway */}
              <div className="bg-asphalt-card/80 p-5 rounded-2xl border border-asphalt-border/70 hover:border-amber-desert/40 transition-colors group">
                <div className="flex items-center justify-between text-parchment-muted mb-3">
                  <span className="text-xs font-mono font-medium uppercase tracking-wider">Days On Highway</span>
                  <Calendar className="w-4 h-4 text-amber-desert group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-display font-black text-2xl sm:text-4xl text-parchment">
                  Day {metrics.daysOnHighway}
                  <span className="text-sm sm:text-base font-normal text-parchment-muted font-mono ml-1.5">
                    / ~14
                  </span>
                </div>
                <p className="text-[11px] text-parchment-muted mt-2 font-mono">
                  Started late September
                </p>
              </div>

              {/* Metric 4: Stranger Generosity */}
              <div className="bg-asphalt-card/80 p-5 rounded-2xl border border-amber-desert/30 hover:border-amber-desert/60 transition-colors group shadow-inner">
                <div className="flex items-center justify-between text-parchment-muted mb-3">
                  <span className="text-xs font-mono font-medium uppercase tracking-wider text-amber-desert">Generosity Counter</span>
                  <Coffee className="w-4 h-4 text-amber-desert group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-display font-black text-2xl sm:text-4xl text-gradient-amber">
                  {metrics.generosityCounter}
                  <span className="text-sm sm:text-base font-normal text-parchment-muted font-mono ml-1.5">
                    gifts
                  </span>
                </div>
                <p className="text-[11px] text-parchment-muted mt-2 font-mono">
                  Coffees, snacks & meals bought
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
