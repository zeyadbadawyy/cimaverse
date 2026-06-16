import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";

import {
  getFavorites
} from "../utils/favorites";

function Favorites() {
  const [movies, setMovies] =
    useState([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  return (
    <>
      <Navbar />

      <section className="content">
        <h1>
          ❤️ Favorite Movies
        </h1>

        {movies.length === 0 ? (
         <div className="empty-state">
          <h2>❤️ No favorites yet</h2>
          <p>
            Start exploring movies and save
            your favorites here.
          </p>
        </div>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </section>
    </>
  );
}

export default Favorites;