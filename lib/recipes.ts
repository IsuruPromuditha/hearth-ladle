// lib/recipes.ts
export const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  ""
);

export type Ingredient = {
  a: number;
  u?: string;
  t: string;
};

export type RecipeSection = {
  h: string;
  p: string;
};

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  author: string;
  updated: string;
  prep: number;
  cook: number;
  baseServings: number;
  category: string;
  cuisine: string;
  skill: string;
  cost: string;
  rating: { value: number; count: number };
  sections: RecipeSection[];
  ingredients: Ingredient[];
  steps: string[];
  notes?: string;
  nutrition: Record<string, string>;
};

export const RECIPES: Recipe[] = [
  {
    slug: "smoky-slow-cooker-bean-chili",
    title: "Slow Cooker Chili",
    description:
      "Hearty slow cooker chili made with lean ground beef, beans, diced tomatoes, and warm chili spices.",
    author: "Natasha Kravchuk",
    updated: "2026-05-01",
    prep: 10,
    cook: 210,
    baseServings: 10,
    category: "Main course",
    cuisine: "American",
    skill: "Easy",
    cost: "$$",
    rating: { value: 4.9, count: 2535 },
    sections: [
      {
        h: "Why Slow Cooking Works So Well",
        p: "Browning the beef, onion, garlic, and spices first builds deep flavor, while slow cooking lets the seasoning meld without drying out the meat.",
      },
      {
        h: "Favorite Toppings",
        p: "Top with shredded cheddar or Mexican blend cheese, diced avocado, fresh cilantro, sour cream, or sliced jalapeños.",
      },
    ],
    ingredients: [
      { a: 2, u: "lb", t: "lean ground beef (85/15)" },
      { a: 1, u: "large", t: "onion, diced" },
      { a: 4, u: "cloves", t: "garlic, minced" },
      { a: 2, u: "Tbsp", t: "chili powder" },
      { a: 2, u: "tsp", t: "cumin powder" },
      { a: 1, u: "tsp", t: "garlic powder" },
      { a: 1, u: "tsp", t: "dried oregano" },
      { a: 1.5, u: "tsp", t: "fine sea salt, or to taste" },
      { a: 0.5, u: "tsp", t: "black pepper" },
      { a: 15, u: "oz", t: "can black beans, drained and rinsed" },
      { a: 15, u: "oz", t: "can kidney beans, drained and rinsed" },
      { a: 30, u: "oz", t: "diced tomatoes, with juice" },
      { a: 10, u: "oz", t: "diced tomatoes and green chilis, with juice" },
      { a: 15, u: "oz", t: "tomato sauce" },
    ],
    steps: [
      "Heat a large skillet over medium-high heat and sauté ground beef for 4–5 minutes, breaking it up with a spatula.",
      "Add the diced onion and sauté for about 4 minutes until softened.",
      "Stir in minced garlic, chili powder, cumin, garlic powder, salt, and pepper; cook for 30 seconds until fragrant.",
      "Transfer the beef mixture to a slow cooker and add the rinsed beans, diced tomatoes, tomatoes with green chilis, and tomato sauce.",
      "Stir well, cover, and cook on High for 3–4 hours or Low for 6–8 hours. Adjust salt to taste before serving.",
    ],
    notes:
      "Start with 1 tsp salt if you are watching sodium, since canned beans and tomatoes vary in salt content.",
    nutrition: {
      Calories: "340 kcal",
      Protein: "28g",
      Carbohydrates: "26g",
      Fat: "14g",
    },
  },
];

export function getAllRecipes(): Recipe[] {
  return RECIPES;
}

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}