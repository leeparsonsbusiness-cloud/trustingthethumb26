"use client";

import React from "react";
import { Compass, ShieldAlert, Heart, Youtube, Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-asphalt-darker border-t border-asphalt-border pt-16 pb-12 text-parchment-muted relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission Brief (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-desert to-sunset flex items-center justify-center shadow-amber-glow">
                <Compass className="w-5 h-5 text-asphalt-darker stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-xl text-parchment tracking-wider">
                TRUSTING THE THUMB
              </span>
            </div>
            
            <p className="text-xs text-parchment-muted leading-relaxed max-w-sm">
              &quot;The algorithm says be afraid. We&apos;re going to find the truth.&quot; A live 2,000-mile cross-country experiment in human kindness, brotherhood, and open minds.
            </p>

            <div className="text-xs font-mono text-amber-desert">
              Documented by Lee Parsons (<a href="https://instagram.com/theleeparsons" target="_blank" rel="noreferrer" className="underline hover:text-parchment">@theleeparsons</a>) & Jake Parsons (<a href="https://instagram.com/Jake_thedrummer26" target="_blank" rel="noreferrer" className="underline hover:text-parchment">@Jake_thedrummer26</a>)
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-parchment uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#live-tracker" className="hover:text-amber-desert transition-colors">
                  ➔ Live Route Tracker
                </a>
              </li>
              <li>
                <a href="#the-mission" className="hover:text-amber-desert transition-colors">
                  ➔ The Mission & Story
                </a>
              </li>
              <li>
                <a href="#tip-jar" className="hover:text-amber-desert transition-colors">
                  ➔ Trail Notes & Tip Jar
                </a>
              </li>
              <li>
                <a href="#supporters-wall" className="hover:text-amber-desert transition-colors">
                  ➔ Supporters Wall Feed
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-amber-desert transition-colors">
                  ➔ Sponsor & Brand Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Disclaimer (4 cols) */}
          <div className="md:col-span-4 bg-asphalt-card/60 p-5 rounded-2xl border border-asphalt-border/60 space-y-2 text-xs">
            <div className="font-bold text-parchment flex items-center gap-1.5 text-amber-desert">
              <ShieldAlert className="w-4 h-4" />
              Safety & Responsibility Disclaimer
            </div>
            <p className="text-[11px] text-parchment-muted leading-relaxed">
              Hitchhiking carries inherent risks. Lee and Jake travel with GPS beacons, cell connectivity, emergency protocols, and local state highway compliance. Do not attempt hitchhiking without proper preparation and safety measures.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-asphalt-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            © 2026 Trusting The Thumb. All Rights Reserved. LA ➔ Ohio.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <a
                href="https://youtube.com/@theleeparsons"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-asphalt-card rounded-lg hover:text-amber-desert border border-asphalt-border"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/theleeparsons"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-asphalt-card rounded-lg hover:text-amber-desert border border-asphalt-border"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-asphalt-card border border-asphalt-border text-parchment hover:text-amber-desert hover:border-amber-desert/40 transition-all flex items-center gap-1 text-[11px]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
