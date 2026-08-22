"use client";

import React from "react";
import { X, Download, ShieldCheck, Film, Video, Zap, CheckCircle2, Award, Camera, Tag } from "lucide-react";

interface MediaDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MediaDeckModal({ isOpen, onClose }: MediaDeckModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const deliverables = [
    {
      title: "4-Part YouTube Series",
      icon: Film,
      color: "text-amber-desert",
      desc: "4 episode long-form highway docuseries documenting the entire 2,000-mile journey with dedicated brand intro/outro callouts and product integration.",
    },
    {
      title: "4K Feature Documentary",
      icon: Video,
      color: "text-sunset",
      desc: "Standalone 4K post-expedition feature documentary film crafted for festival submission and high-level distribution with prominent executive sponsor credits.",
    },
    {
      title: "1-3 Daily Short-Form Videos",
      icon: Zap,
      color: "text-sage",
      desc: "1-3 daily video uploads across TikTok, Instagram Reels & YouTube Shorts highlighting real-time highway moments and organic gear usage.",
    },
    {
      title: "Extreme Field Torture Test",
      icon: Award,
      color: "text-amber-desert",
      desc: "Authentic, raw durability testing across desert heat, rain, truck stops, and extreme weather with honest video reviews.",
    },
    {
      title: "Commercial Asset Library",
      icon: Camera,
      color: "text-sunset",
      desc: "Full royalty-free commercial license to 4K B-roll footage & high-resolution product photography shot across 2,000 miles for your brand marketing.",
    },
    {
      title: "Vanity URL & Discount Codes",
      icon: Tag,
      color: "text-sage",
      desc: "Custom promo codes, affiliate links, and branded cardboard sign callouts during highway stands to track direct audience conversions.",
    },
  ];

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
            TRUST THE THUMB <br />
            <span className="text-gradient-amber">2,000 MILES ACROSS AMERICA</span>
          </h2>
          <p className="text-sm text-parchment-muted">
            Created & Documented by Lee Parsons (@theleeparsons) & Jake Parsons (@Jake_thedrummer26)
          </p>
        </div>

        {/* Updated Creator Metric Cards: 1-3 Daily Posts & Cinema Deliverables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-asphalt-darker p-5 rounded-2xl border border-asphalt-border text-center">
            <div className="font-display font-black text-3xl text-sage">1-3</div>
            <div className="text-xs font-mono font-bold text-parchment mt-1">Daily Short-Form Posts</div>
            <div className="text-[11px] text-parchment-muted mt-0.5">TikTok, IG Reels & YouTube Shorts</div>
          </div>

          <div className="bg-asphalt-darker p-5 rounded-2xl border border-asphalt-border text-center">
            <div className="font-display font-black text-3xl text-amber-desert">4K 60fps</div>
            <div className="text-xs font-mono font-bold text-parchment mt-1">Cinema Deliverables</div>
            <div className="text-[11px] text-parchment-muted mt-0.5">Professional Grade Production</div>
          </div>
        </div>

        {/* Deliverables Grid Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-asphalt-border/40 pb-2">
            <h3 className="font-display font-bold text-xl text-parchment">
              What Sponsors Receive & Value Overview:
            </h3>
            <span className="text-xs font-mono text-amber-desert">6 Core Deliverables</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deliverables.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-asphalt-darker/70 border border-asphalt-border/60 hover:border-amber-desert/40 transition-colors space-y-2"
                >
                  <div className="font-display font-bold text-base text-parchment flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${item.color} shrink-0`} />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-parchment-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sponsor Value Summary Note */}
        <div className="p-4 rounded-2xl bg-amber-desert/10 border border-amber-desert/30 text-xs text-parchment space-y-1">
          <div className="font-bold text-amber-desert flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-desert" />
            Flexible Sponsorship Packages Available
          </div>
          <p className="text-parchment-muted leading-relaxed">
            Whether providing gear gifts, financial backing, or highway supplies, every partner receives customized video integration, social tagging, and full commercial media asset rights.
          </p>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-asphalt-border">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-sm flex items-center justify-center gap-2 shadow-amber-glow hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download / Print Sponsor One-Sheet</span>
          </button>
          
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment-muted hover:text-parchment text-sm font-semibold"
          >
            Close Deck
          </button>
        </div>

      </div>
    </div>
  );
}
