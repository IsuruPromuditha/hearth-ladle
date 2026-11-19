import fs from "node:fs";
import path from "node:path";

export type Ingredient = { a: number; u?: string; m?: number; mu?: string; t: string };
export type Recipe = {
  slug: string; title: string; description: string; author: string; updated: string;
  category: string; cuisine: string; skill: string; cost: string;
  prep: number; cook: number; baseServings: number;
  rating: { value: number; count: number };
  sections: { h: string; p: string }[];
  ingredients: Ingredient[]; steps: string[]; notes: string;
  nutrition: Record<string, string>;
};

const dir = path.join(process.cwd(), "content", "recipes");

export function getAllRecipes(): Recipe[] {
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Recipe)
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

export function getRecipe(slug: string): Recipe | undefined {
  return getAllRecipes().find((r) => r.slug === slug);
}

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
