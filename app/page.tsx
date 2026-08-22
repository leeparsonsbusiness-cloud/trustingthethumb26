"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RouteTracker from "@/components/RouteTracker";
import Mission from "@/components/Mission";
import Footer from "@/components/Footer";

import initialTrackerConfig from "@/data/trackerConfig.json";

export default function HomePage() {
  const [config] = useState(initialTrackerConfig);

  return (
    <main className="min-h-screen bg-asphalt-darker text-parchment relative selection:bg-amber-desert/30">
      
      {/* Global Header */}
      <Header
        statusBadgeText={config.liveStatus.statusBadgeText}
        currentCity={config.liveStatus.currentCity}
      />

      {/* Hero Section with Official Logo & Live Oct 1 Countdown */}
      <Hero 
        metrics={config.metrics} 
        launchDate={config.launchDate}
      />

      {/* Interactive Route Map Tracker (Reset to LA Start Line) */}
      <RouteTracker
        waypoints={config.waypoints as any}
        liveStatus={config.liveStatus}
      />

      {/* Deep Mission Statement & Creator Profiles */}
      <Mission />

      {/* Footer */}
      <Footer />

    </main>
  );
}
