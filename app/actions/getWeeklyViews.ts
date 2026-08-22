"use server";

import fs from "fs/promises";
import path from "path";

const VIEW_FILE = path.join(process.cwd(), "data", "viewCount.json");

function getWeekKey() {
  const d = new Date();
  const year = d.getFullYear();
  // Get ISO week number
  const firstJan = new Date(year, 0, 1);
  const numberOfDays = Math.floor((d.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
  return `${year}-W${weekNum}`;
}

export async function incrementWeeklyViews() {
  try {
    const currentWeekKey = getWeekKey();
    let data = { weekKey: currentWeekKey, count: 124 };

    try {
      const raw = await fs.readFile(VIEW_FILE, "utf-8");
      data = JSON.parse(raw);
      
      // Auto-reset count if week key changed
      if (data.weekKey !== currentWeekKey) {
        data = { weekKey: currentWeekKey, count: 1 };
      } else {
        data.count += 1;
      }
    } catch {
      data = { weekKey: currentWeekKey, count: 125 };
    }

    await fs.writeFile(VIEW_FILE, JSON.stringify(data, null, 2), "utf-8");
    return { success: true, count: data.count, weekKey: currentWeekKey };
  } catch (error) {
    console.error("Error updating view count:", error);
    return { success: false, count: 128 };
  }
}
