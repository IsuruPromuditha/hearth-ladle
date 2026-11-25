# Hearth & Ladle

A modern recipe website and cookbook companion built with Next.js. Browse tested family recipes, search by ingredient or method, filter by category, watch step-by-step video tutorials, and sign up for a weekly recipe newsletter.

## Features

- **Featured recipe spotlight** on the home page
- **Live search** across titles, descriptions, categories, cuisines, tags, ingredients, and steps
- **Category filters** (Main Course, 30-Minute Meals, Slow Cooker, Soups & Chili, Desserts)
- **Main Course hub** with subcategory navigation
- **Video recipe filter** and tutorial showcase
- **Newsletter sign-up** with client-side email validation
- **Cookbook and About sections** linking to dedicated pages
- **Resilient images**: graceful fallback UI when a recipe image fails to load
- **Smooth transitions** powered by Motion
- **Accessible markup**: ARIA labels, `role="status"` messages, semantic sections

## Tech Stack

| Area       | Technology                  |
| ---------- | --------------------------- |
| Framework  | [Next.js](https://nextjs.org/) (App Router) |
| Language   | TypeScript                  |
| UI         | React                       |
| Styling    | Tailwind CSS + CSS variables |
| Animation  | [Motion](https://motion.dev/) |
| Icons      | [Lucide React](https://lucide.dev/) |

## Getting Started

### Prerequisites

- Node.js 18.18 or newer
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/                      # Next.js routes
│   ├── page.tsx              # Home page
│   ├── about/                # About page
│   ├── category/main-course/ # Main Course hub
│   └── recipes/[slug]/       # Individual recipe pages
├── components/
│   ├── HomeSections.tsx      # Home page sections (hero, search, feed, etc.)
│   └── MainCourseClient.tsx  # Main Course subcategories
├── lib/
│   ├── recipes.ts            # Recipe type and data
│   └── format.ts             # Formatting helpers (e.g. formatMinutes)
└── public/
    └── images/               # Recipe and site imagery
```

> Adjust this tree to match your actual folder layout.

## Recipe Data Model

Each recipe is expected to provide fields used by the home page, including:

```ts
type Recipe = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  tags: string[];
  prep: number;            // minutes
  cook: number;            // minutes
  baseServings: number;
  rating: { value: number; count: number };
  ingredients: { t: string }[];
  steps: string[];
  featured?: boolean;
  videoDuration?: string;  // presence marks it as a video recipe
};
```

See `lib/recipes.ts` for the authoritative definition.

## Search & Filter URL Params

The home page accepts initial state from the URL (via server-side props):

- `q`: search query
- `filter`: category slug (e.g. `main-course`, `soup`, `desserts`)
- `video`: show only video recipes

## Theming

Colors are defined as CSS variables, making it easy to restyle the site:

`--bg`, `--surface`, `--soft`, `--ink`, `--muted`, `--line`, `--accent`, `--accent-hover`, `--accent-ink`, `--star`, `--danger`

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
