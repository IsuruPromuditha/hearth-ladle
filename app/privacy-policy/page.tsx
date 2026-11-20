import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Privacy & Policy",
  description:
    "How Hearth & Ladle collects, uses, and protects your information when subscribing to newsletters, leaving recipe reviews, or contacting our kitchen.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy & Policy – Hearth & Ladle",
    description:
      "Privacy policy, recipe review guidelines, and cookie preferences for Hearth & Ladle.",
    type: "website",
    url: `${SITE}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full">
      <section className="border-b border-[var(--line)] bg-[var(--soft)]">
        <div className="mx-auto max-w-[880px] px-5 py-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to About Us</span>
          </Link>

          <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Updated November 2026</span>
          </p>
          <h1 className="font-display mt-2 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight text-[var(--ink)] text-balance">
            Privacy &amp; Policy
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            We respect your kitchen and your inbox. This policy explains what
            information Hearth &amp; Ladle collects, why we collect it, and how
            you stay in full control of your preferences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[880px] px-5 py-12">
        <div className="space-y-10 text-base leading-relaxed text-[var(--ink)]">
          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              1. Information We Collect
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              When you browse recipes on Hearth &amp; Ladle, no account or
              registration is required. We only receive personal details when
              you voluntarily provide them:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
              <li>
                <strong className="text-[var(--ink)]">
                  Newsletter Subscriptions:
                </strong>{" "}
                Your email address when you opt in to receive our weekly recipe
                letter.
              </li>
              <li>
                <strong className="text-[var(--ink)]">
                  Recipe Comments &amp; Ratings:
                </strong>{" "}
                Your display name, star rating, and comment text. Email
                addresses entered in the comment form are validated for spam
                prevention and are never published publicly.
              </li>
              <li>
                <strong className="text-[var(--ink)]">
                  Kitchen Contact Messages:
                </strong>{" "}
                Your name, email address, and question when you write to us
                through the About page.
              </li>
            </ul>
          </div>

          <div className="border-t border-[var(--line)] pt-8">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              2. Browser Preferences &amp; Saved Recipes
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Hearth &amp; Ladle uses local browser storage (
              <code>localStorage</code>) strictly to remember your light or dark
              theme choice and the recipes you bookmark with the Save button on
              recipe cards. This data stays on your device and is not shared
              with third-party ad brokers.
            </p>
          </div>

          <div className="border-t border-[var(--line)] pt-8">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              3. Recipe Reviews &amp; Editorial Independence
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Every recipe published on Hearth &amp; Ladle is tested in our own
              kitchen using everyday ingredients. Any cookware recommendations or
              cookbook links are selected independently by our editorial team.
            </p>
          </div>

          <div className="border-t border-[var(--line)] pt-8">
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              4. Contact Us About Privacy
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              You may request deletion of a comment or unsubscribe from our
              weekly recipe letter at any time. To reach our team with privacy
              questions, please visit our{" "}
              <Link
                href="/about#contact"
                className="font-semibold text-[var(--accent)] hover:underline"
              >
                kitchen contact form
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
