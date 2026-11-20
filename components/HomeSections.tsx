"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChefHat,
  Clock,
  Play,
  Search,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { formatMinutes } from "@/lib/format";
import { MAIN_COURSE_SUBCATEGORIES } from "@/components/MainCourseClient";

type HomeSectionsProps = {
  recipes: Recipe[];
  initialQuery: string;
  initialFilter: string;
  videoOnly: boolean;
};

const CATEGORY_TILES = [
  {
    id: "main-course",
    label: "Main Course",
    countLabel: "Weeknight Dinners",
    image: "/images/recipe_garlic_salmon.jpg",
  },
  {
    id: "30-minute-meals",
    label: "30-Minute Meals",
    countLabel: "Fast & Flavorful",
    image: "/images/recipe_tuscan_soup.jpg",
  },
  {
    id: "slow-cooker",
    label: "Slow Cooker",
    countLabel: "Set & Simmer",
    image: "/images/hero_comfort_chili.jpg",
  },
  {
    id: "soup",
    label: "Soups & Chili",
    countLabel: "Comfort Bowls",
    image: "/images/cookbook_hardcover_spread.jpg",
  },
  {
    id: "desserts",
    label: "Desserts & Baking",
    countLabel: "Tested Classics",
    image: "/images/recipe_berry_cheesecake.jpg",
  },
];

const FEED_FILTERS = [
  { id: "all", label: "All Recipes" },
  { id: "main-course", label: "Main Course" },
  { id: "30-minute-meals", label: "30-Minute Meals" },
  { id: "slow-cooker", label: "Slow Cooker" },
  { id: "soup", label: "Soups & Chili" },
  { id: "desserts", label: "Desserts" },
];

const PRESS_PUBLICATIONS = [
  { name: "The New York Times", style: "font-display italic" },
  { name: "Good Morning America", style: "font-semibold tracking-tight" },
  { name: "USA Today", style: "font-bold tracking-wide" },
  { name: "Associated Press", style: "font-semibold" },
  { name: "Oprah Daily", style: "font-display" },
  { name: "ABC News", style: "font-bold tracking-tight" },
];

function RecipeThumb({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-[var(--soft)] p-6 text-center text-[var(--muted)] ${className}`}
      >
        <UtensilsCrossed className="mb-2 h-7 w-7 text-[var(--accent)]" aria-hidden="true" />
        <span className="text-xs font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function formatFilterTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export default function HomeSections({
  recipes,
  initialQuery,
  initialFilter,
  videoOnly,
}: HomeSectionsProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialFilter || "all"
  );
  const [showVideoOnly, setShowVideoOnly] = useState(videoOnly);
  const [newsletterMsg, setNewsletterMsg] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);

  useEffect(() => {
    setSearchInput(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedCategory(initialFilter || "all");
  }, [initialFilter]);

  useEffect(() => {
    setShowVideoOnly(videoOnly);
  }, [videoOnly]);

  const featuredRecipe = useMemo(
    () => recipes.find((r) => r.featured) ?? recipes[0],
    [recipes]
  );

  const videoRecipes = useMemo(
    () => recipes.filter((r) => Boolean(r.videoDuration)).slice(0, 3),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    const cat = selectedCategory.toLowerCase();

    return recipes.filter((r) => {
      if (showVideoOnly && !r.videoDuration) return false;

      if (cat && cat !== "all") {
        const normalizedCat = cat.replace(/-/g, " ");
        const matchesTag = r.tags.some(
          (t) => t.toLowerCase() === cat || t.toLowerCase().replace(/-/g, " ") === normalizedCat
        );
        const matchesField =
          r.category.toLowerCase().includes(normalizedCat) ||
          r.cuisine.toLowerCase().includes(normalizedCat);
        if (!matchesTag && !matchesField) return false;
      }

      if (q) {
        const haystack = [
          r.title,
          r.description,
          r.category,
          r.cuisine,
          ...r.tags,
          ...r.ingredients.map((i) => i.t),
          ...r.steps,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [recipes, searchInput, selectedCategory, showVideoOnly]);

  function handleSearchForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = document.getElementById("recipes-feed");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleCategoryPick(catId: string) {
    setSelectedCategory(catId);
    setShowVideoOnly(false);
    const el = document.getElementById("recipes-feed");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearFilters() {
    setSearchInput("");
    setSelectedCategory("all");
    setShowVideoOnly(false);
    router.replace("/", { scroll: false });
  }

  function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setNewsletterMsg({
        ok: false,
        text: "Please enter a valid email address.",
      });
      return;
    }
    form.reset();
    setNewsletterMsg({
      ok: true,
      text: "Welcome! Check your inbox for this week's top 5 tested recipes.",
    });
  }

  const hasActiveFilter =
    Boolean(searchInput.trim()) || selectedCategory !== "all" || showVideoOnly;

  return (
    <main className="w-full">
      {/* 1. HERO FEATURED RECIPE SPOTLIGHT */}
      {featuredRecipe && (
        <section className="border-b border-[var(--line)] bg-[var(--bg)]">
          <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 px-5 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Featured Comfort Classic
              </p>
              <h1 className="font-display mt-3 text-[clamp(2.25rem,4vw,3.35rem)] font-bold leading-[1.1] tracking-tight text-[var(--ink)] text-balance">
                {featuredRecipe.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                {featuredRecipe.description}
              </p>

              {/* Unboxed Metadata */}
              <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[var(--muted)] tabular-nums">
                <span className="inline-flex items-center gap-1.5 font-medium text-[var(--ink)]">
                  <Clock className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  {formatMinutes(featuredRecipe.prep + featuredRecipe.cook)} total
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredRecipe.baseServings} servings</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-[var(--ink)]">
                  <Star
                    className="h-4 w-4 fill-[var(--star)] text-[var(--star)]"
                    aria-hidden="true"
                  />
                  {featuredRecipe.rating.value} (
                  {featuredRecipe.rating.count.toLocaleString()})
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={`/recipes/${featuredRecipe.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 no-underline"
                >
                  <span>Make This Recipe</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#recipes-feed"
                  className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors whitespace-nowrap shrink-0 no-underline"
                >
                  <span>Browse all recipes</span>
                </a>
              </div>
            </div>

            <Link
              href={`/recipes/${featuredRecipe.slug}`}
              className="group relative block min-h-[280px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--soft)] lg:col-span-7 lg:min-h-[420px]"
            >
              <RecipeThumb
                src={featuredRecipe.image}
                alt={featuredRecipe.title}
                sizes="(max-width: 1024px) 100vw, 680px"
                priority
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
          </div>
        </section>
      )}

      {/* 2. TOP RECIPE SEARCH & INSIDER NEWSLETTER BAR */}
      <section className="border-b border-[var(--line)] bg-[var(--soft)]">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-7 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Search Input */}
          <div className="lg:col-span-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Find a Recipe
            </p>
            <form onSubmit={handleSearchForm} className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by ingredient, dish, or method (e.g., salmon, chili, borscht)..."
                  aria-label="Search recipes"
                  className="h-11 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] pl-10 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-11 rounded-lg bg-[var(--ink)] px-5 text-sm font-semibold text-[var(--bg)] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Weekly Insider Newsletter Opt-In */}
          <div className="lg:col-span-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Insider Newsletter · Free Weekly Recipes
            </p>
            <form
              onSubmit={handleNewsletter}
              noValidate
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email for fresh dinner inspiration"
                aria-label="Insider newsletter email"
                className="h-11 flex-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Get Recipes
              </button>
            </form>
            {newsletterMsg && (
              <p
                role="status"
                className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
                  newsletterMsg.ok
                    ? "text-[var(--accent)]"
                    : "text-[var(--danger)]"
                }`}
              >
                {newsletterMsg.ok && (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                <span>{newsletterMsg.text}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES STRIP */}
      <section className="mx-auto max-w-[1200px] px-5 pt-14 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Browse by Course &amp; Method
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
              Popular Recipe Categories
            </h2>
          </div>
          <button
            type="button"
            onClick={() => handleCategoryPick("all")}
            className="text-sm font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            View all recipes
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORY_TILES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryPick(cat.id)}
                className={`group text-left rounded-xl border p-2.5 transition-colors cursor-pointer ${
                  active
                    ? "border-[var(--accent)] bg-[var(--soft)]"
                    : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[var(--soft)]">
                  <RecipeThumb
                    src={cat.image}
                    alt={cat.label}
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-1 pt-2.5 pb-1">
                  <div className="font-display text-base font-bold text-[var(--ink)] leading-snug">
                    {cat.label}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--muted)]">
                    {cat.countLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. LATEST & TRENDING RECIPES FEED */}
      <section id="recipes-feed" className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Fresh From Our Test Kitchen
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
              {showVideoOnly
                ? "Step-by-Step Video Recipes"
                : searchInput.trim()
                ? `Recipes matching “${searchInput.trim()}”`
                : selectedCategory !== "all"
                ? `${formatFilterTitle(selectedCategory)} Recipes`
                : "Latest & Trending Recipes"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label="Filter recipes by category"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-[var(--soft)] p-1 border border-[var(--line)]"
            >
              {FEED_FILTERS.map((f) => {
                const isActive = selectedCategory === f.id && !showVideoOnly;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(f.id);
                      setShowVideoOnly(false);
                    }}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[var(--surface)] text-[var(--ink)] shadow-sm"
                        : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {selectedCategory === "main-course" && !showVideoOnly && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line)] bg-[var(--soft)] p-4">
            <ul className="m-0 flex flex-wrap items-center gap-2 list-none p-0">
              {MAIN_COURSE_SUBCATEGORIES.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/category/main-course?sub=${sub.id}`}
                    className="inline-block rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors no-underline whitespace-nowrap"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/category/main-course"
              className="text-xs font-semibold text-[var(--accent)] hover:underline whitespace-nowrap shrink-0 no-underline"
            >
              Open Main Course hub →
            </Link>
          </div>
        )}

        {filteredRecipes.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[var(--line)] bg-[var(--soft)] p-10 text-center">
            <p className="font-display text-xl font-bold text-[var(--ink)]">
              No recipes matched your current filter.
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Try searching for chili, salmon, soup, borscht, or cheesecake.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              Show All Recipes
            </button>
          </div>
        ) : (
          <motion.div
            key={`${selectedCategory}-${searchInput}-${showVideoOnly}`}
            initial={{ opacity: 0.92, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredRecipes.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] no-underline transition-colors hover:border-[var(--accent)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--soft)]">
                  <RecipeThumb
                    src={r.image}
                    alt={r.title}
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {/* Quiet Unboxed Kicker */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
                    <span className="font-semibold text-[var(--accent)]">
                      {r.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{r.cuisine}</span>
                  </div>

                  <h3 className="font-display mt-2 text-xl font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {r.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {r.description}
                  </p>

                  {/* Unboxed Footer Metadata */}
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3.5 text-xs text-[var(--muted)] tabular-nums">
                    <span>{formatMinutes(r.prep + r.cook)}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[var(--ink)]">
                      <Star
                        className="h-3.5 w-3.5 fill-[var(--star)] text-[var(--star)]"
                        aria-hidden="true"
                      />
                      {r.rating.value} ({r.rating.count.toLocaleString()})
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </section>

      {/* 5. THE COOKBOOK SPOTLIGHT */}
      <section
        id="cookbook"
        className="border-y border-[var(--line)] bg-[var(--soft)]"
      >
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 px-5 py-14 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] lg:col-span-6">
            <RecipeThumb
              src="/images/cookbook_hardcover_spread.jpg"
              alt="Hearth & Ladle Hardcover Cookbook beside a bowl of classic borscht"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>National Bestselling Cookbook</span>
            </p>
            <h2 className="font-display mt-2.5 text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl text-balance">
              Hearth &amp; Ladle: 100+ Easy Family Favorites You’ll Make Again
              and Again
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Inside our hardcover collection, you will find budget-friendly
              weeknight dinners, crowd-pleasing entertaining spreads, and
              cherished Ukrainian heritage recipes passed down from our mother’s
              kitchen—every single one photographed and tested to perfection.
            </p>

            {/* Unboxed Quantitative Proof Row */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-y border-[var(--line)] py-4 tabular-nums">
              <div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  100+
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Tested Recipes
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  300+
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Home Cook Testers
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[var(--ink)]">
                  3 Weeks
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Bestseller List
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/recipes/classic-ukrainian-borscht"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 no-underline"
              >
                <span>Cook Our Heritage Borscht</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about#cookbook"
                className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors no-underline"
              >
                About the book →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WATCH & COOK VIDEO TUTORIALS */}
      <section id="videos" className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Watch &amp; Cook With Us
            </p>
            <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
              Step-by-Step Video Tutorials
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowVideoOnly(true);
              setSelectedCategory("all");
              const el = document.getElementById("recipes-feed");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-sm font-semibold text-[var(--accent)] hover:underline cursor-pointer"
          >
            Filter all video recipes
          </button>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {videoRecipes.map((r) => (
            <Link
              key={r.slug}
              href={`/recipes/${r.slug}`}
              className="group relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] no-underline"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--soft)]">
                <RecipeThumb
                  src={r.image}
                  alt={`${r.title} step-by-step tutorial`}
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-[#1a1917] shadow-md transition-transform duration-200 group-hover:scale-110">
                    <Play className="h-5 w-5 fill-current translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-white">
                  <div>
                    <div className="text-xs font-medium text-white/85">
                      {r.category} · {r.videoDuration}
                    </div>
                    <div className="font-display text-lg font-bold leading-snug">
                      {r.title}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. ABOUT US SECTION (HOME PREVIEW LINKING TO FULL /about CLONE) */}
      <section
        id="about"
        className="border-t border-[var(--line)] bg-[var(--soft)]"
      >
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 px-5 py-14 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              <ChefHat className="h-4 w-4" aria-hidden="true" />
              <span>Welcome to Hearth &amp; Ladle</span>
            </p>
            <h2 className="font-display mt-2.5 text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl text-balance">
              Hi, we’re Elena &amp; Vadim—sharing recipes worth gathering around
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              What began in 2009 as a small family kitchen journal to preserve
              our Ukrainian mother’s borscht and pierogi recipes has grown into
              a trusted home-cooking destination for millions of families. Every
              recipe starts with simple pantry ingredients and thorough testing
              so dinner turns out right the very first time.
            </p>

            <div className="mt-6 flex flex-wrap gap-8 border-t border-[var(--line)] pt-5 text-sm tabular-nums">
              <div>
                <div className="font-display text-xl font-bold text-[var(--ink)]">
                  Since 2009
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Family Kitchen Journal
                </div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-[var(--ink)]">
                  Simple Ingredients
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Budget-Friendly Staples
                </div>
              </div>
              <div>
                <div className="font-display text-xl font-bold text-[var(--ink)]">
                  Step-by-Step
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Photos &amp; Video Guides
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 no-underline"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about#contact"
                className="text-sm font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors no-underline"
              >
                Contact our kitchen →
              </Link>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] lg:col-span-6">
            <RecipeThumb
              src="/images/about_kitchen_portrait.jpg"
              alt="Elena Kravchuk in her sunlit home kitchen preparing fresh herbs and bread"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      {/* 8. AS SEEN IN EDITORIAL PRESS BAR */}
      <section className="border-t border-[var(--line)] bg-[var(--bg)]">
        <div className="mx-auto max-w-[1200px] px-5 py-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
            As Featured In
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg text-[var(--muted)] sm:text-xl">
            {PRESS_PUBLICATIONS.map((pub) => (
              <span
                key={pub.name}
                className={`${pub.style} opacity-80 transition-opacity hover:opacity-100`}
              >
                {pub.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
