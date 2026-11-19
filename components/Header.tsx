"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem("hl-theme");
      if (t) document.documentElement.setAttribute("data-theme", t);
    } catch {}
    const close = () => setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, []);

  function toggleTheme() {
    const r = document.documentElement;
    const next = getComputedStyle(r).colorScheme === "dark" ? "light" : "dark";
    r.setAttribute("data-theme", next);
    try { localStorage.setItem("hl-theme", next); } catch {}
  }

  return (
    <header className="site">
      <div className="wrap wide">
        <Link className="logo" href="/">Hearth<span> &amp; </span>Ladle</Link>
        <nav className="main" aria-label="Main">
          <div className={`dd${open ? " open" : ""}`}>
            <button aria-expanded={open} onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>Recipes ▾</button>
            <div className="menu">
              <div><h3>Course</h3><Link href="/">Main course</Link><Link href="/">Soup</Link><Link href="/">Sides</Link><Link href="/">Desserts</Link></div>
              <div><h3>Popular</h3><Link href="/">Slow cooker</Link><Link href="/">30-minute meals</Link><Link href="/">Kid-friendly</Link></div>
            </div>
          </div>
          <Link className="hide-m" href="/">Cookbook</Link>
          <Link className="hide-m" href="/">About</Link>
          <button onClick={toggleTheme} aria-label="Toggle dark mode">◐</button>
        </nav>
      </div>
    </header>
  );
}
