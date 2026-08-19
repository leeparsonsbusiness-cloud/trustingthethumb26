"use client";

import React from "react";
import { X, Download, ShieldCheck, Film, Eye, Users, Zap, ExternalLink } from "lucide-react";

interface MediaDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaDeckModal({ isOpen, onClose }: MediaDeckModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-asphalt-darker/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-asphalt-card border border-amber-desert/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl space-y-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-asphalt-darker border border-asphalt-border text-parchment hover:text-amber-desert transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Deck Header */}
        <div className="space-y-3 border-b border-asphalt-border pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-desert/15 text-amber-desert font-mono text-xs font-bold uppercase">
            Official 2026 Media Deck & Sponsor One-Sheet
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-parchment">
            TRUSTING THE THUMB <br />
            <span className="text-gradient-amber">2,000 MILES ACROSS AMERICA</span>
          </h2>
          <p className="text-sm text-parchment-muted">
            Created & Documented by Lee Parsons (@theleeparsons) & Jake Parsons (@Jake_thedrummer26)
          </p>
        </div>

        {/* Key Creator Audience Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-asphalt-darker p-4 rounded-2xl border border-asphalt-border text-center">
            <div className="font-display font-black text-2xl text-amber-desert">2.4M+</div>
            <div className="text-[11px] font-mono text-parchment-muted mt-0.5">Est. Total Impressions</div>
          </div>
          <div className="bg-asphalt-darker p-4 rounded-2xl border border-asphalt-border text-center">
            <div className="font-display font-black text-2xl text-sunset">84%</div>
            <div className="text-[11px] font-mono text-parchment-muted mt-0.5">US Gen-Z & Millennial</div>
          </div>
          <div className="bg-asphalt-darker p-4 rounded-2xl border border-asphalt-border text-center">
            <div className="font-display font-black text-2xl text-sage">14+</div>
            <div className="text-[11px] font-mono text-parchment-muted mt-0.5">Daily Content Drops</div>
          </div>
          <div className="bg-asphalt-darker p-4 rounded-2xl border border-asphalt-border text-center">
            <div className="font-display font-black text-2xl text-parchment">4K 60fps</div>
            <div className="text-[11px] font-mono text-parchment-muted mt-0.5">Cinema Deliverables</div>
          </div>
        </div>

        {/* Deliverables Overview */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-parchment">
            Sponsorship Deliverables Included:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-parchment-muted">
            <div className="p-4 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60 space-y-1">
              <div className="font-bold text-parchment flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-desert" />
                Dedicated Shorts & Reels Integration
              </div>
              <p>Natural product usage during extreme 2,000-mile highway testing conditions.</p>
            </div>
            <div className="p-4 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60 space-y-1">
              <div className="font-bold text-parchment flex items-center gap-2">
                <Eye className="w-4 h-4 text-sunset" />
                YouTube Documentary Feature
              </div>
              <p>High-resolution documentary episode inclusions with dedicated brand shoutouts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60 space-y-1">
              <div className="font-bold text-parchment flex items-center gap-2">
                <Zap className="w-4 h-4 text-sage" />
                Live Tracker Branding
              </div>
              <p>Prominent brand logo placement on the live interactive web tracker map.</p>
            </div>
            <div className="p-4 rounded-2xl bg-asphalt-darker/60 border border-asphalt-border/60 space-y-1">
              <div className="font-bold text-parchment flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-desert" />
                Usage Rights Licensing
              </div>
              <p>Full commercial usage rights for photo and video assets generated during the trip.</p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-asphalt-border">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-desert text-asphalt-darker font-display font-bold text-sm flex items-center justify-center gap-2 shadow-amber-glow hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" />
            <span>Download / Print One-Sheet PDF</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment-muted hover:text-parchment text-sm font-semibold"
          >
            Close Deck
          </button>
        </div>

      </div>
    </div>
  );
}
