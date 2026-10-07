"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Sparkles, Car } from "lucide-react";

export interface WaypointPhoto {
  url: string;
  caption?: string;
  title?: string;
}

export interface LookbookWaypoint {
  id: string;
  name: string;
  state: string;
  mileMarker: number;
  status: "completed" | "current" | "upcoming";
  dateCompleted?: string | null;
  storySnippet: string;
  driverName?: string | null;
  rideVehicle?: string | null;
  photos?: WaypointPhoto[];
}

interface LookbookModalProps {
  waypoint: LookbookWaypoint | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LookbookModal({ waypoint, isOpen, onClose }: LookbookModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset active index when opened with a new waypoint
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen, waypoint?.id]);

  const photos = waypoint?.photos || [];
  const hasPhotos = photos.length > 0;

  const handlePrev = useCallback(() => {
    if (!hasPhotos) return;
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [hasPhotos, photos.length]);

  const handleNext = useCallback(() => {
    if (!hasPhotos) return;
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [hasPhotos, photos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !waypoint) return null;

  const currentPhoto = hasPhotos ? photos[activeIndex] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-asphalt-darker/95 border border-amber-desert/40 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-asphalt-border/70 bg-asphalt-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-desert/15 border border-amber-desert/40 flex items-center justify-center text-amber-desert shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-lg sm:text-xl text-parchment leading-tight">
                  {waypoint.name}
                </h3>
                <span className="text-[10px] sm:text-xs font-mono uppercase px-2 py-0.5 rounded-full font-bold bg-amber-desert/20 text-amber-desert border border-amber-desert/40">
                  {waypoint.id === "phoenix"
                    ? "2026 Final Stop"
                    : waypoint.status === "completed"
                    ? "Lookbook"
                    : waypoint.status === "current"
                    ? "Current Stop"
                    : "Upcoming"}
                </span>
              </div>
              <div className="text-xs font-mono text-parchment-muted flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-desert" /> Mile {waypoint.mileMarker}
                </span>
                {waypoint.driverName && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-desert font-semibold">
                      <Car className="w-3 h-3" /> Ride: {waypoint.driverName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-mono text-parchment-muted/60 mr-1">
              Esc to close
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-asphalt-card border border-asphalt-border text-parchment-muted hover:text-parchment hover:border-amber-desert/50 transition-colors"
              aria-label="Close lookbook"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
          {hasPhotos ? (
            <>
              {/* Main Photo Viewer */}
              <div className="relative w-full bg-asphalt-darker rounded-2xl overflow-hidden border border-asphalt-border/80 flex items-center justify-center min-h-[300px] sm:min-h-[440px] max-h-[62vh]">
                <img
                  src={currentPhoto?.url}
                  alt={currentPhoto?.caption || `${waypoint.name} photo ${activeIndex + 1}`}
                  className="max-h-[60vh] w-auto max-w-full object-contain mx-auto select-none transition-all duration-300"
                />

                {/* Photo Counter Pill */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-parchment font-semibold shadow-lg">
                  {activeIndex + 1} / {photos.length}
                </div>

                {/* Prev & Next Floating Buttons */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-amber-desert hover:text-asphalt-darker text-parchment border border-white/20 hover:border-amber-desert transition-all shadow-xl"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-amber-desert hover:text-asphalt-darker text-parchment border border-white/20 hover:border-amber-desert transition-all shadow-xl"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption & Location Context */}
              <div className="bg-asphalt-card/70 border border-asphalt-border/60 rounded-2xl p-4 space-y-2">
                {currentPhoto?.caption && (
                  <p className="text-sm sm:text-base font-medium text-parchment leading-relaxed">
                    📸 {currentPhoto.caption}
                  </p>
                )}
                {waypoint.storySnippet && (
                  <p className="text-xs sm:text-sm text-parchment-muted italic border-t border-asphalt-border/40 pt-2 leading-relaxed">
                    &quot;{waypoint.storySnippet}&quot;
                  </p>
                )}
              </div>

              {/* Thumbnail Strip */}
              {photos.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                  {photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        idx === activeIndex
                          ? "border-amber-desert shadow-amber-glow scale-105"
                          : "border-asphalt-border/70 opacity-60 hover:opacity-100 hover:border-parchment/40"
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Empty State for waypoints without uploaded photos yet */
            <div className="py-12 sm:py-16 text-center space-y-4 px-4 bg-asphalt-card/40 rounded-2xl border border-asphalt-border/50">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-desert/10 border border-amber-desert/30 flex items-center justify-center text-amber-desert shadow-amber-glow">
                <Camera className="w-8 h-8 opacity-80" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="font-display font-bold text-lg text-parchment">
                  Photos Coming Soon!
                </h4>
                <p className="text-xs sm:text-sm text-parchment-muted leading-relaxed">
                  We are organizing our highway camera roll for <span className="text-parchment font-semibold">{waypoint.name}</span>. Photos and moments from this leg will be posted here as soon as they are uploaded.
                </p>
              </div>

              {waypoint.storySnippet && (
                <div className="max-w-lg mx-auto mt-4 bg-asphalt-darker/60 p-4 rounded-xl border border-asphalt-border/60 text-xs sm:text-sm text-parchment-muted italic text-left">
                  <div className="font-mono text-[10px] text-amber-desert uppercase tracking-wider mb-1 not-italic">
                    Road Log
                  </div>
                  &quot;{waypoint.storySnippet}&quot;
                </div>
              )}

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-xs font-mono text-parchment-muted">
                  <Sparkles className="w-3.5 h-3.5 text-amber-desert" />
                  Follow along live as we journey across America
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-asphalt-border/60 bg-asphalt-card/40 flex items-center justify-between text-xs font-mono text-parchment-muted">
          <span>Trust The Thumb Lookbook</span>
          <button
            onClick={onClose}
            className="text-amber-desert hover:text-amber-desert/80 font-bold"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
