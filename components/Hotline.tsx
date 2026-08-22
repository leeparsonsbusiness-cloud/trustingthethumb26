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
  MessageSquare,
  User,
  Phone
} from "lucide-react";
import { submitHotlineEntry } from "@/app/actions/submitHotline";

export default function Hotline() {
  const offerTypes = [
    { id: "ride", title: "Offer a Ride", icon: Car, emoji: "🚗", desc: "Can give the boys a lift along I-40 / I-44 / I-70" },
    { id: "shelter", title: "Offer Shelter / Couch", icon: Home, emoji: "🏠", desc: "A warm place to crash, shower, or pitch a tent" },
    { id: "food", title: "Buy a Meal / Coffee", icon: Utensils, emoji: "🥪", desc: "Meet at a roadside diner or buy gas station snacks" },
    { id: "spot", title: "Recommend a Cool Spot", icon: MapPin, emoji: "📍", desc: "Hidden local gems, Route 66 stops, or scenery" },
    { id: "meetup", title: "Meet Up & Say Hi", icon: Users, emoji: "🤝", desc: "Come say hello on the highway or take a photo" },
  ];

  const [selectedOffer, setSelectedOffer] = useState("ride");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
            Direct Highway Line
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment">
            HITCHHIKER <span className="text-gradient-amber">HOTLINE</span>
          </h2>
          <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
            Along the 2,000-mile route? Offer a ride, shelter, meal, recommend must-see roadside spots, or meet up with Lee and Jake!
          </p>
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

          {/* Right: Submission Form Card (7 Cols) */}
          <div className="lg:col-span-7 bg-asphalt-card rounded-3xl p-6 sm:p-8 border border-asphalt-border shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-asphalt-border/60">
              <div>
                <h3 className="font-display font-bold text-xl text-parchment">
                  Submit Hotline Message
                </h3>
                <p className="text-xs text-parchment-muted mt-0.5">
                  Lee & Jake receive hotline submissions directly on their phones.
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-amber-desert/10 border border-amber-desert/30 text-amber-desert font-mono text-xs font-bold">
                {offerTypes.find((o) => o.id === selectedOffer)?.emoji} {offerTypes.find((o) => o.id === selectedOffer)?.title}
              </span>
            </div>

            {success && (
              <div className="p-4 rounded-2xl bg-sage/20 border border-sage/50 text-sage text-sm font-semibold flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>🎉 Hotline offer sent! Lee & Jake have received your message.</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Your Name or Handle *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Miller / @marcus_drive"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Your City & State / Highway Exit *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Barstow, CA (Exit 144)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                  Phone Number, Email, or IG Handle (Private to Creators) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. (555) 234-5678 or @myhandle"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                  Offer Details / Message *
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell the brothers what you're offering (e.g. I can give you a lift from Barstow to Flagstaff, or check out this diner on Exit 82!)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-base shadow-amber-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Hotline Offer...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    <span>Send Offer To Hitchhiker Hotline</span>
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
