"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export interface TrailNote {
  id: string;
  name: string;
  handle?: string;
  amount: number;
  tier: string;
  city: string;
  timestamp: string;
  message: string;
  likes: number;
  verified: boolean;
}

const DATA_FILE = path.join(process.cwd(), "data", "trailNotes.json");

export async function submitTrailNote(formData: {
  name: string;
  handle?: string;
  amount: number;
  tier: string;
  city: string;
  message: string;
}) {
  try {
    const rawData = await fs.readFile(DATA_FILE, "utf-8");
    const notes: TrailNote[] = JSON.parse(rawData);

    const newNote: TrailNote = {
      id: `note-${Date.now()}`,
      name: formData.name.trim() || "Anonymous Road Friend",
      handle: formData.handle?.trim().startsWith("@") 
        ? formData.handle.trim() 
        : formData.handle?.trim() ? `@${formData.handle.trim()}` : undefined,
      amount: Number(formData.amount) || 15,
      tier: formData.tier || "Road Supporter",
      city: formData.city.trim() || "Somewhere in USA",
      timestamp: "Just now",
      message: formData.message.trim(),
      likes: 1,
      verified: true,
    };

    notes.unshift(newNote);
    await fs.writeFile(DATA_FILE, JSON.stringify(notes, null, 2), "utf-8");

    revalidatePath("/");
    return { success: true, note: newNote };
  } catch (error) {
    console.error("Error submitting trail note:", error);
    return { success: false, error: "Failed to post note. Please try again." };
  }
}
