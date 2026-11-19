// In-memory store for the starter. Replace with a database (Supabase, Postgres, etc.).
export type Comment = { id: string; name: string; rating: number; text: string; date: string };

const g = globalThis as unknown as { __comments?: Map<string, Comment[]> };
const store = (g.__comments ??= new Map<string, Comment[]>());

export const listComments = (slug: string) => store.get(slug) ?? [];

export function addComment(slug: string, c: Omit<Comment, "id" | "date">): Comment {
  const full: Comment = { ...c, id: crypto.randomUUID(), date: new Date().toISOString() };
  store.set(slug, [full, ...listComments(slug)]);
  return full;
}
