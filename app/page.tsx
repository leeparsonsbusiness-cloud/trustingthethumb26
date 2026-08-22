"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RouteTracker from "@/components/RouteTracker";
import OurStats from "@/components/OurStats";
import Mission from "@/components/Mission";
import OurRules from "@/components/OurRules";
import BucketList from "@/components/BucketList";
import Hotline from "@/components/Hotline";
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

      {/* Hero Section with Logo & Launch Countdown */}
      <Hero 
        metrics={config.metrics} 
        launchDate={config.launchDate}
      />

      {/* Interactive Route Map Tracker */}
      <RouteTracker
        waypoints={config.waypoints as any}
        liveStatus={config.liveStatus as any}
      />

      {/* Dedicated Journey Stats & Live Metrics Section */}
      <OurStats metrics={config.metrics} />

      {/* Deep Mission Statement & Creator Profiles */}
      <Mission />

      {/* Our Rules of the Road */}
      <OurRules />

      {/* Our Bucket List */}
      <BucketList />

      {/* Hitchhiker Hotline */}
      <Hotline />

      {/* Footer */}
      <Footer />

    </main>
  );
}
