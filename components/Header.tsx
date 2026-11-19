"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";

type MenuGroup = {
  heading: string;
  items: { label: string; href: string }[];
};

const RECIPE_MEGA_MENU: MenuGroup[] = [
  {
    heading: "By Course",
    items: [
      { label: "Main Course", href: "/?course=main-course" },
      { label: "Soups & Chili", href: "/?course=soup" },
      { label: "Desserts & Baking", href: "/?course=desserts" },
      { label: "All Recipes", href: "/" },
    ],
  },
  {
    heading: "By Ingredient",
    items: [
      { label: "Beef & Ground Beef", href: "/?ingredient=beef" },
      { label: "Seafood & Salmon", href: "/?ingredient=seafood" },
      { label: "Potato Recipes", href: "/?ingredient=potatoes" },
      { label: "Beans & Lentils", href: "/?ingredient=beans" },
    ],
  },
  {
    heading: "Popular & Method",
    items: [
      { label: "Slow Cooker", href: "/?method=slow-cooker" },
      { label: "30-Minute Meals", href: "/?type=30-minute-meals" },
      { label: "Kid-Friendly", href: "/?type=kid-friendly" },
      { label: "Video Tutorials", href: "/?video=true" },
    ],
  },
];

export default function Header() {
  const [recipesOpen, setRecipesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      const hasClass = document.documentElement.classList.contains("dark");
      setIsDark(attr === "dark" || hasClass);
    };
    checkTheme();

    const closeAll = () => setRecipesOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setRecipesOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", closeAll);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextDark = !isDark;
    const next = nextDark ? "dark" : "light";
    root.setAttribute("data-theme", next);
    if (nextDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setIsDark(nextDark);
    try {
      localStorage.setItem("hl-theme", next);
    } catch {}
  }

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-5">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-[var(--ink)] whitespace-nowrap shrink-0 no-underline"
        >
          Hearth &amp; Ladle
        </Link>

        {/* Zone 2: 5 Single-Line Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--muted)]"
          aria-label="Primary navigation"
        >
          <div className="relative">
            <button
              type="button"
              aria-expanded={recipesOpen}
              onClick={() => setRecipesOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 py-2 text-[var(--ink)] hover:text-[var(--accent)] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Recipes</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${
                  recipesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {recipesOpen && (
              <div
                role="region"
                aria-label="Recipe categories"
                className="absolute left-1/2 top-[calc(100%+10px)] z-50 w-[min(600px,calc(100vw-40px))] -translate-x-1/2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-lg grid grid-cols-3 gap-6"
              >
                {RECIPE_MEGA_MENU.map((group) => (
                  <div key={group.heading}>
                    <h3 className="mb-3 border-b border-[var(--line)] pb-2 text-xs font-semibold tracking-wide text-[var(--accent)]">
                      {group.heading}
                    </h3>
                    <ul className="m-0 list-none space-y-2 p-0">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setRecipesOpen(false)}
                            className="block text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors no-underline"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/?type=30-minute-meals"
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            30-Minute
          </Link>
          <Link
            href="/?method=slow-cooker"
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            Slow Cooker
          </Link>
          <Link
            href="/#cookbook"
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            Cookbook
          </Link>
          <Link
            href="/about"
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            About
          </Link>
        </nav>

        {/* Zone 3: Theme Toggle + 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <Link
            href="/#subscribe"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0 no-underline"
          >
            Subscribe
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] md:hidden cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--surface)] px-5 py-5 md:hidden">
          <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-[var(--line)]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              Home
            </Link>
            <Link
              href="/?type=30-minute-meals"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              30-Minute Meals
            </Link>
            <Link
              href="/?method=slow-cooker"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              Slow Cooker
            </Link>
            <Link
              href="/#cookbook"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              Cookbook
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              About Us
            </Link>
            <Link
              href="/#subscribe"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--accent)] px-3 py-2.5 text-sm font-semibold text-[var(--accent-ink)] no-underline"
            >
              Subscribe
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {RECIPE_MEGA_MENU.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-2 text-xs font-semibold text-[var(--accent)]">
                  {group.heading}
                </h3>
                <ul className="m-0 list-none space-y-1.5 p-0">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1 text-sm text-[var(--muted)] hover:text-[var(--ink)] no-underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}