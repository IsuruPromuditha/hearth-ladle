// app/page.tsx
import Link from "next/link";
import { getAllRecipes } from "@/lib/recipes";

type HomeProps = {
  searchParams: Promise<{
    q?: string;
    course?: string;
    ingredient?: string;
    method?: string;
    type?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const activeFilter =
    params.course || params.ingredient || params.method || params.type || "";

  const allRecipes = getAllRecipes();
  const recipes = allRecipes.filter((r) => {
    const haystack = [
      r.title,
      r.description,
      r.category,
      r.cuisine,
      ...r.ingredients.map((i) => i.t),
      ...r.steps,
    ]
      .join(" ")
      .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (activeFilter) {
      const normalized = activeFilter.replace(/-/g, " ").toLowerCase();
      if (!haystack.includes(normalized)) return false;
    }
    return true;
  });

  const heading = q
    ? `Search results for “${params.q}”`
    : activeFilter
    ? `${activeFilter.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} Recipes`
    : "Recipes";

  return (
    <main className="wrap">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 40, gap: 12 }}>
        <h1 style={{ margin: 0 }}>{heading}</h1>
        {(q || activeFilter) && (
          <Link href="/" className="ui" style={{ fontSize: 14, fontWeight: 700 }}>
            Clear filter ×
          </Link>
        )}
      </div>

      {recipes.length === 0 ? (
        <p className="note big" style={{ marginTop: 20 }}>
          No recipes matched that filter yet. <Link href="/">View all recipes</Link>.
        </p>
      ) : (
        <div className="grid">
          {recipes.map((r) => (
            <Link key={r.slug} href={`/recipes/${r.slug}`}>
              <i />
              {r.title}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}