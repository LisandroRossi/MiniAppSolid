// src/App.jsx
import { createSignal, createMemo, For } from "solid-js";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import { searchMovies } from "./api"; 
import { useLocalStorage } from "./utils";
import "./index.css";

export default function App() {
  const [movies, setMovies] = createSignal([]); 
  const [filter, setFilter] = createSignal("all"); 
  const [savedMap, setSavedMap] = useLocalStorage("tmdb-saved", {}); 


  const handleSearch = async (q) => {
    if (!q) {
      setMovies([]);
      return;
    }
    const results = await searchMovies(q); 
    const merged = results.map((m) => {
      const existing = savedMap()[m.id];
      // normalizo campos: poster y rating
      const poster = existing?.poster || (m.poster_path ? `https://image.tmdb.org/t/p/w300${m.poster_path}` : null);
      const rating = existing?.rating ?? (m.vote_average ?? null);
      return {
        id: m.id,
        title: existing?.title ?? m.title ?? m.name ?? m.original_title ?? "Sin título",
        poster,
        rating,
        status: existing?.status ?? "none",
        poster_path: m.poster_path,
        raw: m
      };
    });
    setMovies(merged);
  };

  
  const handleStatusChange = (id, newStatus) => {
    
    const map = { ...savedMap() };

    if (newStatus === "none") {
      
      delete map[id];
    } else {
      const existing = map[id];
      if (existing) {
        map[id] = { ...existing, status: newStatus, savedAt: Date.now() };
      } else {
        
        const found = movies().find((m) => m.id === id);
        const base = found
          ? {
              id: found.id,
              title: found.title,
              poster: found.poster, 
              poster_path: found.poster_path, 
              rating: found.rating
            }
          : { id };
        map[id] = { ...base, status: newStatus, savedAt: Date.now() };
      }
    }
    setSavedMap(map);

    
    setMovies(movies().map((m) => (m.id === id ? { ...m, status: newStatus } : m)));
  };


  const counts = createMemo(() => {
    let seen = 0,
      pending = 0;
    const map = savedMap();
    for (const id in map) {
      if (map[id].status === "seen") seen++;
      if (map[id].status === "pending") pending++;
    }
    return { seen, pending, total: Object.keys(map).length };
  });

 
  const savedArray = createMemo(() => Object.values(savedMap()));

 
  const filteredMovies = createMemo(() => {
    if (filter() === "all") return savedArray();
    return savedArray().filter((m) => m.status === filter());
  });

  return (
    <div class="app-container">
      <h1 class="app-title">🎬 Mini-Visor de Películas</h1>

      <SearchBar onSearch={handleSearch} />
            <br></br>
      <div class="movies-grid">
        <For each={movies()}>
          {(movie) => <MovieCard movie={movie} onChangeStatus={handleStatusChange} />}
        </For>
      </div>


      <div class="filters-container">
        <div class="filter-buttons">
          <button classList={{ "filter-btn": true, active: filter() === "all" }} onClick={() => setFilter("all")}>
            Todos ({counts().total})
          </button>
          <button classList={{ "filter-btn": true, active: filter() === "seen" }} onClick={() => setFilter("seen")}>
            Vistos ({counts().seen})
          </button>
          <button classList={{ "filter-btn": true, active: filter() === "pending" }} onClick={() => setFilter("pending")}>
            Pendientes ({counts().pending})
          </button>
        </div>
        <div class="saved-count">🎬Guardadas: <strong>{counts().total}</strong></div>
      </div>

      <div class="movies-grid">
        <For each={filteredMovies()}>
          {(movie) => <MovieCard movie={movie} onChangeStatus={handleStatusChange} />}
        </For>
      </div>

      {savedArray().length === 0 && <p class="no-movies-msg">No tenés películas guardadas. Busca y guardá algunas.</p>}
    </div>
  );
}