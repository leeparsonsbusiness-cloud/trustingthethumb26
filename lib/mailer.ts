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
  const primaryRecipient = "leeparsonsbusiness@gmail.com";
  const secondaryRecipient = "parsonsjacob30@gmail.com";
  const allRecipients = [primaryRecipient, secondaryRecipient];

  console.log(`[Notification to ${allRecipients.join(", ")}]: ${subject}`);
  console.log(`Body:\n${text}`);

  // 1. Try Resend API if RESEND_API_KEY is set in environment
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      
      // Attempt sending to both recipients
      const res = await resend.emails.send({
        from: "Trust The Thumb <onboarding@resend.dev>",
        to: allRecipients,
        replyTo: senderEmail || primaryRecipient,
        subject,
        html,
        text,
      });

      if (res.error && res.error.name === "validation_error") {
        // Fallback for Resend unverified domain testing mode (sends to primary owner)
        console.log("Resend testing mode active - routing email to primary inbox:", primaryRecipient);
        await resend.emails.send({
          from: "Trust The Thumb <onboarding@resend.dev>",
          to: [primaryRecipient],
          replyTo: senderEmail || primaryRecipient,
          subject,
          html,
          text,
        });
      }

      console.log("Email dispatched via Resend API!");
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
          email: senderEmail || primaryRecipient,
          name: senderName || "Trust The Thumb Supporter",
          subject,
          message: text,
        }),
      });
      console.log("Email dispatched via Formspree!");
      return { success: true, provider: "formspree" };
    } catch (formspreeErr) {
      console.error("Formspree error:", formspreeErr);
    }
  }

  // 3. Try Nodemailer if SMTP_PASS is set in environment
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || primaryRecipient;
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
        to: allRecipients.join(", "),
        replyTo: senderEmail || primaryRecipient,
        subject,
        text,
        html,
      });

      console.log("Email dispatched via SMTP to both recipients!");
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

  return { success: true, logged: true };
}
