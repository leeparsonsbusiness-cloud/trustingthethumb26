"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

export default function MapInner({ waypoints, activeWaypointId, onSelectWaypoint }: MapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map instance once
    if (!mapInstanceRef.current) {
      const activeWp = waypoints.find((w) => w.id === activeWaypointId) || waypoints[1];
      
      const map = L.map(mapContainerRef.current, {
        center: activeWp.coordinates,
        zoom: 6,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // CartoDB Dark Matter Tile Layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing polylines & markers on re-render
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Custom Icon Builder
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

    // Draw Completed Route Line
    const completedCoords = waypoints
      .filter((w) => w.status === "completed" || w.status === "current")
      .map((w) => w.coordinates);

    if (completedCoords.length > 1) {
      L.polyline(completedCoords, {
        color: "#E07A5F",
        weight: 5,
        opacity: 0.9,
        lineCap: "round",
      }).addTo(map);
    }

    // Draw Upcoming Route Line
    const upcomingCoords = waypoints
      .filter((w) => w.status === "current" || w.status === "upcoming")
      .map((w) => w.coordinates);

    if (upcomingCoords.length > 1) {
      L.polyline(upcomingCoords, {
        color: "#81B29A",
        weight: 3,
        dashArray: "8, 12",
        opacity: 0.7,
        lineCap: "round",
      }).addTo(map);
    }

    // Add Markers
    waypoints.forEach((wp) => {
      const marker = L.marker(wp.coordinates, {
        icon: createMarkerIcon(wp.status),
      }).addTo(map);

      const popupContent = `
        <div style="padding: 4px; max-width: 240px; font-family: sans-serif;">
          <div style="font-weight: bold; font-size: 14px; color: #F4F1DE; border-bottom: 1px solid rgba(224,122,95,0.3); padding-bottom: 4px;">
            ${wp.name}
          </div>
          <p style="font-size: 12px; color: #D8D4BC; margin-top: 6px; line-height: 1.4;">
            "${wp.storySnippet}"
          </p>
          ${
            wp.driverName
              ? `<div style="font-size: 11px; color: #F2CC8F; margin-top: 6px; font-family: monospace;">🚗 Ride: ${wp.driverName} (${wp.rideVehicle || "Vehicle"})</div>`
              : ""
          }
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on("click", () => onSelectWaypoint(wp));
    });

    // Center Map on Active Waypoint
    const activeWp = waypoints.find((w) => w.id === activeWaypointId);
    if (activeWp) {
      map.flyTo(activeWp.coordinates, 7, { duration: 1.2 });
    }
  }, [waypoints, activeWaypointId, onSelectWaypoint]);

  // Clean cleanup on component unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100%", borderRadius: "24px" }}
      className="w-full h-full rounded-3xl overflow-hidden"
    />
  );
}
