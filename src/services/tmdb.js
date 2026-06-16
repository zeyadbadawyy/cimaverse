const BASE_URL =
  "https://api.themoviedb.org/3";

const TOKEN =
  import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  accept: "application/json"
};

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week`,
    {
      headers
    }
  );

  const data = await response.json();

  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers
    }
  );

  const data = await response.json();

  return data.results;
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}`,
    {
      headers
    }
  );

  const data = await response.json();

  return data;
}

export async function getGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list`,
    {
      headers
    }
  );

  const data = await response.json();

  return data.genres;
}

export async function getMoviesByGenre(id) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${id}`,
    {
      headers
    }
  );

  const data = await response.json();

  return data.results;
}
