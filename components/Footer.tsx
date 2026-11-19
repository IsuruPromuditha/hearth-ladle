"use client";
import { useState } from "react";

export default function Footer() {
  const [msg, setMsg] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg("Enter a valid email address.");
    // TODO: POST to your email provider (Resend, Mailchimp, ConvertKit...).
    e.currentTarget.reset();
    setMsg("Thanks for subscribing.");
  }
  return (
    <footer className="site">
      <div className="wrap">
        <b className="ui">Get fresh recipes in your inbox</b>
        <form className="sub" onSubmit={submit}>
          <input type="email" name="email" placeholder="Email address" aria-label="Email address" />
          <button className="btn primary" type="submit">Subscribe</button>
        </form>
        <p role="status">{msg}</p>
        <p>© 2026 Hearth &amp; Ladle. Placeholder brand: replace with your own.</p>
      </div>
    </footer>
  );
}
