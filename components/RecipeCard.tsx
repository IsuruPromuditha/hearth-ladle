"use client";
import { useEffect, useState } from "react";
import type { Recipe } from "@/lib/recipes";
import { formatIngredient, formatMinutes } from "@/lib/format";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.baseServings);
  const [metric, setMetric] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");
  const factor = servings / recipe.baseServings;
  const key = `hl-fav-${recipe.slug}`;

  useEffect(() => { try { setSaved(localStorage.getItem(key) === "1"); } catch {} }, [key]);

  function flash(t: string) { setToast(t); setTimeout(() => setToast(""), 2000); }
  function toggleSave() {
    const next = !saved; setSaved(next);
    try { localStorage.setItem(key, next ? "1" : "0"); } catch {}
    flash(next ? "Saved to favorites" : "Removed from favorites");
  }
  async function share() {
    const url = window.location.href.split("#")[0];
    if (navigator.share) return navigator.share({ title: recipe.title, url }).catch(() => {});
    try { await navigator.clipboard.writeText(url); flash("Link copied"); } catch { flash("Copy the address bar link"); }
  }

  return (
    <section className="card" id="recipe" aria-labelledby="rt">
      <h2 id="rt">{recipe.title}</h2>
      <p>{recipe.description}</p>
      <div className="times">
        <div><b>{formatMinutes(recipe.prep)}</b><span>Prep</span></div>
        <div><b>{formatMinutes(recipe.cook)}</b><span>Cook</span></div>
        <div><b>{formatMinutes(recipe.prep + recipe.cook)}</b><span>Total</span></div>
      </div>

      <div className="tools">
        <span className="step-ctl">Servings
          <button aria-label="Fewer servings" onClick={() => setServings((s) => Math.max(2, s - 2))}>−</button>
          <b aria-live="polite">{servings}</b>
          <button aria-label="More servings" onClick={() => setServings((s) => Math.min(40, s + 2))}>+</button>
        </span>
        <span className="seg" role="group" aria-label="Units">
          <button aria-pressed={!metric} onClick={() => setMetric(false)}>US</button>
          <button aria-pressed={metric} onClick={() => setMetric(true)}>Metric</button>
        </span>
        <button className="btn" aria-pressed={saved} onClick={toggleSave}>{saved ? "♥ Saved" : "♥ Save"}</button>
        <button className="btn" onClick={() => window.print()}>Print</button>
        <button className="btn" onClick={share}>Share</button>
      </div>

      <h3>Ingredients</h3>
      <ul className="ing">
        {recipe.ingredients.map((it, i) => (
          <li key={i}>
            <label><input type="checkbox" /><span><b>{formatIngredient(it, factor, metric)}</b> {it.t}</span></label>
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol className="steps">{recipe.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>

      {recipe.notes && (<><h3>Notes</h3><p className="note big">{recipe.notes}</p></>)}

      <details>
        <summary>Nutrition per serving</summary>
        <table className="nut"><tbody>
          {Object.entries(recipe.nutrition).map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </details>
      <p className="meta">Course: {recipe.category} · Cuisine: {recipe.cuisine} · Skill: {recipe.skill} · Cost: {recipe.cost}</p>
      <div id="toast" className={toast ? "show" : ""} role="status">{toast}</div>
    </section>
  );
}
