"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

export interface Waypoint {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  status: "completed" | "current" | "upcoming";
  mileMarker: number;
  dateCompleted: string | null;
  storySnippet: string;
  driverName?: string | null;
  rideVehicle?: string | null;
}

interface MapInnerProps {
  waypoints: Waypoint[];
  activeWaypointId: string;
  onSelectWaypoint: (wp: Waypoint) => void;
}

// Helper component to center map on active waypoint selection
function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 7, { duration: 1.2 });
  }, [center, map]);
  return null;
}

export default function MapInner({ waypoints, activeWaypointId, onSelectWaypoint }: MapInnerProps) {
  const activeWp = waypoints.find((w) => w.id === activeWaypointId) || waypoints[1];

  // Custom Icon Builders
  const createMarkerIcon = (status: string) => {
    if (status === "current") {
      return L.divIcon({
        className: "pulse-marker-container",
        html: `<div class="pulse-marker-ring"></div><div class="pulse-marker-dot"></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
    }

    if (status === "completed") {
      return L.divIcon({
        className: "custom-completed-pin",
        html: `<div style="width: 14px; height: 14px; background: #E07A5F; border: 2px solid #F4F1DE; border-radius: 50%; box-shadow: 0 0 10px rgba(224,122,95,0.6);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
    }

    return L.divIcon({
      className: "custom-upcoming-pin",
      html: `<div style="width: 10px; height: 10px; background: #515E58; border: 2px solid #1F2421; border-radius: 50%;"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });
  };

  // Build Polylines: completed line & upcoming line
  const completedCoords: [number, number][] = waypoints
    .filter((w) => w.status === "completed" || w.status === "current")
    .map((w) => w.coordinates);

  const upcomingCoords: [number, number][] = waypoints
    .filter((w) => w.status === "current" || w.status === "upcoming")
    .map((w) => w.coordinates);

  return (
    <MapContainer
      center={activeWp.coordinates}
      zoom={6}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%", borderRadius: "24px" }}
    >
      {/* Dark modern map tile layer (CartoDB Dark Matter) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <MapRecenter center={activeWp.coordinates} />

      {/* Completed Polyline - Solid Amber Glow */}
      {completedCoords.length > 1 && (
        <Polyline
          positions={completedCoords}
          pathOptions={{
            color: "#E07A5F",
            weight: 5,
            opacity: 0.9,
            lineCap: "round",
          }}
        />
      )}

      {/* Upcoming Polyline - Dashed Muted Asphalt Line */}
      {upcomingCoords.length > 1 && (
        <Polyline
          positions={upcomingCoords}
          pathOptions={{
            color: "#81B29A",
            weight: 3,
            dashArray: "8, 12",
            opacity: 0.7,
            lineCap: "round",
          }}
        />
      )}

      {/* Waypoint Markers */}
      {waypoints.map((wp) => (
        <Marker
          key={wp.id}
          position={wp.coordinates}
          icon={createMarkerIcon(wp.status)}
          eventHandlers={{
            click: () => onSelectWaypoint(wp),
          }}
        >
          <Popup>
            <div className="p-2 space-y-1.5 max-w-xs font-sans">
              <div className="flex items-center justify-between border-b border-asphalt-border/60 pb-1">
                <span className="font-bold text-sm text-parchment">{wp.name}</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                  wp.status === "current"
                    ? "bg-amber-desert/20 text-amber-desert border border-amber-desert/40"
                    : wp.status === "completed"
                    ? "bg-sage/20 text-sage"
                    : "bg-asphalt-card text-parchment-muted"
                }`}>
                  {wp.status === "current" ? "📍 Current Stop" : wp.status === "completed" ? "✓ Visited" : "Upcoming"}
                </span>
              </div>
              <p className="text-xs text-parchment-muted leading-relaxed">{wp.storySnippet}</p>
              {wp.driverName && (
                <div className="text-[11px] text-sunset font-mono pt-1">
                  🚗 Ride: {wp.driverName} ({wp.rideVehicle || "Vehicle"})
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
