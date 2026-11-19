import type { Ingredient } from "./recipes";

const FR: Record<number, string> = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

function fraction(n: number): string {
  const q = Math.max(0.25, Math.round(n * 4) / 4);
  const whole = Math.floor(q);
  const f = q - whole;
  return `${whole || ""}${f ? FR[f] ?? "" : ""}` || "0";
}

export function formatIngredient(it: Ingredient, factor: number, metric: boolean): string {
  if (metric && it.m && it.mu) return `${Math.round((it.m * factor) / 5) * 5} ${it.mu}`;
  const amount = it.a * factor;
  if (it.u === "oz" || it.u === "lb") return `${Math.round(amount * 10) / 10} ${it.u}`;
  return `${fraction(amount)}${it.u ? " " + it.u : ""}`;
}

export function formatMinutes(min: number): string {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h} hr${m ? " " + m + " min" : ""}` : `${m} min`;
}
