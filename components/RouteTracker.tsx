"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { 
  MapPin, 
  Navigation2, 
  Clock, 
  Car, 
  Compass, 
  Sparkles, 
  CheckCircle2,
  ChevronRight,
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
    statusBadgeText: string;
    currentCity: string;
    currentCoordinates: [number, number];
    lastUpdated: string;
    currentNote: string;
  };
}

export default function RouteTracker({ waypoints, liveStatus }: RouteTrackerProps) {
  const currentWaypoint = waypoints.find((w) => w.status === "current") || waypoints[1];
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
              Live Route GPS & Story Log
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-parchment">
              THE 2,000 MILE <span className="text-gradient-amber">CORRIDOR</span>
            </h2>
            <p className="text-base sm:text-lg text-parchment-muted">
              Interactive map of Interstate 40 ➔ I-44 ➔ I-70. Click any waypoint to view ride snippets, driver notes, and roadside updates.
            </p>
          </div>

          {/* Current Live Status Card */}
          <div className="bg-asphalt-card/90 p-4 sm:p-5 rounded-2xl border border-amber-desert/30 shadow-amber-glow max-w-md w-full">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="flex items-center gap-2 text-xs font-bold font-mono text-sage">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sage"></span>
                </span>
                LIVE CURRENT LOCATION
              </span>
              <span className="text-[11px] font-mono text-parchment-muted flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated 1h ago
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
                <span>Current Pin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-desert inline-block" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sage inline-block" />
                <span>Upcoming</span>
              </div>
            </div>
          </div>

          {/* Right Waypoint Detail Card (4 Cols) */}
          <div className="lg:col-span-4 bg-asphalt-card/80 rounded-3xl p-6 border border-asphalt-border shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-4 border-b border-asphalt-border/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-desert" />
                <h3 className="font-display font-bold text-lg text-parchment">
                  Waypoint Detail
                </h3>
              </div>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
                selectedWaypoint.status === "current"
                  ? "bg-amber-desert/20 text-amber-desert border border-amber-desert/40"
                  : selectedWaypoint.status === "completed"
                  ? "bg-sage/20 text-sage"
                  : "bg-asphalt-darker text-parchment-muted border border-asphalt-border"
              }`}>
                {selectedWaypoint.status}
              </span>
            </div>

            {/* Waypoint Title & Location */}
            <div>
              <div className="text-2xl font-display font-black text-parchment">
                {selectedWaypoint.name}
              </div>
              <div className="text-xs font-mono text-parchment-muted mt-1 flex items-center gap-3">
                <span>Mile Marker: {selectedWaypoint.mileMarker} mi</span>
                {selectedWaypoint.dateCompleted && (
                  <span>• {selectedWaypoint.dateCompleted}</span>
                )}
              </div>
            </div>

            {/* Driver / Ride Story Info */}
            {selectedWaypoint.driverName ? (
              <div className="bg-asphalt-darker/80 p-4 rounded-2xl border border-asphalt-border space-y-2">
                <div className="text-xs font-mono uppercase text-sunset font-semibold flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5" />
                  Ride Hero Spotlight
                </div>
                <div className="text-sm font-bold text-parchment">
                  {selectedWaypoint.driverName}
                </div>
                <p className="text-xs text-parchment-muted">
                  Vehicle: <span className="text-parchment">{selectedWaypoint.rideVehicle || "Standard vehicle"}</span>
                </p>
              </div>
            ) : (
              <div className="bg-asphalt-darker/40 p-4 rounded-2xl border border-asphalt-border/40 text-xs text-parchment-muted flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-desert shrink-0" />
                <span>Upcoming stretch on the highway. Updates will post live when the boys catch a ride!</span>
              </div>
            )}

            {/* Road Log Story Snippet */}
            <div>
              <div className="text-xs font-mono text-parchment-muted uppercase tracking-wider mb-2">
                Road Story Log
              </div>
              <p className="text-sm text-parchment/90 leading-relaxed bg-asphalt-darker/60 p-4 rounded-2xl border border-asphalt-border/60">
                &quot;{selectedWaypoint.storySnippet}&quot;
              </p>
            </div>

            {/* Quick Helper Note */}
            <div className="text-[11px] font-mono text-parchment-muted text-center pt-2 border-t border-asphalt-border/40">
              💡 Creators update coordinates directly via <code className="text-amber-desert bg-asphalt-darker px-1.5 py-0.5 rounded">trackerConfig.json</code> from their mobile devices.
            </div>

          </div>

        </div>

        {/* Waypoint Timeline Carousel / Selector Strip */}
        <div className="mt-8 pt-8 border-t border-asphalt-border/40">
          <div className="text-xs font-mono text-parchment-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sunset" />
            Full Journey Waypoint Timeline
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-asphalt-border">
            {waypoints.map((wp) => {
              const isSelected = wp.id === selectedWaypoint.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWaypoint(wp)}
                  className={`shrink-0 text-left p-3.5 rounded-2xl border transition-all duration-200 min-w-[170px] ${
                    isSelected
                      ? "bg-amber-desert/15 border-amber-desert shadow-amber-glow"
                      : wp.status === "completed"
                      ? "bg-asphalt-card/70 border-asphalt-border hover:border-parchment-muted/40"
                      : wp.status === "current"
                      ? "bg-asphalt-card border-sage/60"
                      : "bg-asphalt-darker/60 border-asphalt-border/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={wp.status === "current" ? "text-sage font-bold" : "text-parchment-muted"}>
                      Mi {wp.mileMarker}
                    </span>
                    {wp.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5 text-sage" />}
                    {wp.status === "current" && <span className="w-2 h-2 rounded-full bg-amber-desert animate-ping" />}
                  </div>
                  <div className="font-bold text-xs text-parchment truncate">{wp.name}</div>
                  <div className="text-[11px] text-parchment-muted capitalize mt-0.5">{wp.status}</div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
