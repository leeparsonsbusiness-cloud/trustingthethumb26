"use client";

import React, { useState } from "react";
import { 
  Car, 
  MapPin, 
  Quote, 
  PlusCircle, 
  CheckCircle2, 
  Send, 
  X, 
  Heart,
  MessageSquare
} from "lucide-react";
import { submitDriverStory, DriverStory } from "@/app/actions/submitDriverStory";

interface DriverStoriesProps {
  initialStories?: DriverStory[];
}

export default function DriverStories({ initialStories = [] }: DriverStoriesProps) {
  const [stories, setStories] = useState<DriverStory[]>(initialStories);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    driverName: "",
    locationSegment: "",
    vehicleType: "",
    storyText: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.storyText.trim()) return;

    setSubmitting(true);
    const res = await submitDriverStory(formData);
    setSubmitting(false);

    if (res.success && res.story) {
      setStories([res.story, ...stories]);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setModalOpen(false);
        setFormData({ driverName: "", locationSegment: "", vehicleType: "", storyText: "" });
      }, 2000);
    }
  };

  return (
    <section id="driver-stories" className="py-24 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-amber-desert/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-bold uppercase">
              <Car className="w-4 h-4 text-amber-desert" />
              Highway Chronicles
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment">
              DRIVERS <span className="text-gradient-amber">STORIES</span>
            </h2>
            <p className="text-base sm:text-lg text-parchment-muted leading-relaxed max-w-2xl">
              Tales, memories, and reflections directly from the generous drivers who pulled over and gave Lee and Jake a ride.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-sm shadow-amber-glow hover:scale-105 transition-transform flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Share Your Driver Story</span>
          </button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-asphalt-card/90 rounded-3xl p-8 border border-asphalt-border hover:border-amber-desert/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group"
            >
              <div className="space-y-4">
                
                {/* Top Badge: Driver Name & Vehicle */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-xl text-parchment group-hover:text-amber-desert transition-colors">
                      {story.driverName}
                    </h3>
                    <div className="text-xs font-mono text-amber-desert flex items-center gap-1.5 mt-0.5">
                      <Car className="w-3.5 h-3.5" />
                      <span>{story.vehicleType}</span>
                    </div>
                  </div>

                  <span className="p-2 rounded-xl bg-amber-desert/10 border border-amber-desert/30 text-amber-desert">
                    <Quote className="w-4 h-4" />
                  </span>
                </div>

                {/* Location Segment */}
                <div className="px-3 py-1.5 rounded-xl bg-asphalt-darker border border-asphalt-border/60 text-xs font-mono text-parchment-muted flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sunset shrink-0" />
                  <span className="truncate">{story.locationSegment}</span>
                </div>

                {/* Story Body */}
                <p className="text-sm text-parchment-muted leading-relaxed italic">
                  &quot;{story.storyText}&quot;
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="pt-4 border-t border-asphalt-border/40 flex items-center justify-between text-xs font-mono text-parchment-muted">
                <span className="flex items-center gap-1 text-sage">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Driver
                </span>
                <span>{story.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Share Story Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-asphalt-darker/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-asphalt-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-amber-desert/40 shadow-2xl space-y-6 relative">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-asphalt-darker text-parchment-muted hover:text-amber-desert border border-asphalt-border"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-desert/15 border border-amber-desert/30 text-amber-desert flex items-center justify-center shadow-amber-glow">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-parchment">
                Submit Your Driver Story
              </h3>
              <p className="text-xs text-parchment-muted leading-relaxed">
                Did you pick up Lee and Jake on the highway? Share your memory or message below to be featured on the site!
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-sage/15 border border-sage/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-sage mx-auto" />
                <h4 className="font-display font-bold text-lg text-parchment">Story Submitted!</h4>
                <p className="text-xs text-parchment-muted">Thank you for backing Lee and Jake on the road!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-parchment mb-1">Your Name / Alias</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={formData.driverName}
                    onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-parchment mb-1">Highway / Route Segment</label>
                    <input
                      type="text"
                      placeholder="e.g. Barstow to Kingman"
                      value={formData.locationSegment}
                      onChange={(e) => setFormData({ ...formData, locationSegment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-parchment mb-1">Vehicle / Rig</label>
                    <input
                      type="text"
                      placeholder="e.g. Ford F-150 Truck"
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-parchment mb-1">Your Story & Road Experience</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what inspired you to pull over, what you talked about, or a message for the brothers..."
                    value={formData.storyText}
                    onChange={(e) => setFormData({ ...formData, storyText: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment text-sm focus:border-amber-desert focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-bold text-sm shadow-amber-glow hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Publishing Story..." : "Submit Driver Story"}</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
