"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { 
  MapPin, 
  Navigation2, 
  Clock, 
  Car, 
  Compass, 
  Info
} from "lucide-react";
import type { Waypoint } from "./MapInner";

// Dynamic import for Leaflet map component with ssr disabled
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[450px] bg-asphalt-card/60 rounded-3xl animate-pulse flex flex-col items-center justify-center border border-asphalt-border gap-3 text-parchment-muted">
      <Compass className="w-8 h-8 animate-spin text-amber-desert" />
      <span className="text-sm font-mono">Loading Interactive Highway Tracker...</span>
    </div>
  ),
});

interface RouteTrackerProps {
  waypoints: Waypoint[];
  liveStatus: {
    state?: string;
    statusBadgeText: string;
    currentCity: string;
    currentCoordinates: [number, number] | number[] | any;
    lastUpdated: string;
    currentNote: string;
  };
}

export default function RouteTracker({ waypoints, liveStatus }: RouteTrackerProps) {
  const currentWaypoint = waypoints.find((w) => w.status === "current") || waypoints[0];
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint>(currentWaypoint);

  return (
    <section id="live-tracker" className="py-20 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Background accents */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-desert/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
              <Navigation2 className="w-3.5 h-3.5" />
              Route GPS & Expedition Log
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-parchment">
              THE 2,000 MILE <span className="text-gradient-amber">CORRIDOR</span>
            </h2>
            <p className="text-base sm:text-lg text-parchment-muted">
              Interactive map of our cross-country route. Our 2026 expedition reached Phoenix, Arizona before concluding due to unexpected circumstances and lack of preparation. We are regrouping and starting the complete route from LA to Ohio over again in 2027.
            </p>
          </div>

          {/* Current Live Status Card */}
          <div className="bg-asphalt-card/90 p-4 sm:p-5 rounded-2xl border border-amber-desert/30 shadow-amber-glow max-w-md w-full">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="flex items-center gap-2 text-xs font-bold font-mono text-amber-desert">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-desert"></span>
                </span>
                JOURNEY CONCLUDED IN PHOENIX, AZ
              </span>
              <span className="text-[11px] font-mono text-sunset flex items-center gap-1 font-semibold">
                <Clock className="w-3 h-3" />
                Returning 2027
              </span>
            </div>
            <div className="font-display font-bold text-xl text-parchment flex items-center justify-between">
              <span>{liveStatus.currentCity}</span>
              <span className="text-xs font-mono text-amber-desert">Mile {currentWaypoint.mileMarker}</span>
            </div>
            <p className="text-xs text-parchment-muted mt-1.5 italic bg-asphalt-darker/60 p-2.5 rounded-xl border border-asphalt-border/40">
              &quot;{liveStatus.currentNote}&quot;
            </p>
          </div>
        </div>

        {/* Grid: Map + Active Waypoint Story Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Map Area (8 Cols) */}
          <div className="lg:col-span-8 h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border border-asphalt-border shadow-2xl relative">
            <MapInner
              waypoints={waypoints}
              activeWaypointId={selectedWaypoint.id}
              onSelectWaypoint={(wp) => setSelectedWaypoint(wp)}
            />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-asphalt-darker/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-asphalt-border text-[11px] font-mono text-parchment-muted flex items-center gap-4 shadow-lg">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-desert inline-block" />
                <span>2026 Route (LA ➔ Phoenix)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sage inline-block" />
                <span>2027 Restart Route (➔ Ohio)</span>
              </div>
            </div>
          </div>

          {/* Right Waypoint Detail Card (4 Cols) */}
          <div className="lg:col-span-4 bg-asphalt-card/80 rounded-3xl p-6 border border-asphalt-border shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-4 border-b border-asphalt-border/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-desert" />
                <h3 className="font-display font-bold text-lg text-parchment">
                  Waypoint Preview
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full font-bold uppercase bg-amber-desert/20 text-amber-desert border border-amber-desert/40">
                {selectedWaypoint.id === "phoenix"
                  ? "2026 Final Stop"
                  : selectedWaypoint.status === "completed"
                  ? "Completed Leg"
                  : selectedWaypoint.status === "current"
                  ? "Current Stop"
                  : "Upcoming in 2027"}
              </span>
            </div>

            {/* Waypoint Title & Location */}
            <div>
              <div className="text-2xl font-display font-black text-parchment">
                {selectedWaypoint.name}
              </div>
              <div className="text-xs font-mono text-parchment-muted mt-1 flex items-center gap-3">
                <span>Mile Marker: {selectedWaypoint.mileMarker} mi</span>
              </div>
            </div>

            {/* Driver / Ride Story Info */}
            {selectedWaypoint.driverName ? (
              <div className="bg-asphalt-darker/80 p-5 rounded-2xl border border-amber-desert/40 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase text-sunset font-bold flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-sunset" />
                    Ride Hero Spotlight
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-desert/15 text-amber-desert font-bold">
                    Highway Hero
                  </span>
                </div>
                <div>
                  <div className="text-xl font-display font-black text-parchment">
                    {selectedWaypoint.driverName}
                  </div>
                  {selectedWaypoint.rideVehicle && (
                    <p className="text-xs font-mono text-amber-desert mt-0.5">
                      Ride: <span className="text-parchment">{selectedWaypoint.rideVehicle}</span>
                    </p>
                  )}
                </div>
                <div className="pt-2 border-t border-asphalt-border/50 space-y-1.5">
                  <div className="text-[11px] font-mono text-parchment-muted uppercase tracking-wider">
                    Story & Description
                  </div>
                  <p className="text-xs sm:text-sm text-parchment/90 leading-relaxed italic bg-asphalt-card/60 p-3.5 rounded-xl border border-asphalt-border/60">
                    &quot;{selectedWaypoint.storySnippet}&quot;
                  </p>
                </div>
              </div>
            ) : selectedWaypoint.id === "phoenix" ? (
              <div className="bg-amber-desert/10 p-4 rounded-2xl border border-amber-desert/30 text-xs text-amber-desert space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>2026 Concluded Stop</span>
                </div>
                <p className="text-parchment-muted">
                  Journey concluded here due to lack of preparation and unforeseen circumstances. The entire route restarts from LA in 2027!
                </p>
              </div>
            ) : (
              <div className="bg-asphalt-darker/40 p-4 rounded-2xl border border-asphalt-border/40 text-xs text-parchment-muted flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-desert shrink-0" />
                <span>Target waypoint for our 2027 fresh start from Los Angeles to Ohio!</span>
              </div>
            )}

            {/* Road Log Story Snippet */}
            {!selectedWaypoint.driverName && (
              <div>
                <div className="text-xs font-mono text-parchment-muted uppercase tracking-wider mb-2">
                  Leg Overview
                </div>
                <p className="text-sm text-parchment/90 leading-relaxed bg-asphalt-darker/60 p-4 rounded-2xl border border-asphalt-border/60">
                  &quot;{selectedWaypoint.storySnippet}&quot;
                </p>
              </div>
            )}

            {/* Quick Helper Note */}
            <div className="text-[11px] font-mono text-parchment-muted text-center pt-2 border-t border-asphalt-border/40">
              💡 Route log: 2026 expedition concluded in Phoenix, AZ. Full 2,000-mile LA ➔ Ohio journey restarts in 2027.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
