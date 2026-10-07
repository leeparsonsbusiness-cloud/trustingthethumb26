"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Archive2026 from "@/components/Archive2026";
import Mission from "@/components/Mission";
import OurRules from "@/components/OurRules";
import MerchSection from "@/components/MerchSection";
import Footer from "@/components/Footer";

import initialTrackerConfig from "@/data/trackerConfig.json";

export default function HomePage() {
  const [config, setConfig] = useState(initialTrackerConfig);

  useEffect(() => {
    // Sync live tracker status from Telegram dispatch
    fetch("/api/tracker")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.liveStatus) {
          setConfig(data);
        }
      })
      .catch(() => {});
  }, []);

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

      {/* 2026 Archive (chapter-based journal) */}
      <Archive2026
        waypoints={config.waypoints as any}
        liveStatus={config.liveStatus as any}
        metrics={config.metrics}
      />

      {/* The Mission & Creator Profiles */}
      <Mission />

      {/* Our Rules of the Road */}
      <OurRules />

      {/* Official Merch Section */}
      <MerchSection />

      {/* Global Footer */}
      <Footer />

    </main>
  );
}

