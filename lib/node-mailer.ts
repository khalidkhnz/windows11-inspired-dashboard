"use server";
import nodemailer from "nodemailer";
import { config } from "./config";

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST || "smtp.ethereal.email",
  port: config.EMAIL_PORT || 587,
  secure: config.EMAIL_PORT ? true : false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.EMAIL_USER || "simeon.spinka@ethereal.email",
    pass: config?.EMAIL_PASSWORD || "511qJvn35DjdAFBa1P",
  },
});

export async function sendMail({
  from,
  to,
  subject,
  text,
}: {
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
}) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from ? from : '"Khalidkhnz 👻" <eternalkhalidkhnz@gmail.com>', // sender address
    to: to ? to : "khankhalid1743@gmail.com, eternalkhalidkhnz@gmail.com", // list of receivers
    subject: subject ? subject : "Khalidkhnz - Contact Mail", // Subject line
    text: text ? text : "MESSAGE!!!", // plain text body
    // html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}
