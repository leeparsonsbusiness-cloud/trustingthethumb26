import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function sendEmailNotification({
  subject,
  html,
  text,
  senderEmail,
  senderName,
}: {
  subject: string;
  html: string;
  text: string;
  senderEmail?: string;
  senderName?: string;
}) {
  const recipient = "leeparsonsbusiness@gmail.com";

  console.log(`[Notification to ${recipient}]: ${subject}`);
  console.log(`Body:\n${text}`);

  // 1. Try Resend API if RESEND_API_KEY is set in Vercel environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Trust The Thumb <onboarding@resend.dev>",
        to: [recipient],
        replyTo: senderEmail || recipient,
        subject,
        html,
        text,
      });
      console.log("Email dispatched via Resend API to", recipient);
      return { success: true, provider: "resend" };
    } catch (resendErr) {
      console.error("Resend error:", resendErr);
    }
  }

  // 2. Try Formspree if FORMSPREE_URL is set in environment
  const formspreeUrl = process.env.FORMSPREE_URL;
  if (formspreeUrl) {
    try {
      await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: senderEmail || recipient,
          name: senderName || "Trust The Thumb Supporter",
          subject,
          message: text,
        }),
      });
      console.log("Email dispatched via Formspree to", recipient);
      return { success: true, provider: "formspree" };
    } catch (formspreeErr) {
      console.error("Formspree error:", formspreeErr);
    }
  }

  // 3. Try Nodemailer if SMTP_PASS is set in environment
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || "leeparsonsbusiness@gmail.com";
  const pass = process.env.SMTP_PASS || "";

  if (pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"Trust The Thumb Web" <${user}>`,
        to: recipient,
        replyTo: senderEmail || recipient,
        subject,
        text,
        html,
      });

      console.log("Email dispatched via SMTP to", recipient);
      return { success: true, provider: "smtp" };
    } catch (smtpErr) {
      console.error("Nodemailer error:", smtpErr);
    }
  }

  // 4. Try Webhook fallback if WEBHOOK_URL or DISCORD_WEBHOOK_URL is set
  const webhookUrl = process.env.WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**${subject}**\n${text}`,
        }),
      });
      console.log("Webhook notification sent!");
      return { success: true, provider: "webhook" };
    } catch (err) {
      console.error("Webhook error:", err);
    }
  }

  console.log("Note: Add RESEND_API_KEY or SMTP_PASS to Vercel Environment Variables to route directly to Gmail inbox.");
  return { success: true, logged: true };
}
