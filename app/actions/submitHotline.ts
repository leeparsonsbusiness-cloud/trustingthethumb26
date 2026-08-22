"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export interface HotlineSubmission {
  id: string;
  offerType: string;
  name: string;
  city: string;
  contactInfo: string;
  message: string;
  timestamp: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "hotlineSubmissions.json");

export async function submitHotlineEntry(formData: {
  offerType: string;
  name: string;
  city: string;
  contactInfo: string;
  message: string;
}) {
  try {
    let submissions: HotlineSubmission[] = [];
    try {
      const rawData = await fs.readFile(DATA_FILE, "utf-8");
      submissions = JSON.parse(rawData);
    } catch {
      submissions = [];
    }

    const newEntry: HotlineSubmission = {
      id: `hotline-${Date.now()}`,
      offerType: formData.offerType || "Location Recommendation",
      name: formData.name.trim() || "Road Friend",
      city: formData.city.trim() || "USA",
      contactInfo: formData.contactInfo.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
    };

    submissions.unshift(newEntry);
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), "utf-8");

    revalidatePath("/");
    return { success: true, entry: newEntry };
  } catch (error) {
    console.error("Error submitting hotline entry:", error);
    return { success: false, error: "Failed to submit hotline offer. Please try again." };
  }
}
