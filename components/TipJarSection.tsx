"use client";

import React, { useState } from "react";
import { Heart, ExternalLink, Copy, Check, Coffee } from "lucide-react";

export default function TipJarSection() {
  const [copiedVenmo, setCopiedVenmo] = useState(false);
  const [copiedCashApp, setCopiedCashApp] = useState(false);

  const copyToClipboard = (text: string, type: "venmo" | "cashapp") => {
    navigator.clipboard.writeText(text);
    if (type === "venmo") {
      setCopiedVenmo(true);
      setTimeout(() => setCopiedVenmo(false), 3000);
    } else {
      setCopiedCashApp(true);
      setTimeout(() => setCopiedCashApp(false), 3000);
    }
  };

  return (
    <section id="tip-jar-section" className="py-20 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-sunset/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-bold uppercase">
            <Heart className="w-4 h-4 text-sunset fill-sunset" />
            Support The Journey
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment">
            BUY THE BROTHERS A <span className="text-gradient-amber">MEAL OR COFFEE</span>
          </h2>
          <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
            Back Lee and Jake on the road! 100% of supporter contributions go straight to roadside diner breakfasts, water refills, and emergency supplies.
          </p>
        </div>

        {/* Tip Jar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Venmo Card */}
          <div className="bg-asphalt-card/90 rounded-3xl p-8 border border-asphalt-border hover:border-[#008CFF]/50 transition-all duration-300 space-y-6 shadow-xl relative group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#008CFF]/15 border border-[#008CFF]/30 flex items-center justify-center text-[#008CFF]">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-parchment">Venmo Tip Jar</h3>
                  <div className="text-xs font-mono text-[#008CFF] font-semibold">@theleeparsons</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-parchment-muted leading-relaxed">
              Send a coffee or warm diner meal directly to Lee Parsons on Venmo.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://venmo.com/u/theleeparsons"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-[#008CFF] text-white font-display font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Open Venmo</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => copyToClipboard("@theleeparsons", "venmo")}
                className="px-4 py-3.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment-muted hover:text-parchment text-xs font-mono flex items-center gap-1.5"
              >
                {copiedVenmo ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
                <span>{copiedVenmo ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Cash App Card */}
          <div className="bg-asphalt-card/90 rounded-3xl p-8 border border-asphalt-border hover:border-[#00D632]/50 transition-all duration-300 space-y-6 shadow-xl relative group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00D632]/15 border border-[#00D632]/30 flex items-center justify-center text-[#00D632]">
                  <Heart className="w-6 h-6 fill-[#00D632]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-parchment">Cash App Tip Jar</h3>
                  <div className="text-xs font-mono text-sage font-semibold">$leeparsonsbusiness</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-parchment-muted leading-relaxed">
              Support the brothers directly via Cash App for fuel, gear, and highway supplies.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://cash.app/$leeparsonsbusiness"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 rounded-xl bg-[#00D632] text-asphalt-darker font-display font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Open Cash App</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => copyToClipboard("$leeparsonsbusiness", "cashapp")}
                className="px-4 py-3.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment-muted hover:text-parchment text-xs font-mono flex items-center gap-1.5"
              >
                {copiedCashApp ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCashApp ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
