"use client";
import { useEffect, useState } from "react";
import type { Comment } from "@/lib/comments";

export default function Comments({ slug }: { slug: string }) {
  const [list, setList] = useState<Comment[]>([]);
  const [rating, setRating] = useState(0);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        if (active && Array.isArray(d)) setList(d);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [slug]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setBusy(true);
    setErr("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          rating,
          name: f.get("name"),
          email: f.get("email"),
          text: f.get("text"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error ?? "Something went wrong.");
        return;
      }
      setList((prev) => [data, ...prev]);
      setRating(0);
      form.reset();
    } catch {
      setErr("Network error while posting comment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="comments" aria-labelledby="ch">
      <h2 id="ch">Leave a comment</h2>
      <form onSubmit={submit} noValidate>
        <span id="rl" className="ui" style={{ display: "block", fontWeight: 600, fontSize: 14, margin: "12px 0 4px" }}>
          Your rating
        </span>
        <div className="rate" role="radiogroup" aria-labelledby="rl">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={n <= rating ? "on" : ""}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
        </div>

        <label htmlFor="text">Comment</label>
        <textarea id="text" name="text" rows={4} required />

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email (not published)</label>
        <input type="email" id="email" name="email" required />

        <p className="err" role="alert">
          {err}
        </p>
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? "Posting…" : "Post comment"}
        </button>
      </form>

      <h2>Comments ({list.length})</h2>
      {list.length === 0 && (
        <p className="note">No comments yet. Be the first to rate this recipe.</p>
      )}
      {list.map((c) => (
        <div className="comment" key={c.id}>
          <div className="who">
            {c.name}{" "}
            {c.rating > 0 && (
              <span className="stars" aria-label={`${c.rating} stars`}>
                {"★".repeat(c.rating)}
              </span>
            )}
          </div>
          <div className="when">
            {new Date(c.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <p>{c.text}</p>
        </div>
      ))}
    </section>
  );
}