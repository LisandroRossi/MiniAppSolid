const TMDB_API_KEY = "ea3473ad75ce88a293ad2074dee288b1";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query) {
  if (!query) return [];
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results || [];
}

