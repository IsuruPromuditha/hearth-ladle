import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import Comments from "@/components/Comments";
import { getAllRecipes, getRecipe, SITE } from "@/lib/recipes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRecipe((await params).slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `/recipes/${r.slug}` },
    openGraph: { title: r.title, description: r.description, type: "article", url: `${SITE}/recipes/${r.slug}` },
  };
}

export default async function RecipePage({ params }: Props) {
  const r = getRecipe((await params).slug);
  if (!r) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.title,
    description: r.description,
    author: { "@type": "Person", name: r.author },
    datePublished: r.updated,
    prepTime: `PT${r.prep}M`,
    cookTime: `PT${r.cook}M`,
    totalTime: `PT${r.prep + r.cook}M`,
    recipeYield: `${r.baseServings} servings`,
    recipeCategory: r.category,
    recipeCuisine: r.cuisine,
    aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating.value, ratingCount: r.rating.count },
    recipeIngredient: r.ingredients.map((i) => `${i.a}${i.u ? " " + i.u : ""} ${i.t}`),
    recipeInstructions: r.steps.map((text) => ({ "@type": "HowToStep", text })),
    nutrition: { "@type": "NutritionInformation", calories: r.nutrition.Calories },
  };

  return (
    <main className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="crumbs pre">
        <Link href="/">Home</Link> / <Link href="/">Recipes</Link> / {r.category}
      </div>
      <article>
        <h1>{r.title}</h1>
        <div className="byline pre">
          <span className="avatar" aria-hidden="true">{r.author.split(" ").map((w) => w[0]).join("")}</span>
          <span>By {r.author}</span>
          <span>Updated {new Date(r.updated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          <a href="#comments" className="nodec">
            <span className="stars" aria-label={`${r.rating.value} out of 5`}>★★★★★</span> {r.rating.value} ({r.rating.count})
          </a>
        </div>
        <div className="actions pre">
          <a className="btn primary" href="#recipe">Jump to recipe</a>
          <a className="btn" href="#comments">Rate</a>
        </div>

        <div className="hero" role="img" aria-label="Hero photo placeholder">
          Hero photo goes here. Use next/image with a file in /public.
        </div>
        <p className="note">This post may contain affiliate links.</p>

        {r.sections.map((s) => (
          <section key={s.h}><h2>{s.h}</h2><p>{s.p}</p></section>
        ))}

        <RecipeCard recipe={r} />
        <Comments slug={r.slug} />
      </article>
    </main>
  );
}
