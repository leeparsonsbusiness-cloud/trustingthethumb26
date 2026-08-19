"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RouteTracker from "@/components/RouteTracker";
import Mission from "@/components/Mission";
import TipJar from "@/components/TipJar";
import SupportersWall from "@/components/SupportersWall";
import SponsorHub from "@/components/SponsorHub";
import Footer from "@/components/Footer";

import initialTrackerConfig from "@/data/trackerConfig.json";
import initialTrailNotes from "@/data/trailNotes.json";
import type { TrailNote } from "@/app/actions/submitNote";

export default function HomePage() {
  const [config, setConfig] = useState(initialTrackerConfig);
  const [trailNotes, setTrailNotes] = useState<TrailNote[]>(initialTrailNotes as TrailNote[]);

  const handleNoteAdded = (newNote: TrailNote) => {
    setTrailNotes((prev) => [newNote, ...prev]);
  };

  return (
    <main className="min-h-screen bg-asphalt-darker text-parchment relative selection:bg-amber-desert/30">
      
      {/* Global Header */}
      <Header
        statusBadgeText={config.liveStatus.statusBadgeText}
        statusType={config.liveStatus.statusType}
        currentCity={config.liveStatus.currentCity}
      />

      {/* Hero Section */}
      <Hero metrics={config.metrics} />

      {/* Interactive Route Map Tracker */}
      <RouteTracker
        waypoints={config.waypoints as any}
        liveStatus={config.liveStatus}
      />

      {/* The Mission & Thesis */}
      <Mission />

      {/* Community Tip Jar */}
      <TipJar onNoteAdded={handleNoteAdded} />

      {/* Supporters Wall Feed */}
      <SupportersWall initialNotes={trailNotes} />

      {/* Brand Partnerships & Sponsorship Hub */}
      <SponsorHub />

      {/* Footer */}
      <Footer />

    </main>
  );
}
