import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import GenreFilter from "../components/GenreFilter";
import Footer from "../components/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre
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

  const [genres, setGenres] = 
    useState([]);
  
  const [selectedGenre, setSelectedGenre] = 
    useState(null);

  const [activeTab, setActiveTab] =
    useState("trending"); 

  useEffect(() => {
    loadTrending();
    loadGenres();
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
    setSelectedGenre(null);
    setLoading(true);
    setActiveTab(null);

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

  async function loadGenres() {
    const data =
      await getGenres();

    setGenres(data);
  }

  async function handleGenreSelect(genreId) {
    setSelectedGenre(genreId);
    setSearchMode(false);

    if (genreId === null) {
      loadTrending();
      return;
    }

    const movies =
      await getMoviesByGenre(
        genreId
      );

    setMovies(movies);
  }

  async function handleTabChange(tab) {
    setActiveTab(tab);

    setLoading(true);

    try {
      let data = [];

      switch (tab) {
        case "popular":
          data =
            await getPopularMovies();
          break;

        case "top":
          data =
            await getTopRatedMovies();
          break;

        case "now":
          data =
            await getNowPlayingMovies();
          break;

        default:
          data =
            await getTrendingMovies();
      }

      setMovies(data);
      setSearchMode(false);
      setSelectedGenre(null);

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
            ? `🔎 Search Results for "${query}"`
            : activeTab === "popular"
            ? `🍿 Popular Movies`
            : activeTab === "top"
            ? `⭐ Top Rated Movies`
            : activeTab === "now"
            ? `🎬 Now Playing`
            : `🔥 Trending Movies`}
        </h2>
        <div className="movie-tabs">
          <button
            className={
              activeTab === "trending"
                ? "active"
                : ""
            }
            onClick={() =>
              handleTabChange("trending")
            }
          >
            🔥 Trending
          </button>

          <button
            className={
              activeTab === "popular"
                ? "active"
                : ""
            } 
            onClick={() =>
              handleTabChange("popular")
            }
          >
            🍿 Popular
          </button>

          <button
            className={
              activeTab === "top"
                ? "active"
                : ""
            }
            onClick={() =>
              handleTabChange("top")
            }
          >
            ⭐ Top Rated
          </button>

          <button
            className={
              activeTab === "now"
                ? "active"
                : ""
            }
            onClick={() =>
              handleTabChange("now")
            }
          >
            🎬 Now Playing
          </button>
        </div>
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={
            handleGenreSelect
          }
        />

        {loading ? (
          <h3>Loading...</h3>
        ) : movies.length === 0 ? (
          <h3>No movies found.</h3>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </section>
      <Footer />
    </>
  );
}

export default Home;