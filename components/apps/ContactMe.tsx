"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { sendContactAction } from "@/actions/contact.action";
import { owner } from "@/lib/portfolio";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { useThemeChoice } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const SEND_BUTTON_BY_THEME = {
  windows: "bg-sky-500 hover:bg-sky-400",
  macos: "bg-[#0a84ff] hover:bg-[#1a8fff] rounded-md",
  linux: "bg-[#e95420] hover:bg-[#f06434] rounded-md",
} as const;

const INPUT_RING_BY_THEME = {
  windows: "focus-visible:ring-sky-500/60",
  macos: "focus-visible:ring-[#0a84ff]/60",
  linux: "focus-visible:ring-[#e95420]/60",
} as const;

export default function ContactMe() {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const theme = useThemeChoice("window");
  const sendBtn = SEND_BUTTON_BY_THEME[theme];
  const inputRing = INPUT_RING_BY_THEME[theme];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await sendContactAction(formData);
      if (result.ok) {
        toast.success("Message sent — I'll get back to you.");
        setSent(true);
        form.reset();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto text-neutral-100">
      <header className="border-b border-white/5 bg-white/[0.02] px-8 py-6">
        <p className="text-xs uppercase tracking-widest text-neutral-400">Contact</p>
        <h1 className="mt-1 text-2xl font-semibold">Let&apos;s talk</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Got a project, a role, or just want to say hi? Drop me a line.
        </p>
      </header>

      <div className="grid flex-1 gap-6 px-8 py-6 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="lg:col-span-3">
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label htmlFor="contact-name" className="text-xs text-neutral-400">
                Your name
              </label>
              <Input
                id="contact-name"
                name="name"
                placeholder="Grace Hopper"
                className={cn("border-white/10 bg-white/[0.03]", inputRing)}
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="contact-email" className="text-xs text-neutral-400">
                Email <span className="text-red-400">*</span>
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={cn("border-white/10 bg-white/[0.03]", inputRing)}
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="contact-message" className="text-xs text-neutral-400">
                Message <span className="text-red-400">*</span>
              </label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={8}
                placeholder="Tell me a bit about what you're working on…"
                className={cn("min-h-[180px] resize-none border-white/10 bg-white/[0.03]", inputRing)}
              />
            </div>
            <Button
              type="submit"
              disabled={pending}
              className={cn("mt-1 gap-2 text-white", sendBtn)}
            >
              <Send className="h-4 w-4" />
              {pending ? "Sending…" : sent ? "Send another" : "Send message"}
            </Button>
          </div>
        </form>

        <aside className="lg:col-span-2">
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
            <h3 className="text-sm font-medium">Prefer email?</h3>
            <p className="mt-1 text-xs text-neutral-400">
              Reach me directly — I reply within a day or two.
            </p>
            <a
              href={`mailto:${owner.email}`}
              className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
            >
              <Mail className="h-3.5 w-3.5" />
              {owner.email}
            </a>
          </div>

          <div className="mt-4 rounded-xl border border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-5 text-xs text-neutral-300">
            <p>
              Your message lands in my inbox via a server action — no third-party form
              services in the mix.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
