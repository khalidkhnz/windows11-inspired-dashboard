"use server";

import { z } from "zod";
import { sendContactMail } from "@/lib/mailer";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(5, "Please write a bit more (min 5 characters)."),
  name: z.string().max(80).optional(),
});

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

export async function sendContactAction(formData: FormData): Promise<ContactResult> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
    name: formData.get("name") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await sendContactMail({
      fromEmail: parsed.data.email,
      message: parsed.data.message,
      name: parsed.data.name,
    });
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send message.";
    return { ok: false, error: msg };
  }
}
