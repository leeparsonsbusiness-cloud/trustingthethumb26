"use client";

import React, { useEffect, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";
import { incrementWeeklyViews } from "@/app/actions/getWeeklyViews";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function trackView() {
      const res = await incrementWeeklyViews();
      if (res.success) {
        setViews(res.count);
      }
    }
    trackView();
  }, []);

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-asphalt-card/90 border border-asphalt-border text-xs font-mono text-parchment-muted shadow-lg">
      <Eye className="w-4 h-4 text-amber-desert animate-pulse" />
      <span className="font-bold text-parchment">
        {views !== null ? views.toLocaleString() : "..."} Views This Week
      </span>
      <span className="text-amber-desert/60">•</span>
      <span className="text-[11px] text-parchment-muted flex items-center gap-1">
        <RefreshCw className="w-3 h-3 text-amber-desert" />
        Resets Weekly
      </span>
    </div>
  );
}
