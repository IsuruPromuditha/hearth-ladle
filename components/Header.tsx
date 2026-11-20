"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";

type MenuGroup = {
  heading: string;
  items: { label: string; href: string }[];
};

const RECIPE_MEGA_MENU: MenuGroup[] = [
  {
    heading: "By Course",
    items: [
      { label: "Main Course", href: "/category/main-course" },
      { label: "Dessert", href: "/?course=dessert#recipes-feed" },
      { label: "Soup", href: "/?course=soup#recipes-feed" },
      { label: "Salad", href: "/?course=salad#recipes-feed" },
      { label: "Breads", href: "/?course=breads#recipes-feed" },
      { label: "Breakfast", href: "/?course=breakfast#recipes-feed" },
      { label: "Lunch", href: "/?course=lunch#recipes-feed" },
      { label: "Sides", href: "/?course=sides#recipes-feed" },
      { label: "Condiments", href: "/?course=condiments#recipes-feed" },
      { label: "Drinks", href: "/?course=drinks#recipes-feed" },
    ],
  },
  {
    heading: "Method & Popular",
    items: [
      { label: "30-Minute Meals", href: "/?type=30-minute-meals#recipes-feed" },
      { label: "Slow Cooker", href: "/?method=slow-cooker#recipes-feed" },
      { label: "Instant Pot", href: "/?method=instant-pot#recipes-feed" },
      { label: "Air Fryer", href: "/?method=air-fryer#recipes-feed" },
      { label: "Sourdough", href: "/?method=sourdough#recipes-feed" },
      { label: "Kid Friendly", href: "/?type=kid-friendly#recipes-feed" },
      { label: "Copycat", href: "/?type=copycat#recipes-feed" },
    ],
  },
  {
    heading: "Occasion & Ingredient",
    items: [
      { label: "Thanksgiving", href: "/?type=thanksgiving#recipes-feed" },
      { label: "Entertaining", href: "/?type=entertaining#recipes-feed" },
      { label: "Chicken", href: "/?ingredient=chicken#recipes-feed" },
      { label: "Beef", href: "/?ingredient=beef#recipes-feed" },
      { label: "All Recipes", href: "/#recipes-feed" },
    ],
  },
];

const ABOUT_MENU = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/about#contact" },
  { label: "Privacy & Policy", href: "/privacy-policy" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<"recipes" | "about" | null>(
    null
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const attr = document.documentElement.getAttribute("data-theme");
      const hasClass = document.documentElement.classList.contains("dark");
      setIsDark(attr === "dark" || hasClass);
    };
    checkTheme();

    const handleOutsidePointer = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsidePointer);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsidePointer);
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
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--surface)]"
    >
      <div className="relative mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-5">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          onClick={() => {
            setActiveMenu(null);
            setMobileOpen(false);
          }}
          className="font-display text-2xl font-bold tracking-tight text-[var(--ink)] whitespace-nowrap shrink-0 no-underline"
        >
          Hearth &amp; Ladle
        </Link>

        {/* Zone 2: Single-Line Nav Links with Recipes & About Dropdowns */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--muted)]"
          aria-label="Primary navigation"
        >
          {/* Recipes Mega Dropdown */}
          <div>
            <button
              type="button"
              aria-expanded={activeMenu === "recipes"}
              aria-controls="recipes-mega-menu"
              onClick={() =>
                setActiveMenu((prev) => (prev === "recipes" ? null : "recipes"))
              }
              className={`inline-flex items-center gap-1 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === "recipes"
                  ? "text-[var(--accent)]"
                  : "text-[var(--ink)] hover:text-[var(--accent)]"
              }`}
            >
              <span>Recipes</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${
                  activeMenu === "recipes" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {activeMenu === "recipes" && (
              <div
                id="recipes-mega-menu"
                role="region"
                aria-label="Recipe categories"
                className="absolute left-1/2 top-[calc(100%+4px)] z-50 w-[min(680px,calc(100vw-32px))] -translate-x-1/2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-xl grid grid-cols-3 gap-6"
              >
                {RECIPE_MEGA_MENU.map((group) => (
                  <div key={group.heading}>
                    <h3 className="mb-3 border-b border-[var(--line)] pb-2 text-xs font-semibold tracking-wide text-[var(--accent)]">
                      {group.heading}
                    </h3>
                    <ul className="m-0 list-none space-y-1.5 p-0">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
                            className="block rounded-md px-1.5 py-1 text-sm text-[var(--ink)] hover:bg-[var(--soft)] hover:text-[var(--accent)] transition-colors no-underline"
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
            href="/?type=30-minute-meals#recipes-feed"
            onClick={() => setActiveMenu(null)}
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            30-Minute
          </Link>
          <Link
            href="/?method=slow-cooker#recipes-feed"
            onClick={() => setActiveMenu(null)}
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            Slow Cooker
          </Link>
          <Link
            href="/#cookbook"
            onClick={() => setActiveMenu(null)}
            className="hover:text-[var(--ink)] transition-colors whitespace-nowrap shrink-0 no-underline text-[var(--muted)]"
          >
            Cookbook
          </Link>

          {/* About Dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={activeMenu === "about"}
              aria-controls="about-dropdown-menu"
              onClick={() =>
                setActiveMenu((prev) => (prev === "about" ? null : "about"))
              }
              className={`inline-flex items-center gap-1 py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeMenu === "about"
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              <span>About</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${
                  activeMenu === "about" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {activeMenu === "about" && (
              <div
                id="about-dropdown-menu"
                role="region"
                aria-label="About pages"
                className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[210px] rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-xl flex flex-col gap-0.5"
              >
                {ABOUT_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--soft)] hover:text-[var(--accent)] transition-colors no-underline whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
            onClick={() => setActiveMenu(null)}
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
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[var(--line)] bg-[var(--surface)] px-5 py-5 md:hidden">
          <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-[var(--line)]">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              Home
            </Link>
            <Link
              href="/?type=30-minute-meals#recipes-feed"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              30-Minute Meals
            </Link>
            <Link
              href="/?method=slow-cooker#recipes-feed"
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
              href="/privacy-policy"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[var(--soft)] px-3 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline"
            >
              Privacy &amp; Policy
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