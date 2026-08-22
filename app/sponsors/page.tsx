"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaDeckModal from "@/components/MediaDeckModal";
import { submitSponsorInquiry } from "@/app/actions/submitSponsor";
import { 
  Building2, 
  Send, 
  Download, 
  CheckCircle2, 
  Shirt, 
  BatteryCharging, 
  Apple, 
  Smartphone, 
  Mail, 
  User, 
  Briefcase,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function SponsorsPage() {
  const [deckModalOpen, setDeckModalOpen] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [partnershipType, setPartnershipType] = useState("Both Product & Financial");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) {
      setErrorMsg("Please fill in your company name and official contact email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const res = await submitSponsorInquiry({
      companyName,
      contactName,
      email,
      partnershipType,
      message,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setCompanyName("");
      setContactName("");
      setEmail("");
      setMessage("");
    } else {
      setErrorMsg(res.error || "Submission failed. Please try again.");
    }
  };

  const categories = [
    { icon: Shirt, title: "Outdoor & Layering Gear", examples: "Backpacks, boots, weather-proof jackets, socks" },
    { icon: BatteryCharging, title: "Portable Power & Solar", examples: "Power banks, solar chargers, rugged cables" },
    { icon: Apple, title: "Nutrition & Hydration", examples: "Energy bars, electrolyte mix, beef jerky, water filters" },
    { icon: Smartphone, title: "Travel Tech & Hardware", examples: "Action cameras, satellite communicators, audio gear" },
  ];

  return (
    <main className="min-h-screen bg-asphalt-darker text-parchment relative selection:bg-amber-desert/30">
      
      {/* Header */}
      <Header statusBadgeText="Brand Sponsorships" currentCity="Los Angeles, CA" />

      {/* Media Deck Modal */}
      <MediaDeckModal isOpen={deckModalOpen} onClose={() => setDeckModalOpen(false)} />

      <section className="pt-32 pb-24 relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-amber-desert/10 blur-[170px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-parchment-muted hover:text-amber-desert transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Trust The Thumb Home</span>
            </Link>
          </div>

          {/* Banner Callout */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-desert/15 border border-amber-desert/40 text-amber-desert text-xs font-mono font-bold uppercase shadow-amber-glow">
              <Building2 className="w-4 h-4" />
              Brand Partnerships & Sponsorship Hub
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-parchment">
              TEST YOUR GEAR <span className="text-gradient-amber">IN THE FIELD</span>
            </h1>
            
            <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
              Partner with Lee and Jake as they put products through 2,000 miles of extreme real-world highway testing starting October 1st, 2026 across TikTok, IG Reels, and YouTube.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setDeckModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-asphalt-card border border-asphalt-border text-parchment hover:text-amber-desert hover:border-amber-desert/40 text-xs font-mono font-bold transition-all shadow-inner"
              >
                <Download className="w-4 h-4 text-amber-desert" />
                <span>Download Sponsor One-Sheet / Media Deck</span>
              </button>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            <div className="bg-asphalt-card/80 p-6 rounded-3xl border border-asphalt-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-desert/15 border border-amber-desert/30 flex items-center justify-center text-amber-desert font-bold">
                01
              </div>
              <h3 className="font-display font-bold text-lg text-parchment">
                Daily Short-Form Reach
              </h3>
              <p className="text-xs text-parchment-muted leading-relaxed">
                Multiple daily video drops on TikTok, IG Reels, and YouTube Shorts reaching highly engaged outdoors, travel, and adventure audiences.
              </p>
            </div>

            <div className="bg-asphalt-card/80 p-6 rounded-3xl border border-asphalt-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sunset/15 border border-sunset/30 flex items-center justify-center text-sunset font-bold">
                02
              </div>
              <h3 className="font-display font-bold text-lg text-parchment">
                Extreme Field Testing
              </h3>
              <p className="text-xs text-parchment-muted leading-relaxed">
                No staged studio shoots—authentic, rugged integration in desert heat, mountain passes, truck stops, and roadside weather.
              </p>
            </div>

            <div className="bg-asphalt-card/80 p-6 rounded-3xl border border-asphalt-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sage/15 border border-sage/30 flex items-center justify-center text-sage font-bold">
                03
              </div>
              <h3 className="font-display font-bold text-lg text-parchment">
                High-Res Commercial Assets
              </h3>
              <p className="text-xs text-parchment-muted leading-relaxed">
                Full rights licensing for high-resolution photography and 4K cinema video deliverables ready for your brand&apos;s ad campaigns.
              </p>
            </div>
          </div>

          {/* Target Categories */}
          <div className="mb-16 max-w-5xl mx-auto">
            <h3 className="font-display font-bold text-xl text-parchment mb-6 text-center">
              Target Sponsor Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.title} className="bg-asphalt-card/60 p-5 rounded-2xl border border-asphalt-border/60 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-asphalt-darker border border-amber-desert/30 text-amber-desert shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-parchment">{cat.title}</h4>
                      <p className="text-[11px] text-parchment-muted mt-1 leading-normal">{cat.examples}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Sponsor Form Card */}
          <div className="max-w-3xl mx-auto bg-asphalt-card rounded-3xl p-6 sm:p-10 border border-asphalt-border shadow-2xl space-y-6">
            <div className="text-center space-y-2 border-b border-asphalt-border/60 pb-6">
              <h3 className="font-display font-bold text-2xl text-parchment">
                Submit Brand Partnership Inquiry
              </h3>
              <p className="text-xs text-parchment-muted font-mono">
                Direct line to Lee & Jake&apos;s management. Responded within 24h.
              </p>
            </div>

            {success && (
              <div className="p-4 rounded-2xl bg-sage/20 border border-sage/50 text-sage text-sm font-semibold flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Inquiry received! The brothers will review your proposal and email back shortly.</span>
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
                    Company / Brand Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patagonia / Anker Solar"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Contact Person Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera (Marketing Lead)"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Official Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="alex@brand.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                    Partnership Type
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-parchment-muted absolute left-3.5 top-3" />
                    <select
                      value={partnershipType}
                      onChange={(e) => setPartnershipType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors appearance-none"
                    >
                      <option value="Both Product & Financial">Both Product & Financial</option>
                      <option value="Product / Gear Gift Only">Product / Gear Gift Only</option>
                      <option value="Financial / Episode Sponsor">Financial / Episode Sponsor</option>
                      <option value="Content Licensing">Content Licensing</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-parchment-muted uppercase tracking-wider mb-1.5">
                  Partnership Details / Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your brand, what gear/support you'd like to provide, or timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:outline-none focus:border-amber-desert transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-base shadow-amber-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Proposal...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 stroke-[2.5]" />
                    <span>Send Sponsorship Proposal</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
