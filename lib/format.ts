// lib/format.ts
import type { Ingredient } from "./recipes";

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function roundNice(val: number): string {
  const rounded = Math.round(val * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, "");
}

export function formatIngredient(ing: Ingredient, factor: number, metric: boolean): string {
  const scaled = ing.a * factor;
  const unit = (ing.u ?? "").toLowerCase();

  if (metric) {
    if (unit === "lb") return `${Math.round(scaled * 453.592)} g`;
    if (unit === "oz") return `${Math.round(scaled * 28.3495)} g`;
    if (unit === "tbsp") return `${Math.round(scaled * 15)} ml`;
    if (unit === "tsp") return `${Math.round(scaled * 5)} ml`;
  }

  return ing.u ? `${roundNice(scaled)} ${ing.u}` : roundNice(scaled);
}