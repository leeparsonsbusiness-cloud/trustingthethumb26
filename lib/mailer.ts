import nodemailer from "nodemailer";

export async function sendEmailNotification({
  subject,
  html,
  text,
}: {
  subject: string;
  html: string;
  text: string;
}) {
  const recipient = "leeparsonsbusiness@gmail.com";

  // Use environment variables if set, or configured transporter
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || "leeparsonsbusiness@gmail.com";
  const pass = process.env.SMTP_PASS || "";

  if (!pass) {
    // Log intent clearly when SMTP pass isn't configured in env
    console.log(`[Email Dispatch Notification to ${recipient}]: ${subject}`);
    console.log(`Text Body:\n${text}`);
    return { success: true, logged: true };
  }

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
      subject,
      text,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Nodemailer send error:", error);
    return { success: false, error: String(error) };
  }
}
