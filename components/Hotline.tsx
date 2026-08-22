"use client";

import React, { useState } from "react";
import { 
  PhoneCall, 
  Car, 
  Home, 
  Utensils, 
  MapPin, 
  Users, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Flame,
  AlertCircle
} from "lucide-react";
import { submitHotlineEntry } from "@/app/actions/submitHotline";

export default function Hotline() {
  const [selectedOffer, setSelectedOffer] = useState("ride");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const offerTypes = [
    {
      id: "ride",
      title: "Offer a Ride",
      emoji: "🚗",
      icon: Car,
      desc: "Going our direction along I-40 / I-44 / I-70? Give us a lift for 10 miles or 300 miles!",
    },
    {
      id: "shelter",
      title: "Couch or Yard for Camping",
      emoji: "⛺",
      icon: Home,
      desc: "Have a spare room, couch, or backyard grass to pop our tents for a night?",
    },
    {
      id: "meal",
      title: "Diner Meal or Water Refill",
      emoji: "🍔",
      icon: Utensils,
      desc: "Meet at a highway diner, truck stop, or rest station for coffee and a meal.",
    },
    {
      id: "spot",
      title: "Local Spot Recommendation",
      emoji: "🗺️",
      icon: MapPin,
      desc: "Know an unforgettable roadside diner, scenic vista, or hidden gem along the way?",
    },
    {
      id: "meet",
      title: "Meet Up & Say Hello",
      emoji: "🤝",
      icon: Users,
      desc: "Just want to meet Lee and Jake, share a highway story, or snap a photo!",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !contactInfo.trim()) {
      setErrorMsg("Please provide your contact info and message details.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const offerObj = offerTypes.find((o) => o.id === selectedOffer);
    const offerTitle = offerObj ? `${offerObj.emoji} ${offerObj.title}` : "Location Recommendation";

    const res = await submitHotlineEntry({
      offerType: offerTitle,
      name: name || "Road Friend",
      city: city || "USA",
      contactInfo,
      message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setName("");
      setCity("");
      setContactInfo("");
      setMessage("");
      setTimeout(() => setSuccess(false), 7000);
    } else {
      setErrorMsg(res.error || "Submission failed. Please try again!");
    }
  };

  return (
    <section id="hotline" className="py-24 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-amber-desert/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-desert/15 border border-amber-desert/40 text-amber-desert text-xs font-mono font-bold uppercase shadow-amber-glow">
            <PhoneCall className="w-4 h-4" />
            Hitchhiker Hotline
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-parchment leading-tight">
            ARE YOU NEAR US & WOULD LIKE TO <span className="text-gradient-amber">HELP SUPPORT?</span>
          </h2>
          
          <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
            Check our current live highway location below! Please reach out if you&apos;re around the same area or highway corridor.
          </p>

          {/* Live Location Badge Card */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-asphalt-card/90 border border-amber-desert/50 shadow-amber-glow text-left mt-2">
            <div className="p-2 rounded-xl bg-amber-desert/20 text-amber-desert shrink-0">
              <MapPin className="w-5 h-5 text-amber-desert animate-bounce" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase text-amber-desert font-bold">Current Active Location</div>
              <div className="text-sm font-display font-bold text-parchment flex items-center gap-2">
                <span>📍 Los Angeles, CA (Start Line)</span>
                <span className="text-xs text-parchment-muted font-normal">• Launching Oct 1st</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Selector Cards & Submission Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left: Offer Category Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-display font-bold text-xl text-parchment flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-sunset" />
              What Are You Offering?
            </h3>

            {offerTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedOffer === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedOffer(type.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${
                    isSelected
                      ? "bg-amber-desert/15 border-amber-desert shadow-amber-glow"
                      : "bg-asphalt-card/80 border-asphalt-border hover:border-amber-desert/40"
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 ${isSelected ? "bg-amber-desert text-asphalt-darker font-bold" : "bg-asphalt-darker text-amber-desert"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-parchment">
                      {type.emoji} {type.title}
                    </div>
                    <p className="text-xs text-parchment-muted mt-1 leading-relaxed">
                      {type.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Submission Form (7 Cols) */}
          <div className="lg:col-span-7 bg-asphalt-card/90 p-6 sm:p-8 rounded-3xl border border-asphalt-border shadow-2xl relative">
            <h3 className="font-display font-bold text-2xl text-parchment mb-2">
              Send Your Offer to Lee & Jake
            </h3>
            <p className="text-xs text-parchment-muted mb-6">
              Submissions send an instant alert directly to our phones on the road.
            </p>

            {success ? (
              <div className="p-8 rounded-2xl bg-sage/15 border border-sage/40 text-center space-y-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-12 h-12 text-sage mx-auto" />
                <h4 className="font-display font-bold text-2xl text-parchment">Message Received!</h4>
                <p className="text-sm text-parchment-muted">
                  Thank you! Lee and Jake will check their hotline messages as soon as they get cell service at the next exit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-sunset/20 border border-sunset/40 text-xs font-mono text-sunset flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-parchment mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah J."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-parchment mb-1">Your City / Highway Exit</label>
                    <input
                      type="text"
                      placeholder="e.g. Barstow, CA / Exit 184"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-parchment mb-1">Phone Number or Instagram Handle *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. (555) 234-5678 or @yourname"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-parchment mb-1">Details & Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you can offer, when you'll be around, or details about the ride/spot..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-sm shadow-amber-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending to Highway Line..." : "Send Hotline Message"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
