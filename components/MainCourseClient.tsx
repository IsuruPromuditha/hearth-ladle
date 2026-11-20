"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChefHat, Clock, Star, UtensilsCrossed, X } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { formatMinutes } from "@/lib/format";

export const MAIN_COURSE_SUBCATEGORIES = [
  { id: "beef", label: "Beef", description: "Steak, ground beef, and slow-simmered favorites" },
  { id: "casseroles", label: "Casseroles", description: "Comforting baked one-dish family dinners" },
  { id: "chicken", label: "Chicken", description: "Quick skillet meals, roasts, and cutlets" },
  { id: "high-protein", label: "High Protein", description: "Nourishing, protein-rich everyday entrees" },
  { id: "pasta-and-grains", label: "Pasta and Grains", description: "Cozy pasta nights and hearty grain bowls" },
  { id: "pork", label: "Pork", description: "Savory pork tenderloin, chops, and sausage suppers" },
  { id: "seafood", label: "Seafood", description: "Crisp-seared salmon, shrimp, and coastal dishes" },
];

function DishThumb({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--soft)] p-6 text-center text-[var(--muted)]">
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
      sizes="(max-width: 768px) 100vw, 380px"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
}

export default function MainCourseClient({
  recipes,
  initialSubcategory,
}: {
  recipes: Recipe[];
  initialSubcategory: string;
}) {
  const [activeSub, setActiveSub] = useState<string>(initialSubcategory || "all");

  useEffect(() => {
    setActiveSub(initialSubcategory || "all");
  }, [initialSubcategory]);

  const filtered = useMemo(() => {
    if (activeSub === "all") return recipes;
    const normalized = activeSub.toLowerCase();
    const words = normalized.replace(/-/g, " ");
    return recipes.filter((r) => {
      const hasTag = r.tags.some(
        (t) => t.toLowerCase() === normalized || t.toLowerCase().replace(/-/g, " ") === words
      );
      if (hasTag) return true;
      const haystack = [
        r.title,
        r.description,
        ...r.ingredients.map((i) => i.t),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(words);
    });
  }, [recipes, activeSub]);

  const activeMeta = MAIN_COURSE_SUBCATEGORIES.find((s) => s.id === activeSub);

  return (
    <main className="w-full">
      {/* Category Header */}
      <section className="border-b border-[var(--line)] bg-[var(--soft)]">
        <div className="mx-auto max-w-[1200px] px-5 py-12">
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-[var(--muted)]">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--accent)] no-underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/#recipes-feed"
              className="text-[var(--muted)] hover:text-[var(--accent)] no-underline"
            >
              Recipes
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--ink)]">Main Course</span>
          </nav>

          <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            <ChefHat className="h-4 w-4" aria-hidden="true" />
            <span>Recipe Category</span>
          </p>
          <h1 className="font-display mt-2 text-[clamp(2rem,4vw,3.15rem)] font-bold leading-tight tracking-tight text-[var(--ink)] text-balance">
            Main Course Recipes
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
            From 20-minute weeknight skillet suppers to comforting slow-cooker
            classics, browse reliable main course recipes tested for the family
            table.
          </p>

          {/* Subcategory List (Beef, Casseroles, Chicken, High Protein, Pasta and Grains, Pork, Seafood) */}
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Browse Main Course By Type
              </h2>
              {activeSub !== "all" && (
                <button
                  type="button"
                  onClick={() => setActiveSub("all")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Show all main courses</span>
                </button>
              )}
            </div>

            <ul className="m-0 flex flex-wrap gap-2.5 list-none p-0">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveSub("all")}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    activeSub === "all"
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]"
                  }`}
                >
                  All Main Course
                </button>
              </li>
              {MAIN_COURSE_SUBCATEGORIES.map((sub) => {
                const isSelected = activeSub === sub.id;
                return (
                  <li key={sub.id}>
                    <button
                      type="button"
                      onClick={() => setActiveSub(sub.id)}
                      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                          : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {sub.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {activeMeta && (
              <p className="mt-3 text-sm text-[var(--muted)]">
                <strong className="font-semibold text-[var(--ink)]">
                  {activeMeta.label}:
                </strong>{" "}
                {activeMeta.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Course Recipes Grid */}
      <section className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] pb-4">
          <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
            {activeMeta ? `${activeMeta.label} Recipes` : "All Main Course Recipes"}
          </h2>
          <span className="text-sm text-[var(--muted)] tabular-nums">
            {filtered.length} {filtered.length === 1 ? "recipe" : "recipes"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[var(--line)] bg-[var(--soft)] p-10 text-center">
            <p className="font-display text-xl font-bold text-[var(--ink)]">
              More {activeMeta?.label ?? activeSub} recipes coming soon.
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Explore our tested Beef, High Protein, Pork, and Seafood main
              courses in the meantime.
            </p>
            <button
              type="button"
              onClick={() => setActiveSub("all")}
              className="mt-5 inline-flex items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              Show All Main Course Recipes
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] no-underline transition-colors hover:border-[var(--accent)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--soft)]">
                  <DishThumb src={r.image} alt={r.title} />
                </div>

                <div className="flex flex-1 flex-col p-5">
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

                  <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3.5 text-xs text-[var(--muted)] tabular-nums">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                      {formatMinutes(r.prep + r.cook)}
                    </span>
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
          </div>
        )}
      </section>
    </main>
  );
}
