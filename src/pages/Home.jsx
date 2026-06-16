import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

import {
  getTrendingMovies,
  searchMovies
} from "../services/tmdb";

function Home() {
  const [movies, setMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [query, setQuery] =
    useState("");

  const [searchMode, setSearchMode] =
    useState(false);

  useEffect(() => {
    loadTrending();
  }, []);

  async function loadTrending() {
    setLoading(true);

    try {
      const data =
        await getTrendingMovies();

      setMovies(data);
      setSearchMode(false);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function handleSearch() {
    if (!query.trim()) {
      loadTrending();
      return;
    }

    setLoading(true);

    try {
      const data =
        await searchMovies(query);

      setMovies(data);
      setSearchMode(true);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>
          Explore the World of Cinema
        </h1>

        <p>
          Search millions of movies,
          discover trending releases,
          and find your next favorite film.
        </p>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
        />
      </section>

      <section className="content">
        <h2>
          {searchMode
            ? `Search Results`
            : `🔥 Trending Movies`}
        </h2>

        {loading ? (
          <h3>Loading...</h3>
        ) : movies.length === 0 ? (
          <h3>No movies found.</h3>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </section>
    </>
  );
}

export default Home;