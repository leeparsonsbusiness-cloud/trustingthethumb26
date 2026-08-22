"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar, Rocket, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: string;
}

export default function CountdownTimer({
  targetDate = "2026-10-01T00:00:00Z",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLaunched: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isLaunched: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isLaunched) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-desert/20 border border-amber-desert text-amber-desert font-display font-bold text-lg shadow-amber-glow animate-pulse">
        <Rocket className="w-6 h-6 text-amber-desert" />
        <span>THE JOURNEY HAS BEGUN! LA ➔ OHIO</span>
      </div>
    );
  }

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-amber-desert uppercase tracking-widest">
        <Calendar className="w-4 h-4 text-amber-desert animate-pulse" />
        <span>Official Launch Countdown • October 1st, 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-asphalt-card/90 border border-amber-desert/30 rounded-2xl p-3 sm:p-4 text-center shadow-asphalt-card hover:border-amber-desert/60 transition-all group"
          >
            <div className="font-display font-black text-2xl sm:text-4xl text-parchment group-hover:text-amber-desert transition-colors font-mono">
              {String(unit.value).padStart(2, "0")}
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-parchment-muted uppercase tracking-wider mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
