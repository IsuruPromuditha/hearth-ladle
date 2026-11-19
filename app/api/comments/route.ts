import { NextResponse } from "next/server";
import { addComment, listComments } from "@/lib/comments";
import { getRecipe } from "@/lib/recipes";

export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  if (!getRecipe(slug)) return NextResponse.json({ error: "Unknown recipe" }, { status: 404 });
  return NextResponse.json(listComments(slug));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const slug = String(body?.slug ?? "");
  const name = String(body?.name ?? "").trim().slice(0, 80);
  const email = String(body?.email ?? "").trim();
  const text = String(body?.text ?? "").trim().slice(0, 2000);
  const rating = Math.min(5, Math.max(0, Number(body?.rating) || 0));

  if (!getRecipe(slug)) return NextResponse.json({ error: "Unknown recipe" }, { status: 404 });
  if (!name || !text || !/^\S+@\S+\.\S+$/.test(email))
    return NextResponse.json({ error: "Name, comment and a valid email are required." }, { status: 400 });

  // Email is validated but not stored here. Add spam protection and moderation before production.
  return NextResponse.json(addComment(slug, { name, rating, text }), { status: 201 });
}
