"use server";

import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT ?? 465);
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;
const inbox = process.env.CONTACT_INBOX ?? user;

function getTransporter() {
  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Set EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD (and optionally EMAIL_PORT, CONTACT_INBOX) in the environment.",
    );
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendContactMail(input: {
  fromEmail: string;
  message: string;
  name?: string;
}) {
  const transporter = getTransporter();
  const safeName = input.name?.trim() || "Anonymous";
  const subject = `Portfolio contact from ${safeName}`;

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: inbox,
    replyTo: input.fromEmail,
    subject,
    text: `From: ${safeName} <${input.fromEmail}>\n\n${input.message}`,
  });

  return { id: info.messageId };
}
