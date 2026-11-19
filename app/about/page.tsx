import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, ChefHat, Heart, Users } from "lucide-react";
import AboutContactForm from "@/components/AboutContactForm";
import { getAllRecipes, SITE } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Elena and Vadim Kravchuk, the family behind Hearth & Ladle—sharing trusted weeknight recipes, Ukrainian heritage dishes, and step-by-step cooking guides since 2009.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Hearth & Ladle",
    description:
      "Our family story, recipe testing standards, and bestselling cookbook.",
    type: "website",
    url: `${SITE}/about`,
  },
};

const MILESTONES = [
  {
    year: "1989",
    title: "Arriving With Family Recipes",
    body: "Born in Ukraine, Elena immigrated to the United States with her family at four years old, carrying little more than a stack of suitcases and a deep tradition of welcoming hospitality around the dinner table.",
  },
  {
    year: "2009",
    title: "Starting the Kitchen Journal",
    body: "Newly married in Idaho and missing the comforting borscht, pierogies, and holiday bakes of childhood, Elena and her husband Vadim started documenting family recipes—pairing home cooking with step-by-step photography.",
  },
  {
    year: "2023",
    title: "A National Bestselling Cookbook",
    body: "With help from a testing community of more than 300 home cooks, we published our hardcover cookbook featuring over 100 budget-friendly weeknight favorites and cherished heritage classics.",
  },
];

const PRINCIPLES = [
  {
    num: "01.",
    title: "Simple Everyday Ingredients",
    body: "We test with accessible pantry staples you can find at any neighborhood grocery store—never fussy specialty items that sit unused.",
  },
  {
    num: "02.",
    title: "Tested by 300+ Home Cooks",
    body: "Every dish is cooked repeatedly across real home kitchens so measurements, oven temperatures, and timing work reliably the first time.",
  },
  {
    num: "03.",
    title: "Clear Step-by-Step Guidance",
    body: "From prep tips to visual cues and make-ahead notes, our recipes help both new cooks and busy parents get dinner on the table calmly.",
  },
];

const PRESS = [
  "The New York Times",
  "Good Morning America",
  "USA Today",
  "Associated Press",
  "Oprah Daily",
  "ABC News",
];

export default function AboutPage() {
  const heritageFavorites = getAllRecipes().filter((r) =>
    ["classic-ukrainian-borscht", "smoky-slow-cooker-bean-chili"].includes(r.slug)
  );

  return (
    <main className="w-full">
      {/* 1. Welcome Hero & Founder Portrait */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 px-5 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              About Hearth &amp; Ladle
            </p>
            <h1 className="font-display mt-3 text-[clamp(2.25rem,4vw,3.35rem)] font-bold leading-[1.1] tracking-tight text-[var(--ink)] text-balance">
              Welcome to our family kitchen
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Hi! We’re Elena and Vadim Kravchuk—recipe developers, food
              photographers, and the husband-and-wife team behind{" "}
              <strong className="font-semibold text-[var(--ink)]">
                Hearth &amp; Ladle
              </strong>
              . Whether you need a 20-minute weeknight skillet dinner or a pot of
              traditional Sunday borscht, we’re honored to cook alongside you.
            </p>

            {/* Unboxed Trust Numbers */}
            <div className="mt-6 flex flex-wrap gap-8 border-t border-[var(--line)] pt-5 tabular-nums">
              <div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  2009
                </div>
                <div className="text-xs text-[var(--muted)]">Year Founded</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  300+
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Community Recipe Testers
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  100+
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Cookbook Recipes
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/#recipes-feed"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 no-underline"
              >
                <span>Explore Tested Recipes</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#contact"
                className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors no-underline"
              >
                Write to our kitchen →
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--soft)] lg:col-span-6 lg:min-h-[420px]">
            <Image
              src="/images/about_kitchen_portrait.jpg"
              alt="Elena Kravchuk preparing fresh herbs and bread in her home kitchen"
              fill
              sizes="(max-width: 1024px) 100vw, 580px"
              priority
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Our Story & Heritage */}
      <section className="border-b border-[var(--line)] bg-[var(--soft)]">
        <div className="mx-auto max-w-[1200px] px-5 py-14">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <Heart className="h-4 w-4" aria-hidden="true" />
              <span>Our Story &amp; Heritage</span>
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl text-balance">
              From a stack of suitcases to a kitchen shared with millions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Growing up, Elena’s mother had a gift for turning modest,
              affordable ingredients into unforgettable family feasts. Because
              her mother ran the kitchen with warmth and intuition, Elena didn’t
              truly learn to cook until after she married Vadim and set up a
              home of their own in Idaho.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              When she went looking for dependable English-language recipes for
              Ukrainian classics—like ruby-red borscht, fluffy pierogies, and
              crispy potato pancakes—most guides were outdated or hard to
              follow. Together, Elena and Vadim launched Hearth &amp; Ladle in
              2009 to preserve those heirloom dishes while testing everyday
              American comfort meals for busy families.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6"
              >
                <div className="font-display text-2xl font-bold text-[var(--accent)] tabular-nums">
                  {m.year}
                </div>
                <h3 className="font-display mt-2 text-xl font-bold text-[var(--ink)]">
                  {m.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How We Develop & Test Recipes */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="mx-auto max-w-[1200px] px-5 py-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                <Users className="h-4 w-4" aria-hidden="true" />
                <span>Our Kitchen Standards</span>
              </p>
              <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-[var(--ink)]">
                Why home cooks trust every recipe
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--muted)]">
              Behind every post is a collaborative family team, test cooks, and
              detailed kitchen notes to ensure consistent results.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6"
              >
                <div className="text-sm font-bold text-[var(--accent)] tabular-nums">
                  {p.num}
                </div>
                <h3 className="font-display mt-2 text-xl font-bold text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Cookbook & Family Heritage Dishes */}
      <section
        id="cookbook"
        className="border-b border-[var(--line)] bg-[var(--soft)]"
      >
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 px-5 py-14 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] lg:col-span-6">
            <Image
              src="/images/cookbook_hardcover_spread.jpg"
              alt="Hearth & Ladle Cookbook next to traditional Ukrainian borscht"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>The Cookbook</span>
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl text-balance">
              100+ Easy Family-Favorite Recipes You’ll Make Again and Again
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Our debut hardcover cookbook bridges busy weeknight suppers and
              meaningful family gatherings—pairing approachable crowd-pleasers
              like Garlic Butter Salmon with treasured recipes passed down from
              Elena’s mother, including Classic Beet Borscht.
            </p>

            <ul className="mt-5 list-none space-y-2.5 p-0 text-sm text-[var(--ink)]">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>Full-color dish photography accompanying every recipe</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>Entertaining blueprints for chili bars and holiday tables</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>Rigorously vetted by 300+ volunteer home cooks</span>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              {heritageFavorites.map((r) => (
                <Link
                  key={r.slug}
                  href={`/recipes/${r.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors no-underline"
                >
                  <ChefHat className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  <span>{r.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. As Seen In + Reader Contact */}
      <section className="border-b border-[var(--line)] bg-[var(--bg)]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            Featured In
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-lg text-[var(--muted)]">
            {PRESS.map((item) => (
              <span key={item} className="font-display font-semibold opacity-80">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Say Hello
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-[var(--ink)]">
              Questions from your kitchen?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              Have a question about ingredient substitutions, slow cooker
              sizing, or a dish you’d love to see next? Send a note to Elena,
              Vadim, and our test kitchen team.
            </p>
          </div>
          <div className="lg:col-span-7">
            <AboutContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
