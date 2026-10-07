"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface WaypointPhoto {
  url: string;
  caption?: string;
  title?: string;
}

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
  photos?: WaypointPhoto[];
}

interface MapInnerProps {
  waypoints: Waypoint[];
  activeWaypointId: string;
  onSelectWaypoint: (wp: Waypoint) => void;
  onOpenLookbook?: (wp: Waypoint) => void;
}

export default function MapInner({ 
  waypoints, 
  activeWaypointId, 
  onSelectWaypoint,
  onOpenLookbook 
}: MapInnerProps) {
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

      // Dark theme map tile layer (ESRI Dark Gray Canvas - free, clean, dark aesthetic with no watermark or API key required)
      const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY;
      if (cartoKey) {
        L.tileLayer(`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }).addTo(map);
      } else {
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
          maxZoom: 16,
        }).addTo(map);

        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
          attribution: '',
          maxZoom: 16,
        }).addTo(map);
      }

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
    const createMarkerIcon = (status: string, id: string) => {
      if (id === "phoenix" || status === "current") {
        return L.divIcon({
          className: "pulse-marker-container cursor-pointer",
          html: `<div class="pulse-marker-ring"></div><div class="pulse-marker-dot"></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      }

      if (status === "completed") {
        return L.divIcon({
          className: "custom-completed-pin cursor-pointer",
          html: `<div style="width: 14px; height: 14px; background: #E07A5F; border: 2px solid #F4F1DE; border-radius: 50%; box-shadow: 0 0 10px rgba(224,122,95,0.6); cursor: pointer;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
      }

      return L.divIcon({
        className: "custom-upcoming-pin cursor-pointer",
        html: `<div style="width: 10px; height: 10px; background: #515E58; border: 2px solid #1F2421; border-radius: 50%; cursor: pointer;"></div>`,
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

    // Add Markers (no popup tooltip - directly opens lookbook on click)
    waypoints.forEach((wp) => {
      const marker = L.marker(wp.coordinates, {
        icon: createMarkerIcon(wp.status, wp.id),
        title: `${wp.name} — Click to view photo lookbook`,
      }).addTo(map);

      marker.on("click", () => {
        onSelectWaypoint(wp);
        if (onOpenLookbook) {
          onOpenLookbook(wp);
        }
      });
    });

    // Center Map on Active Waypoint
    const activeWp = waypoints.find((w) => w.id === activeWaypointId);
    if (activeWp) {
      map.flyTo(activeWp.coordinates, 7, { duration: 1.2 });
    }
  }, [waypoints, activeWaypointId, onSelectWaypoint, onOpenLookbook]);

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
