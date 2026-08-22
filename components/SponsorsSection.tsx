"use client";

import React from "react";
import { Building2, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SponsorsSection() {
  return (
    <section id="sponsors-section" className="py-20 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-desert/30 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-desert/15 blur-[120px] rounded-full pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-bold uppercase">
              <Building2 className="w-4 h-4 text-amber-desert" />
              Brand Partnerships & Gear Sponsors
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-parchment">
              TEST YOUR GEAR ACROSS <span className="text-gradient-amber">2,000 MILES</span>
            </h2>

            <p className="text-sm sm:text-base text-parchment-muted leading-relaxed">
              We are partnering with outdoor, travel, apparel, camera, and food brands interested in put-to-the-test field testing across desert highways, truck stops, and extreme weather.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-mono text-sage pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage" />
                Daily Video Exposure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage" />
                Real Highway Field Test
              </span>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href="/sponsors"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-sm shadow-amber-glow hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>Visit Sponsor Hub & Submit Info</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
