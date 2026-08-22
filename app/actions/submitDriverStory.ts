"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { sendEmailNotification } from "@/lib/mailer";

export interface DriverStory {
  id: string;
  driverName: string;
  locationSegment: string;
  vehicleType: string;
  storyText: string;
  date: string;
  verified?: boolean;
}

const STORIES_FILE = path.join(process.cwd(), "data", "driverStories.json");

export async function submitDriverStory(formData: {
  driverName: string;
  locationSegment: string;
  vehicleType: string;
  storyText: string;
}) {
  try {
    let stories: DriverStory[] = [];
    try {
      const rawData = await fs.readFile(STORIES_FILE, "utf-8");
      stories = JSON.parse(rawData);
    } catch {
      stories = [];
    }

    const newStory: DriverStory = {
      id: `story-${Date.now()}`,
      driverName: formData.driverName.trim() || "Generous Stranger",
      locationSegment: formData.locationSegment.trim() || "Somewhere on Route 66",
      vehicleType: formData.vehicleType.trim() || "Road Cruiser",
      storyText: formData.storyText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      verified: true,
    };

    stories.unshift(newStory);
    await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2), "utf-8");

    // Email Notification to leeparsonsbusiness@gmail.com
    const subject = `🚘 New Driver Story Submitted by ${newStory.driverName}!`;
    const text = `
New Driver Story Submitted on Trust The Thumb!

Driver Name: ${newStory.driverName}
Route / Location Segment: ${newStory.locationSegment}
Vehicle / Rig: ${newStory.vehicleType}
Date: ${newStory.date}

Story:
${newStory.storyText}
    `;

    const html = `
      <div style="font-family: sans-serif; padding: 20px; background: #1f2421; color: #f4f1de; border-radius: 12px;">
        <h2 style="color: #e07a5f;">🚘 New Driver Story Submitted</h2>
        <p><strong>Driver:</strong> ${newStory.driverName}</p>
        <p><strong>Route Segment:</strong> ${newStory.locationSegment}</p>
        <p><strong>Vehicle:</strong> ${newStory.vehicleType}</p>
        <p><strong>Story:</strong></p>
        <blockquote style="background: #161917; padding: 12px; border-left: 4px solid #e07a5f; color: #d8d4bc;">
          ${newStory.storyText}
        </blockquote>
      </div>
    `;

    await sendEmailNotification({ subject, text, html });

    revalidatePath("/");
    return { success: true, story: newStory };
  } catch (error) {
    console.error("Error submitting driver story:", error);
    return { success: false, error: "Failed to submit driver story. Please try again." };
  }
}
