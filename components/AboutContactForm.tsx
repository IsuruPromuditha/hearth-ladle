"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

export default function AboutContactForm() {
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      setStatus({
        ok: false,
        text: "Please enter your name, a valid email address, and a short message.",
      });
      return;
    }

    form.reset();
    setStatus({
      ok: true,
      text: "Thank you for writing to our kitchen! We read every note and reply within two business days.",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-semibold text-[var(--ink)]"
          >
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Clara Bennett"
            required
            className="h-11 w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-semibold text-[var(--ink)]"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="clara@example.com"
            required
            className="h-11 w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-[var(--ink)]"
        >
          Recipe Question or Note
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Ask about ingredient swaps, cookware tips, or share a family favorite..."
          required
          className="w-full rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
        />
      </div>

      {status && (
        <p
          role="status"
          className={`mt-4 flex items-center gap-2 text-sm font-medium ${
            status.ok ? "text-[var(--accent)]" : "text-[var(--danger)]"
          }`}
        >
          {status.ok && (
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <span>{status.text}</span>
        </p>
      )}

      <button
        type="submit"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>Send Note</span>
      </button>
    </form>
  );
}
