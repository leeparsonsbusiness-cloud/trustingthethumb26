"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, Camera, Car } from "lucide-react";
import type { Waypoint } from "./MapInner";

interface TimelineScrubberProps {
  waypoints: Waypoint[];
  selectedId: string;
  onSelect: (wp: Waypoint) => void;
  onOpenLookbook: (wp: Waypoint) => void;
}

function formatDay(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function shortName(name: string): string {
  return name.replace(/\s*\(.*?\)\s*/g, "").split(",")[0].trim();
}

/**
 * Chronological story scrubber for the 2026 archive.
 * Only shows legs that were actually travelled (completed + final stop).
 */
export default function TimelineScrubber({
  waypoints,
  selectedId,
  onSelect,
  onOpenLookbook,
}: TimelineScrubberProps) {
  const stops = useMemo(
    () => waypoints.filter((w) => w.status === "completed" || w.status === "current"),
    [waypoints]
  );

  if (stops.length === 0) return null;

  const foundIndex = stops.findIndex((s) => s.id === selectedId);
  const activeIndex = foundIndex === -1 ? 0 : foundIndex;
  const active = stops[activeIndex];
  const lastIndex = stops.length - 1;
  const progressPct = lastIndex === 0 ? 100 : (activeIndex / lastIndex) * 100;

  const go = (i: number) => {
    const next = stops[Math.min(Math.max(i, 0), lastIndex)];
    if (next) onSelect(next);
  };

  return (
    <div className="mt-8 bg-asphalt-card/80 rounded-3xl p-5 sm:p-6 border border-asphalt-border shadow-xl">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-desert font-bold">
            Story Timeline
          </div>
          <div className="text-xs font-mono text-parchment-muted mt-0.5">
            Stop {activeIndex + 1} of {stops.length} • Drag the slider or tap a stop to relive the road in order
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="p-2 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment hover:border-amber-desert/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous stop"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(activeIndex + 1)}
            disabled={activeIndex === lastIndex}
            className="p-2 rounded-xl bg-asphalt-darker border border-asphalt-border text-parchment hover:border-amber-desert/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next stop"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Track + nodes */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="relative min-w-[520px] px-6 pt-2 pb-1">
          {/* Base track */}
          <div className="absolute left-6 right-6 top-[18px] h-1 rounded-full bg-asphalt-border/70" />
          {/* Progress track */}
          <div
            className="absolute left-6 top-[18px] h-1 rounded-full bg-gradient-to-r from-amber-desert to-sunset transition-all duration-500"
            style={{ width: `calc((100% - 3rem) * ${progressPct / 100})` }}
          />

          <div className="relative flex items-start justify-between">
            {stops.map((stop, i) => {
              const isActive = i === activeIndex;
              const isPast = i <= activeIndex;
              const photoCount = stop.photos?.length || 0;
              return (
                <button
                  key={stop.id}
                  onClick={() => onSelect(stop)}
                  className="group flex flex-col items-center gap-2 w-24 -mx-2 focus:outline-none"
                  aria-label={`Go to ${stop.name}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`relative z-10 block rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "w-5 h-5 bg-amber-desert border-parchment shadow-amber-glow scale-110"
                        : isPast
                        ? "w-4 h-4 bg-sunset border-parchment/80 group-hover:scale-110"
                        : "w-4 h-4 bg-asphalt-darker border-asphalt-border group-hover:border-amber-desert/60"
                    }`}
                    style={{ marginTop: isActive ? 0 : 2 }}
                  />
                  <span
                    className={`text-[11px] sm:text-xs font-display font-bold text-center leading-tight ${
                      isActive ? "text-parchment" : "text-parchment-muted group-hover:text-parchment"
                    }`}
                  >
                    {shortName(stop.name)}
                  </span>
                  <span className="text-[10px] font-mono text-parchment-muted/70 flex items-center gap-1">
                    {formatDay(stop.dateCompleted) || `Mile ${stop.mileMarker}`}
                    {photoCount > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-amber-desert">
                        <Camera className="w-2.5 h-2.5" />
                        {photoCount}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrubber slider */}
      <div className="mt-4 px-1">
        <input
          type="range"
          min={0}
          max={lastIndex}
          step={1}
          value={activeIndex}
          onChange={(e) => go(parseInt(e.target.value, 10))}
          className="w-full accent-amber-desert cursor-pointer"
          aria-label="Scrub through 2026 journey stops"
        />
      </div>

      {/* Active stop summary */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-asphalt-darker/60 border border-asphalt-border/60 rounded-2xl p-4">
        <div className="min-w-0">
          <div className="font-display font-black text-parchment text-base sm:text-lg truncate">
            {active.name}
          </div>
          <div className="text-xs font-mono text-parchment-muted flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span>Mile {active.mileMarker}</span>
            {active.dateCompleted && <span>{formatDay(active.dateCompleted)}, 2026</span>}
            {active.driverName && (
              <span className="inline-flex items-center gap-1 text-amber-desert font-semibold">
                <Car className="w-3 h-3" /> Ride: {active.driverName}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onOpenLookbook(active)}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-black text-xs shadow-amber-glow hover:scale-105 active:scale-95 transition-all"
        >
          <Camera className="w-4 h-4" />
          {active.photos && active.photos.length > 0
            ? `Open Lookbook (${active.photos.length})`
            : "Open Stop Lookbook"}
        </button>
      </div>
    </div>
  );
}
