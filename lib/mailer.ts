import nodemailer from "nodemailer";

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

  // 1. Try Nodemailer if SMTP credentials are provided in env
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

      console.log("Email sent successfully via Nodemailer!");
      return { success: true };
    } catch (error) {
      console.error("Nodemailer error:", error);
    }
  }

  // 2. Try Formspree or HTTP webhook if FORMSPREE_KEY / WEBHOOK_URL is set in env
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
      console.log("Webhook notification sent successfully!");
    } catch (err) {
      console.error("Webhook error:", err);
    }
  }

  return { success: true, logged: true };
}
