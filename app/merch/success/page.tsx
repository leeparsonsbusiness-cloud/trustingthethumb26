"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Heart, ArrowLeft, Compass, Youtube, Instagram, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MerchSuccessPage() {
  useEffect(() => {
    // Launch celebratory confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#E07A5F", "#F2CC8F", "#3D405B", "#81B29A"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-asphalt-darker text-parchment flex flex-col justify-between selection:bg-amber-desert/30">
      <Header statusBadgeText="Journey Concluded in Phoenix • Returning 2027" currentCity="Phoenix, AZ" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32 relative z-10 text-center space-y-8">
        
        {/* Confirmed Icon */}
        <div className="w-20 h-20 rounded-3xl bg-amber-desert/15 border-2 border-amber-desert flex items-center justify-center text-amber-desert mx-auto shadow-amber-glow animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-amber-desert" />
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-amber-desert/40 text-amber-desert text-xs font-mono font-bold uppercase shadow-amber-glow">
            <ShoppingBag className="w-3.5 h-3.5" />
            Payment Successful
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-parchment tracking-tight">
            YOU&apos;RE FUELING THE <span className="text-gradient-amber">JOURNEY</span>!
          </h1>
          <p className="text-base sm:text-lg text-parchment-muted max-w-xl mx-auto leading-relaxed">
            Thank you for grabbing official gear. 100% of your order goes straight toward Lee and Jake&apos;s living provisions and gear preparation as we get ready to restart from LA to Ohio in 2027.
          </p>
        </div>

        {/* Details Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-desert/30 text-left space-y-5 max-w-xl mx-auto shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-asphalt-border/60">
            <Truck className="w-5 h-5 text-amber-desert" />
            <div>
              <div className="font-display font-bold text-base text-parchment">Order Processing & Fulfillment</div>
              <div className="text-xs text-parchment-muted font-mono">Receipt and tracking sent to your email by Stripe</div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-parchment/90 font-mono">
            <div className="flex justify-between py-1 border-b border-asphalt-border/30">
              <span className="text-parchment-muted">Fulfillment:</span>
              <span className="text-parchment font-bold">Print-On-Demand Direct Dispatch</span>
            </div>
            <div className="flex justify-between py-1 border-b border-asphalt-border/30">
              <span className="text-parchment-muted">Estimated Shipping:</span>
              <span className="text-amber-desert font-bold">3 - 7 Business Days</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-parchment-muted">Destination:</span>
              <span className="text-parchment font-bold">Address provided at Stripe Checkout</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-desert/10 border border-amber-desert/20 text-xs text-amber-desert flex items-center gap-2.5">
            <Heart className="w-4 h-4 fill-amber-desert text-amber-desert shrink-0" />
            <span>Lee & Jake say thank you! Your support makes every mile possible.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/#live-tracker"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-black text-sm shadow-amber-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 stroke-[2.5]" />
            <span>Track Live Highway Map</span>
          </Link>

          <Link
            href="/#merch"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-asphalt-card border border-asphalt-border hover:border-amber-desert/50 text-parchment font-display font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Merch</span>
          </Link>
        </div>

        {/* Follow Creators */}
        <div className="pt-8 border-t border-asphalt-border/50 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-parchment-muted">
            Watch the journey live on video
          </p>
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://youtube.com/@theleeparsons"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-asphalt-card border border-asphalt-border hover:border-amber-desert text-parchment-muted hover:text-amber-desert text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>@theleeparsons (YouTube)</span>
            </a>
            <a
              href="https://instagram.com/theleeparsons"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-asphalt-card border border-asphalt-border hover:border-amber-desert text-parchment-muted hover:text-amber-desert text-xs font-mono flex items-center gap-2 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@theleeparsons (Instagram)</span>
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
