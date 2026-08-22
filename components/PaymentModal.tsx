"use client";

import React, { useState } from "react";
import { X, Heart, ExternalLink, Copy, Check } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [copiedVenmo, setCopiedVenmo] = useState(false);
  const [copiedCashApp, setCopiedCashApp] = useState(false);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-asphalt-darker/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-asphalt-card max-w-md w-full rounded-3xl p-6 sm:p-8 border border-amber-desert/40 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-asphalt-darker text-parchment-muted hover:text-amber-desert border border-asphalt-border"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-desert/15 border border-amber-desert/30 text-amber-desert flex items-center justify-center mx-auto shadow-amber-glow">
            <Heart className="w-6 h-6 fill-amber-desert" />
          </div>
          <h3 className="font-display font-bold text-2xl text-parchment">
            Support The Journey
          </h3>
          <p className="text-xs text-parchment-muted leading-relaxed">
            Directly back Lee and Jake on the road for diner meals, water refills, and highway supplies via Venmo or CashApp!
          </p>
        </div>

        {/* Payment Buttons Grid */}
        <div className="space-y-4">
          
          {/* Venmo */}
          <div className="p-4 rounded-2xl bg-asphalt-darker border border-asphalt-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#008CFF] inline-block" />
                <span className="font-display font-bold text-sm text-parchment">Venmo</span>
              </div>
              <span className="text-xs font-mono text-amber-desert font-semibold">@theleeparsons</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://venmo.com/u/theleeparsons"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#008CFF] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Open Venmo App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => copyToClipboard("@theleeparsons", "venmo")}
                className="p-2.5 rounded-xl bg-asphalt-card border border-asphalt-border text-parchment-muted hover:text-parchment text-xs font-mono flex items-center gap-1"
                title="Copy Handle"
              >
                {copiedVenmo ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* CashApp */}
          <div className="p-4 rounded-2xl bg-asphalt-darker border border-asphalt-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00D632] inline-block" />
                <span className="font-display font-bold text-sm text-parchment">Cash App</span>
              </div>
              <span className="text-xs font-mono text-sage font-semibold">$leeparsonsbusiness</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://cash.app/$leeparsonsbusiness"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-[#00D632] text-asphalt-darker font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
              >
                <span>Open Cash App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => copyToClipboard("$leeparsonsbusiness", "cashapp")}
                className="p-2.5 rounded-xl bg-asphalt-card border border-asphalt-border text-parchment-muted hover:text-parchment text-xs font-mono flex items-center gap-1"
                title="Copy Handle"
              >
                {copiedCashApp ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-[11px] font-mono text-parchment-muted text-center pt-2 border-t border-asphalt-border/40">
          💛 100% of supporter tips go directly to highway supplies & roadside diner meals for Lee & Jake.
        </div>

      </div>
    </div>
  );
}
