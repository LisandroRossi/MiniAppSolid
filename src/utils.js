// src/utils.js
import { createSignal, createEffect } from "solid-js";

export function getPosterUrl(path) {
  return path ? `https://image.tmdb.org/t/p/w342${path}` : "https://via.placeholder.com/300x445?text=No+Poster";
}



export function useLocalStorage(key, initial = {}) {
  const initialVal = (() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  })();

  const [state, setState] = createSignal(initialVal);

  createEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state()));
    } catch {}
  });

  return [state, (val) => setState(val)];
}