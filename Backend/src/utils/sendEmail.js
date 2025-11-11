import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM, // Ex: Linkly <no-reply@linkly.com>
      to,
      subject,
      html,
    });
    console.log("✅ Email sent to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
