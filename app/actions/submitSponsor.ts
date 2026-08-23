"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { sendEmailNotification } from "@/lib/mailer";

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
    const companyName = (formData.companyName || "").trim();
    const contactName = (formData.contactName || "").trim();
    const email = (formData.email || "").trim();
    const partnershipType = formData.partnershipType || "Product & Financial";
    const message = (formData.message || "").trim();

    if (!companyName || !email) {
      return { success: false, error: "Company name and email are required." };
    }

    const newInquiry: SponsorInquiry = {
      id: `sponsor-${Date.now()}`,
      companyName,
      contactName,
      email,
      partnershipType,
      message,
      timestamp: new Date().toISOString(),
    };

    // Safely attempt local JSON disk storage (gracefully handles read-only serverless disk on Vercel)
    try {
      let inquiries: SponsorInquiry[] = [];
      try {
        const rawData = await fs.readFile(SPONSOR_FILE, "utf-8");
        inquiries = JSON.parse(rawData);
      } catch {
        inquiries = [];
      }
      inquiries.unshift(newInquiry);
      await fs.writeFile(SPONSOR_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
    } catch (diskErr) {
      console.log("Local disk save bypassed (serverless environment):", diskErr);
    }

    // Email Notification to leeparsonsbusiness@gmail.com
    const subject = `🚀 New Sponsor Inquiry: ${newInquiry.companyName}`;
    const text = `
New Brand Sponsorship Proposal Received on Trust The Thumb!

Company Name: ${newInquiry.companyName}
Contact Person: ${newInquiry.contactName || "N/A"}
Contact Email: ${newInquiry.email}
Partnership Type: ${newInquiry.partnershipType}
Submission Time: ${newInquiry.timestamp}

Message / Details:
${newInquiry.message || "No additional message details provided."}
    `;

    const html = `
      <div style="font-family: sans-serif; padding: 20px; background: #1f2421; color: #f4f1de; border-radius: 12px;">
        <h2 style="color: #e07a5f;">🚀 New Brand Sponsorship Inquiry</h2>
        <p><strong>Company:</strong> ${newInquiry.companyName}</p>
        <p><strong>Contact Name:</strong> ${newInquiry.contactName || "N/A"}</p>
        <p><strong>Email:</strong> <a href="mailto:${newInquiry.email}" style="color: #f2cc8f;">${newInquiry.email}</a></p>
        <p><strong>Partnership Type:</strong> ${newInquiry.partnershipType}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #161917; padding: 12px; border-left: 4px solid #e07a5f; color: #d8d4bc;">
          ${newInquiry.message || "No additional message provided."}
        </blockquote>
      </div>
    `;

    await sendEmailNotification({
      subject,
      text,
      html,
      senderEmail: email,
      senderName: contactName || companyName,
    });

    try {
      revalidatePath("/sponsors");
      revalidatePath("/");
    } catch (revalErr) {
      console.log("Revalidation skipped:", revalErr);
    }

    return { success: true, inquiry: newInquiry };
  } catch (error) {
    console.error("Error submitting sponsor inquiry:", error);
    return { success: false, error: "Submission failed. Please try again." };
  }
}
