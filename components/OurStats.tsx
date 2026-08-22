"use client";

import React from "react";
import { 
  MapPin, 
  Users, 
  Car, 
  Utensils, 
  Home, 
  DollarSign, 
  Flame,
  Activity
} from "lucide-react";

interface MetricsData {
  milesTraveled: number;
  totalMilesGoal: number;
  peopleMet: number;
  ridesTaken: number;
  mealsShared: number;
  placesStayed: number;
  moneySpent: number;
}

interface OurStatsProps {
  metrics: MetricsData;
}

export default function OurStats({ metrics }: OurStatsProps) {
  const statCards = [
    {
      id: "miles",
      label: "Miles Travelled",
      value: `${metrics.milesTraveled.toLocaleString()} mi`,
      subText: `Goal: ${metrics.totalMilesGoal.toLocaleString()} mi`,
      icon: MapPin,
      color: "text-amber-desert",
      border: "hover:border-amber-desert/50",
      bg: "bg-amber-desert/10",
    },
    {
      id: "people",
      label: "People Met",
      value: `${metrics.peopleMet} people`,
      subText: "Drivers, diners & roadside friends",
      icon: Users,
      color: "text-sunset",
      border: "hover:border-sunset/50",
      bg: "bg-sunset/10",
    },
    {
      id: "rides",
      label: "Rides Taken",
      value: `${metrics.ridesTaken} rides`,
      subText: "Highway lifts & truck bed rides",
      icon: Car,
      color: "text-amber-desert",
      border: "hover:border-amber-desert/50",
      bg: "bg-amber-desert/10",
    },
    {
      id: "meals",
      label: "Meals Shared",
      value: `${metrics.mealsShared} meals`,
      subText: "Diner coffee, burgers & road snacks",
      icon: Utensils,
      color: "text-sage",
      border: "hover:border-sage/50",
      bg: "bg-sage/10",
    },
    {
      id: "places",
      label: "Places Stayed",
      value: `${metrics.placesStayed} spots`,
      subText: "Tents, couches & truck stop rests",
      icon: Home,
      color: "text-sunset",
      border: "hover:border-sunset/50",
      bg: "bg-sunset/10",
    },
    {
      id: "money",
      label: "Money Spent",
      value: `$${metrics.moneySpent.toLocaleString()}`,
      subText: "Total personal funds spent",
      icon: DollarSign,
      color: "text-sage",
      border: "hover:border-sage/50",
      bg: "bg-sage/10",
    },
  ];

  return (
    <section id="our-stats" className="py-20 bg-asphalt-darker relative overflow-hidden border-t border-asphalt-border/40">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-desert/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-asphalt-card border border-asphalt-border text-amber-desert text-xs font-mono font-bold uppercase shadow-inner">
            <Activity className="w-4 h-4 text-amber-desert animate-pulse" />
            Real-Time Highway Metrics
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black text-parchment">
            OUR <span className="text-gradient-amber">JOURNEY STATS</span>
          </h2>
          <p className="text-base sm:text-lg text-parchment-muted leading-relaxed">
            Live numbers updated by Lee and Jake directly from the road as they hitchhike 2,000 miles across America.
          </p>
        </div>

        {/* 6 Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`bg-asphalt-card/90 rounded-3xl p-6 sm:p-8 border border-asphalt-border ${stat.border} transition-all duration-300 shadow-xl space-y-4 group hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-parchment-muted">
                    {stat.label}
                  </span>
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>

                <div>
                  <div className="font-display font-black text-3xl sm:text-5xl text-parchment tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-xs text-parchment-muted mt-2 font-mono flex items-center gap-1">
                    <span>{stat.subText}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Update Banner Note */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-asphalt-card/60 border border-asphalt-border/60 text-xs font-mono text-parchment-muted">
            <Flame className="w-4 h-4 text-amber-desert" />
            <span>Updated live starting October 1st launch from Los Angeles, CA</span>
          </div>
        </div>

      </div>
    </section>
  );
}
