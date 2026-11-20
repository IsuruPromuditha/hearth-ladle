// lib/recipes.ts
export const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

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
  image: string;
  author: string;
  updated: string;
  prep: number;
  cook: number;
  baseServings: number;
  category: string;
  cuisine: string;
  skill: string;
  cost: string;
  tags: string[];
  featured?: boolean;
  videoDuration?: string;
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
    title: "Slow Cooker Beef & Bean Chili",
    description:
      "Hearty slow cooker chili made with lean ground beef, tender beans, fire-roasted tomatoes, and warm chili spices.",
    image: "/images/hero_comfort_chili.jpg",
    author: "Elena Kravchuk",
    updated: "2026-11-12",
    prep: 10,
    cook: 210,
    baseServings: 10,
    category: "Main Course",
    cuisine: "American",
    skill: "Easy",
    cost: "$$",
    tags: ["slow-cooker", "beef", "high-protein", "beans", "soup", "main-course", "kid-friendly", "lunch", "entertaining"],
    featured: true,
    videoDuration: "04:15",
    rating: { value: 4.9, count: 2535 },
    sections: [
      {
        h: "Why Slow Cooking Works So Well",
        p: "Browning the beef, onion, garlic, and spices first builds deep savory flavor, while gentle slow cooking lets the seasoning meld without drying out the meat.",
      },
      {
        h: "Favorite Toppings",
        p: "Serve hot with shredded sharp cheddar, diced ripe avocado, fresh chopped cilantro, cool sour cream, or sliced pickled jalapeños.",
      },
    ],
    ingredients: [
      { a: 2, u: "lb", t: "lean ground beef (85/15)" },
      { a: 1, u: "large", t: "yellow onion, diced" },
      { a: 4, u: "cloves", t: "garlic, minced" },
      { a: 2, u: "Tbsp", t: "chili powder" },
      { a: 2, u: "tsp", t: "ground cumin" },
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
      "Heat a large skillet over medium-high heat and sauté ground beef for 4–5 minutes, breaking it up with a wooden spatula.",
      "Add the diced onion and sauté for about 4 minutes until softened and translucent.",
      "Stir in minced garlic, chili powder, cumin, garlic powder, oregano, salt, and pepper; cook for 30 seconds until fragrant.",
      "Transfer the beef mixture to a 6-quart slow cooker and add the rinsed beans, diced tomatoes, tomatoes with green chilis, and tomato sauce.",
      "Stir well, cover, and cook on High for 3–4 hours or Low for 6–8 hours. Taste and adjust salt before serving.",
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
  {
    slug: "creamy-tuscan-zuppa-toscana",
    title: "Creamy Zuppa Toscana Soup",
    description:
      "A comforting one-pot Tuscan soup brimming with browned Italian sausage, tender Yukon gold potatoes, and fresh kale in a savory garlic cream broth.",
    image: "/images/recipe_tuscan_soup.jpg",
    author: "Elena Kravchuk",
    updated: "2026-11-08",
    prep: 10,
    cook: 20,
    baseServings: 6,
    category: "Soups & Chili",
    cuisine: "Italian-American",
    skill: "Easy",
    cost: "$$",
    tags: ["soup", "30-minute-meals", "potatoes", "main-course", "pork", "high-protein", "kid-friendly", "copycat", "lunch"],
    videoDuration: "03:40",
    rating: { value: 4.9, count: 1840 },
    sections: [
      {
        h: "Ready in 30 Minutes",
        p: "Because sliced Yukon gold potatoes simmer quickly in seasoned chicken stock, this restaurant-style soup comes together on a busy weeknight in half an hour.",
      },
      {
        h: "Make-Ahead & Reheating",
        p: "The broth deepens in flavor overnight. Reheat gently over medium-low heat and serve with warm crusty sourdough.",
      },
    ],
    ingredients: [
      { a: 1, u: "lb", t: "mild or spicy Italian sausage, casings removed" },
      { a: 1, u: "medium", t: "yellow onion, finely diced" },
      { a: 3, u: "cloves", t: "garlic, minced" },
      { a: 1.5, u: "lb", t: "Yukon gold potatoes, thinly sliced" },
      { a: 48, u: "oz", t: "low-sodium chicken broth" },
      { a: 3, u: "cups", t: "chopped lacinato or curly kale, stems removed" },
      { a: 1, u: "cup", t: "heavy whipping cream" },
      { a: 0.5, u: "cup", t: "freshly grated Parmesan cheese" },
      { a: 0.5, u: "tsp", t: "cracked black pepper" },
    ],
    steps: [
      "In a heavy Dutch oven over medium-high heat, brown the Italian sausage for 5 minutes until crumbled and golden.",
      "Add the diced onion and cook 4 minutes until tender, then stir in minced garlic for 30 seconds.",
      "Pour in the chicken broth and add sliced potatoes. Bring to a boil, then simmer uncovered for 10–12 minutes until potatoes pierce easily with a fork.",
      "Reduce heat to medium-low, stir in chopped kale and heavy cream, and simmer 3 minutes until kale wilts.",
      "Season with black pepper and ladle into warm bowls topped with freshly grated Parmesan.",
    ],
    notes:
      "For a lighter broth, substitute half-and-half or evaporated milk in place of heavy cream.",
    nutrition: {
      Calories: "420 kcal",
      Protein: "19g",
      Carbohydrates: "24g",
      Fat: "28g",
    },
  },
  {
    slug: "pan-seared-garlic-butter-salmon",
    title: "Garlic Butter Skillet Salmon",
    description:
      "Crisp-seared wild salmon fillets basted in brown garlic lemon butter with tender asparagus spears—ready from fridge to table in 20 minutes.",
    image: "/images/recipe_garlic_salmon.jpg",
    author: "Elena Kravchuk",
    updated: "2026-11-04",
    prep: 8,
    cook: 12,
    baseServings: 4,
    category: "Main Course",
    cuisine: "Mediterranean",
    skill: "Easy",
    cost: "$$$",
    tags: ["30-minute-meals", "seafood", "high-protein", "main-course", "kid-friendly", "entertaining"],
    videoDuration: "02:55",
    rating: { value: 4.9, count: 1420 },
    sections: [
      {
        h: "The Secret to Crispy Golden Edges",
        p: "Patting the salmon dry before seasoning and searing undisturbed for 4 minutes creates a delicate golden crust while keeping the center flaky and moist.",
      },
      {
        h: "What to Serve Alongside",
        p: "Spoon the extra lemon-dill garlic butter over steamed jasmine rice, mashed potatoes, or crusty bread.",
      },
    ],
    ingredients: [
      { a: 4, u: "fillets", t: "skinless or skin-on salmon (6 oz each)" },
      { a: 1, u: "bunch", t: "fresh asparagus, woody ends trimmed" },
      { a: 3, u: "Tbsp", t: "unsalted butter" },
      { a: 1, u: "Tbsp", t: "olive oil" },
      { a: 4, u: "cloves", t: "garlic, minced" },
      { a: 1, u: "medium", t: "lemon, juiced and sliced" },
      { a: 2, u: "Tbsp", t: "fresh dill, finely chopped" },
      { a: 1, u: "tsp", t: "fine sea salt" },
      { a: 0.5, u: "tsp", t: "freshly cracked black pepper" },
    ],
    steps: [
      "Pat the salmon fillets dry with paper towels and season evenly on all sides with salt and black pepper.",
      "Heat olive oil and 1 Tbsp butter in a large cast-iron skillet over medium-high heat until shimmering.",
      "Place salmon fillets presentation-side down and sear undisturbed for 3–4 minutes until golden brown. Flip carefully.",
      "Push salmon to one side, add remaining 2 Tbsp butter, minced garlic, and trimmed asparagus. Sauté 3–4 minutes, spooning melted garlic butter over the fillets.",
      "Remove from heat, squeeze fresh lemon juice over the pan, garnish with chopped dill, and serve immediately.",
    ],
    notes:
      "Pull salmon from the pan when the thickest center reaches 125–130°F for juicy, tender flakes.",
    nutrition: {
      Calories: "385 kcal",
      Protein: "35g",
      Carbohydrates: "5g",
      Fat: "25g",
    },
  },
  {
    slug: "classic-ukrainian-borscht",
    title: "Classic Heritage Beet Borscht",
    description:
      "Vibrant ruby-red family borscht simmered with tender beef, sweet roasted beets, cabbage, carrots, potatoes, and fragrant fresh dill.",
    image: "/images/cookbook_hardcover_spread.jpg",
    author: "Elena Kravchuk",
    updated: "2026-10-28",
    prep: 25,
    cook: 55,
    baseServings: 8,
    category: "Soups & Chili",
    cuisine: "Ukrainian",
    skill: "Intermediate",
    cost: "$$",
    tags: ["soup", "beef", "potatoes", "beans", "cookbook", "roundups", "entertaining", "lunch"],
    rating: { value: 5.0, count: 1190 },
    sections: [
      {
        h: "A Family Heirloom Recipe",
        p: "Passed down from our mother's kitchen, this traditional borscht balances earthy sweet beets with bright vinegar, savory broth, and fresh garden dill.",
      },
      {
        h: "Why Resting Improves Flavor",
        p: "Like all great heritage soups, borscht tastes even richer the next day once the vegetables and herbs infuse the broth.",
      },
    ],
    ingredients: [
      { a: 3, u: "medium", t: "red beets, peeled and grated" },
      { a: 1.5, u: "lb", t: "beef chuck or soup bones" },
      { a: 3, u: "medium", t: "Yukon gold potatoes, diced" },
      { a: 2, u: "medium", t: "carrots, grated" },
      { a: 0.5, u: "head", t: "green cabbage, thinly shredded" },
      { a: 1, u: "large", t: "yellow onion, finely diced" },
      { a: 3, u: "Tbsp", t: "tomato paste" },
      { a: 2, u: "Tbsp", t: "white vinegar or fresh lemon juice" },
      { a: 0.25, u: "cup", t: "fresh dill, chopped, plus sour cream to serve" },
    ],
    steps: [
      "Simmer beef chuck in 10 cups cold water with 1 tsp salt for 40 minutes, skimming foam to create a clear, rich broth. Dice the tender beef.",
      "Add diced potatoes and shredded cabbage to the pot and simmer 12 minutes until potatoes are nearly tender.",
      "Meanwhile, sauté grated beets, carrots, and onion in 2 Tbsp oil for 8 minutes. Stir in tomato paste and vinegar to preserve the ruby color.",
      "Transfer the sautéed beet mixture and diced beef into the pot. Simmer 10 minutes until all vegetables are tender.",
      "Stir in chopped fresh dill and pressed garlic, adjust salt to taste, and serve warm with a generous swirl of sour cream.",
    ],
    notes:
      "Add a can of drained kidney beans during the final 10 minutes for a heartier texture—a favorite family variation.",
    nutrition: {
      Calories: "265 kcal",
      Protein: "18g",
      Carbohydrates: "24g",
      Fat: "11g",
    },
  },
  {
    slug: "classic-vanilla-berry-cheesecake",
    title: "Classic Baked Berry Cheesecake",
    description:
      "Velvety New York-style vanilla bean cheesecake baked on a crisp golden graham cracker crust and crowned with fresh berries.",
    image: "/images/recipe_berry_cheesecake.jpg",
    author: "Elena Kravchuk",
    updated: "2026-10-19",
    prep: 25,
    cook: 65,
    baseServings: 12,
    category: "Desserts",
    cuisine: "American",
    skill: "Intermediate",
    cost: "$$",
    tags: ["dessert", "desserts", "baking", "kid-friendly", "roundups", "thanksgiving", "entertaining"],
    rating: { value: 4.9, count: 980 },
    sections: [
      {
        h: "Crack-Free Baking Method",
        p: "Using room-temperature cream cheese, mixing on low speed to avoid whipping in excess air, and cooling gradually inside the oven guarantees a silky, crack-free top.",
      },
      {
        h: "Make Ahead for Entertaining",
        p: "Bake the cheesecake a day in advance and chill overnight so every slice cuts cleanly.",
      },
    ],
    ingredients: [
      { a: 1.5, u: "cups", t: "graham cracker crumbs" },
      { a: 6, u: "Tbsp", t: "unsalted butter, melted" },
      { a: 32, u: "oz", t: "full-fat cream cheese, room temperature" },
      { a: 1, u: "cup", t: "granulated sugar" },
      { a: 1, u: "cup", t: "sour cream, room temperature" },
      { a: 3, u: "large", t: "eggs, room temperature" },
      { a: 2, u: "tsp", t: "pure vanilla extract" },
      { a: 2, u: "cups", t: "fresh strawberries and blueberries, for topping" },
    ],
    steps: [
      "Combine graham cracker crumbs, 2 Tbsp sugar, and melted butter; press firmly into a 9-inch springform pan and bake at 350°F for 10 minutes.",
      "Beat cream cheese and remaining sugar on medium-low speed until smooth and lump-free, scraping down the bowl.",
      "Mix in sour cream and vanilla extract, then add eggs one at a time on low speed just until incorporated.",
      "Pour batter over crust and bake at 325°F for 55–65 minutes until edges are set and center has a gentle jiggle.",
      "Turn oven off, crack door 1 inch for 45 minutes, then chill at least 4 hours before topping with fresh berries.",
    ],
    notes:
      "Make sure cream cheese, sour cream, and eggs are all at room temperature so the batter blends completely smooth.",
    nutrition: {
      Calories: "410 kcal",
      Protein: "7g",
      Carbohydrates: "34g",
      Fat: "28g",
    },
  },
];

export function getAllRecipes(): Recipe[] {
  return RECIPES;
}

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}