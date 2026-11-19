"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuGroup = {
  heading: string;
  items: { label: string; href: string }[];
};

const RECIPE_MEGA_MENU: MenuGroup[] = [
  {
    heading: "By Course",
    items: [
      { label: "Appetizers", href: "/?course=appetizers" },
      { label: "Breakfast", href: "/?course=breakfast" },
      { label: "Lunch", href: "/?course=lunch" },
      { label: "Main Course", href: "/?course=main-course" },
      { label: "Soups & Chili", href: "/?course=soup" },
      { label: "Salads", href: "/?course=salads" },
      { label: "Side Dishes", href: "/?course=sides" },
      { label: "Desserts & Baking", href: "/?course=desserts" },
    ],
  },
  {
    heading: "By Ingredient",
    items: [
      { label: "Chicken Recipes", href: "/?ingredient=chicken" },
      { label: "Beef & Ground Beef", href: "/?ingredient=beef" },
      { label: "Seafood & Salmon", href: "/?ingredient=seafood" },
      { label: "Pasta & Grains", href: "/?ingredient=pasta" },
      { label: "Potato Recipes", href: "/?ingredient=potatoes" },
      { label: "Beans & Lentils", href: "/?ingredient=beans" },
      { label: "Vegetarian", href: "/?ingredient=vegetarian" },
    ],
  },
  {
    heading: "Popular & Method",
    items: [
      { label: "Slow Cooker", href: "/?method=slow-cooker" },
      { label: "Instant Pot", href: "/?method=instant-pot" },
      { label: "Air Fryer", href: "/?method=air-fryer" },
      { label: "30-Minute Meals", href: "/?type=30-minute-meals" },
      { label: "Kid-Friendly", href: "/?type=kid-friendly" },
      { label: "Recipe Roundups", href: "/?type=roundups" },
      { label: "All Recipes", href: "/" },
    ],
  },
];

const ABOUT_MENU = [
  { label: "About Hearth & Ladle", href: "/#about" },
  { label: "Kitchen Essentials & Shop", href: "/#shop" },
  { label: "Reader Favorites", href: "/" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<"recipes" | "about" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const closeAll = () => {
      setActiveMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", closeAll);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", closeAll);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  function toggleTheme() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme");
    const systemDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = current === "dark" || (!current && systemDark);
    const next = isDark ? "light" : "dark";

    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hl-theme", next);
    } catch {}
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
  }

  return (
    <header className="nk-header" onClick={(e) => e.stopPropagation()}>
      {/* Top Tier: Socials + Centered Editorial Wordmark + Search/Subscribe */}
      <div className="nk-top">
        <div className="wrap wide nk-top-inner">
          <div className="nk-socials" aria-label="Social media">
            <a href="#youtube" aria-label="YouTube" title="YouTube">
              ▶
            </a>
            <a href="#instagram" aria-label="Instagram" title="Instagram">
              ◎
            </a>
            <a href="#pinterest" aria-label="Pinterest" title="Pinterest">
              P
            </a>
            <a href="#facebook" aria-label="Facebook" title="Facebook">
              f
            </a>
          </div>

          <button
            type="button"
            className="nk-burger"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          <div className="nk-brand">
            <Link className="nk-logo" href="/">
              Hearth<span> &amp; </span>Ladle
            </Link>
            <span className="nk-tagline">
              Trusted Recipes &amp; Everyday Comfort Cooking
            </span>
          </div>

          <div className="nk-top-actions">
            <a className="nk-sub-pill hide-m" href="#subscribe">
              Subscribe
            </a>
            <button
              type="button"
              className="nk-icon-btn"
              aria-label="Toggle search"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((prev) => !prev);
                setActiveMenu(null);
              }}
            >
              🔍
            </button>
            <button
              type="button"
              className="nk-icon-btn"
              aria-label="Toggle dark mode"
              title="Toggle theme"
              onClick={toggleTheme}
            >
              ◐
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Sticky Main Navigation */}
      <div className="nk-nav-bar">
        <div className="wrap wide">
          <nav className="nk-nav" aria-label="Primary navigation">
            <Link href="/">Home</Link>

            {/* Recipes Mega Dropdown */}
            <div className={`nk-dd${activeMenu === "recipes" ? " open" : ""}`}>
              <button
                type="button"
                aria-expanded={activeMenu === "recipes"}
                onClick={() =>
                  setActiveMenu((prev) => (prev === "recipes" ? null : "recipes"))
                }
              >
                Recipes <span aria-hidden="true">▾</span>
              </button>
              <div className="nk-mega" role="region" aria-label="Recipe categories">
                {RECIPE_MEGA_MENU.map((group) => (
                  <div key={group.heading} className="nk-mega-col">
                    <h3>{group.heading}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveMenu(null)}
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

            <Link href="/?method=slow-cooker">Slow Cooker</Link>
            <Link href="/?type=30-minute-meals">30-Minute Meals</Link>
            <Link href="/?course=soup">Soups &amp; Chili</Link>
            <Link href="/?video=true">Videos</Link>
            <Link href="/#cookbook">Cookbook</Link>

            {/* About Dropdown */}
            <div className={`nk-dd${activeMenu === "about" ? " open" : ""}`}>
              <button
                type="button"
                aria-expanded={activeMenu === "about"}
                onClick={() =>
                  setActiveMenu((prev) => (prev === "about" ? null : "about"))
                }
              >
                About <span aria-hidden="true">▾</span>
              </button>
              <div className="nk-dropdown">
                {ABOUT_MENU.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="nk-search-drawer">
          <form className="wrap nk-search-form" onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes, ingredients (e.g., slow cooker chili)…"
              aria-label="Search recipes"
            />
            <button type="submit" className="btn primary">
              Search
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setSearchOpen(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="nk-mobile-drawer">
          <div className="wrap">
            <form className="nk-mobile-search" onSubmit={handleSearchSubmit}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes…"
                aria-label="Search recipes"
              />
              <button type="submit" className="btn primary">
                Go
              </button>
            </form>

            <div className="nk-mobile-links">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href="/?method=slow-cooker" onClick={() => setMobileOpen(false)}>
                Slow Cooker
              </Link>
              <Link href="/?type=30-minute-meals" onClick={() => setMobileOpen(false)}>
                30-Minute Meals
              </Link>
              <Link href="/?course=soup" onClick={() => setMobileOpen(false)}>
                Soups &amp; Chili
              </Link>
              <Link href="/#cookbook" onClick={() => setMobileOpen(false)}>
                Cookbook
              </Link>
              <Link href="/#about" onClick={() => setMobileOpen(false)}>
                About
              </Link>
            </div>

            <div className="nk-mobile-groups">
              {RECIPE_MEGA_MENU.map((group) => (
                <div key={group.heading}>
                  <h3>{group.heading}</h3>
                  <div className="nk-mobile-grid">
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}