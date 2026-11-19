# Hearth & Ladle: Next.js recipe site starter

Next.js (App Router) + TypeScript. Recipes are JSON files, pages are statically generated.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Add a recipe
Copy `content/recipes/smoky-slow-cooker-bean-chili.json`, change the `slug` and content.
The page, sitemap entry, metadata and Recipe JSON-LD are generated automatically.

## Structure
- `app/recipes/[slug]/page.tsx`: recipe page, SEO metadata, JSON-LD
- `components/RecipeCard.tsx`: servings scaler, US/metric, save, print, share, nutrition
- `components/Comments.tsx` + `app/api/comments/route.ts`: ratings and comments
- `lib/recipes.ts`: loads JSON content; `lib/format.ts`: unit and fraction formatting
- `app/sitemap.ts`, `app/robots.ts`: SEO

## Before production
1. Replace `lib/comments.ts` (in-memory) with a database, add spam protection and moderation.
2. Wire the newsletter form in `components/Footer.tsx` to an email provider.
3. Add real photos with `next/image` (files in `/public`).
4. Set `NEXT_PUBLIC_SITE_URL` to your domain.
5. Add your own privacy policy and affiliate disclosure.
