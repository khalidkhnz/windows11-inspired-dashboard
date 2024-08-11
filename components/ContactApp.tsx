"use client";
import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { sendMail } from "@/lib/node-mailer";
import { format } from "date-fns";

type Props = {};

const ContactApp = (props: Props) => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!email || !message) {
      if (!email && !message) {
        toast.error("Please fill out both email and message.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } else if (!email) {
        toast.error("Please fill out the email.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      } else if (!message) {
        toast.error("Please fill out the message.", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
      return;
    }

    try {
      await sendMail({ text: `From: ${email}\nMessage: ${message}` });
      toast.success("We received your message. Thank you!", {
        description: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      toast.error("Failed to send your message. Please try again later.", {
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  }

  return (
    <div className="h-full w-full px-4 text-black">
      <div className="flex h-full w-full flex-col items-center justify-center rounded bg-neutral-800/5 shadow">
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full items-center justify-center text-blue-600/90"
        >
          <fieldset className="h-full max-h-[400px] w-full max-w-[600px] rounded-lg border-4 border-double border-blue-600/90 p-5">
            <legend className="px-4">Contact Me</legend>
            <label className="text-xs font-bold after:text-red-400 after:content-['*']">
              Your Email
            </label>
            <Input
              required
              name="email"
              type="email"
              className="ring-none mb-2 mt-1 w-full border-neutral-100/10 bg-neutral-900/55 p-2 outline-none focus:ring-2 focus:ring-blue-600/90"
            />
            <label className="text-xs font-bold after:text-red-400 after:content-['*']">
              Your Message
            </label>
            <Textarea
              name="message"
              required
              className="ring-none mb-2 mt-1 max-h-[200px] min-h-[190px] w-full border-neutral-100/10 bg-neutral-900/55 p-2 outline-none focus:ring-2 focus:ring-blue-600/90"
            />

            <Button
              type="submit"
              className="w-full rounded bg-blue-600/90 p-2 text-center text-indigo-50 hover:bg-blue-500"
            >
              Send Message
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ContactApp;
