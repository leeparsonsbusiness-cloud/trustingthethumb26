"use server";

import fs from "fs/promises";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), "data", "trackerConfig.json");
const NOTES_FILE = path.join(process.cwd(), "data", "trailNotes.json");

export async function getJourneyData() {
  try {
    const configRaw = await fs.readFile(CONFIG_FILE, "utf-8");
    const notesRaw = await fs.readFile(NOTES_FILE, "utf-8");

    const config = JSON.parse(configRaw);
    const notes = JSON.parse(notesRaw);

    return { config, notes };
  } catch (error) {
    console.error("Error reading journey data:", error);
    return { config: null, notes: [] };
  }
}
