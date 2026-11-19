import HomeSections from "@/components/HomeSections";
import { getAllRecipes } from "@/lib/recipes";

type HomeProps = {
  searchParams: Promise<{
    q?: string;
    course?: string;
    ingredient?: string;
    method?: string;
    type?: string;
    video?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const activeFilter =
    params.course || params.ingredient || params.method || params.type || "";
  const videoOnly = params.video === "true";

  const recipes = getAllRecipes();

  return (
    <HomeSections
      recipes={recipes}
      initialQuery={q}
      initialFilter={activeFilter}
      videoOnly={videoOnly}
    />
  );
}