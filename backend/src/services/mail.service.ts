import { Resend } from "resend";
import env from "../configs/env.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const response = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);

    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
