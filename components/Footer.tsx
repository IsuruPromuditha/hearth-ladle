"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

export default function Footer() {
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setIsError(true);
      setMsg("Please enter a valid email address.");
      return;
    }

    form.reset();
    setIsError(false);
    setMsg("You are subscribed! Fresh weekly recipes are on the way.");
  }

  return (
    <footer
      id="subscribe"
      className="border-t border-[var(--line)] bg-[var(--soft)] text-[var(--ink)]"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-14">
        {/* Newsletter Band */}
        <div className="grid gap-8 border-b border-[var(--line)] pb-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Weekly Recipe Letter
            </p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl text-balance">
              Get kitchen-tested recipes in your inbox
            </h2>
            <p className="mt-2 max-w-lg text-sm text-[var(--muted)]">
              Join thousands of home cooks for seasonal menus, 30-minute dinner
              ideas, and step-by-step weekend bakes.
            </p>
          </div>

          <div className="md:col-span-6">
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={submit}
              noValidate
            >
              <div className="relative flex-1">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  suppressHydrationWarning
                  className="h-11 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] pl-10 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                suppressHydrationWarning
                className="h-11 rounded-lg bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Subscribe Free
              </button>
            </form>
            {msg && (
              <p
                role="status"
                className={`mt-2.5 flex items-center gap-1.5 text-sm font-medium ${
                  isError ? "text-[var(--danger)]" : "text-[var(--accent)]"
                }`}
              >
                {!isError && (
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                <span>{msg}</span>
              </p>
            )}
          </div>
        </div>

        {/* Quiet Editorial Navigation Columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-bold text-[var(--ink)] no-underline"
            >
              Hearth &amp; Ladle
            </Link>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">
              Reliable, approachable recipes made with everyday ingredients—from
              quick weeknight dinners to cherished family traditions.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
              Popular Recipes
            </h3>
            <ul className="mt-3 list-none space-y-2 p-0 text-sm">
              <li>
                <Link
                  href="/recipes/smoky-slow-cooker-bean-chili"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Slow Cooker Beef &amp; Bean Chili
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/creamy-tuscan-zuppa-toscana"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Creamy Zuppa Toscana Soup
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/pan-seared-garlic-butter-salmon"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Garlic Butter Skillet Salmon
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes/classic-ukrainian-borscht"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Classic Heritage Beet Borscht
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
              Browse Categories
            </h3>
            <ul className="mt-3 list-none space-y-2 p-0 text-sm">
              <li>
                <Link
                  href="/?type=30-minute-meals"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  30-Minute Meals
                </Link>
              </li>
              <li>
                <Link
                  href="/?method=slow-cooker"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Slow Cooker Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/?course=soup"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Soups &amp; Chili
                </Link>
              </li>
              <li>
                <Link
                  href="/?course=desserts"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Desserts &amp; Baking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
              Our Kitchen
            </h3>
            <ul className="mt-3 list-none space-y-2 p-0 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  About Us &amp; Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#cookbook"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  The Cookbook
                </Link>
              </li>
              <li>
                <Link
                  href="/#videos"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/about#contact"
                  className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
                >
                  Contact Our Kitchen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            © 2026 Hearth &amp; Ladle. Tested recipes for everyday home cooks.
          </p>
          <p className="m-0">
            Simple ingredients · Step-by-step photography · Built for the family
            table
          </p>
        </div>
      </div>
    </footer>
  );
}