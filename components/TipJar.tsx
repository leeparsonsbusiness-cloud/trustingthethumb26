"use client";

import React, { useState } from "react";
import { 
  Coffee, 
  ShowerHead as Shower, 
  Utensils, 
  Hotel, 
  HeartHandshake, 
  Send, 
  CheckCircle2, 
  Sparkles,
  CreditCard,
  DollarSign,
  User,
  MapPin,
  MessageSquare
} from "lucide-react";
import confetti from "canvas-confetti";
import { submitTrailNote } from "@/app/actions/submitNote";
import type { TrailNote } from "@/app/actions/submitNote";

interface TipJarProps {
  onNoteAdded: (note: TrailNote) => void;
}

export default function TipJar({ onNoteAdded }: TipJarProps) {
  const tiers = [
    {
      id: "coffee",
      amount: 5,
      icon: Coffee,
      title: "Gas Station Coffee & Snack",
      emoji: "☕",
      desc: "Keeps energy high for morning highway shifts.",
    },
    {
      id: "shower",
      amount: 15,
      icon: Shower,
      title: "Truck Stop Shower & Laundry",
      emoji: "🚿",
      desc: "Clean clothes & hot water after 3 days hitching.",
    },
    {
      id: "meal",
      amount: 35,
      icon: Utensils,
      title: "Warm Diner Meal for Two",
      emoji: "🥪",
      desc: "Steak, eggs & hashbrowns at a roadside diner.",
    },
    {
      id: "motel",
      amount: 75,
      icon: Hotel,
      title: "Emergency Motel Room",
      emoji: "🏕️",
      desc: "Safe shelter during heavy desert or Midwest storms.",
    },
  ];

  const [selectedTier, setSelectedTier] = useState<string>("shower");
  const [customAmount, setCustomAmount] = useState<number | "">(15);
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("venmo");

  // Form State
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectTier = (tierId: string, amount: number) => {
    setSelectedTier(tierId);
    setCustomAmount(amount);
    setIsCustom(false);
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    setSelectedTier("custom");
    setCustomAmount(50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMessage("Please write a short encouraging message for the brothers!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const currentAmount = typeof customAmount === "number" ? customAmount : 15;
    const activeTierObj = tiers.find((t) => t.id === selectedTier);
    const tierTitle = activeTierObj ? activeTierObj.title : `Custom \$${currentAmount} Supporter`;

    const res = await submitTrailNote({
      name: name || "Anonymous Road Supporter",
      handle: handle || undefined,
      amount: currentAmount,
      tier: tierTitle,
      city: city || "Somewhere in America",
      message: message.trim(),
    });

    setIsSubmitting(false);

    if (res.success && res.note) {
      setSuccessMessage(true);
      onNoteAdded(res.note);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E07A5F", "#F2CC8F", "#81B29A"],
        });
      } catch (err) {
        // Fallback gracefully if confetti fails
      }

      // Reset fields
      setMessage("");
      setTimeout(() => setSuccessMessage(false), 6000);
    } else {
      setErrorMessage(res.error || "Submission failed. Try again!");
    }
  };

  return (
    <section id="tip-jar" className="py-24 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-desert/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            Support The Road Journey
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-parchment">
            BUY THE BROTHERS A <span className="text-gradient-amber">MEAL OR SHOWER</span>
          </h2>
          <p className="text-base sm:text-lg text-parchment-muted">
            Leave a custom tip and write your public Trail Note to cheer Lee and Jake on as they stand thumbs-out across America.
          </p>
        </div>

        {/* Grid: Tip Selector + Note Submission Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left: Preset Support Tiers (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-bold text-xl text-parchment flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sunset" />
              Choose Support Tier
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                const isSelected = selectedTier === tier.id && !isCustom;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleSelectTier(tier.id, tier.amount)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? "bg-amber-desert/15 border-amber-desert shadow-amber-glow"
                        : "bg-asphalt-card/80 border-asphalt-border hover:border-amber-desert/40"
                    }`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${isSelected ? "bg-amber-desert text-asphalt-darker font-bold" : "bg-asphalt-darker text-amber-desert"}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-base text-parchment truncate">
                          {tier.emoji} {tier.title}
                        </span>
                        <span className="font-mono font-black text-amber-desert text-lg ml-2">
                          ${tier.amount}
                        </span>
                      </div>
                      <p className="text-xs text-parchment-muted mt-1 leading-relaxed">
                        {tier.desc}
                      </p>
                    </div>
                  </button>
                );
              })}

              {/* Custom Amount Tier Option */}
              <button
                type="button"
                onClick={handleSelectCustom}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  isCustom
                    ? "bg-amber-desert/15 border-amber-desert shadow-amber-glow"
                    : "bg-asphalt-card/80 border-asphalt-border hover:border-amber-desert/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isCustom ? "bg-amber-desert text-asphalt-darker font-bold" : "bg-asphalt-darker text-amber-desert"}`}>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-parchment">Custom Supporter Amount</div>
                    <div className="text-xs text-parchment-muted">Choose any custom dollar amount</div>
                  </div>
                </div>
                {isCustom && (
                  <div className="w-28">
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl bg-asphalt-darker border border-amber-desert text-parchment font-mono text-sm focus:outline-none"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </button>
            </div>

            {/* Payment Method Selector Bar */}
            <div className="pt-4 border-t border-asphalt-border/40">
              <span className="text-xs font-mono text-parchment-muted uppercase tracking-wider block mb-3">
                Select Instant Payment App
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "venmo", label: "Venmo", color: "bg-blue-600/20 border-blue-500/50 text-blue-400" },
                  { id: "cashapp", label: "CashApp", color: "bg-emerald-600/20 border-emerald-500/50 text-emerald-400" },
                  { id: "bmac", label: "Coffee", color: "bg-amber-600/20 border-amber-500/50 text-amber-300" },
                  { id: "stripe", label: "Card", color: "bg-purple-600/20 border-purple-500/50 text-purple-300" },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === pm.id
                        ? `${pm.color} ring-2 ring-amber-desert/60`
                        : "bg-asphalt-card border-asphalt-border text-parchment-muted"
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Note Submission Form (7 Cols) */}
          <div className="lg:col-span-7 bg-asphalt-card rounded-3xl p-6 sm:p-8 border border-asphalt-border shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-asphalt-border/60">
              <div>
                <h3 className="font-display font-bold text-xl text-parchment">
                  Leave a Public Trail Note
                </h3>
                <p className="text-xs text-parchment-muted mt-0.5">
                  Your message will post live on the Supporters Wall below.
                </p>
              </div>

              <div className="px-3 py-1 rounded-xl bg-amber-desert/10 border border-amber-desert/30 text-amber-desert font-mono text-xs font-bold">
                ${typeof customAmount === "number" ? customAmount : 15} Tip
              </div>
            </div>

            {/* Success Message Banner */}
            {successMessage && (
              <div className="p-4 rounded-2xl bg-sage/20 border border-sage/50 text-sage text-sm font-semibold flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>🎉 Thank you! Your Trail Note was posted live to the Supporters Wall!</span>
              </div>
            )}

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Donor Name */}
                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Your Name or Alias *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Miller"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>

                {/* Social Handle */}
                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Social Handle (Optional)
                  </label>
                  <div className="relative">
                    <span className="text-amber-desert font-mono text-xs absolute left-3.5 top-3">@</span>
                    <input
                      type="text"
                      placeholder="smiller_travels"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>

              </div>

              {/* City & State */}
              <div>
                <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                  Your City / State (Shown on Note)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="e.g. Flagstaff, AZ or Columbus, OH"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                  />
                </div>
              </div>

              {/* Trail Note Message */}
              <div>
                <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                  Your Encouraging Trail Note *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={3}
                    placeholder="Write a message for Lee and Jake..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-base shadow-amber-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Posting Note...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    <span>Send Tip & Post Public Trail Note</span>
                  </>
                )}
              </button>

              <p className="text-[11px] font-mono text-parchment-muted text-center pt-2">
                🔒 Direct payment simulated via {paymentMethod.toUpperCase()}. Note is posted live instantly via Server Actions.
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
