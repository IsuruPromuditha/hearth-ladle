"use client";

import { useState } from "react";

export default function Footer() {
  const [msg, setMsg] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMsg("Enter a valid email address.");
      return;
    }

    // TODO: POST to your email provider (Resend, Mailchimp, ConvertKit...).
    form.reset();
    setMsg("Thanks for subscribing.");
  }

  return (
    <footer id="subscribe" className="site">
      <div className="wrap">
        <b className="ui">Get fresh recipes in your inbox</b>
        <form className="sub" onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            suppressHydrationWarning
          />
          <button
            className="btn primary"
            type="submit"
            suppressHydrationWarning
          >
            Subscribe
          </button>
        </form>
        <p role="status">{msg}</p>
        <p>© 2026 Hearth &amp; Ladle. Placeholder brand: replace with your own.</p>
      </div>
    </footer>
  );
}