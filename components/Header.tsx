"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

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

  return (
    <header className="site">
      <div className="wrap wide">
        <Link className="logo" href="/">
          Hearth<span> &amp; </span>Ladle
        </Link>
        <nav className="main" aria-label="Main">
          <div className={`dd${open ? " open" : ""}`}>
            <button
              type="button"
              aria-expanded={open}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              Recipes ▾
            </button>
            <div className="menu">
              <div>
                <h3>Course</h3>
                <Link href="/">Main course</Link>
                <Link href="/">Soup</Link>
                <Link href="/">Sides</Link>
                <Link href="/">Desserts</Link>
              </div>
              <div>
                <h3>Popular</h3>
                <Link href="/">Slow cooker</Link>
                <Link href="/">30-minute meals</Link>
                <Link href="/">Kid-friendly</Link>
              </div>
            </div>
          </div>
          <Link className="hide-m" href="/">
            Cookbook
          </Link>
          <Link className="hide-m" href="/">
            About
          </Link>
          <button type="button" onClick={toggleTheme} aria-label="Toggle dark mode">
            ◐
          </button>
        </nav>
      </div>
    </header>
  );
}