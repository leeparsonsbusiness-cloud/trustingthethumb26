"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export interface SponsorInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  partnershipType: string;
  message: string;
  timestamp: string;
}

const SPONSOR_FILE = path.join(process.cwd(), "data", "sponsorInquiries.json");

export async function submitSponsorInquiry(formData: {
  companyName: string;
  contactName: string;
  email: string;
  partnershipType: string;
  message: string;
}) {
  try {
    let inquiries: SponsorInquiry[] = [];
    try {
      const rawData = await fs.readFile(SPONSOR_FILE, "utf-8");
      inquiries = JSON.parse(rawData);
    } catch {
      inquiries = [];
    }

    const newInquiry: SponsorInquiry = {
      id: `sponsor-${Date.now()}`,
      companyName: formData.companyName.trim(),
      contactName: formData.contactName.trim(),
      email: formData.email.trim(),
      partnershipType: formData.partnershipType || "Product & Financial",
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);
    await fs.writeFile(SPONSOR_FILE, JSON.stringify(inquiries, null, 2), "utf-8");

    revalidatePath("/");
    return { success: true, inquiry: newInquiry };
  } catch (error) {
    console.error("Error submitting sponsor inquiry:", error);
    return { success: false, error: "Submission failed. Please try again." };
  }
}
