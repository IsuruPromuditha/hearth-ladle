// lib/comments.ts
export type Comment = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

const store = new Map<string, Comment[]>();

export function listComments(slug: string): Comment[] {
  return store.get(slug) ?? [];
}

export function addComment(
  slug: string,
  input: { name: string; rating: number; text: string }
): Comment {
  const comment: Comment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    slug,
    name: input.name,
    rating: input.rating,
    text: input.text,
    date: new Date().toISOString(),
  };
  const current = store.get(slug) ?? [];
  store.set(slug, [comment, ...current]);
  return comment;
}