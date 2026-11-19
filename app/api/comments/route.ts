import { NextResponse } from "next/server";
import { addComment, listComments } from "@/lib/comments";
import { getRecipe } from "@/lib/recipes";

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug")?.trim() ?? "";
  if (!slug || !getRecipe(slug)) {
    return NextResponse.json({ error: "Unknown recipe" }, { status: 404 });
  }
  return NextResponse.json(listComments(slug));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const slug = String(body.slug ?? "").trim();
  const name = String(body.name ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim();
  const text = String(body.text ?? "").trim().slice(0, 2000);
  const rawRating = Number(body.rating);
  const rating = Number.isFinite(rawRating)
    ? Math.min(5, Math.max(0, Math.round(rawRating)))
    : 0;

  if (!slug || !getRecipe(slug)) {
    return NextResponse.json({ error: "Unknown recipe" }, { status: 404 });
  }
  if (!name || !text || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Name, comment and a valid email are required." },
      { status: 400 }
    );
  }

  // Email is validated here and intentionally not persisted.
  return NextResponse.json(addComment(slug, { name, rating, text }), { status: 201 });
}