import type { Metadata } from "next";
import MainCourseClient from "@/components/MainCourseClient";
import { getAllRecipes, SITE } from "@/lib/recipes";

export const metadata: Metadata = {
  title: "Main Course Recipes",
  description:
    "Browse tested main course recipes including Beef, Casseroles, Chicken, High Protein, Pasta and Grains, Pork, and Seafood dishes.",
  alternates: { canonical: "/category/main-course" },
  openGraph: {
    title: "Main Course Recipes – Hearth & Ladle",
    description:
      "Hearty weeknight dinners, family favorites, and crowd-pleasing entrees.",
    type: "website",
    url: `${SITE}/category/main-course`,
  },
};

type Props = {
  searchParams: Promise<{ sub?: string }>;
};

export default async function MainCourseCategoryPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialSub = (params.sub ?? "").trim().toLowerCase();

  const mainCourseRecipes = getAllRecipes().filter(
    (r) =>
      r.category.toLowerCase() === "main course" ||
      r.tags.includes("main-course")
  );

  return (
    <MainCourseClient
      recipes={mainCourseRecipes}
      initialSubcategory={initialSub}
    />
  );
}
