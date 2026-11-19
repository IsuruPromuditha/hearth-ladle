import Link from "next/link";
import { getAllRecipes } from "@/lib/recipes";

export default function Home() {
  const recipes = getAllRecipes();
  return (
    <main className="wrap">
      <h1 style={{ marginTop: 40 }}>Recipes</h1>
      <div className="grid">
        {recipes.map((r) => (
          <Link key={r.slug} href={`/recipes/${r.slug}`}>
            <i />{r.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
