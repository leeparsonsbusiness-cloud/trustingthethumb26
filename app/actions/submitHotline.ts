"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { sendEmailNotification } from "@/lib/mailer";

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

    // Email Notification to leeparsonsbusiness@gmail.com
    const subject = `📞 New Hitchhiker Hotline Offer from ${newEntry.name} (${newEntry.city})`;
    const text = `
New Hitchhiker Hotline Offer Received on Trust The Thumb!

Offer Type: ${newEntry.offerType}
From: ${newEntry.name}
City / Exit: ${newEntry.city}
Contact Info: ${newEntry.contactInfo}
Timestamp: ${newEntry.timestamp}

Message:
${newEntry.message}
    `;

    const html = `
      <div style="font-family: sans-serif; padding: 20px; background: #1f2421; color: #f4f1de; border-radius: 12px;">
        <h2 style="color: #e07a5f;">📞 New Hitchhiker Hotline Offer</h2>
        <p><strong>Offer Category:</strong> ${newEntry.offerType}</p>
        <p><strong>Name:</strong> ${newEntry.name}</p>
        <p><strong>City / Exit:</strong> ${newEntry.city}</p>
        <p><strong>Contact Info:</strong> <span style="color: #f2cc8f;">${newEntry.contactInfo}</span></p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #161917; padding: 12px; border-left: 4px solid #e07a5f; color: #d8d4bc;">
          ${newEntry.message}
        </blockquote>
      </div>
    `;

    await sendEmailNotification({ subject, text, html });

    revalidatePath("/");
    return { success: true, entry: newEntry };
  } catch (error) {
    console.error("Error submitting hotline entry:", error);
    return { success: false, error: "Failed to submit hotline offer. Please try again." };
  }
}
