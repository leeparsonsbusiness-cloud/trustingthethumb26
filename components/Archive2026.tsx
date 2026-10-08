"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  Car,
  Clock,
  Compass,
  Flag,
  MapPin,
  Navigation2,
} from "lucide-react";
import LookbookModal from "./LookbookModal";
import type { ArchiveMetrics, Waypoint } from "@/types/archive";

interface Archive2026Props {
  waypoints: Waypoint[];
  liveStatus: {
    currentCity: string;
    currentNote: string;
    [key: string]: unknown;
  };
  metrics: ArchiveMetrics;
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

export default function Archive2026({ waypoints, liveStatus, metrics }: Archive2026Props) {
  // Only the legs we actually travelled in 2026 (completed + the final stop)
  const stops = useMemo(
    () => waypoints.filter((w) => w.status === "completed" || w.status === "current"),
    [waypoints]
  );
  const upcoming = useMemo(() => waypoints.filter((w) => w.status === "upcoming"), [waypoints]);

  const [activeId, setActiveId] = useState<string>(stops[0]?.id ?? "");
  const [lookbookWaypoint, setLookbookWaypoint] = useState<Waypoint | null>(null);
  const [lookbookIndex, setLookbookIndex] = useState(0);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const chaptersRef = useRef<HTMLDivElement>(null);

  const openLookbook = (wp: Waypoint, index = 0) => {
    setLookbookWaypoint(wp);
    setLookbookIndex(index);
    setIsLookbookOpen(true);
  };

  // Highlight whichever chapter is crossing the middle of the screen
  useEffect(() => {
    const root = chaptersRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.chapter;
            if (id) setActiveId(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    root.querySelectorAll("[data-chapter]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [stops]);

  const jumpTo = (id: string) => {
    setActiveId(id);
    document
      .getElementById(`chapter-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const finalStop = stops[stops.length - 1];
  const maxMile = Math.max(finalStop?.mileMarker ?? 1, 1);
  const milesLeft = Math.max(metrics.totalMilesGoal - metrics.milesTraveled, 0);

  const statTiles = [
    { label: "Miles Hitched", value: metrics.milesTraveled.toLocaleString() },
    { label: "Rides Caught", value: String(metrics.ridesCaught) },
    { label: "Days on the Road", value: String(metrics.daysOnHighway) },
    { label: "States Travelled", value: String(new Set(stops.map((s) => s.state)).size) },
  ];

  return (
    <>
      {/* Legacy anchor so old #live-tracker links still land here */}
      <span id="live-tracker" className="block h-0 scroll-mt-20" aria-hidden="true" />
      <section
        id="archive"
        className="py-20 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40 scroll-mt-20"
      >
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-amber-desert/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-40 -left-40 w-[500px] h-[500px] bg-sunset/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ───────── Header ───────── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-semibold uppercase">
                <Navigation2 className="w-3.5 h-3.5" />
                2026 Archive • LA ➔ Phoenix
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment leading-[1.02]">
                THE 2026 <span className="text-gradient-amber">ARCHIVE</span>
              </h2>
              <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
                Five stops, one long road. This is the full story of our 2026 hitchhike from Los
                Angeles to Phoenix, told chapter by chapter, with every photo we took along the way.
              </p>
            </div>

            <div className="bg-asphalt-card/90 p-5 rounded-2xl border border-amber-desert/30 shadow-amber-glow lg:max-w-sm w-full">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="flex items-center gap-2 text-xs font-bold font-mono text-amber-desert">
                  <Flag className="w-3.5 h-3.5" />
                  ENDED IN {liveStatus.currentCity.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-sunset flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3" />
                  Back in 2027
                </span>
              </div>
              <p className="text-xs text-parchment-muted italic leading-relaxed">
                &quot;{liveStatus.currentNote}&quot;
              </p>
            </div>
          </div>

          {/* ───────── Stat strip ───────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {statTiles.map((tile) => (
              <div
                key={tile.label}
                className="bg-asphalt-card/80 border border-asphalt-border rounded-2xl p-4 sm:p-5 text-center shadow-asphalt-card"
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-gradient-amber">
                  {tile.value}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-parchment-muted mt-1">
                  {tile.label}
                </div>
              </div>
            ))}
          </div>

          {/* ───────── Route ribbon (chapter jump bar) ───────── */}
          <div className="bg-asphalt-card/80 border border-asphalt-border rounded-3xl p-5 sm:p-6 mb-14 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-desert font-bold">
                The Road, In Order
              </div>
              <div className="text-[11px] font-mono text-parchment-muted">
                Tap a stop to jump to its chapter
              </div>
            </div>
            <div className="overflow-x-auto -mx-2 px-2 pb-1">
              <div className="relative min-w-[600px] mx-10 h-[74px]">
                <div className="absolute left-0 right-0 top-[10px] h-1 rounded-full bg-asphalt-border/70" />
                <div
                  className="absolute left-0 top-[10px] h-1 rounded-full bg-gradient-to-r from-amber-desert to-sunset transition-all duration-500"
                  style={{
                    width: `${
                      ((stops.find((s) => s.id === activeId)?.mileMarker ?? 0) / maxMile) * 100
                    }%`,
                  }}
                />
                {stops.map((stop) => {
                  const isActive = stop.id === activeId;
                  const photoCount = stop.photos?.length ?? 0;
                  return (
                    <button
                      key={stop.id}
                      onClick={() => jumpTo(stop.id)}
                      className="absolute top-0 -translate-x-1/2 flex flex-col items-center gap-1.5 w-24 group focus:outline-none"
                      style={{ left: `${(stop.mileMarker / maxMile) * 100}%` }}
                      aria-label={`Jump to ${stop.name}`}
                    >
                      <span
                        className={`block rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "w-6 h-6 -mt-1 bg-amber-desert border-parchment shadow-amber-glow"
                            : "w-4 h-4 bg-sunset border-parchment/80 group-hover:scale-125"
                        }`}
                      />
                      <span
                        className={`text-[11px] font-display font-bold leading-tight text-center ${
                          isActive ? "text-parchment" : "text-parchment-muted group-hover:text-parchment"
                        }`}
                      >
                        {shortName(stop.name)}
                      </span>
                      <span className="text-[10px] font-mono text-parchment-muted/70 flex items-center gap-1">
                        {stop.mileMarker} mi
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
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-parchment-muted">
              <ArrowRight className="w-3.5 h-3.5 text-sage" />
              <span>
                {milesLeft.toLocaleString()} miles still to go to Ohio — the full route restarts in 2027.
              </span>
            </div>
          </div>

          {/* ───────── Chapters ───────── */}
          <div ref={chaptersRef} className="relative">
            {/* Spine */}
            <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-desert/70 via-asphalt-border to-sage/60" />

            <div className="space-y-10 sm:space-y-14">
              {stops.map((stop, i) => {
                const isActive = stop.id === activeId;
                const isFinal = i === stops.length - 1;
                const photos = stop.photos ?? [];
                const hasPhotos = photos.length > 0;
                const chapterNo = String(i + 1).padStart(2, "0");

                return (
                  <article
                    key={stop.id}
                    id={`chapter-${stop.id}`}
                    data-chapter={stop.id}
                    className="relative pl-12 sm:pl-16 scroll-mt-28"
                  >
                    {/* Spine node */}
                    <span
                      className={`absolute left-0 top-1 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 font-mono text-[11px] sm:text-xs font-black transition-all duration-300 ${
                        isActive
                          ? "bg-amber-desert text-asphalt-darker border-parchment shadow-amber-glow scale-110"
                          : "bg-asphalt-card text-amber-desert border-asphalt-border"
                      }`}
                    >
                      {isFinal ? <Flag className="w-4 h-4" /> : chapterNo}
                    </span>

                    <div
                      className={`rounded-3xl border bg-asphalt-card/80 overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "border-amber-desert/50 shadow-amber-glow"
                          : "border-asphalt-border shadow-asphalt-card"
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5">
                        {/* Photos */}
                        <div className="md:col-span-2 p-4 sm:p-5 md:pr-0">
                          {hasPhotos ? (
                            <div className="space-y-2">
                              <button
                                onClick={() => openLookbook(stop, 0)}
                                className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden border border-asphalt-border focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-desert"
                                aria-label={`Open ${shortName(stop.name)} photo lookbook`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={photos[0].url}
                                  alt={photos[0].caption || `${stop.name} photo`}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sunset text-asphalt-darker text-[11px] font-mono font-extrabold shadow-lg">
                                  <Camera className="w-3 h-3" /> {photos.length}
                                </span>
                                <span className="absolute bottom-3 left-3 right-3 text-left">
                                  {photos[0].caption && (
                                    <span className="block text-xs text-parchment leading-snug mb-1.5">
                                      {photos[0].caption}
                                    </span>
                                  )}
                                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-sunset">
                                    Open lookbook <ArrowRight className="w-3 h-3" />
                                  </span>
                                </span>
                              </button>

                              {photos.length > 1 && (
                                <div className="grid grid-cols-3 gap-2">
                                  {photos.slice(1, 4).map((p, idx) => {
                                    const realIndex = idx + 1;
                                    const extra = photos.length - 4;
                                    const showMore = idx === 2 && extra > 0;
                                    return (
                                      <button
                                        key={p.url}
                                        onClick={() => openLookbook(stop, realIndex)}
                                        className="relative aspect-square rounded-xl overflow-hidden border border-asphalt-border hover:border-amber-desert/60 transition-colors"
                                        aria-label={`Open photo ${realIndex + 1}`}
                                      >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={p.url}
                                          alt={p.caption || `${stop.name} photo ${realIndex + 1}`}
                                          loading="lazy"
                                          className="w-full h-full object-cover"
                                        />
                                        {showMore && (
                                          <span className="absolute inset-0 bg-black/65 flex items-center justify-center text-parchment font-mono font-black text-sm">
                                            +{extra}
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="aspect-[4/3] rounded-2xl border-2 border-dashed border-asphalt-border bg-asphalt-darker/50 flex flex-col items-center justify-center gap-2 text-center px-4">
                              <Camera className="w-7 h-7 text-amber-desert/60" />
                              <div className="text-xs font-display font-bold text-parchment-muted">
                                Photos coming soon
                              </div>
                              <div className="text-[11px] font-mono text-parchment-muted/60">
                                {shortName(stop.name)} lookbook
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Story */}
                        <div className="md:col-span-3 p-5 sm:p-7 flex flex-col">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-desert">
                              {isFinal ? "Final Stop • 2026" : `Chapter ${chapterNo}`}
                            </span>
                            {stop.dateCompleted && (
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-asphalt-darker border border-asphalt-border text-parchment-muted">
                                {formatDay(stop.dateCompleted)}, 2026
                              </span>
                            )}
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-asphalt-darker border border-asphalt-border text-parchment-muted inline-flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-desert" /> Mile {stop.mileMarker}
                            </span>
                          </div>

                          <h3 className="font-display font-black text-3xl sm:text-4xl text-parchment leading-tight">
                            {shortName(stop.name)}
                            <span className="text-parchment-muted/60 font-bold text-xl sm:text-2xl">
                              , {stop.state}
                            </span>
                          </h3>

                          {stop.driverName && (
                            <div className="mt-4 self-start max-w-xl bg-asphalt-darker/80 border border-amber-desert/40 rounded-2xl px-4 py-3">
                              <div className="flex items-center gap-3">
                                <Car className="w-4 h-4 text-sunset shrink-0" />
                                <div>
                                  <div className="text-[10px] font-mono uppercase tracking-wider text-sunset font-bold">
                                    Ride Hero
                                  </div>
                                  <div className="font-display font-black text-parchment leading-tight">
                                    {stop.driverName}
                                    {stop.rideVehicle && (
                                      <span className="font-mono text-[11px] font-normal text-parchment-muted ml-2">
                                        {stop.rideVehicle}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {stop.driverNotes && stop.driverNotes.length > 0 && (
                                <ul className="mt-3 pt-3 border-t border-amber-desert/20 space-y-2.5">
                                  {stop.driverNotes.map((d) => (
                                    <li
                                      key={d.name}
                                      className="text-sm text-parchment/90 leading-relaxed"
                                    >
                                      <span className="font-display font-black text-amber-desert">
                                        {d.name}:
                                      </span>{" "}
                                      {d.note}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}

                          <p
                            className={`mt-4 text-sm sm:text-base text-parchment/90 leading-relaxed ${
                              stop.driverName
                                ? "italic border-l-2 border-amber-desert/50 pl-4"
                                : ""
                            }`}
                          >
                            {stop.driverName ? <>&quot;{stop.storySnippet}&quot;</> : stop.storySnippet}
                          </p>

                          {hasPhotos && (
                            <button
                              onClick={() => openLookbook(stop, 0)}
                              className="mt-5 self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-desert to-sunset text-asphalt-darker font-display font-black text-xs shadow-amber-glow hover:scale-105 active:scale-95 transition-all"
                            >
                              <Camera className="w-4 h-4" />
                              View all {photos.length} photos
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* ───────── 2027 closing chapter ───────── */}
              <article className="relative pl-12 sm:pl-16">
                <span className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-sage bg-asphalt-darker text-sage">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div className="rounded-3xl border border-sage/40 bg-gradient-to-br from-asphalt-card via-asphalt-card to-sage/10 p-6 sm:p-8">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sage mb-2">
                    Next Chapter • 2027
                  </div>
                  <h3 className="font-display font-black text-3xl sm:text-4xl text-parchment leading-tight">
                    Round Two. <span className="text-sage">LA ➔ Ohio.</span>
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-parchment-muted leading-relaxed max-w-2xl">
                    In 2027 we start over from the very first on-ramp in Los Angeles and go all{" "}
                    {metrics.totalMilesGoal.toLocaleString()} miles to Columbus, this time better prepared.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-amber-desert/15 border border-amber-desert/40 text-amber-desert text-xs font-mono font-bold">
                      Los Angeles
                    </span>
                    {upcoming.map((u) => (
                      <React.Fragment key={u.id}>
                        <ArrowRight className="w-3.5 h-3.5 text-parchment-muted/50" />
                        <span
                          className={`px-3 py-1.5 rounded-full border text-xs font-mono font-bold ${
                            u.id === "ohio"
                              ? "bg-sage/20 border-sage/60 text-sage"
                              : "bg-asphalt-darker border-asphalt-border text-parchment-muted"
                          }`}
                        >
                          {shortName(u.name)}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>

                  <a
                    href="#countdown"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-asphalt-darker border border-sage/50 text-sage font-display font-bold text-sm hover:bg-sage/10 transition-colors"
                  >
                    See the 2027 countdown <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </div>

        <LookbookModal
          waypoint={lookbookWaypoint}
          isOpen={isLookbookOpen}
          onClose={() => setIsLookbookOpen(false)}
          initialIndex={lookbookIndex}
        />
      </section>
    </>
  );
}
